<?php

    $level = $_POST["level"];

    $cookie_name = "active_level";
	$cookie_value = $level;

	setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");

    echo $level;
?>