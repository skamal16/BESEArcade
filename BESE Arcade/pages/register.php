<?php 

session_start();

$db = mysqli_connect('localhost', 'root', '', 'redemption');

$fname = mysqli_real_escape_string($db, $_POST['fname']);
$email = mysqli_real_escape_string($db, $_POST['email']);
$contact = mysqli_real_escape_string($db, $_POST['contact']);
$pass = mysqli_real_escape_string($db, $_POST['pass']);
$username = mysqli_real_escape_string($db, $_POST['username']);

$password = md5($pass);

if(mysqli_query($db, "CALL RegisterUser('$username', '$fname', '$email', $contact, '$password')")){

	$result = mysqli_query($db, "CALL LoginUser('$username', '$password', @success)") or die("DATABASE ERROR");
	$result = mysqli_fetch_assoc($result);

	$_SESSION['login']=$username;

	$cookie_name = "login_details";
	$cookie_value = '{ "username":"'.$username.'", "password":"'.$pass.'"}';

	setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");

	echo "success";

	} else echo "failed";

?>