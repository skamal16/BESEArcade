<?php
$user = $_POST['user'];

$username = stripcslashes($user);


$db = mysqli_connect('localhost', 'root', '', 'redemption');

session_start();
	$_SESSION['login']=$user;
	mysqli_query($db,"insert into userlog(username, action) values('$user', 'login')");
	mysqli_query($db, "INSERT INTO userscores (username, level1, level2, level3, level4, level5, level6) VALUES ('$user', 0, 0, 0, 0, 0, 0);");
	echo "$user";

?>