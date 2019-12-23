<?php
    $cookie_name = "active_level";

	if(!isset($_COOKIE[$cookie_name])) {
    	echo 1;
	} else {
	    echo $_COOKIE[$cookie_name];
	}
?>