var lleditableLayers=null;


$(".radio_button").change(function (){ // choix de dessin

	console.log("kqsdqsdqs");
	
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
  		console.log(type);
  		layer = e.layer;
  		if( type=="circle" && $("#Circle2").is(":checked")==true) {
    		
			
			var des=null;
			var lev=null;
  			
  			  		
  			bootbox.confirm(
  			"<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' placeholder='Description'>\
				</div>\
			<div class='form-group'>\
			<label for='text'>Danger level</label>\
			<select class='form-control' id='anomalyType'>\
   				<option value='Missing road element' selected >Missing road element </option>\
   				<option value='Wrong geometry' >Wrong geometry</option>\
    			<option value='Missing attribute' >Missing attribute</option>\
    			<option value='Wrong attribute'>Wrong attribute</option>\
    			<option value='Missing POI' >Missing POI</option>\
    			<option value='Wrong POI' >Wrong POI</option>\
			</select>\
			</div>"
    		, function(result) {
    		
        		console.log("inside");
    			des= $('#description').val();
    			ano= $('#anomalyType').find(":selected").val();
  				
    			var geomcircle=[[[layer._latlng.lat,layer._latlng.lng],layer._mRadius],ano,des];
				circlel.push(geomcircle);
				console.log(circlel);
			}
			);
  			
			
			
			

		}
		
		else if( type=="rectangle" && $("#Box2").is(":checked")==true ) {
		
		
			var des=null;
			var lev=null;
  			
  			  		
  			bootbox.confirm(
  			"<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' placeholder='Description'>\
				</div>\
			<div class='form-group'>\
			<label for='text'>Danger level</label>\
			<select class='form-control' id='anomalyType'>\
   				<option value='Missing road element' selected >Missing road element </option>\
   				<option value='Wrong geometry' >Wrong geometry</option>\
    			<option value='Missing attribute' >Missing attribute</option>\
    			<option value='Wrong attribute'>Wrong attribute</option>\
    			<option value='Missing POI' >Missing POI</option>\
    			<option value='Wrong POI' >Wrong POI</option>\
			</select>\
			</div>"
    		, function(result) {
    		
        		console.log("inside");
    			des= $('#description').val();
    			ano= $('#anomalyType').find(":selected").val();
  				
    			var geombox=[[[[layer._latlngs[0][0].lat,layer._latlngs[0][0].lng],[layer._latlngs[0][1].lat,layer._latlngs[0][1].lng] ,[layer._latlngs[0][2].lat,layer._latlngs[0][2].lng] ,[layer._latlngs[0][3].lat,layer._latlngs[0][3].lng] ] ],ano,des];
				boxl.push(geombox);
				console.log(boxl);	

			}
			);
		
		
  		
  		
		
		}
		
		else if( type=="polygon" && $("#Polygon2").is(":checked")==true) {
		
		var des=null;
			var lev=null;
  			
  			  		
  			bootbox.confirm(
  			"<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' placeholder='Description'>\
				</div>\
			<div class='form-group'>\
			<label for='text'>Danger level</label>\
			<select class='form-control' id='level'>\
   				<option value='Road accident' selected >Road accident </option>\
   				<option value='Road degradation' >Road degradation</option>\
    			<option value='Criminal insecurity'  >Criminal insecurity</option>\
    			<option value='Massive gathering'>Massive gathering</option>\
    			<option value='Natural hazard' >Natural hazard</option>\
    			<option value='Traffic jam' >Traffic jam</option>\
    			<option value='Road closure' >Road closure</option>\
			</select>\
			</div>"
    		, function(result) {
    		
        		console.log("inside");
    			des= $('#description').val();
    			lev= $('#level').find(":selected").val();
  				
    			var i= layer._latlngs[0].length ;
		var tmp = [];
		console.log(layer);
		for (var pas = 0; pas < i; pas++) {
  			var t=[layer._latlngs[0][pas].lat,layer._latlngs[0][pas].lng];
  			tmp.push(t);
		}
		tmpa=[tmp,lev,des]
		polygonl.push(tmpa);
		console.log(polygonl);
			}
			);
		
		
		}
		
		leditableLayers.addLayer(layer);

	});
