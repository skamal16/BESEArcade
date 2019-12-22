<?php
$db = mysqli_connect('localhost', 'root', '', 'redemption');
session_start();
$user = $_SESSION['login'];
$result = mysqli_query($db, "CALL GetUserDetails('$user')") or die ("Failed");
$row = mysqli_fetch_array($result);
$score = $row["level1"] + $row["level2"] + $row["level3"] + $row["level4"] + $row["level5"] + $row["level6"];
echo $user." has a total score of ".$score;
?>