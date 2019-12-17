<?php
$user = $_POST['user'];

$username = stripcslashes($user);


$db = mysqli_connect('localhost', 'root', '', 'redemption');

session_start();
	$_SESSION['login']=$user;
	mysqli_query($db,"insert into userlog(username) values('".$_SESSION['login']."')");
	exit();

?>