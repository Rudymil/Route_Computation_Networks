<?php

function nominatimRequest($query)
{
  $ch = curl_init($query); // such as http://example.com/example.xml
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  $data = curl_exec($ch);
  curl_close($ch);
  return $data;
}

$query = "http://localhost:8080/search?q=luanda&format=json&addressdetails=1&limit=1";
$data = nominatimRequest($query);
$lat = json_decode($data)[0]->lat;
$lng = json_decode($data)[0]->lon;

### DISPLAY PART FOR GEOCODING
echo "Query : ".$query;
echo "<br/>";
echo "<br/>";
print_r($lat);
echo "<br/>";
print_r($lng);

echo "<br/>";
echo "<br/>";
echo "<br/>";

$query = "http://localhost:8080/reverse?format=json&lat=-8.861800&lon=13.304520&limit=1";
$data = nominatimRequest($query);
$address = json_decode($data)->display_name;

### DISPLAY PART FOR REVERSE GEOCODING
echo "Query : ".$query;
echo "<br/>";
echo "<br/>";
print_r($address);

?>
