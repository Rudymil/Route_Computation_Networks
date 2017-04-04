<?php
include_once("./error.inc.php");
//Restrict script access only by Web API
if ($_SERVER["REQUEST_URI"] == "/api/queryMaker.inc.php") {
  error(403, "Invalid request URI !");
}

function selectGeoJSONQuery($sqlRequest) {
  # Connect to PostgreSQL database
  include_once("./connexion.inc.php");
  # Try query or error
  $rs = $conn->query($sqlRequest);
  if (!$rs) {
    exit("An SQL error occured.\n");
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
  $conn = NULL;
  if (!$rs) {
    exit("An SQL error occured.\n");
  }

  # Build GeoJSON feature collection array
  $json = array();

  # Loop through rows to build feature arrays
  while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
      # Add feature arrays to feature collection array
      array_push($json, $row);
  }
  return json_encode($json, JSON_NUMERIC_CHECK);
}

function deleteQuery($sqlRequest) {
  # Connect to PostgreSQL database
  include_once("./connexion.inc.php");
  # Try query or error
  $rs = $conn->query($sqlRequest);
  $conn = NULL;
  if (!$rs) {
    exit("An SQL error occured.\n");
  }else {
    print("true");
  }
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
    $sqlRequest = "INSERT INTO warning_zone(geom, risk_type, risk_intensity, description, expiration_date) VALUES ";
  }elseif ($data->zone_type == "anomaly_zone") {
    $sqlRequest = "INSERT INTO anomaly_zone(geom, anomaly_type, description, expiration_date) VALUES ";
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
      $expiration_date = $properties->expiration_date;
      $description = $properties->description;
      $sqlRequest .= "(ST_GeomFromGeoJSON('$geom'), $risk_type, (SELECT intensity FROM risk WHERE id = $risk_type), '" . addslashes($description) . "', '" . addslashes($expiration_date) . "')";
    }elseif ($data->zone_type == "anomaly_zone") {
      $anomaly_type = $properties->anomaly_type;
      $description  = $properties->description;
      $sqlRequest .= "(ST_GeomFromGeoJSON('$geom'), $anomaly_type, '" . addslashes($description) . "', '" . addslashes($expiration_date) . "')";
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

function updateGeoJSONQuery($datajson){
  if (isset($_GET["DEBUG"]) || isset($_POST["DEBUG"])) {
    print("<h1>Action : Update</h1>");
    print("<h2>The data JSON :</h2>");
    print(json_encode($datajson));
  }

  //$data = json_decode($datajson);
  $data = $datajson;
  $zone_type = $data->zone_type;
  $features = $data->features;

  # Connect to PostgreSQL database
  include_once("./connexion.inc.php");

  if ($data->zone_type == "warning_zone" || $data->zone_type == "anomaly_zone") {
    for ($i=0; $i < sizeOf($features); $i++){
      $sqlRequest = "UPDATE ";
      $geometry = $features[$i]->geometry;
      $properties = $features[$i]->properties;

      $geometry->crs = new stdClass();
      $geometry->crs->type = "name";
      $geometry->crs->properties = new stdClass();
      $geometry->crs->properties->name = "EPSG:4326";
      $geom = json_encode($geometry);

      $properties = $features[$i]->properties;
      $risk_type = $properties->risk_type;
      $intensity = $properties->intensity;
      $description = addslashes($properties->description);
      $expiration_date = addslashes($properties->expiration_date);

      $sqlRequest .= $data->zone_type . " SET";
      $sqlRequest .= " geom = ST_GeomFromGeoJSON('" . $geom . "')";

      if($data->zone_type == "warning_zone") {
        $sqlRequest .= ", risk_type = " . $risk_type;
        $sqlRequest .= ", risk_intensity = " . $intensity;
        $sqlRequest .= ", validation_date = NOW()";
      }
      elseif($data->zone_type == "warning_zone") {
        $sqlRequest .= ", anomaly_type = " . $anomaly_type;
      }
      $sqlRequest .= ", description = '" . $description . "'";
      $sqlRequest .= ", expiration_date = '" . $expiration_date . "'";

      $sqlRequest .= " WHERE id = " . $properties->id;

      $sqlRequest .= ";";

      if (isset($_GET["DEBUG"]) || isset($_POST["DEBUG"])) {
        print("<h2>SQL Request : </h2>");
        print("<p>" . $sqlRequest . "</p>");
      }
    }

    $rs = $conn->query($sqlRequest);
    if (!$rs) {
        exit("An SQL error occured.\n");
    }
    if (isset($_GET["DEBUG"]) || isset($_POST["DEBUG"])) {
      print("Success !");
    }
  }
  $conn = NULL;
}

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
