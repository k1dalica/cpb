<?php

abstract class Controller {

	public function json($data, $code = 200) {
		if(!is_array($data)) {
			throw new Exception("Data parametar must be an array.");
		}

		// $data["status_code"] = $code;
		// if ($code >= 200 && $code < 300) {
		// 	$status = "success";
		// } else {
		// 	$status = "failed";
		// }
		// $data['status'] = $status;
		
		http_response_code($code);
		echo json_encode($data, JSON_UNESCAPED_UNICODE);
	}

	public function model($file) {
		if(is_array($file) && count($file) > 0) {
			foreach($file as $f) {
				$path = "core/models/" . $f . ".php";
				if(file_exists($path)) {
					require $path;
				}
			}
		} else {
			$path = "core/models/" . $file . ".php";
			if(file_exists($path)) {
				require $path;
			}
		}
	}
}