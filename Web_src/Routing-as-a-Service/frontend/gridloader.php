<?php

function fileReader($path){
  if(file_exists($path) && is_readable($path)){
    $file = fopen($path, 'r');
    $filesize = filesize($path);
    $content = fread($file, $filesize);
    $result = fclose($file);
    if ($result) {
      return $content;
    }
  }
  else{
    return("The file $path is wrong !");
  }
}

function heatGrid2json($gridPath, $jsonPath){
  $paramsFileData = json_decode(fileReader($jsonPath));
  $gridData       = fileReader($gridPath);
  $gridData       = str_replace(" ", ",", str_replace("\n", ",", $gridData));
  $gridData = substr($gridData, 0, strlen($gridData) - 1);
  $outputJson= "";
  //Verification de coherence entre le nombre de valeurs et le nombre de col/lignes
  if( count(explode(",", $gridData)) == $paramsFileData->{"rows"} * $paramsFileData->{"cols"} ){
//    $outputJson = '{"params": ';
    $outputJson .= '{"latMin": ' . $paramsFileData->{"latMin"} . ", ";
    $outputJson .= '"latMax": ' . $paramsFileData->{"latMax"} . ", ";
    $outputJson .= '"lngMin": ' . $paramsFileData->{"lngMin"} . ", ";
    $outputJson .= '"lngMax": ' . $paramsFileData->{"lngMax"} . ", ";
    $outputJson .= '"rows": ' . $paramsFileData->{"rows"} . ", ";
    $outputJson .= '"cols": ' . $paramsFileData->{"cols"} . ", ";
    $outputJson .= '"values": ';
    $outputJson .= '[' . $gridData . ']';
    $outputJson .= '}';
    return $outputJson;
  }
  else {
    print("<h2>ERROR !<br>Coherency problem !</h2> ".$paramsFileData->{"rows"}."\n");
  }
}

function loadServers($jsonPath) {
  $paramServer = json_decode(fileReader($jsonPath));
  return $paramServer;
}


//header('Content-Type: application/json;charset=utf-8');
$jsongrid= json_encode(heatGrid2json("../data/penalty.asc", "../data/penalty.json"));
$jsonpolygon = fileReader("../data/querylatlon.json");


$server_all= loadServers("../data/serverOsrm.json");
$server_osrmheat= $server_all->{"osrmheatIP"}; //'http://localhost:5001/route/v1';
$server_osrmdefault= $server_all->{"osrmdefaultIP"}; //'http://localhost:5000/route/v1';


?>
