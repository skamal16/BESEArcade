<?php
session_start();

$score = $_REQUEST["score"];
$level = $_REQUEST["level"];
$user = $_SESSION["login"];

$db = mysqli_connect('localhost', 'root', '', 'redemption');

$result = mysqli_query($db, "SELECT level$level FROM userscores WHERE username = '$user'") or die ("Failed");
$old_score = mysqli_fetch_array($result)["level".$level];

if ($score > $old_score) mysqli_query($db, "UPDATE userscores SET level$level = '$score' WHERE username = '$user'") or die ("Failed");

echo $user." has a score of ".$score." in level ".$level." compared to his last score of ".$old_score;

?>