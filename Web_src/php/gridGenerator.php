<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

<?php
function distance($xA, $yA, $xB, $yB){
  return sqrt( pow(($xB - $xA), 2) + pow(($yB - $yA), 2) );
}

function heatValue($xValue, $yValue, $xMin, $yMin, $xMax, $yMax, $heatMin, $heatMax){
  $centerX = ($xMax - $xMin) / 2 + $xMin;
  $centerY = ($yMax - $yMin) / 2 + $yMin;
  $deltax = $xMax - $xMin;
  $deltay = $yMax - $yMin;
  $distMax = distance($xMin, $yMin, $xMax, $yMax);
  $dist = distance($xValue, $yValue, $centerX, $centerY);
    return round(( (($heatMax - $heatMin) * (($distMax - ( 2 * $dist )) / $distMax)) + $heatMin ));
}

function genHG($xMin, $yMin, $xMax, $yMax, $sX, $sY){
  $deltax = $xMax - $xMin;
  $deltay = $yMax - $yMin;
  $heatG = "";
  for($xi = $xMin; $xi < $xMax; $xi += $sX){
    for($yi = $yMin; $yi < $yMax; $yi += $sY){
      if($yi > $yMin){
        $heatG = $heatG . " ";
      }
      $heatG = $heatG . heatValue($xi, $yi, $xMin, $yMin, $xMax, $yMax, 0, 100);
    }
    if($xi < $xMax){
      $heatG = $heatG . "\n";
    }
  }
  return $heatG;
}

$grid = genHG(0, 0, 10, 10, 1, 1);

print("<h1>Heat Grid Generator</h1>");

$path = "./penalty.asc";

if(file_exists($path) && is_writable($path)){
  print("The file exists.\n");
  $file = fopen($path, 'w');
  $dataLength = fwrite($file, $grid);
  print("<p>Données écrites : " . $dataLength . " octets</p>");
  $result = fclose($file);
  print("<p>Resultat : ");
  if ($result) {
    print("Succès !</p>");
  }
}
else{
  print("The file $path not exists !");
}
?>

</body>
</html>
