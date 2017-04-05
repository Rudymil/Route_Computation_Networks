<?php
$conn = new PDO('pgsql:host=localhost;dbname=dataBaseName','userName','Password');
if (!$conn) {
    die("Erreur de connexion");
}else{
    //echo "Success...";
}
?>
