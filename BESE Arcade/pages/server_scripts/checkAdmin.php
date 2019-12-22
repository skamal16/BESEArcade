<?php
session_start();
$user = $_SESSION['login'];
if ($user == "admin") echo true;
else echo false;
?>