<?php

class AlbumsController extends Controller {
	private $user;

	public function __construct() {
		$this->model('User');
		$this->model('Slika');
		$this->model('Album');

		$this->user = Token::get();
	}

	public function getAlbums () {
		return $this->json(["data" => Album::all()]);
	}

	public function getAlbum ($id) {
		return $this->json(["data" => Album::find($id)]);
	}

	public function createAlbum () {
		$data = Formatter::required(["name", "category", "cover"]);
		if ($data === false)
			return $this->json(["error" => "Some param or params are missing !"], 406);

		return $this->json(["data" => Album::create($data)]);
	}

	public function editAlbum ($id) {
		// return $this->json(["data" => Input::get("cover")]);
		$album = Album::find($id);
		
		$album->name = Input::get("name") ? Input::get("name") : $album->name;
    $album->cover = Input::get("cover") != "null" && Input::get("cover") != "undefined" ? Image::upload(Input::get("cover")) : $album->cover;
		$album->desc = Input::get("desc") ? nl2br(Input::get("desc")) : $album->desc;
    $album->photographer = Input::get("photographer") ? Input::get("photographer") : $album->photographer;
    $album->location = Input::get("location") ? Input::get("location") : $album->location;
    $album->cooperation = Input::get("cooperation") ? Input::get("cooperation") : $album->cooperation;
    $album->makeup = Input::get("makeup") ? Input::get("makeup") : $album->makeup;
    $album->equipment = Input::get("equipment") ? Input::get("equipment") : $album->equipment;
    $album->editorial = Input::get("editorial") ? Input::get("editorial") : $album->editorial;
		$album->category = Input::get("category") ? Input::get("category") : $album->category;
		$album->update();

		return $this->json(["data" => $album]);
	}

	public function deleteAlbum ($id) {
		$album = Album::find($id);
		return $this->json(["data" => $album->delete()]);
	}

	public function uploadImages ($id) {
		$album = Album::find($id);
		$res = $album->addImages(Input::get("images"));
		return $this->json(["data" => Album::find($id)]);
	}

	public function saveImages ($id) {
		$album = Album::find($id);
		$album->updateImages(Input::get('images'));
		return $this->json(["data" => Album::find($id)]);
	}

	public function deleteImages () {
		// return $this->json(["data" => Album::all()]);
	}
}