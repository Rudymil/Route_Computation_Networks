/**
 * hmtlcwe builds html popup content  for layers
 * @param  {string} description - from geojson layer
 * @param  {string} name - from geojson layer
 * @param  {int} intensity - from geojson layer
 * @param  {date} validationDate - from geojson layer
 * @param  {date} expirationDate - from geojson layer
 * @param  {int} id - from geojson layer
 * @return {html} string1 + options + string2 + string3 + string4 - html text
 */

function hmtlcwe(description, name, intensity, validationDate, expirationDate, id) {
    var nw = types_warning_zones.length;
    var string1 = "<div class='form-group'>\
			<label for='text'>Type :</label>\
			<select class='form-control' id='risk'>";
    var string2 = "</select>\
			</div>\
			<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' value='" + description + "'>\
				</div>\
				<div class='form-group'>\
  				<label for='usr'>Intensity :</label>\
  				<input type='number' step='5' min='0' max='100' class='form-control' id='intensity' value='" + intensity + "'>\
				</div>";
    if (expirationDate == null) {
        var string2bis = "<div class='form-group'>\
  				<label for='usr'>Expiration date :</label>\
  				<input type='text' id='datee' value=false >\
				</div>"
    } else {
        var string2bis = "<div class='form-group'>\
  				<label for='usr'>Expiration date :</label>\
  				<input type='text' id='datee' value='" + expirationDate + "'>\
				</div>";
    }
    if (isNaN(validationDate)) {
        var string3 = "<div class='form-group'>\
						<label for='text'>Validation :</label>\
						<input type='text' id='datev' value=" + validationDate + " readonly>\
					</div>";
    } else {
        var string3 = "<div class='form-group'>\
						<label for='usr'>Validation :</label>\
						<select class='form-control' id='datev'>\
								<option value=true >true</option>\
								<option value=false selected>false</option>\
						</select>\
					</div>";
    }
    var string4 = "</div>\
				<script>\
				$(function() {\
					if ( $('#ui-datepicker-div').length ) {\
						$('#ui-datepicker-div').remove();\
					}\
					$( '#datee' ).datepicker({inline: true,\
							showOtherMonths: true,\
							dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],\
							dateFormat: 'yy-mm-dd'});\
				 });\
				</script>";
    var options = "";

    for (var i = 0; i < nw; i++) {
        console.log(" types_warning_zones : " + types_warning_zones[i].id + " id geojson : " + id);
        if (types_warning_zones[i].id == id) {
            console.log(" inside ");

            options = options + "<option value=" + types_warning_zones[i].id + " selected >" + types_warning_zones[i].name + "</option>";
        } else {
            //console.log(" types_warning_zones : " + types_warning_zones[i].id  + " id geojson : " + id );
            options = options + "<option value=" + types_warning_zones[i].id + " >" + types_warning_zones[i].name + "</option>";
        }
    }
    return string1 + options + string2 + string2bis + string3 + string4;
}
/**
 * event listener on radio button, we have two case 
 * -warning is checked, we add toolbar for editing and removing layers
 * -anomaly is checked, we add toolbar for removing only
 * -otherwise we remove all toolbars 
 */
$(".radio_button_edit").change(function(e) {
    console.log("nombre");
    console.log("warning :", $("#warning").is(":checked"));
    console.log("anomaly :", $("#anomaly").is(":checked"));
    console.log("Navigate :", $("#Navigate").is(":checked"));


    if ($("#warning").is(":checked") == true) {
        console.log("warning inside");
        triggerParser("#warning", "#warning_zone_info", "#anomaly_zone_info", "#Warning_zones", warning_nonchecked, "<p>No warning zone to validate.</p>", printInfoWarningZone);
        //map.removeLayer(layer_group_warning_zones);
        //map.removeLayer(layer_group_anomaly_zones);
        //map.removeLayer(layer_group_warning_nonchecked);

        if (drawControla != null) {
            map.removeControl(drawControla);
        }
        if (drawControlw != null) {
            map.removeControl(drawControlw);
        }
        if (drawControl != null) {
            map.removeControl(drawControl);
        }
        drawControlw = new L.Control.Draw({
            edit: {
                featureGroup: featureLayerw,
                edit: true,
                remove: true
            },
            draw: {
                polygon: false,
                polyline: false,
                rectangle: false,
                circle: false,
                marker: false
            }

        }).addTo(map);

    } else if ($("#anomaly").is(":checked") == true) {

        console.log("anoamly inside");
        triggerParser("#anomaly", "#anomaly_zone_info", "#warning_zone_info", "#Anomaly_zones", anomaly_zones, "<p>No anomaly zones</p>", printInfoAnomalyZone);

        //map.removeLayer(layer_group_warning_zones);
        //map.removeLayer(layer_group_anomaly_zones);
        //map.removeLayer(layer_group_warning_nonchecked);

        if (drawControla != null) {
            map.removeControl(drawControla);
        }
        if (drawControlw != null) {
            map.removeControl(drawControlw);
        }
        if (drawControl != null) {
            map.removeControl(drawControl);
        }
        drawControla = new L.Control.Draw({
            edit: {
                featureGroup: featureLayera,
                edit: false,
                remove: true
            },
            draw: {
                polygon: false,
                polyline: false,
                rectangle: false,
                circle: false,
                marker: false
            }
        }).addTo(map);
    } else {

        console.log("else inside");
        if (drawControla != null) {
            map.removeControl(drawControla);
        }
        if (drawControlw != null) {
            map.removeControl(drawControlw);
        }

        clearZoneInfo("#anomaly_zone_info");
        clearZoneInfo("#warning_zone_info");
        $(".leaflet-routing-geocoders").show();

    }
    console.log("prevent");
    //e.preventDefault();
});
/**
 * event listener when we start editing layer.
 * When event is fired, we propose to edit the informations of a layer by editing
 * a form.
 */
map.on('draw:editstart', function(e) {
    console.log(e);
    /*if (featureLayerw.hasEventListeners() == true) {
        
        console.log( " removed " );
    }*/
    if ($("#warning").is(":checked")) {

        featureLayerw.removeEventListener();
        featureLayerw.on('click', function(e) {
            console.log(e);
            e.layer.closePopup();
            var layer = e.layer;
            var layerjson = layer.toGeoJSON();
            console.log(JSON.stringify(layerjson));
            bootbox.confirm(hmtlcwe(layerjson.properties.description, layerjson.properties.name,
                layerjson.properties.intensity, layerjson.properties.validation_date,
                layerjson.properties.expiration_date, layerjson.properties.risk_type), function(result) {
                if (result) {
                    //console.log("inside");
                    var des = $('#description').val();
                    var risk = $('#risk').val();
                    var dae = $('#datee').val();
                    var dav = $('#datev').val();
                    var name = $('#name').val();
                    var inte = $('#intensity').val();

                    if (dav == "true") {
                        dav = true;
                        console.log(dav);
                    } else if (dav == "false") {
                        dav = false;
                        console.log(dav);
                    }
                    if (dae = "false") {
                        dae = false
                    }
                    if (des == "") {
                        return false;
                    }

                    console.log(dae + ' != ' + layerjson.properties.expiration_date);
                    console.log(layerjson.properties.description + ' != ' + des);
                    console.log(layerjson.properties.intensity + ' != ' + inte);
                    console.log(layerjson.properties.risk_type + ' != ' + risk);
                    console.log(layerjson.properties.validation_date + ' != ' + dav);

                    if (layerjson.properties.description != des ||
                        layerjson.properties.intensity != inte ||
                        layerjson.properties.risk_type != risk ||
                        layerjson.properties.validation_date != dav ||
                        layerjson.properties.expiration_date != dae
                    ) {

                        layerjson.properties.description = des;
                        layerjson.properties.name = name;
                        layerjson.properties.intensity = inte;
                        layerjson.properties.risk_type = risk;
                        layerjson.properties['validated'] = dav;
                        layerjson.properties.expiration_date = dae;
                        delete layerjson.properties.validation_date;
                        wzupdate.push(layerjson);
                    }
                    //featureLayerw.removeEventListener();
                } else {
                    //featureLayerw.removeEventListener();
                }
            });

        });
    }
});

/**
 * event listener when the editing is finished.
 * When event is fired, we store the new layer with the new informations 
 * in a variable, the variable will send to update 
 * the database.
 */
map.on('draw:edited', function(e) {
    var type = e.layerType;
    var layers = e.layers;
    if ($("#warning").is(":checked")) {
        layers.eachLayer(function(layer) {
            var b = false;
            var j = -1;
            console.log(layer);
            var temp = layer.toGeoJSON();
            for (var i = 0; i < wzupdate.length; i++) {
                if (wzupdate[i].properties.id == temp.properties.id) {
                    b = true;
                    j = i;
                }
            }
            if (b == false) {
                wzupdate.push(temp);
            } else if (b == true) {
                wzupdate[j].geometry = temp.geometry;
            }
        });
    } else if ($("#anomaly").is(":checked")) {
        layers.eachLayer(function(layer) {
            //console.log(layer);
            //var temp = layer.toGeoJSON();
            //console.log(JSON.stringify(temp));
            //azupdate.push(temp);
        });
    }
});
/**
 * event listener when the deleting event is finished.
 * When event is fired, we store the id of layers deleted and the variable 
 * will be send to server in order to be removed from the database
 */
map.on('draw:deleted', function(e) {
    var type = e.layerType;
    var layers = e.layers;
    if ($("#warning").is(":checked")) {
        layers.eachLayer(function(layer) {
            map.removeLayer(layer);
            var temp = layer.toGeoJSON();
            console.log(JSON.stringify(temp));
            wzdelete.push(temp.properties.id);
        });
    } else if ($("#anomaly").is(":checked")) {
        layers.eachLayer(function(layer) {
            map.removeLayer(layer);
            var temp = layer.toGeoJSON();
            console.log(JSON.stringify(temp));
            azdelete.push(temp.properties.id);
        });
    }
});