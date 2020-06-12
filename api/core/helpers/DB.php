<?php

class DB {

	private static $_instance = null;
	private $_pdo,
			$_query,
			$_error = false,
			$_results,
			$_count = 0,
			$_lastid;
	
	private function __construct() {
		try {
			$this->_pdo = new PDO('mysql:host=127.0.0.1;dbname=sretenje', 'root', '', [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"]);
		} catch(PDOException $e) {
			die($e->getMessage());	
		}
	}
	
	public static function getInstance() {
		if(!isset(self::$_instance)) {
			self::$_instance = new DB();
		}
		return self::$_instance;
	}
	
	public function query($sql, $params = []) {
		$this->_error = false;
		if($this->_query = $this->_pdo->prepare($sql)) {
			$x = 1;
			if(count($params)) {
				foreach($params as $param) {
					$this->_query->bindValue($x, $param);
					$x++;
				}
			}
			
			if($this->_query->execute()) {
				$this->_results = $this->_query->fetchAll(PDO::FETCH_OBJ);
				$this->_count = $this->_query->rowCount();
				$this->_lastid = $this->_pdo->lastInsertId();
			} else {
				$this->_error = true;
			}
		}
		return $this;
	}
	
	public function action($action, $table, $where = []) {
		if(count($where) === 3) {
			$operators = ['=','>','<','>=','<='];
			
			$field = $where[0];
			$operator = $where[1];
			$value = $where[2];
			
			if(in_array($operator, $operators)) {
				$sql = "{$action} FROM {$table} WHERE {$field} {$operator} ?";
				
				if(!$this->query($sql, [$value])->error()) {
					return $this;
				}
			}
		}
		return false;
	}
	
	public function get($table, $where) {
		return $this->action('SELECT *', $table, $where);
	}
	
	public function delete($table, $where) {
		return $this->action('DELETE', $table, $where);
	}
	
	public function insert($table,$fields = []) {
		$key = array_keys($fields);
		$values = null;
		$x = 1;
		
		foreach($fields as $field) {
			$values .= "?";
			if($x < count($fields)) {
				$values .= ', ';
			}
			$x++;
		}
		
		$sql = "INSERT INTO {$table} (`". implode('`, `', $key) ."`) VALUES ({$values})";
		if(!$this->query($sql, $fields)->error()) {
			return true;
		}
		return false;
	}
	
	public function update($table, $where, $id, $fields) {
		$set = '';
		$x = 1;
		
		foreach($fields as $name => $value) {
			$set .= "{$name} = ?";
			if($x < count($fields)) {
				$set .= ', ';
			}
			$x++;
		}
		
		$sql = "UPDATE {$table} SET {$set} WHERE `{$where}` = '{$id}'";
		if(!$this->query($sql, $fields)->error()) {
			return true;
		}
		return false;
	}
	
	public function first() {
		return $this->results()[0];
	}
	
	public function results() {
		return $this->_results;
	}
	
	public function error() {
		return $this->_error;
	}
	
	public function count() {
		return $this->_count;
	}

	public function lastid() {
		return $this->_lastid;
	}
}