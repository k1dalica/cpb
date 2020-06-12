<?php

class Slika {
  public $id,
    $path,
    $desc;

  
    public function __construct($slika) {
      $this->id = $slika->id;
      $this->path = $slika->path;
      $this->desc = $slika->opis;
    }

    public static function fromAlbum($id) {
      $query = DB::getInstance()->query("SELECT * FROM `slike` WHERE `aid` = ? ORDER BY id DESC", [$id]);
      $data = [];
      if ($query->count() > 0) {
        foreach($query->results() as $result)
          $data[] = new self($result);
      }
      return $data;
    }
}