<?php

$db = mysqli_connect('localhost', 'root', '', 'redemption');

$user = $_POST['user'];
$password = $_POST['password'];

$pass = md5($password);





$result = mysqli_query($db, "SELECT * FROM users WHERE username = '$user' AND password = '$pass'") or die ("Failed");
$row = mysqli_fetch_array($result);
if($row['username'] == $user && $row['password'] == $password){
	header("location:Home.html");
	exit();
}

else {
	echo "Failed to login";
}


?>