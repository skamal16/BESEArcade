<?php
	
	$cookie_name = "login_details";

	if(!isset($_COOKIE[$cookie_name])) {
    	echo false;
	} else {
	    echo $_COOKIE[$cookie_name];
	}
?>