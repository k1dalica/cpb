<?php

class RouteHandler {
	private static $instance = null;
	private $method = null;
	private $url = null;
	private $fullUrl = null;
	private $params = null;
	private $getRoutes = [];
	private $postRoutes = [];
	private $putRoutes = [];
	private $deleteRoutes = [];
	private $regexMatch = "([a-z0-9_]+)";

	private function __construct() {
		$this->setHeaders();
		$this->getUrl();
		$this->addRoutes();
		return ($this->handler() || $this->notFound());
	}

	public function addRoutes() {
		$this->post('md5', 'OtherController@password');
		$this->get('albums', 'AlbumsController@getAlbums');
		$this->get('album/{id}', 'AlbumsController@getAlbum');
		$this->post('album', 'AlbumsController@createAlbum');
		$this->post('album/{id}/edit', 'AlbumsController@editAlbum');
		$this->delete('album/{id}', 'AlbumsController@deleteAlbum');
		$this->post('album/{id}/images', 'AlbumsController@uploadImages');
		$this->put('album/{id}/images', 'AlbumsController@saveImages');
		$this->put('album/images', 'AlbumsController@deleteImages');
	}

	public function setHeaders() {
		/* Disable on live */
		if($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
			// if($_SERVER['HTTP_ORIGIN'] == "https://cpbphotography.com" || $_SERVER['HTTP_ORIGIN'] == "http://cpbphotography.com") {
			if($_SERVER['HTTP_ORIGIN'] == "http://localhost:8080") {
				header('Access-Control-Allow-Origin: *');
				header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
				header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, X-Auth-Token, Authorization');
				header('Access-Control-Max-Age: 1728000');
				header("Content-Length: 0");
				header('Access-Control-Allow-Credentials: true');
				exit(0);
			} else {
			  header("HTTP/1.1 403 Access Forbidden");
			  header("Content-Type: text/plain");
			  echo "You cannot repeat this request";
			}
		  
		}
		header('Access-Control-Allow-Origin: *'); 
		header("Access-Control-Allow-Credentials: true");
		header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
		header('Access-Control-Max-Age: 1000');
		header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, X-Auth-Token, Authorization');
		
		header('Content-Type: application/json');
	}

	public function notFound() {
		http_response_code(404);
		echo json_encode(["status_code" => 404, "status" => "Failed"]);
	}

	public static function init() {
		if(!isset(self::$instance)) {
			self::$instance = new RouteHandler();
		}
		return self::$instance;
	}

	public function handler() {
		$routes = $this->getArray();

		foreach($routes as $route) {
			/* Required parameters */
			$pattern = preg_replace_callback("/\{" . $this->regexMatch . "\}/i", function ($matches) {
				return $this->regexMatch;
			}, $route['url']);

			/* Optional parameters */
			$pattern = preg_replace_callback("/\/{" . $this->regexMatch . "\?}/", function() {
				return "/?(" . $this->regexMatch . ")?";
			}, $pattern);

			$pattern = str_replace("/", "\\/", $pattern);
			preg_match("/^" . $pattern . "$/i", $this->fullUrl, $matches);

			if(count($matches) > 0) {
				$this->callController($route, array_slice($matches, 1));
				return true;
			}
		}
		return false;
	}

	public function callController($route, $params) {
		$controller = $route['controller'];
		$exp = explode("@", $controller);
		$controllerName = $exp[0];
		$method = $exp[1];
		
		try {
			require 'core/controllers/' . $controllerName . '.php';
			$controller = new $controllerName;
			call_user_func_array([$controller, $method], $params);
		} catch(Exception $error) {
			echo json_encode([]);
		}
	}
	public function getArray() {
		switch ($this->method) {
			case "POST":
				return $this->postRoutes;
				break;
			case "PUT":
				return $this->putRoutes;
				break;
			case "DELETE":
				return $this->deleteRoutes;
				break;
			default:
				return $this->getRoutes;
				break;
		}
	}

	private function get($url, $controller) {
		$this->getRoutes[] = ['url' => $url, 'controller' => $controller];
	}

	private function post($url, $controller) {
		$this->postRoutes[] = ['url' => $url, 'controller' => $controller];
	}

	private function put($url, $controller) {
		$this->putRoutes[] = ['url' => $url, 'controller' => $controller];
	}

	private function delete($url, $controller) {
		$this->deleteRoutes[] = ['url' => $url, 'controller' => $controller];
	}

	protected function getUrl() {
		if(isset($_GET['url'])) {
			$this->url = explode('/',filter_var(rtrim($_GET['url'], '/'), FILTER_SANITIZE_URL));
			$this->params = $this->url;
			$this->fullUrl = implode("/", $this->params);
			$this->method = $_SERVER['REQUEST_METHOD'];
		}
	}
}