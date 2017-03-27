<?php
include_once("./queryMaker.inc.php");

if (isset($_GET["type"]) && ($_GET["type"] == "warning_zone" || $_GET["type"] == "anomaly_zone")) {
  if ($_GET["type"] == "warning_zone") {
    $zones_list = "SELECT z.id, ST_AsGeoJSON(z.geom) AS geojson, t.name, risk_intensity AS intensity FROM warning_zone z, risk t WHERE z.risk_type = t.id ";
  }elseif ($_GET["type"] == "anomaly_zone") {
    $zones_list = "SELECT z.id, ST_AsGeoJSON(z.geom) AS geojson, t.name, description FROM anomaly_zone z, anomaly t WHERE z.anomaly_type = t.id ";
  }

  //Add the LIMIT
  //$zones_list .= " LIMIT 1";
  $zones_list .= ";";

  if (isset($_GET["DEBUG"])) {
    header('Content-type: text/html; charset=utf-8');
    print("<p><strong>Query :</strong> " . $zones_list . "</p>");
    print(selectQuery($zones_list));
  }else {
    header('Content-type: application/json');
    print(selectQuery($zones_list));
  }
}
?>
