<?php
include_once("./queryMaker.inc.php");
header('Access-Control-Allow-Origin: *');

if (isset($_GET["DEBUG"])) {
  header('Content-type: text/html; charset=utf-8');
}else {
  header('Content-type: application/json');
}

$debug = true;

if (isset($_GET["DEBUG"]) || isset($_POST["DEBUG"]) || $debug) {
  header('Content-type: text/html; charset=utf-8');
  /*print("<h2>\$_SERVER :</h2>");
  print_r($_SERVER);*/

  print("<h2>\$_REQUEST :</h2>");
  print_r($_REQUEST);

  print("<h2>" . $_SERVER["REQUEST_METHOD"] . "</h2>");

  print("<h2>\$_GET :</h2>");
  print_r($_GET);
  print("<h2>\$_POST :</h2>");
  print_r($_POST);
}

//GET zones
if (isset($_GET["type"]) && ($_GET["type"] == "warning_zone" || $_GET["type"] == "anomaly_zone")) {
  $bBox = "";
  if (isset($_GET["bbox"])) {
    $bBox = explode(",", $_GET["bbox"]); //southWest lng/lat / northEast lng/lat
    $bBoxSQL = " AND ST_Contains(ST_SetSRID(ST_MakeBox2D(ST_Point($bBox[0], $bBox[1]), ST_Point($bBox[2], $bBox[3])),4326), z.geom)";
  }
  if ($_GET["type"] == "warning_zone") {
    $zones_list = "SELECT z.id, ST_AsGeoJSON(z.geom) AS geojson, t.name, risk_intensity AS intensity FROM warning_zone z, risk t WHERE z.risk_type = t.id $bBoxSQL;";
  }elseif ($_GET["type"] == "anomaly_zone") {
    $zones_list = "SELECT z.id, ST_AsGeoJSON(z.geom) AS geojson, t.name, description FROM anomaly_zone z, anomaly t WHERE z.anomaly_type = t.id $bBoxSQL;";
  }
  if (isset($_GET["DEBUG"])) {
    print("<p><strong>Query :</strong> " . $zones_list . "</p>");
  }
  print(selectGeoJSONQuery($zones_list));
}

//GET types
if (isset($_GET["type"]) && ($_GET["type"] == "risk_type" || $_GET["type"] == "anomaly_type")) {
  if ($_GET["type"] == "risk_type") {
    $types_list = "SELECT id, name FROM risk ORDER BY name;";
  }elseif ($_GET["type"] == "anomaly_type") {
    $types_list = "SELECT id, name FROM anomaly ORDER BY name;";
  }
  if (isset($_GET["DEBUG"])) {
    print("<p><strong>Query :</strong> " . $types_list . "</p>");
  }
  print(selectJSONQuery($types_list));
}

//POST zones
if (isset($_POST["warning_zone"])) {
  $json = json_decode($_POST["warning_zone"]);
  if ($json->zone_type != "warning_zone") {exit("Incorrect Data !");}
  foreach ($json->features as $key => $value) {
    if (!isset($value->properties->risk_type) || !isset($value->properties->risk_intensity)) {exit("Incorrect Data !");}
  }
  insertGeoJSONQuery($json);
}elseif (isset($_POST["anomaly_zone"])) {
  $json = json_decode($_POST["anomaly_zone"]);
  if ($json->zone_type != "anomaly_zone") {exit("Incorrect Data !");}
  foreach ($json->features as $key => $value) {
    if (!isset($value->properties->anomaly_type) || !isset($value->properties->description)) {exit("Incorrect Data !");}
  }
  insertGeoJSONQuery($json);
}

//TESTS
//insertGeoJSONQuery('{"type":"FeatureCollection","zone_type":"warning_zone","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[7.0496536916202,4.851353550492],[7.0510942257049,4.8472069037448],[7.0582968961281,4.8489612573988],[7.0587770741564,4.8540648057486],[7.0496536916202,4.851353550492]]]},"properties":{"risk_type":1,"risk_intensity":99}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[7.0424510211969,4.8657071308718],[7.0432513179106,4.8620390227449],[7.0390897749994,4.860922638045],[7.0378093002575,4.8637933378205],[7.0424510211969,4.8657071308718]]]},"properties":{"risk_type":3,"risk_intensity":99}}]}');
//insertGeoJSONQuery('{"type":"FeatureCollection","zone_type":"anomaly_zone","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[7.0496536916202,4.851353550492],[7.0510942257049,4.8472069037448],[7.0582968961281,4.8489612573988],[7.0587770741564,4.8540648057486],[7.0496536916202,4.851353550492]]]},"properties":{"anomaly_type":1,"description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[7.0424510211969,4.8657071308718],[7.0432513179106,4.8620390227449],[7.0390897749994,4.860922638045],[7.0378093002575,4.8637933378205],[7.0424510211969,4.8657071308718]]]},"properties":{"anomaly_type":3,"description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}}]}');
//insertGeoJSONQuery('{"type":"FeatureCollection","zone_type":"test_error","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[7.0496536916202,4.851353550492],[7.0510942257049,4.8472069037448],[7.0582968961281,4.8489612573988],[7.0587770741564,4.8540648057486],[7.0496536916202,4.851353550492]]]},"properties":{"anomaly_type":1,"description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[7.0424510211969,4.8657071308718],[7.0432513179106,4.8620390227449],[7.0390897749994,4.860922638045],[7.0378093002575,4.8637933378205],[7.0424510211969,4.8657071308718]]]},"properties":{"anomaly_type":3,"description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}}]}');
?>
