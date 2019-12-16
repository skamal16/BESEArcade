<?php 
	$db = mysqli_connect('localhost', 'root', '', 'arcade');

	if (isset($_POST['signup'])) {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$contact = $_POST['contact'];
		$pass = $_POST['pass'];
		$username = $_POST['username'];

		$password = md5($pass);
		mysqli_query($db, "INSERT INTO users (name, email, contact, password, username) VALUES ('$name', '$email', '$contact', '$password', '$username')");

	}




?>