<?php
session_start();

$name = $_SESSION["login"];
$feedback = $_POST["feedback"];

$db = mysqli_connect('localhost', 'root', '', 'redemption');

$result = mysqli_query($db, "CALL InsertFeedback('$name', '$feedback')");

if ($result) echo true;
else echo mysqli_error($db);

?>