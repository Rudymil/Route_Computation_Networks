<?php
  $lonSource =  json_decode($_GET["lonSource"]);
  $latSource =  json_decode($_GET["latSource"]);
  $lonTarget =  json_decode($_GET["lonTarget"]);
  $latTarget =  json_decode($_GET["latTarget"]);
  $weightType =  json_decode($_GET["weightType"]);

  $route = exec("python3.5 ./osm2itinerary.py ".$latSource." ".$lonSource." ".$latTarget." ".$lonTarget." ".$weightType." 2>&1",  $out, $status);
  echo json_encode(json_decode($out[0]));
?>
