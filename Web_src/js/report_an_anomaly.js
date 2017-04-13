var infoscl = new Array();
var infospl = new Array();
var infosbl = new Array();

/**
 * Get the current date in yyyy/mm/dd format
 * @return {date} today [yyyy/mm/dd]
 */
function datem() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return yyyy + '/' + mm + '/' + dd;

}

/**
 * [hmtlca description]
 * @return {html}
 */
function htmlca() {
    var na = types_anomalies.length;
    var debuta = "<div class='form-group'>\
			<label for='text'>Type :</label>\
			<select class='form-control' id='anomalyType'>\
				<option value=null disabled selected>Select anomaly </option>";
    var fina = "</select>\
			</div>\
			<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' placeholder='Description' required >\
				</div>\
				<div class='form-group'>\
				<label for='usr'>Expiration date: </label> <br>\
				<input type='date' name='dateex' id='datee'  placeholder='2008-08-29'>\
				</div>\
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
				</script	";
    for (var i = 0; i < na; i++) {
        debuta = debuta + "<option value=" + types_anomalies[i].id + " >" + types_anomalies[i].name + "</option>";
    }
    return debuta + fina;
}

leditableLayers = new L.FeatureGroup();
map.addLayer(leditableLayers);
$(".radio_button").change(function() { // choix de dessin
    if ($("#Navigate").is(":checked")) {
        if (drawControl != null) {
            map.removeControl(drawControl);
        }
        // CIRCLE
    } else if ($("#Circle2").is(":checked") == true) {
        if (drawControl != null) {
            map.removeControl(drawControl);
        }
        // Initialise the FeatureGroup to store editable layers
        $(".leaflet-routing-container.leaflet-bar.leaflet-control").css("visibility", "hidden");
        var drawPluginOptions = {
            position: 'topleft',
            draw: {
                circle: {
                    shapeOptions: {
                        color: '#001ae1'
                    },
                },
                // disable toolbar item by setting it to false
                polyline: false,
                polygon: false, // Turns off this drawing tool
                rectangle: false,
                marker: false,
            },
            edit: {
                featureGroup: leditableLayers, //REQUIRED!!
                edit: true,
                remove: true
            }
        };
        drawControl = new L.Control.Draw(drawPluginOptions);
        map.addControl(drawControl);
        // BOX
    } else if ($("#Box2").is(":checked") == true) {
        if (drawControl != null) {
            map.removeControl(drawControl);
        }
        $(".leaflet-routing-container.leaflet-bar.leaflet-control").css("visibility", "hidden");
        var drawPluginOptions = {
            position: 'topleft',
            draw: {
                rectangle: {
                    shapeOptions: {
                        color: '#001ae1'
                    }
                },
                // disable toolbar item by setting it to false
                polyline: false,
                circle: false, // Turns off this drawing tool
                polygon: false,
                marker: false,
            },
            edit: {
                featureGroup: leditableLayers, //REQUIRED!!
                edit: true,
                remove: true
            }
        };
        drawControl = new L.Control.Draw(drawPluginOptions);
        map.addControl(drawControl);
        // POLYGON
    } else if ($("#Polygon2").is(":checked") == true) {
        if (drawControl != null) {
            map.removeControl(drawControl);
        }
        // Initialise the FeatureGroup to store editable layers
        $(".leaflet-routing-container.leaflet-bar.leaflet-control").css("visibility", "hidden");
        var drawPluginOptions = {
            position: 'topleft',
            draw: {
                polygon: {
                    allowIntersection: false, // Restricts shapes to simple polygons
                    drawError: {
                        color: '#001ae1', // Color the shape will turn when intersects
                        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                    },
                    shapeOptions: {
                        color: '#001ae1'
                    }
                },
                // disable toolbar item by setting it to false
                polyline: false,
                circle: false, // Turns off this drawing tool
                rectangle: false,
                marker: false,
            },
            edit: {
                featureGroup: leditableLayers, //REQUIRED!!
                edit: true,
                remove: true
            }
        };
        drawControl = new L.Control.Draw(drawPluginOptions);
        map.addControl(drawControl);

    }
});

map.on('draw:created', function(e) {
    var type = e.layerType;
    //console.log(type);
    layer = e.layer;
    // CIRCLE
    if (type == "circle" && $("#Circle2").is(":checked") == true) {
        var des = null;
        var lev = null;
        bootbox.confirm(htmlca(), function(result) {
            if (result) {
                //console.log("inside");
                des = $('#description').val();
                ano = $('#anomalyType').val();
                da = $('#datee').val();
                if (ano == null) {
                    return false;
                }
                console.log(da);
                if (des == "") {
                    return false;
                }
                var timestamp = Date.parse(da)
                console.log(timestamp);
                if (isNaN(timestamp)) {
                    //return false;
                    da = null;
                }
                console.log(des);
                content = getPopupContenta(layer, ano, des, da);
                var temp = [des, ano, layer._leaflet_id, da];
                //console.log(content);
                if (content !== null) {
                    layer.bindPopup(content);
                    //layer.setPopupContent(content);
                }
                infoscl.push(temp);
            } else {
                leditableLayers.removeLayer(layer);
            }
        });

        leditableLayers.addLayer(layer)
        // BOX
    } else if (type == "rectangle" && $("#Box2").is(":checked") == true) {
        var des = null;
        var lev = null;
        bootbox.confirm(htmlca(), function(result) {
            if (result) {
                //console.log("inside");
                des = $('#description').val();
                ano = $('#anomalyType').val();
                da = $('#datee').val();
                if (ano == null) {
                    return false;
                }
                console.log(ano);
                if (des == "") {
                    return false;
                }
                var timestamp = Date.parse(da)
                console.log(timestamp);
                if (isNaN(timestamp)) {
                    //return false;
                    da = null;
                }
                console.log(des);
                content = getPopupContenta(layer, ano, des, da);
                var temp = [des, ano, layer._leaflet_id, da];
                //console.log(content);
                if (content !== null) {
                    layer.bindPopup(content);
                    //layer.setPopupContent(content);
                }
                infosbl.push(temp);
            } else {
                leditableLayers.removeLayer(layer);
            }
        });
        leditableLayers.addLayer(layer)
        // POLYGON
    } else if (type == "polygon" && $("#Polygon2").is(":checked") == true) {
        var des = null;
        var lev = null;
        bootbox.confirm(htmlca(), function(result) {
            if (result) {
                //console.log("inside");
                des = $('#description').val();
                ano = $('#anomalyType').val();
                da = $('#datee').val();
                if (ano == null) {
                    return false;
                }
                console.log(ano);
                if (des == "") {
                    return false;
                }
                var timestamp = Date.parse(da)
                console.log(timestamp);
                if (isNaN(timestamp)) {
                    //return false;
                    da = null;
                }
                console.log(des);
                content = getPopupContenta(layer, ano, des, da);
                var temp = [des, ano, layer._leaflet_id, da];
                //console.log(content);
                if (content !== null) {
                    layer.bindPopup(content);
                }
                infospl.push(temp);
            } else {
                leditableLayers.removeLayer(layer);
            }
        });
        leditableLayers.addLayer(layer)
    }
});



function getPopupContenta(layer, level, description, d) {
    if (layer instanceof L.Circle) {
        var html = '<table>\
 						 <tr>\
  							  <td>Type of geometry : </td>\
  							  <td> Circle</td>\
  						 </tr>\
 						 <tr>\
   							 <td>Level : </td>\
    						 <td>' + level + '</td>\
  						</tr>\
  						<tr>\
   							 <td>Description : </td>\
    						 <td>' + description + '</td>\
  						</tr>\
  						<tr>\
   							 <td>Expiration date : </td>\
    						 <td>' + d + '</td>\
  						</tr>\
						</table>'
        return html;
    } else if (layer instanceof L.Polygon) {

        var html = '<table>\
 						 <tr>\
  							  <td>Type of geometry : </td>\
  							  <td> Polygon </td>\
  						 </tr>\
 						 <tr>\
   							 <td>Level : </td>\
    						 <td>' + level + '</td>\
  						</tr>\
  						<tr>\
   							 <td>Description : </td>\
    						 <td>' + description + '</td>\
  						</tr>\
  						<tr>\
   							 <td>Expiration date : </td>\
    						 <td>' + d + '</td>\
  						</tr>\
						</table>'
        return html;
    } else if (layer instanceof L.Rectangle) {
        var html = '<table>\
 						 <tr>\
  							  <td>Type of geometry : </td>\
  							  <td> rectangle</td>\
  						 </tr>\
 						 <tr>\
   							 <td>Level : </td>\
    						 <td>' + level + '</td>\
  						</tr>\
  						<tr>\
   							 <td>Description : </td>\
    						 <td>' + description + '</td>\
  						</tr>\
  						<tr>\
   							 <td>Expiration date : </td>\
    						 <td>' + d + '</td>\
  						</tr>\
						</table>'
        return html;
    }
    return null
};
