<?php

class Email {
	public $title,
		$body,
		$headers,
		$to,
		$from = "office@etkf-ec2018.com";
	
	public function send() {
		$this->headers = "From: " . $this->from . "\r\n" . "Reply-To: " . $this->from . "\r\n" . "Content-Type: text/html; charset=utf-8\r\n";
		
		ini_set("SMTP","mail.etkf-ec2018.com");
		ini_set('smtp_port', 465);
		ini_set('sendmail_from', $this->from);

		mail($this->to, $this->title, $this->body, $this->headers);
	}
}