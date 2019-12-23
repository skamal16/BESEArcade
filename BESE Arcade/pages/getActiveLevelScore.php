<?php
    $cookie_name = "active_level";

	if(!isset($_COOKIE[$cookie_name])) {
    	echo 0;
	} else {
        $level = "level".$_COOKIE[$cookie_name];
        
        $db = mysqli_connect('localhost', 'root', '', 'redemption');
        session_start();
        $user = $_SESSION['login'];
        $result = mysqli_query($db, "SELECT $level FROM userscores WHERE username = '$user';") or die ("Failed");
        $row = mysqli_fetch_array($result);
        $score = $row["$level"];

        echo $score;
	}
?>