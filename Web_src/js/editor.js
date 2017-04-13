/**
 * hmtlcwe
 * @param  {string} description
 * @param  {string} name
 * @param  {int} intensity
 * @param  {date} validationDate
 * @param  {date} expirationDate
 * @param  {int} id
 * @return {html}
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
				</div>\
				<div class='form-group'>\
  				<label for='usr'>Expiration date :</label>\
  				<input type='text' id='datee' value='" + expirationDate + "'>\
				</div>";
    if (isNaN(validationDate)) {
        var string3 = "<div class='form-group'>\
						<label for='text'>Validation date :</label>\
						<input type='text' id='datev' value=" + validationDate + " readonly>\
					</div>";
    } else {
        var string3 = " <div class='form-group'>\
						<label for='usr'>Expiration date :</label>\
						<input type='text' id='datev' value='" + validationDate + "' readonly>\
					</select>";
    }
    var string4 = "</div>\
				<script>\
				$(function() {\
					if ( $('#ui-datepicker-div').length ) {\
						$('#ui-datepicker-div').remove();\
					}\
					$( '#datev' ).datepicker({inline: true,\
							showOtherMonths: true,\
							dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],\
							dateFormat: 'yy-mm-dd'});\
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
    return string1 + options + string2 + string3 + string4;
}

$(".radio_button").change(function(e) {
    if (drawControla != null) {
        map.removeControl(drawControla);
    }
    if (drawControlw != null) {
        map.removeControl(drawControlw);
    }
    // WARNING
    if ($("#warning").is(":checked")) {
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
        // ANOMALY
    } else if ($("#anomaly").is(":checked")) {
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
    }
});

map.on('draw:editstart', function(e) {
    console.log(e);
    featureLayerw.on('click', function(e) {
        if ($("#warning").is(":checked")) {
            console.log(e);
            e.layer.closePopup();
            var layer = e.layer;
            var layerjson = layer.toGeoJSON();
            console.log(JSON.stringify(layerjson));
            bootbox.confirm(hmtlcwe(layerjson.properties.description, layerjson.properties.name,
                layerjson.properties.intensity, layerjson.properties.validation_date,
                layerjson.properties.expiration_date, layerjson.properties.risk_type), function(result) {
                if (result) {
                    var des = $('#description').val();
                    var risk = $('#risk').val();
                    var dae = $('#datee').val();
                    var dav = $('#datev').val();
                    var name = $('#name').val();
                    var inte = $('#intensity').val();

                    if (des == "") {
                        return false;
                    }
                    var timestamp = Date.parse(dav)
                    if (isNaN(timestamp)) {
                        return false;
                    }
                    if (name == "") {
                        return false;
                    }
                    if (isNaN(parseFloat(inte)) || !isFinite(inte) || inte < 0) {
                        return false;
                    }
                    console.log(dae + ' != ' + layerjson.properties.expiration_date);
                    console.log(layerjson.properties.description + ' != ' + des);
                    console.log(layerjson.properties.name + ' != ' + name);
                    console.log(layerjson.properties.intensity + ' != ' + inte);
                    console.log(layerjson.properties.risk_type + ' != ' + risk);
                    console.log(layerjson.properties.validation_date + ' != ' + dav);

                    if (layerjson.properties.description != des ||
                        layerjson.properties.name != name ||
                        layerjson.properties.intensity != inte ||
                        layerjson.properties.risk_type != risk ||
                        layerjson.properties.validation_date != dav ||
                        layerjson.properties.expiration_date != dae
                    ) {

                        layerjson.properties.description = des;
                        layerjson.properties.name = name;
                        layerjson.properties.intensity = inte;
                        layerjson.properties.risk_type = risk;
                        layerjson.properties.validation_date = dav;
                        layerjson.properties.expiration_date = dae;

                        wzupdate.push(layerjson);
                    }
                }
            });
        }
    });
});


map.on('draw:edited', function(e) {
    var type = e.layerType;
    var layers = e.layers;
    // WARNING
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
        // ANOMALY
    } else if ($("#anomaly").is(":checked")) {
        layers.eachLayer(function(layer) {});
    }
});

map.on('draw:deleted', function(e) {
    var type = e.layerType;
    var layers = e.layers;
    // WARNING
    if ($("#warning").is(":checked")) {
        layers.eachLayer(function(layer) {
            map.removeLayer(layer);
            var temp = layer.toGeoJSON();
            console.log(JSON.stringify(temp));
            wzdelete.push(temp.properties.id);
        });
        // ANOMALY
    } else if ($("#anomaly").is(":checked")) {
        layers.eachLayer(function(layer) {
            map.removeLayer(layer);
            var temp = layer.toGeoJSON();
            console.log(JSON.stringify(temp));
            azdelete.push(temp.properties.id);
        });
    }
});
