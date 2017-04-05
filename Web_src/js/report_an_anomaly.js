var infoscl = new Array();
var infospl = new Array();
var infosbl = new Array();

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

    today = yyyy+'/'+ mm + '/' + dd;
    return today;

}


function htmlca() {
    var na = types_anomalies.length;
    var debuta = "<div class='form-group'>\
			<label for='text'>Type :</label>\
			<select class='form-control' id='anomalyType'>\
				<option value='' disabled selected>Select anomaly </option>";
    var fina = "</select>\
			</div>\
			<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' placeholder='Description' required >\
				</div>\
				<div class='form-group'>\
				<label for='usr'>Expiration date: </label> <br>\
				<input type='date' name='dateex' id='datee'>\
				</div>	";

    for (var i = 0; i < na; i++) {

        debuta = debuta + "<option value=" + types_anomalies[i].id + " >" + types_anomalies[i].name + "</option>";
    }

    var htmla = debuta + fina;
    return htmla;
}

leditableLayers = new L.FeatureGroup();
map.addLayer(leditableLayers);

$(".radio_button").change(function() { // choix de dessin

    if ($("#Navigate").is(":checked")) {

        /*if( markeraDestination != null && markeraDestination != null ){
        markerDeparture.dragging.enable();
        markeraDestination.dragging.enable();	
        }*/
        map.removeControl(drawControl);
    }
    else if ($("#Circle2").is(":checked") == true) {

        if (drawControl != null) {

            map.removeControl(drawControl);
        }
        // Initialise the FeatureGroup to store editable layers
        $(".leaflet-routing-container.leaflet-bar.leaflet-control").css("visibility", "hidden");
        //$("#dep").prop('disabled', true);
        //$("#dest").prop('disabled', true);
        /*if( markerDeparture != null ) {	
        markerDeparture.dragging.disable();	
        }
        if( markeraDestination != null ) {
        markeraDestination.dragging.disable();
        }
        */

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
    } 
    else if ($("#Box2").is(":checked") == true) {


        if (drawControl != null) {
            map.removeControl(drawControl);
        }
        $(".leaflet-routing-container.leaflet-bar.leaflet-control").css("visibility", "hidden");
        //$("#dep").prop('disabled', true);
        //$("#dest").prop('disabled', true);
        /*if( markerDeparture != null ) {	
        markerDeparture.dragging.disable();	
        }
        if( markeraDestination != null ) {
        markeraDestination.dragging.disable();
        }*/


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
    } 
    else if ($("#Polygon2").is(":checked") == true) {


        if (drawControl != null) {
            map.removeControl(drawControl);
        }
        // Initialise the FeatureGroup to store editable layers
        $(".leaflet-routing-container.leaflet-bar.leaflet-control").css("visibility", "hidden");
        //$("#dep").prop('disabled', true);
        //$("#dest").prop('disabled', true);
        /*if( markerDeparture != null ) {	
        markerDeparture.dragging.disable();	
        }
        if( markeraDestination != null ) {
        markeraDestination.dragging.disable();
        }*/

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


    //leditableLayers = new L.FeatureGroup();
    //map.addLayer(leditableLayers);






});

map.on('draw:created', function(e) {
    var type = e.layerType;
    //console.log(type);
    layer = e.layer;

    if (type == "circle" && $("#Circle2").is(":checked") == true) {


        var des = null;
        var lev = null;


        bootbox.confirm(htmlca(), function(result) {
			if( result ) {
            //console.log("inside");
            des = $('#description').val();
            ano = $('#anomalyType').find(":selected").val();
            da= $('#datee').val();
			
			if (ano == "") {
                 return false ;
            }
				
			console.log(da);
            if (des == "") {
                 return false ;
            }

			var timestamp=Date.parse(da)
			console.log(timestamp);
			if (isNaN(timestamp) )
			{
   				 return false;

			}
				

            console.log(des);
            content = getPopupContenta(layer, lev, des);
            var temp = [des, ano, layer._leaflet_id,da];
            //console.log(content);
            if (content !== null) {
                layer.bindPopup(content);
                //layer.setPopupContent(content);
            }

            infoscl.push(temp);

            //circle.push(layergeo);

            //console.log(circle);
            
            }
            else {
            	leditableLayers.removeLayer(layer);
            }

        });



        leditableLayers.addLayer(layer)

    } 
    else if (type == "rectangle" && $("#Box2").is(":checked") == true) {


        var des = null;
        var lev = null;


       bootbox.confirm(htmlca(), function(result) {
			if( result ) {
            //console.log("inside");
            des = $('#description').val();
            ano = $('#anomalyType').find(":selected").val();
			da= $('#datee').val();
			
			if (ano == "") {
                 return false ;
            }
				
			console.log(da);
            if (des == "") {
                 return false ;
            }

			var timestamp=Date.parse(da)
			console.log(timestamp);
			if (isNaN(timestamp) )
			{
   				 return false;

			}
				

            console.log(des);
            content = getPopupContenta(layer, lev, des);
            var temp = [des, ano, layer._leaflet_id,da];
            //console.log(content);
            if (content !== null) {
                layer.bindPopup(content);
                //layer.setPopupContent(content);
            }

            infosbl.push(temp);

            //circle.push(layergeo);

            //console.log(circle);
            
            }
            else {
            	leditableLayers.removeLayer(layer);
            }

        });

        leditableLayers.addLayer(layer)


    } 
    else if (type == "polygon" && $("#Polygon2").is(":checked") == true) {

        var des = null;
        var lev = null;


        bootbox.confirm(htmlca(), function(result) {
			if( result ) {
            //console.log("inside");
            des = $('#description').val();
            ano = $('#anomalyType').find(":selected").val();
			da= $('#datee').val();
			
			if (ano == "") {
                 return false ;
            }
				
			console.log(da);
            if (des == "") {
                 return false ;
            }

			var timestamp=Date.parse(da)
			console.log(timestamp);
			if (isNaN(timestamp) )
			{
   				 return false;

			}
				

            console.log(des);
            content = getPopupContenta(layer, lev, des);
            var temp = [des, ano, layer._leaflet_id,da];
            //console.log(content);
            if (content !== null) {
                layer.bindPopup(content);
                //layer.setPopupContent(content);
            }

            infospl.push(temp);

            //circle.push(layergeo);

            //console.log(circle);
            
            }
            else {
            	leditableLayers.removeLayer(layer);
            }

        });

        leditableLayers.addLayer(layer)
    }

    //leditableLayers.addLayer(layer);

});



var getPopupContenta = function(layer, level, description) {

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
   							 <td>Expiration_date : </td>\
    						 <td>' + datem() + '</td>\
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
   							 <td>Expiration_date : </td>\
    						 <td>' + datem() + '</td>\
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
   							 <td>Expiration_date : </td>\
    						 <td>' + datem() + '</td>\
  						</tr>\
						</table>'
        return html;

    }

    return null
};



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

/* ancien modele 


  			
  			"<div class='form-group'>\
  			<label for='text'>Type</label>\
			<select class='form-control' id='anomalyType'>\
   				<option value=1 selected >Missing road element </option>\
   				<option value=2 >Wrong geometry</option>\
    			<option value=3  >Missing attribute</option>\
    			<option value=4 >Wrong attibute</option>\
    			<option value=5 >Missing POI</option>\
    			<option value=6 >Wrong POI</option>\
			</select>\
			</div>\
			<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' placeholder='Description'>\
				</div>"
 
 */
