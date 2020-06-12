<?php

class OtherController extends Controller {

	public function __construct() {
	}

	public function password() {
		return $this->json(["data" => md5(Input::get('data'))]);
	}
}