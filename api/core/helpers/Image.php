<?php
class Image {
	public static function delete($image) {
		unlink($image);
	}
	
	public static function upload($image) {
		$image = (array) $image;
		if(isset($image['name'])) {
			$name = $image['name'];
			$tmp = $image['tmp_name'];
			$size = $image['size'];
			$ext = explode(".", $name);
			$ext = end($ext);
			
			$imgext = ['jpg','jpeg','png','gif'];
			if(!empty($name) && in_array($ext, $imgext)) {
				$prefix = substr(str_shuffle("asdfghjklzxcvbnmqwertyuiopASDFGHJKLZXCVBNMQWERTYUIOP0123456789"), 0, 15);
				$location = "uploads/". $prefix ."-". time() .".".$ext;
				if(move_uploaded_file($tmp, $location)) {
					return "/".$location;
				}
			}
		}
		return false;
	}
}