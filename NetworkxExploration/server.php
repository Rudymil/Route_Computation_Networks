<?php
  $lonSource =  json_decode($_GET["lonSource"]);
  $latSource =  json_decode($_GET["latSource"]);
  $lonTarget =  json_decode($_GET["lonTarget"]);
  $latTarget =  json_decode($_GET["latTarget"]);

  // echo json_encode([$lonSource, $latSource, $lonTarget, $latTarget]);
  $route = exec("python3.5 ./osmToPython.py ".$latSource." ".$lonSource." ".$latTarget." ".$lonTarget." 2>&1",  $out, $status);
  // $route = exec("python3.5 ./osmToPython.py 43.60135620284428 3.866050243377686 43.61193113170467 3.8786029815673833 2>&1",  $out, $status);
  echo json_encode(json_decode($out[0]));
?>
