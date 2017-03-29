var lleditableLayers=null;


$(".radio_button").change(function (){ // choix de dessin

	if ($("#Navigate").is(":checked") ){
	
		map.removeControl(drawControl);
	}
	
	
	
	else if ($("#Circle2").is(":checked")==true ){
		
	if( drawControl != null ) {
		
		map.removeControl(drawControl);
	}	
	// Initialise the FeatureGroup to store editable layers
	$("#dep").prop('disabled', true);
	$("#dest").prop('disabled', true);
	if( markerDeparture != null ) {	
	markerDeparture.dragging.disable();	
	}
	if( markeraDestination != null ) {
	markeraDestination.dragging.disable();
	}
	leditableLayers = new L.FeatureGroup();
	map.addLayer(leditableLayers);

	var drawPluginOptions = {
  	position: 'topright',
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
	
	
	
	else if ($("#Box2").is(":checked")==true ){
	
		
	if( drawControl != null ) {
		map.removeControl(drawControl);
	}	
	$("#dep").prop('disabled', true);
	$("#dest").prop('disabled', true);
	if( markerDeparture != null ) {	
	markerDeparture.dragging.disable();	
	}
	if( markeraDestination != null ) {
	markeraDestination.dragging.disable();
	}
	leditableLayers = new L.FeatureGroup();
	map.addLayer(leditableLayers);

	var drawPluginOptions = {
  	position: 'topright',
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
	
	
	
	else if ($("#Polygon2").is(":checked")==true ){
	
	
	if( drawControl != null ) {
		map.removeControl(drawControl);
	}	
	// Initialise the FeatureGroup to store editable layers
	$("#dep").prop('disabled', true);
	$("#dest").prop('disabled', true);
	if( markerDeparture != null ) {	
	markerDeparture.dragging.disable();	
	}
	if( markeraDestination != null ) {
	markeraDestination.dragging.disable();
	}
	leditableLayers = new L.FeatureGroup();
	map.addLayer(leditableLayers);

	var drawPluginOptions = {
  	position: 'topright',
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
  		if( type=="circle" && $("#Circle2").is(":checked")==true) {
    		
			
			var des=null;
			var lev=null;
  				
  			  		
  			bootbox.confirm(
  			"<div class='form-group'>\
  			<label for='text'>Type :</label>\
			<select class='form-control' id='level'>\
   				<option value='Road accident' selected >Road accident </option>\
   				<option value='Road degradation' >Road degradation</option>\
    			<option value='Criminal insecurity'  >Criminal insecurity</option>\
    			<option value='Massive gathering'>Massive gathering</option>\
    			<option value='Natural hazard' >Natural hazard</option>\
    			<option value='Traffic jam' >Traffic jam</option>\
    			<option value='Road closure' >Road closure</option>\
			</select>\
			</div>\
			<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' placeholder='Description'>\
				</div>"
    		, function(result) {
    		
        		//console.log("inside");
    			des= $('#description').val();
    			ano= $('#anomalyType').find(":selected").val();
  				
    			var layergeo=layer.toGeoJSON();
  			
  				layergeo.properties= {
       			 "type": "anomalyType",
       			 "typeGeometry" : "circle",
       			 "radius" : layer._mRadius ,
       			 "id" : layer._leaflet_id ,	
        		 "description": des,
     		     "level": lev,
     		     "date": Date.now()
   			 	};
   			 	
   			 	content = getPopupContent(layer,layergeo);
   			 	//console.log(content);
   			 	if (content !== null) {
                	layer.bindPopup(content);
                	//layer.setPopupContent(content);
       			 }
   			 	
    			circlel.push(layergeo);
			}
			);
  			
			
			
			leditableLayers.addLayer(layer)

		}
		
		else if( type=="rectangle" && $("#Box2").is(":checked")==true ) {
		
		
			var des=null;
			var lev=null;
  			
  			  		
  			bootbox.confirm(
  			"<div class='form-group'>\
  			<label for='text'>Type</label>\
			<select class='form-control' id='level'>\
   				<option value='Road accident' selected >Road accident </option>\
   				<option value='Road degradation' >Road degradation</option>\
    			<option value='Criminal insecurity'  >Criminal insecurity</option>\
    			<option value='Massive gathering'>Massive gathering</option>\
    			<option value='Natural hazard' >Natural hazard</option>\
    			<option value='Traffic jam' >Traffic jam</option>\
    			<option value='Road closure' >Road closure</option>\
			</select>\
			</div>\
			<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' placeholder='Description'>\
				</div>"
    		, function(result) {
    		
        		//console.log("inside");
    			des= $('#description').val();
    			ano= $('#anomalyType').find(":selected").val();
  				
    			layerjson=layer.toGeoJSON();
    			layerjson.properties={
       					 "type": "anomalyType",
       					 "description": des,
       					 "id" : layer._leaflet_id ,
       					 "level": lev,
        				"date": Date.now()
    			}
    			
    			content = getPopupContent(layer,layerjson)
    			if (content !== null) {
                layer.bindPopup(content);
       			 }

    			
				boxl.push(layerjson);
				//console.log(boxl);	

			}
			);
		
		
  		leditableLayers.addLayer(layer)
  		
		
		}
		
		else if( type=="polygon" && $("#Polygon2").is(":checked")==true) {
		
			var des=null;
			var lev=null;
  			
  			  		
  			bootbox.confirm(
  			"<div class='form-group'>\
  			<label for='text'>Type</label>\
			<select class='form-control' id='level'>\
   				<option value='Road accident' selected >Road accident </option>\
   				<option value='Road degradation' >Road degradation</option>\
    			<option value='Criminal insecurity'  >Criminal insecurity</option>\
    			<option value='Massive gathering'>Massive gathering</option>\
    			<option value='Natural hazard' >Natural hazard</option>\
    			<option value='Traffic jam' >Traffic jam</option>\
    			<option value='Road closure' >Road closure</option>\
			</select>\
			</div>\
			<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' placeholder='Description'>\
				</div>"
    		, function(result) {
    		
        		//console.log("inside");
    			des= $('#description').val();
    			lev= $('#level').find(":selected").val();
  				
    			layerjson=layer.toGeoJSON();
    			layerjson.properties= {
        			"type": "anomalyType",
       				 "description": des,
       				 "level" : lev ,
       				 "id" : layer._leaflet_id ,
       				 "date": Date.now()
   			 }
    			
    			content = getPopupContent(layer,layerjson)
    			if (content !== null) {
                layer.bindPopup(content);
       			 }
       			 
				polygonl.push(layerjson);
		//console.log(polygonl);
			}
			);
		
			leditableLayers.addLayer(layer)
		}
		
		//leditableLayers.addLayer(layer);

	});
	
	
	
 var getPopupContent = function(layer,geo) {

			if (layer instanceof L.Circle) {
                
            var html= '<table>\
 						 <tr>\
  							  <td>Type of geometry : </td>\
  							  <td> ' +geo.properties.typeGeometry+'</td>\
  						 </tr>\
 						 <tr>\
   							 <td>Level : </td>\
    						 <td>'+geo.properties.level+'</td>\
  						</tr>\
  						<tr>\
   							 <td>Description : </td>\
    						 <td>'+geo.properties.description+'</td>\
  						</tr>\
  						<tr>\
   							 <td>Date : </td>\
    						 <td>'+geo.properties.date+'</td>\
  						</tr>\
						</table>'
				return html;
                
            }
            
             else if (layer instanceof L.Polygon) {
            
            	var html= '<table>\
 						 <tr>\
  							  <td>Type of geometry : </td>\
  							  <td> '+geo.geometry.type+'</td>\
  						 </tr>\
 						 <tr>\
   							 <td>Level : </td>\
    						 <td>'+geo.properties.level+'</td>\
  						</tr>\
  						<tr>\
   							 <td>Description : </td>\
    						 <td>'+geo.properties.description+'</td>\
  						</tr>\
  						<tr>\
   							 <td>Date : </td>\
    						 <td>'+geo.properties.date+'</td>\
  						</tr>\
						</table>'
				return html;
            } 

			 else if (layer instanceof L.Rectangle) {
            
            	var html= '<table>\
 						 <tr>\
  							  <td>Type of geometry : </td>\
  							  <td> '+geo.geometry.type+'</td>\
  						 </tr>\
 						 <tr>\
   							 <td>Level : </td>\
    						 <td>'+geo.properties.level+'</td>\
  						</tr>\
  						<tr>\
   							 <td>Description : </td>\
    						 <td>'+geo.properties.description+'</td>\
  						</tr>\
  						<tr>\
   							 <td>Date : </td>\
    						 <td>'+geo.properties.date+'</td>\
  						</tr>\
						</table>'
				return html;
            
            }
            
            return null
        };
        


map.on('draw:edited', function (e) {
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
          	
          	
          	

         });
     });
     
     

map.on('draw:deleted', function(e) {

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
			
		
		});

});