<?php 

$db = mysqli_connect('localhost', 'root', '', 'redemption');

$fname = mysqli_real_escape_string($db, $_POST['fname']);
$email = mysqli_real_escape_string($db, $_POST['email']);
$contact = mysqli_real_escape_string($db, $_POST['contact']);
$pass = mysqli_real_escape_string($db, $_POST['pass']);
$username = mysqli_real_escape_string($db, $_POST['username']);

$password = md5($pass);
mysqli_query($db, "INSERT INTO users (username, name, email, contact, password) VALUES ('$username', '$fname', '$email', $contact, '$password')");

?>