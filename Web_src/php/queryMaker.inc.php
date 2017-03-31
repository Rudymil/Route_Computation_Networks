<?php
include_once("./error.inc.php");
//Restrict script access only by Web API
if ($_SERVER["REQUEST_URI"] == "/api/queryMaker.inc.php") {
  error(403, "Invalid request URI !");
}
/*
 * Title:   PostGIS to GeoJSON
 * Notes:   Query a PostGIS table or view and return the results in GeoJSON format, suitable for use in OpenLayers, Leaflet, etc.
 * Author:  Bryan R. McBride, GISP
 * Contact: bryanmcbride.com
 * GitHub:  https://github.com/bmcbride/PHP-Database-GeoJSON
 */

/*
* If bbox variable is set, only return records that are within the bounding box
* bbox should be a string in the form of 'southwest_lng,southwest_lat,northeast_lng,northeast_lat'
* Leaflet: map.getBounds().toBBoxString()
*/
function selectGeoJSONQuery($sqlRequest) {
  # Connect to PostgreSQL database
  include_once("./connexion.inc.php");
  # Try query or error
  $rs = $conn->query($sqlRequest);
  if (!$rs) {
      echo 'An SQL error occured.\n';
      exit;
  }

  # Build GeoJSON feature collection array
  $geojson = array(
     'type'      => 'FeatureCollection',
     'features'  => array()
  );

  # Loop through rows to build feature arrays
  while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
      $properties = $row;
      # Remove geojson and geometry fields from properties
      unset($properties['geojson']);
      unset($properties['the_geom']);
      $feature = array(
           'type' => 'Feature',
           'geometry' => json_decode($row['geojson'], true),
           'properties' => $properties
      );

      # Add feature arrays to feature collection array
      array_push($geojson['features'], $feature);
  }

  $conn = NULL;
  return json_encode($geojson, JSON_NUMERIC_CHECK);
}

function selectJSONQuery($sqlRequest) {
  # Connect to PostgreSQL database
  include_once("./connexion.inc.php");
  # Try query or error
  $rs = $conn->query($sqlRequest);
  if (!$rs) {
      echo 'An SQL error occured.\n';
      exit;
  }

  # Build GeoJSON feature collection array
  $json = array();

  # Loop through rows to build feature arrays
  while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
      # Add feature arrays to feature collection array
      array_push($json, $row);
  }

  $conn = NULL;
  return json_encode($json, JSON_NUMERIC_CHECK);
}

function insertGeoJSONQuery($datajson){
  if (isset($_GET["DEBUG"]) || isset($_POST["DEBUG"])) {
    print("<h2>The data JSON :</h2>");
    print(json_encode($datajson));
  }

  //$data = json_decode($datajson);
  $data = $datajson;
  $zone_type = $data->zone_type;
  $nbrOfFeatures = sizeOf($data->features);
  $features = $data->features;

  if ($data->zone_type == "warning_zone") {
    $sqlRequest = "INSERT INTO warning_zone(geom, risk_type, risk_intensity, description) VALUES ";
  }elseif ($data->zone_type == "anomaly_zone") {
    $sqlRequest = "INSERT INTO anomaly_zone(geom, anomaly_type, description) VALUES ";
  }else {
    error(400, "Incorrect Data !");
  }

  for ($i=0; $i < sizeOf($features); $i++) {
    if($features[$i]->geometry->type == "Polygon"){
      $type = $features[$i]->geometry->type;
      $geometry = $features[$i]->geometry;
      $properties = $features[$i]->properties;

      $geometry->crs = new stdClass();
      $geometry->crs->type = "name";
      $geometry->crs->properties = new stdClass();
      $geometry->crs->properties->name = "EPSG:4326";

      $geom = json_encode($geometry);
    }
    if ($data->zone_type == "warning_zone") {
      $risk_type = $properties->risk_type;
      $description = $properties->description;
      $sqlRequest .= "(ST_GeomFromGeoJSON('$geom'), $risk_type, (SELECT intensity FROM risk WHERE id = $risk_type), '" . addslashes($description) . "')";
    }elseif ($data->zone_type == "anomaly_zone") {
      $anomaly_type = $properties->anomaly_type;
      $description  = $properties->description;
      $sqlRequest .= "(ST_GeomFromGeoJSON('$geom'), $anomaly_type, '" . addslashes($description) . "')";
    }
    if($i < sizeOf($features) - 1){
      $sqlRequest .= ", ";
    }
    else {
      $sqlRequest .= ";";
    }
  }

  if (isset($_GET["DEBUG"]) || isset($_POST["DEBUG"])) {
    print("<h2>SQL Request : </h2>");
    print($sqlRequest);
  }

  # Connect to PostgreSQL database
  include_once("./connexion.inc.php");

  $rs = $conn->query($sqlRequest);
  if (!$rs) {
      exit("An SQL error occured.\n");
  }
  if (isset($_GET["DEBUG"]) || isset($_POST["DEBUG"])) {
    print("Success !");
  }
  $conn = NULL;
  print(true);
}

/*function updateGeoJSONQuery($datajson){
  if (isset($_GET["DEBUG"]) || isset($_POST["DEBUG"])) {
    print("<h2>The data JSON :</h2>");
    print(json_encode($datajson));
  }

  # Connect to PostgreSQL database
  include_once("./connexion.inc.php");

  //$data = json_decode($datajson);
  $data = $datajson;
  $zone_type = $data->zone_type;
  $nbrOfFeatures = sizeOf($data->features);
  $features = $data->features;

  if ($data->zone_type == "warning_zone") {
    $sqlRequest = "INSERT INTO warning_zone(geom, risk_type, risk_intensity, description) VALUES ";
  }elseif ($data->zone_type == "anomaly_zone") {
    $sqlRequest = "INSERT INTO anomaly_zone(geom, anomaly_type, description) VALUES ";
  }else {
    error(400, "Incorrect Data !");
  }

  for ($i=0; $i < sizeOf($features); $i++) {
    if($features[$i]->geometry->type == "Polygon"){
      $type = $features[$i]->geometry->type;
      $geometry = $features[$i]->geometry;
      $properties = $features[$i]->properties;

      $geometry->crs = new stdClass();
      $geometry->crs->type = "name";
      $geometry->crs->properties = new stdClass();
      $geometry->crs->properties->name = "EPSG:4326";

      $geom = json_encode($geometry);
    }
    if ($data->zone_type == "warning_zone") {
      $risk_type = $properties->risk_type;
      $description = $properties->description;
      $sqlRequest .= "(ST_GeomFromGeoJSON('$geom'), $risk_type, (SELECT intensity FROM risk WHERE id = $risk_type), '" . addslashes($description) . "')";
    }elseif ($data->zone_type == "anomaly_zone") {
      $anomaly_type = $properties->anomaly_type;
      $description  = $properties->description;
      $sqlRequest .= "(ST_GeomFromGeoJSON('$geom'), $anomaly_type, '" . addslashes($description) . "')";
    }
    if($i < sizeOf($features) - 1){
      $sqlRequest .= ", ";
    }
    else {
      $sqlRequest .= ";";
    }
  }

  if (isset($_GET["DEBUG"]) || isset($_POST["DEBUG"])) {
    print("<h2>SQL Request : </h2>");
    print($sqlRequest);
  }

  $rs = $conn->query($sqlRequest);
  if (!$rs) {
      exit("An SQL error occured.\n");
  }
  if (isset($_GET["DEBUG"]) || isset($_POST["DEBUG"])) {
    print("Success !");
  }
  $conn = NULL;
}
*/

function checkWaypoint($datajson){
  if (isset($_GET["DEBUG"]) || isset($_POST["DEBUG"])) {
    print("<h2>The data JSON :</h2>");
    print(json_encode($datajson));
  }

  $coordinates = $datajson->coordinates;

  if (sizeOf($coordinates) != 2) {
    error(400, "Incorrect Data !");
  }

  $sqlRequest = "SELECT id, name FROM country WHERE ST_Contains(geom, ST_SetSRID(ST_Point($coordinates[0], $coordinates[1]), 4326));";

  if (isset($_GET["DEBUG"]) || isset($_POST["DEBUG"])) {
    print("<h2>SQL Request : </h2>");
    print($sqlRequest);
  }

  # Connect to PostgreSQL database
  include_once("./connexion.inc.php");

  $rs = $conn->query($sqlRequest);
  if (!$rs) {
      exit("An SQL error occured.\n");
  }
  $conn = NULL;
  $request_result = $rs->fetch(PDO::FETCH_ASSOC);

  if(sizeOf($request_result["id"]) == 1){
    $countryId = $request_result["id"];
    $countryName = $request_result["name"];
    return json_encode($request_result, JSON_NUMERIC_CHECK);
  }
  else{return false;}
}
?>
