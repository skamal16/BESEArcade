<?php 

$db = mysqli_connect('localhost', 'root', '', 'redemption');

$username = $_POST['username'];

if(mysqli_query($db, "CALL deleteUser('$username')")) echo $username." has been deleted.";
else echo mysqli_error($db);

?>