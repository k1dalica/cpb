<?php
class Input {
	public static function exists($type = 'post') {
		switch($type) {
			case 'post':
				return (!empty($_POST)) ? true : false ;
			break;
			case 'get':
				return (!empty($_POST)) ? true : false ;
			break;
			default:
				return false;
			break;
		}
	}
	
	public static function get($item) {
		if(isset($_POST[$item])) {
			return $_POST[$item];
		} else if(isset($_GET[$item])) {
			return $_GET[$item];
		} else if(isset($_FILES[$item])) {
			return $_FILES[$item];
		} else {
			$queryString = file_get_contents("php://input");
			$data = (array) json_decode($queryString); 
			return isset($data[$item]) ? $data[$item] : null;
		}
	}
}