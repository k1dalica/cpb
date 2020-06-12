<?php
class Token {
	public static function generate() {
		$charset = "asdfghjklzxcvbnmqwertyuiopASDFGHJKLZXCVBNMQWERTYUIOP0123456789";
		$token = substr(str_shuffle($charset), 0, 50);
		return $token;
	}

	public static function get() {
		$token = null;
		$headers = apache_request_headers();
		if(isset($headers['Authorization'])){
			$token = $headers['Authorization'];
		} 
		return User::checkToken($token);;
	}
}
?>