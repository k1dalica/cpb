<?php

class User {
    public $id,
        $username,
        $name,
        $email,
        $avatar,
        $token,
        $token_expire;

    public function __construct($user) {
        $this->id = $user->id;
        $this->username = $user->username;
        $this->name = $user->name;
        $this->email = $user->email;
        $this->avatar = $user->avatar;
        $this->token = $user->token;
        $this->token_expire = $user->token_expire;
    }

    public static function login($email, $password) {
        $md5pw = md5($password);
        $query = DB::getInstance()->query("SELECT id FROM `users` WHERE (`email` = ? AND `password` = ?) OR (`username` = ? AND `password` = ?)", [$email, $md5pw, $email, $md5pw]);
        if ($query->count() > 0) {
            $user =  self::find($query->first()->id);
            $user->setToken();
            return $user;
        } else {
            return false;
        }
    }

    public static function find($id) {
        $query = DB::getInstance()->query("SELECT * FROM `users` WHERE `id` = ?", [$id]);
        if ($query->count() > 0) {
            return new self($query->first());
        }
        return false;
    }

    public static function checkToken($token) {
        $now = time();
        $query = DB::getInstance()->query("SELECT id FROM `users` WHERE `token` = ? AND `token_expire` > ?", [$token, $now]);
        if ($query->count() > 0) {
            return self::find($query->first()->id);
        }
        return false;
    }

    public function setToken() {
        $this->token = Token::generate();
        $this->token_expire = time() + (60 * 60 * 3);
        DB::getInstance()->update("users", "id", $this->id, [
            "token" => $this->token,
            "token_expire" => $this->token_expire
        ]);
    }
}