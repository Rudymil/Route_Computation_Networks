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
   	 remove: false
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
   	 remove: false
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
   	 remove: false
  	}
	};
drawControl = new L.Control.Draw(drawPluginOptions);
	map.addControl(drawControl);
	
}


	leditableLayers = new L.FeatureGroup();
	map.addLayer(leditableLayers);



	
	

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
        		 "description": des,
     		     "level": lev,
     		     "date": Date.now()
   			 	};
    			circlel.push(layergeo);
			}
			);
  			
			
			
			

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
       					 "level": lev,
        				"date": Date.now()
    			}
    			
				boxl.push(layerjson);
				//console.log(boxl);	

			}
			);
		
		
  		
  		
		
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
       				 "date": Date.now()
   			 }
    			
    			
				polygonl.push(layerjson);
		//console.log(polygonl);
			}
			);
		
		
		}
		
		leditableLayers.addLayer(layer);

	});
