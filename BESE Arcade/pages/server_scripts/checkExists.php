<?php
	$field = $_POST["field"];
	$value = $_POST["value"];

	$db = mysqli_connect('localhost', 'root', '', 'redemption');

	$sql = "";

	switch($field){
		case "fname":
			$sql = "SELECT * FROM users WHERE name='$value'";
			break;
		case "email":
			$sql = "SELECT * FROM users WHERE email='$value'";
			break;
		case "num":
			$sql = "SELECT * FROM users WHERE contact='$value'";
			break;
		case "username":
			$sql = "SELECT * FROM users WHERE username='$value'";
			break;
		default:
	}

	$result = mysqli_query($db, $sql) or die(mysqli_error($db));

	echo mysqli_num_rows($result);
?>