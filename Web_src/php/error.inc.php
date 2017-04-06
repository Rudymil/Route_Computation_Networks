<?php
function error($code, $description){
  $errorCodes = array(400 => "Bad Request", 403 => "Forbidden", 405 => "Method Not Allowed");
  header_remove('Content-type');
  header('Content-Type: text/html; charset=utf-8');
  
  header("HTTP/1.0 $code $errorCodes[$code]");
  exit($description);
}
?>
