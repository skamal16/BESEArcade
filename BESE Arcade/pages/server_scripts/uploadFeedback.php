<?php

$name = $_POST["name"];
$email = $_POST["email"];
$feedback = $_POST["feedback"];

$db = mysqli_connect('localhost', 'root', '', 'redemption');

$result = mysqli_query($db, "CALL InsertFeedback('$name', '$email', '$feedback')");

if ($result) echo true;
else echo mysqli_error($db);

?>