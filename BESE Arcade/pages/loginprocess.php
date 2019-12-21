<?php

$user = $_POST['user'];
$password = $_POST['password'];

$username = stripcslashes($user);
$pass = stripcslashes($password);

$password = md5($pass);

$db = mysqli_connect('localhost', 'root', '', 'redemption');

session_start();

mysqli_query($db, "SET @success = 0");

$result = mysqli_query($db, "CALL LoginUser('$username', '$password', @success)");
$result = mysqli_fetch_assoc($result);

if($result["result"]){
	$_SESSION['login']=$username;
	echo "success";
}else echo "User not found or password incorrect.";

?>