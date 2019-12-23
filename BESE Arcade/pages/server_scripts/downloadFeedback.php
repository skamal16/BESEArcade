<?php
$db = mysqli_connect('localhost', 'root', '', 'redemption');

$result = mysqli_query($db, "CALL SelectFeedback()") or die("DATABASE ERROR");

echo '<div class="parallax"><div class="container"><h2 id="heading">Gamers\' Feedback</h2><hr></div></div>';

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    $counter = 0;
    while($row = mysqli_fetch_assoc($result)) {
        if($counter%2 == 1) echo '<div class="container"><div class="feedback"><h3 style="text-align: right"> '.$row["username"].' </h3><p style="text-align: right"> '.$row["feedback"].' </p></div></div><div class="parallax"></div>';
        else echo '<div class="container"><div class="feedback"><h3> '.$row["username"].' </h3><p> '.$row["feedback"].' </p></div></div><div class="parallax"></div>';
        $counter++;
    }
}

?>