<?php
$user = $_POST['user'];

$username = stripcslashes($user);


$db = mysqli_connect('localhost', 'root', '', 'redemption');

session_start();
	$_SESSION['login']=$user;
	mysqli_query($db,"insert into users(username) values('$user')");
	mysqli_query($db,"insert into userlog(username, action) values('$user', 'login')");
	echo "$user";

?>