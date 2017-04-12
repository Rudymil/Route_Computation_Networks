var url = 'https://172.31.56.223/api/server.php'; // url vers l API
var string_warning_zone = "warning_zone"; // parametre
var warning_nonchecked = new Array(); // liste des warning zones

var map = L.map('map').setView([-8.819448, 13.242708], 13);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

console.log("script lance");

function getWarningZone(){
  $.ajax({
    url: url,
    type: 'GET',
    data: 'type=' + string_warning_zone + '&validated=false',
    dataType: 'json',
    success: function(code_json, statut) {
      console.log("Warning zone request succeed");
    },
    error: function(resultat, statut, erreur) {
      console.log(erreur);
    },
    complete: function(resultat, statut) {
      if (resultat.status == '200') {

        var json = resultat.responseJSON;
        if (!$.isEmptyObject(json) && json != undefined) { // si le resultat json n est pas vide
          if (json["features"].length > 0) {
            for (element in json["features"]) { // pour chaque object du geojson

              var shape = L.geoJSON(json["features"][element]).getLayers()[0];
              shape.setStyle({ // transforme en layer et change le style
                color: 'red'
              });
              shape.addTo(map);
              warning_nonchecked.push(shape); // remplir la warning zone
            }
            parseWarningZones(warning_nonchecked);
          }
        }
      }
    }
  });
}

getWarningZone();

function parseWarningZones(warning_nonchecked){

  var output = "";
  if (warning_nonchecked.length > 0){

    output += "<div class='panel-group'>";
    for (var zone in warning_nonchecked) {
      warning_zone = warning_nonchecked[zone];
      output += printInfoWarningZone(warning_zone);
    }

    output += "</div>";
  } else {
    output += "<p> No warning zone to validate </p>";
  }
  $('#warning_zone_info').html(output);
}

function centering(center){
  map.flyTo(center, 15);
}




function printInfoWarningZone(warning_zone){
  var output = "";
  if (warning_zone.hasOwnProperty("feature")) {
    if (warning_zone.feature.hasOwnProperty("properties")) {

      output += "<div class='panel panel-primary'>";
      output += "<div class='panel-heading panel-collapsed' onclick=centering("+JSON.stringify(warning_zone.getBounds().getCenter())+")>";
      output += "<div>";
      output += "<h3 class='panel-title'>";
      output += warning_zone.feature.properties.name;
      output += "</h3>";
      output += "<span class='pull-right'>";
      output += warning_zone.feature.properties.expiration_date;
      output += "</span>";
      output += "</div>";
      output += "</div>";
      output += "<div class='panel-body collapse'>";
      output += "<div class='row'>";
      output += "<dl class='dl-horizontal'>";
      output += "<dt>";
      output += "Type de risque : ";
      output += "</dt>";
      output += "<dd>";
      output += warning_zone.feature.properties.risk_type;
      output += "</dd>";
      output += "<dt>";
      output += "Description :";
      output += "</dt>";
      output += "<dd>";
      output += warning_zone.feature.properties.description;
      output += "</dd>";
      output += "<dt>";
      output += "Intensity :";
      output += "</dt>";
      output += "<dd>";
      output += warning_zone.feature.properties.intensity;
      output += "</dd>";
      output += "<dt>";
      output += "Expiration date :";
      output += "</dt>";
      output += "<dd>";
      output += warning_zone.feature.properties.expiration_date;
      output += "</dd>";
      output += "</dl>";
      output += "</div>";
      output += "<div class='row'>";
      output += "<div class='col-md-6 col-md-offset-3'>";
      output += "<button id='validationButton' class='btn btn-success' type='submit' onclick='validate("+JSON.stringify(warning_zone.feature)+")'>";
      output += "Valid";
      output += "</button>";
      output += "<button id='refutationButton' class='btn btn-danger pull-right' type='submit' onclick='refutation("+JSON.stringify(warning_zone.feature)+")'>";
      output += "Refuse";
      output += "</button>";
      output += "</div>";
      output += "</div>";
      output += "</div>";
      output += "</div>";
    }
  }


  return output;
}

function validate(warning_zone){
  console.log("validation in progress for ", warning_zone);

  // warning_zone.properties.description = "romain";
  warning_zone.properties.validated = true;

  featuresUpdate(string_warning_zone, new Array(warning_zone));
  removeWarningZoneFromList(warning_zone);
}

function refutation(warning_zone){
  console.log("refutation in progress for ", warning_zone);
  removeWarningZoneFromList(warning_zone);
}

function removeWarningZoneFromList(warning_zone){
  warning_nonchecked = warning_nonchecked.filter(function( obj ) {
      return obj.feature.properties.id !== warning_zone.properties.id;
  });
  refreshWarningZone();
}

function refreshWarningZone(){
  parseWarningZones(warning_nonchecked);
}


function featuresUpdate(type, featuresUpdate) {
    var geojson = new Object();
    geojson["type"] = "FeatureCollection";
    geojson["zone_type"] = type;
    geojson["features"] = featuresUpdate;
    $.ajax({
        url: url,
        type: 'POST',
        data: 'action=update&' + type + '=' + JSON.stringify(geojson),
        dataType: 'text',
        complete: function(resultat, statut) {
            if (resultat.status == '200') {
                if (resultat.responseText != undefined && resultat.responseText != NaN) {
                  // si le resultat.responseText est defini
                    return parseInt(resultat.responseText);
                } else {
                    return -1; // error
                }
            }
        }
    });
}
