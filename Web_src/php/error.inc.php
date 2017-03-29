<?php
function error($code, $description){
  $errorCodes = array(400 => "Bad Request", 403 => "Forbidden", 405 => "Method Not Allowed");
  header("HTTP/1.0 $code $errorCodes[$code]");
  exit($description);
}
?>
