<?php
//Restrict script access only by Web API
if ($_SERVER["REQUEST_URI"] == "/api/queryMaker.inc.php") {
  error(403, "Invalid request URI !");
}

function queryMaker($sqlRequest){
  if (isset($_REQUEST["DEBUG"])) {
    print("<h2>SQL Request : </h2>");
    print("<p>" . $sqlRequest . "</p>");
  }
  # Connect to PostgreSQL database
  include("./connexion.inc.php");
  # Try query or error
  $ressource = $conn->query($sqlRequest);
  $lastInfo = $conn->errorInfo();

  if (!$ressource || $lastInfo[0] != 0) {
    error(400, "<p>An SQL error occured !<br>" . $lastInfo[2] . "</p>");
  }
  elseif (isset($_REQUEST["DEBUG"]) && $lastInfo[0] == 0) {
    if (isset($_REQUEST["DEBUG"])) {
      print("<p><b>Count :</b> " . $ressource->rowCount() . "</p>");
    }
    print("<h2>SQL Result : </h2><p>Success !</p>");
  }
  $conn = NULL;
  return $ressource;
}

function testDate($date){
  if($date){
    $date = addslashes($date);
    if ($date < date("Y-m-d")) {
      error(400, "<p>Incorrect Data !<br>date not valid</p>");
    }
    return "'" . $date . "'";
  }
  else {
    return "null";
  }
}

function checkWaypoint($datajson){
  if (isset($_REQUEST["DEBUG"])) {
    print("<h2>The data JSON :</h2>");
    print(json_encode($datajson));
  }

  $coordinates = $datajson->coordinates;

  if (sizeOf($coordinates) != 2) {
    error(400, "Incorrect Data !");
  }

  $sqlRequest = "SELECT id, name FROM public.country WHERE ST_Contains(geom, ST_SetSRID(ST_Point($coordinates[0], $coordinates[1]), 4326));";

  $rs = queryMaker($sqlRequest);
  $request_result = $rs->fetch(PDO::FETCH_ASSOC);

  if(sizeOf($request_result["id"]) == 1){
    $countryId = $request_result["id"];
    $countryName = $request_result["name"];
    return json_encode($request_result, JSON_NUMERIC_CHECK);
  }
  else{return 0;}
}

function selectGeoJSONQuery($sqlRequest) {
  $rs = queryMaker($sqlRequest);

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
  return json_encode($geojson, JSON_NUMERIC_CHECK);
}

function selectJSONQuery($sqlRequest) {
  $rs = queryMaker($sqlRequest);

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
  $rs = queryMaker($sqlRequest);
  return $rs->rowCount();
}

function insertGeoJSONQuery($datajson){
  if (isset($_REQUEST["DEBUG"])) {
    print("<h2>The data JSON :</h2>");
    print(json_encode($datajson));
  }

  $data = $datajson;
  $zone_type = $data->zone_type;
  $nbrOfFeatures = sizeOf($data->features);
  $features = $data->features;

  if ($data->zone_type == "warning_zone") {
    $sqlRequest = "INSERT INTO public.warning_zone(geom, risk_type, risk_intensity, description, expiration_date) SELECT zone.geom, zone.risk_type, zone.risk_intensity, zone.description, zone.expiration_date FROM public.country c, (";

  }elseif ($data->zone_type == "anomaly_zone") {
    $sqlRequest = "INSERT INTO public.anomaly_zone(geom, anomaly_type, description, expiration_date) SELECT zone.geom, zone.anomaly_type, zone.description, zone.expiration_date FROM public.country c, (";
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

    $expiration_date = testDate($properties->expiration_date);
    $description = $properties->description;

    if ($data->zone_type == "warning_zone") {
      $risk_type = $properties->risk_type;
      $sqlRequest .= "(SELECT ST_GeomFromGeoJSON('$geom') AS geom, " . addslashes($risk_type) . " AS risk_type, (SELECT intensity FROM public.risk WHERE id = " . addslashes($risk_type) . ") AS risk_intensity, '" . addslashes($description) . "' AS description, " . $expiration_date . "::date AS expiration_date)";
    }elseif ($data->zone_type == "anomaly_zone") {
      $anomaly_type = $properties->anomaly_type;
      $sqlRequest .= "(SELECT ST_GeomFromGeoJSON('$geom') AS geom, " . addslashes($anomaly_type) . " AS anomaly_type, '" . addslashes($description) . "' AS description, " . $expiration_date . "::date AS expiration_date)";
    }
    if($i < sizeOf($features) - 1){
      $sqlRequest .= " UNION ";
    }
    else {
      $sqlRequest .= ") AS zone WHERE ST_Contains(c.geom, zone.geom);";
    }
  }
  $rs = queryMaker($sqlRequest);
  return $rs->rowCount();
}

function updateGeoJSONQuery($datajson){
  if (isset($_REQUEST["DEBUG"])) {
    print("<h1>Action : Update</h1>");
    print("<h2>The data JSON :</h2>");
    print(json_encode($datajson));
  }

  $data = $datajson;
  $zone_type = $data->zone_type;
  $features = $data->features;

  if ($data->zone_type == "warning_zone" || $data->zone_type == "anomaly_zone") {
    $count = 0;
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
      $description = addslashes($properties->description);

      $sqlRequest .= "public." . $data->zone_type . " AS zone SET";
      $sqlRequest .= " geom = ST_GeomFromGeoJSON('" . $geom . "')";

      if (isset($properties->expiration_date)) {
        $expiration_date = testDate($properties->expiration_date);
        $sqlRequest .= ", expiration_date = " . $expiration_date;
      }

      if($data->zone_type == "warning_zone") {
        $risk_type = $properties->risk_type;
        $intensity = $properties->intensity;
        if(!is_numeric($intensity) || $intensity < 0 || $intensity > 100){error(400, "Incorrect Data !");}
        $sqlRequest .= ", risk_type = " . $risk_type;
        $sqlRequest .= ", risk_intensity = " . $intensity;
        if (isset($properties->validated)) {
          if ($properties->validated == true) {
            $sqlRequest .= ", validation_date = NOW()";
          }
        }
      }
      elseif($data->zone_type == "anomaly_zone") {
        $sqlRequest .= ", anomaly_type = " . $properties->anomaly_type;
      }
      $sqlRequest .= ", description = '" . $description . "'";

      $sqlRequest .= " FROM public.country";
      $sqlRequest .= " WHERE ST_Contains(country.geom, ST_GeomFromGeoJSON('" . $geom . "')) AND zone.id = " . $properties->id;

      $sqlRequest .= ";";
      $rs = queryMaker($sqlRequest);
      $count += $rs->rowCount();
    }
    return $count;
  }
  return false;
}

?>
