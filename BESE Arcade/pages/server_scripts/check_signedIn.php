<?php
session_start();
if (isset($_SESSION['login'])) echo true;
else echo false;
?>