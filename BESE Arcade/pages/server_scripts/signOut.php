<?php
    session_start();
    $db = mysqli_connect('localhost', 'root', '', 'redemption');
    $username=$_SESSION['login'];
    $action="logout";
    $query=mysqli_query($db,"insert into userlog(username,action) values('$username','$action')");
    unset($_SESSION["login"]);
?>