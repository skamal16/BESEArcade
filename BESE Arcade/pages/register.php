<?php 
	$db = mysqli_connect('localhost', 'root', '', 'redemption');

	if (isset($_POST['signup'])) {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$contact = $_POST['contact'];
		$pass = $_POST['pass'];
		$username = $_POST['username'];

		$password = md5($pass);
		mysqli_query($db, "INSERT INTO users (username, name, email, contact, password) VALUES ('$username', '$name', '$email', $contact, '$password')");

		header("Location: register.html");

	}




?>