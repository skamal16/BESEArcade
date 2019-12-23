<?php

$user = $_POST['user'];
$password = $_POST['password'];

$username = stripcslashes($user);
$pass = stripcslashes($password);

$password = md5($pass);

$db = mysqli_connect('localhost', 'root', '', 'redemption');

session_start();

mysqli_query($db, "SET @success = 0");

$result = mysqli_query($db, "CALL LoginUser('$username', '$password', @success)") or die("DATABASE ERROR");
$result = mysqli_fetch_assoc($result);

if($result["result"]){
	$_SESSION['login']=$username;

	$cookie_name = "login_details";
	$cookie_value = '{ "username":"'.$username.'", "password":"'.$pass.'"}';

	setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");

	echo "success";
}else echo "User not found or password incorrect.";

?>