<?php
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
function selectQuery($sqlRequest) {
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

function insertQuery($datajson){
  # Connect to PostgreSQL database
  include_once("./connexion.inc.php");

  $data = json_decode($datajson);
  $zone_type = $data->zone_type;
  $nbrOfFeatures = sizeOf($data->features);
  $features = $data->features;

  /*print(sizeOf($features));
  print_r($features[0]);*/

  if ($data->zone_type == "warning_zone") {
    $sqlRequest = "INSERT INTO warning_zone(geom, risk_type, risk_intensity) VALUES ";
  }elseif ($data->zone_type == "anomaly_zone") {
    $sqlRequest = "INSERT INTO anomaly_zone(geom, anomaly_type, description) VALUES ";
  }else {
    exit("ERROR !");
  }

  for ($i=0; $i < sizeOf($features); $i++) {
    if($features[$i]->geometry->type == "Polygon"){
      $type = $features[$i]->geometry->type;
      $geometry = $features[$i]->geometry->coordinates;
      $geom = '{"type": "' . $type . '", "coordinates":' . json_encode($geometry) . '}';
      //print($geom);
      $properties = $features[$i]->properties;
      //print_r($properties);
      /*foreach ($properties as $key => $value) {
        print("$key -> $value");
      }*/
    }
    if ($data->zone_type == "warning_zone") {
      $risk_type = $properties->risk_type;
      $risk_intensity = $properties->risk_intensity;
      $sqlRequest .= "(ST_GeomFromGeoJSON($geom), $risk_type, $risk_intensity)";
    }elseif ($data->zone_type == "anomaly_zone") {
      $sqlRequest .= "(ST_GeomFromGeoJSON($geom), $anomaly_type, $description)";
    }
    if($i < sizeOf($features) - 1){
      $sqlRequest .= ", ";
    }
    else {
      $sqlRequest .= ";";
    }
  }

  print($sqlRequest);

  $rs = $conn->query($sqlRequest);
  if (!$rs) {
      exit("An SQL error occured.\n");
  }
  print("Success !");
  return true;
  $conn = NULL;
}
?>
