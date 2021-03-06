<?php
include_once("./queryMaker.inc.php");
include_once("./error.inc.php");

//Deny none https access ***ACTIVATE IN PRODUCTION***
if (!isset($_SERVER["HTTPS"]) || $_SERVER["HTTPS"] != "on") {
  error(405, "Need to use tls protocole !");
}

//Allow multi origin access ***NOT USE IN PRODUCTION***
header('Access-Control-Allow-Origin: *');

if (isset($_REQUEST["DEBUG"])) {
  header('Content-type: text/html; charset=utf-8');
  /*print("<h2>\$_SERVER :</h2>");
  print_r($_SERVER);*/

  /*print("<h2>\$_REQUEST :</h2>");
  print_r($_REQUEST);*/

  print("<h2>REQUEST_METHOD :" . $_SERVER["REQUEST_METHOD"] . "</h2>");
}
else {
  header('Content-type: application/json');
}

//GET zones
if (isset($_GET["type"]) && ($_GET["type"] == "warning_zone" || $_GET["type"] == "anomaly_zone") && !isset($_GET["action"])) {
  $tableSQL = "";
  $filterSQL = "";
  if (isset($_GET["bbox"])) {
    $bBox = explode(",", $_GET["bbox"]); //southWest lng/lat / northEast lng/lat
    $filterSQL .= " AND ST_Contains(ST_SetSRID(ST_MakeBox2D(ST_Point($bBox[0], $bBox[1]), ST_Point($bBox[2], $bBox[3])),4326), z.geom)";
  }
  //Expired
  if (isset($_GET["expired"]) && $_GET["expired"] == "false") {
    $filterSQL .= " AND expiration_date >= NOW()";
  }
  elseif (isset($_GET["expired"]) && $_GET["expired"] == "true") {
    $filterSQL .= " AND expiration_date < NOW()";
  }
  //Validated
  if (isset($_GET["validated"]) && $_GET["validated"] == "false") {
    $filterSQL .= " AND validation_date IS NULL";
  }
  elseif (isset($_GET["validated"]) && $_GET["validated"] == "true") {
    $filterSQL .= " AND validation_date IS NOT NULL";
  }
  //Country
  if (isset($_GET["country_id"])) {
    $country_id = $_GET["country_id"];
    $tableSQL .= ", country c ";
    $filterSQL .= " AND ST_Contains(c.geom, z.geom) AND c.id = $country_id ";
    }
  if ($_GET["type"] == "warning_zone") {
    $zones_list = "SELECT z.id, ST_AsGeoJSON(z.geom) AS geojson, description, t.name, risk_intensity AS intensity, risk_type, validation_date, expiration_date FROM warning_zone z, risk t $tableSQL WHERE z.risk_type = t.id $filterSQL;";
  }
  elseif ($_GET["type"] == "anomaly_zone") {
    $zones_list = "SELECT z.id, ST_AsGeoJSON(z.geom) AS geojson, description, t.name, anomaly_type, expiration_date FROM anomaly_zone z, anomaly t $tableSQL WHERE z.anomaly_type = t.id $filterSQL;";
  }
  print(selectGeoJSONQuery($zones_list));
}

//GET country
elseif (isset($_GET["type"]) && $_GET["type"] == "country") {
  $types_list = "SELECT id, name, ST_asGeoJSON(ST_Centroid(geom)) AS geojson FROM country ORDER BY name;";
  print(selectGeoJSONQuery($types_list));
}

//GET privatePOI
elseif (isset($_GET["type"]) && $_GET["type"] == "poi") {
  $filterSQL = "";
  if (isset($_GET["bbox"])) {
    $bBox = explode(",", $_GET["bbox"]); //southWest lng/lat / northEast lng/lat
    $filterSQL .= " AND ST_Contains(ST_SetSRID(ST_MakeBox2D(ST_Point($bBox[0], $bBox[1]), ST_Point($bBox[2], $bBox[3])),4326), poi.geom)";
  }
  $types_list = "SELECT poi.id, ST_asGeoJSON(poi.geom) AS geojson, poi.name, t.name AS type, category FROM poi, poi_type t WHERE poi.poi_type_id = t.id $filterSQL ORDER BY t.name, poi.name;";
  print(selectGeoJSONQuery($types_list));
}

//GET types
elseif (isset($_GET["type"]) && ($_GET["type"] == "risk_type" || $_GET["type"] == "anomaly_type")) {
  if ($_GET["type"] == "risk_type") {
    $types_list = "SELECT id, name FROM risk ORDER BY name;";
  }elseif ($_GET["type"] == "anomaly_type") {
    $types_list = "SELECT id, name FROM anomaly ORDER BY name;";
  }
  print(selectJSONQuery($types_list));
}

//POST zones
elseif (isset($_POST["warning_zone"]) || isset($_POST["anomaly_zone"])) {
  if (isset($_POST["warning_zone"])) {
    $json = json_decode($_POST["warning_zone"]);
    if ($json->zone_type != "warning_zone") {error(400, "Incorrect Data !");}
  }
  if (isset($_POST["anomaly_zone"])) {
    $json = json_decode($_POST["anomaly_zone"]);
    if ($json->zone_type != "anomaly_zone") {error(400, "Incorrect Data !");}
  }

  foreach ($json->features as $key => $value) {
    if (isset($_POST["warning_zone"]) && (!isset($value->properties->risk_type) || !isset($value->properties->description))) {error(400, "Incorrect Data !");}
    if (isset($_POST["warning_zone"]) && isset($_POST["action"]) && $_POST["action"] == "update" && !isset($value->properties->intensity)) {error(400, "Incorrect Data !");}
    if (isset($_POST["anomaly_zone"]) && (!isset($value->properties->anomaly_type) || !isset($value->properties->description))) {error(400, "Incorrect Data !");}
  }

  if (isset($_POST["action"]) && $_POST["action"] == "update") {
    print updateGeoJSONQuery($json);
  }
  else {
    print insertGeoJSONQuery($json);
  }
}

//Check waypoints
elseif (isset($_POST["waypoint"])) {
  $json = json_decode($_POST["waypoint"]);

  if ($json->waypoint != "start" && $json->waypoint != "end" && $json->waypoint != "step") {error(400, "Incorrect Data !");}
  print checkWaypoint($json);
}

//Delete object
elseif (isset($_GET["action"]) && isset($_GET["type"]) && isset($_GET["id"]) && is_numeric($_GET["id"]) && $_GET["action"] == "delete") {
  if ($_GET["type"] == "warning_zone" || $_GET["type"] == "anomaly_zone") {
    $type = $_GET["type"];
    $id = $_GET["id"];
    print deleteQuery("DELETE FROM $type WHERE id = $id;");
  }
}

else{
  error(400, "No data received !");
}
?>
