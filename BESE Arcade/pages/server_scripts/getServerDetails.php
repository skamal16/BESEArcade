<?php

$db = mysqli_connect('localhost', 'root', '', 'redemption');

try{
    $result = mysqli_query($db, "CALL getUserCount()");
    $result = mysqli_fetch_array($result);
    $userCount = $result["userCount"];
    echo '{ "number of users":"'.$userCount.'"}';
}catch(exception $e){
    echo $e;
}

?>