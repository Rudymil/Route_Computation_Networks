<?php
$dbconn = pg_connect("host=localhost port=5432 dbname=dataBaseName user=userName password=*******");
if (!$dbconn) {
    die("Erreur de connexion");
}else{
    //echo "Success...";
}
?>
