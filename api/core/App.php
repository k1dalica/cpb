<?php

class App {

	public function __construct() {
		require 'core/RouteHandler.php';
		require 'core/controllers/Controller.php';
		spl_autoload_register(function($class) {
			require 'core/helpers/' . $class . '.php';
		});

		DB::getInstance();

		RouteHandler::init();
	}
}