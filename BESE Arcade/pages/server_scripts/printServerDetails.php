<?php 
$data = $_POST['server_details'];
try {
    $fp = fopen('../server_stats.json', 'w');
    fwrite($fp, $data);
    echo true;
} catch (exception $e){
    echo $e;
} finally {
    fclose($fp);
}
?>