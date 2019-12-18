<?php
$user = $_POST['user'];
$password = $_POST['password'];

$username = stripcslashes($user);
$pass = stripcslashes($password);

$password = md5($pass);

$db = mysqli_connect('localhost', 'root', '', 'redemption');

session_start();

$result = mysqli_query($db, "SELECT * FROM users WHERE username = '$username' AND password = '$password'") or die ("Failed");
$row = mysqli_fetch_array($result);
if($row['username'] == $user && $row['password'] == $password){
	$_SESSION['login']=$user;
	mysqli_query($db,"insert into userlog(username) values('".$_SESSION['login']."')");
	exit();
}

else {
	echo "Failed to login";
}


?>