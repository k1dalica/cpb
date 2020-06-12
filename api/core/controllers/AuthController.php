<?php

class AuthController extends Controller {

	public function __construct() {
		$this->model('User');
		$this->model('Club');
	}

	public function login () {
		$email = Input::get('email');
		$password = Input::get('password');

		$data = User::login($email, $password);
		if ($data !== false) {
			return $this->json(["data" => $data]);
		}
		return $this->json(["error" => "Incorrect login data !"], 400);
	}

	public function checkToken () {
		$data = Token::get();
		if ($data !== false) {
			return $this->json(["data" => $data]);
		}
		return $this->json(["error" => "Token isn't valid"], 400);
	}
}