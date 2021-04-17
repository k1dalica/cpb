<?php

class Album {
  public $id,
    $name,
    $cover,
    $desc,
    $photographer,
    $location,
    $cooperation,
    $makeup,
    $equipment,
    $editorial,
    $category,
    $images,
    $pos;


    public function __construct($album) {
      $this->id = $album->id;
      $this->name = $album->ime;
      $this->cover = $album->cover;
      $this->desc = $album->opis;
      $this->photographer = $album->fotograf;
      $this->location = $album->lokacija;
      $this->cooperation = $album->saradnja;
      $this->makeup = $album->makeup;
      $this->equipment = $album->oprema;
      $this->editorial = $album->editorijal;
      $this->category = $album->kat;
      $this->pos = $album->pos;
      $this->images = Slika::fromAlbum($album->id);
    }

    public function updateImages($images) {
      $count = 1;
      foreach($images as $image) {
        if ($image->delete) {
          DB::getInstance()->delete("slike", ["id", "=", $image->id]);
        } else {
          $count++;
          DB::getInstance()->update("slike", "id", $image->id, ["opis" => nl2br($image->desc), "pos" => $count]);
        }
      }
    }

    public function update() {
      $query = DB::getInstance()->update("albumi", "id", $this->id, [
        "ime" => $this->name,
        "cover" => $this->cover,
        "opis" => $this->desc,
        "fotograf" => $this->photographer,
        "lokacija" => $this->location,
        "saradnja" => $this->cooperation,
        "makeup" => $this->makeup,
        "oprema" => $this->equipment,
        "editorijal" => $this->editorial,
        "kat" => $this->category,
        "pos" => $this->pos
      ]);
      return $this;
    }

    public function addImages($data) {
      $images = [];
      foreach($data['name'] as $key => $name) {
        $tmp = $data['tmp_name'][$key];
        $size = $data['size'][$key];

        $image = [];
        $image["name"] = $name;
        $image["tmp_name"] = $tmp;
        $image["size"] = $size;

        $images[] = Image::upload($image);
      }
      foreach($images as $image) {
        DB::getInstance()->insert("slike", [
          "aid" => $this->id,
          "path" => $image,
          "opis" => "",
          "pos" => 9999
        ]);
      }
      return true;
    }

    public static function create($data) {
      DB::getInstance()->insert("albumi", [
        "ime" => $data["name"],
        "cover" => Image::upload($data["cover"]),
        "opis" => isset($data["desc"]) ? nl2br($data["desc"]) : "",
        "fotograf" => isset($data["photographer"]) ? $data["photographer"] : "",
        "lokacija" => isset($data["location"]) ? $data["location"] : "",
        "saradnja" => isset($data["cooperation"]) ? $data["cooperation"] : "",
        "makeup" => isset($data["makeup"]) ? $data["makeup"] : "",
        "oprema" => isset($data["equipment"]) ? $data["equipment"] : "",
        "editorijal" => isset($data["editorial"]) ? $data["editorial"] : "",
        "kat" => $data["category"]
      ]);
      if(DB::getInstance()->error() === false) {
        return self::find(DB::getInstance()->lastid());
      }
      return false;
    }

    public function delete() {
      DB::getInstance()->delete("albumi",["id", "=", $this->id]);
      DB::getInstance()->delete("slike",["aid", "=", $this->id]);
      Image::delete($this->cover);
      foreach($this->images as $image) {
        Image::delete($image);
      }
      return !DB::getInstance()->error();
    }

    public static function all() {
      $query = DB::getInstance()->query("SELECT * FROM `albumi` ORDER BY `pos` ASC");
      $data = [];
      if ($query->count() > 0) {
        foreach($query->results() as $result)
          $data[$result->kat][] = new self($result);
      }
      return $data;
    }

    public static function find($id) {
      $query = DB::getInstance()->query("SELECT * FROM `albumi` WHERE `id` = ?", [$id]);
      return new self($query->first());
    }
}
