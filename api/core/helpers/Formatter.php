<?php

class Formatter {

  public static function required($required) {
    $data = [];
    $err = false;
    foreach ($required as $req) {
			if (Input::get($req)) {
        $data[$req] = Input::get($req);
			} else {
        $err = true;
			}
    }
    return $err ? false : $data;
  }
}