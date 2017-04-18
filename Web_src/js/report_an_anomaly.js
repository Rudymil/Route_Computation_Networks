var infoscl = new Array();
var infospl = new Array();
var infosbl = new Array();

/**
 * Get the current date in yyyy-mm-dd format
 * @return {date} today [yyyy-mm-dd]
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

    return yyyy + '-' + mm + '-' + dd;

}

/**
 * [hmtlca description] builds dynamique html popup content for layers
 * we use a global variable types_anomalies to define anomalies types
 * @return {html} html text
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

    var htmla = debuta + fina;
    return htmla;
}

leditableLayers = new L.FeatureGroup();
map.addLayer(leditableLayers);
/**
 * event listener on radio button, we have two case 
 * -Navigate is checked, we remove all toolbars
 * -Circle2 is checked, we add toolbar to draw circle and also a tool to edit and remove the circle
 * -Box2 is checked,  we add toolbar to draw box and also a tool to edit and remove the box
 * -Polygon2 is checked,  we add toolbar to draw polygon and also a tool to edit and remove the polygon
 */
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

/**
 * event listener when we create a geometric form.
 * When event is fired, we fill a form to have informations about the anomaly,
 * afler we bind a popup with the informations of the form
 */
map.on('draw:created', function(e) {
    var type = e.layerType;
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
                if (content !== null) {
                    layer.bindPopup(content);
                }
                infoscl.push(temp);

            } else {
                leditableLayers.removeLayer(layer);
            }

        });
        leditableLayers.addLayer(layer)
            // RECTANGLE
    } else if (type == "rectangle" && $("#Box2").is(":checked") == true) {

        var des = null;
        var lev = null;

        bootbox.confirm(htmlca(), function(result) {
            if (result) {
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
                    da = null;
                }

                console.log(des);
                content = getPopupContenta(layer, ano, des, da);
                var temp = [des, ano, layer._leaflet_id, da];
                if (content !== null) {
                    layer.bindPopup(content);
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
                    da = null;
                }

                console.log(des);
                content = getPopupContenta(layer, ano, des, da);
                var temp = [des, ano, layer._leaflet_id, da];
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


/**
 * [getPopupContenta builds html popup content  for layers]
 * @param  {[type]} layer       [leaflet layer]
 * @param  {[type]} level       [textuel type of warning]
 * @param  {[type]} description [description by user]
 * @param  {[type]} d           [date of expiration]
 * @return {[html]}             [html text]
 */
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


/**
 * event listener when we edit a geometric form.
 * When event is fired, we let leflet fo default procedure
 */
map.on('draw:edited', function(e) {

    /*
		var type = e.layerType;
         var layers = e.layers;

         var nc=circlel.length;
         var np=polygonl.length;
         var nb=boxl.length;




         layers.eachLayer(function (layer) {
         	var ic=0;
         	var ip=0;
         	var ib=0;

          	while ( ic<nc ) {
          		if( layer._leaflet_id == circlel[ic].properties.id ) {

          				circlel[ic].properties.radius=layer._mRadius;

          				var tempjson=layer.toGeoJSON();
          				circlel[ic].geometry=tempjson.geometry;

          		}
          		ic++;
          	}

          	while ( ib<nb ) {
          		if( layer._leaflet_id == boxl[ib].properties.id ) {

          				boxl[ib].properties.radius=layer._mRadius;

          				var tempjson=layer.toGeoJSON();
          				boxl[ib].geometry=tempjson.geometry;

          		}
          		ib++;
          	}

          	while ( ip<np ) {
          		if( layer._leaflet_id == polygonl[ip].properties.id ) {

          				polygonl[ip].properties.radius=layer._mRadius;

          				var tempjson=layer.toGeoJSON();
          				polygonl[ip].geometry=tempjson.geometry;

          		}
          		ip++;
          	}




         }); */
});


/**
 * event listener when we delete a geometric form.
 * When event is fired, we let leflet fo default procedure
 */
map.on('draw:deleted', function(e) {

    /*
		var type = e.layerType;
         var layers = e.layers;

         var nc=circlel.length;
         var np=polygonl.length;
         var nb=boxl.length;

		layers.eachLayer(function (layer) {
			var ic=0;
         	var ip=0;
         	var ib=0;


			while(ic<nc) {

				if( layer._leaflet_id == circlel[ic].properties.id ) {

				circlel.splice(ic,1);
				nc=circlel.length;
				}
				else { ic++; }
			}

			while(ib<nb) {

				if( layer._leaflet_id == boxl[ib].properties.id ) {

				boxl.splice(ib,1);
				nb=boxl.length;
				}
				else { ib++; }
			}

			while(ip<np) {

				if( layer._leaflet_id == polygonl[ip].properties.id ) {

				polygonl.splice(ip,1);
				np=polygonl.length;
				}
				else { ip++; }
			}


		}); */

});