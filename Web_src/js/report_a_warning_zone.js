var drawControl=null;
var editableLayers=null;


$(".radio_button").change(function (){ // choix de dessin

	//console.log("kqsdqsdqs");
	
	if ($("#Navigate").is(":checked") ){
		$("#dep").prop('disabled', false);	
		$("#dest").prop('disabled', false);	
		markerDeparture.dragging.enable();
		markeraDestination.dragging.enable();	
	
		map.removeControl(drawControl);
	}
	
	
	
	else if ($("#Circle1").is(":checked")==true ){
	
	$("#dep").prop('disabled', true);
	$("#dest").prop('disabled', true);
	if( markerDeparture != null ) {	
	markerDeparture.dragging.disable();	
	}
	if( markeraDestination != null ) {
	markeraDestination.dragging.disable();
	}	
	
		
	if( drawControl != null ) {
		
		map.removeControl(drawControl);
	}	
	// Initialise the FeatureGroup to store editable layers
	
	editableLayers = new L.FeatureGroup();
	map.addLayer(editableLayers);

	var drawPluginOptions = {
  	position: 'topright',
  		draw: {
    	circle: {
     	 shapeOptions: {
     	   color: '#e10000'
     	 },
  	  },
    // disable toolbar item by setting it to false
    	polyline: false,
    	polygon: false, // Turns off this drawing tool
    	rectangle: false,
    	marker: false,
    	},
  	edit: {
   	 featureGroup: editableLayers, //REQUIRED!!
   	 remove: false
  	}
	};
	
	drawControl = new L.Control.Draw(drawPluginOptions);
	map.addControl(drawControl);
	
	}
	
	
	
	else if ($("#Box1").is(":checked")==true ){
	
		
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
	
	editableLayers = new L.FeatureGroup();
	map.addLayer(editableLayers);

	var drawPluginOptions = {
  	position: 'topright',
  		draw: {
    	rectangle: {
     	 shapeOptions: {
     	   color: '#e10000'
     	 }
  	  },
    // disable toolbar item by setting it to false
    	polyline: false,
    	circle: false, // Turns off this drawing tool
    	polygon: false,
    	marker: false,
    	},
  	edit: {
   	 featureGroup: editableLayers, //REQUIRED!!
   	 remove: false
  	}
	};
drawControl = new L.Control.Draw(drawPluginOptions);
	map.addControl(drawControl);
	}
	
	
	
	else if ($("#Polygon1").is(":checked")==true ){
	
	
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
	// Initialise the FeatureGroup to store editable layers
	
	editableLayers = new L.FeatureGroup();
	map.addLayer(editableLayers);

	var drawPluginOptions = {
  	position: 'topright',
  		draw: {
    	polygon: {
     	 allowIntersection: false, // Restricts shapes to simple polygons
      	drawError: {
       		 color: '#e1e100', // Color the shape will turn when intersects
     		   message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
    	  },
     	 shapeOptions: {
     	   color: '#e10000'
     	 }
  	  },
    // disable toolbar item by setting it to false
    	polyline: false,
    	circle: false, // Turns off this drawing tool
    	rectangle: false,
    	marker: false,
    	},
  	edit: {
   	 featureGroup: editableLayers, //REQUIRED!!
   	 remove: false
  	}
	};
	drawControl = new L.Control.Draw(drawPluginOptions);
	map.addControl(drawControl);
}

	// Initialise the draw control and pass it the FeatureGroup of editable layers
	
	
	

	editableLayers = new L.FeatureGroup();
	map.addLayer(editableLayers);



	
	

});

map.on('draw:created', function(e) {
  		var type = e.layerType;
  		console.log(type);
  		layer = e.layer;
  		if( type=="circle" && $("#Circle1").is(":checked")==true) {
    		
			//var description = prompt("Please enter the description of the danger", "Description");
  		
  		
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
  				
    			var geomcircle=[[[layer._latlng.lat,layer._latlng.lng],layer._mRadius],lev,des];
				circle.push(geomcircle);
				console.log(circle);
			}
			);
  			

  			
			
			

		}
		
		else if( type=="rectangle" && $("#Box1").is(":checked")==true ) {
		
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
  				
    			var geombox=[[[[layer._latlngs[0][0].lat,layer._latlngs[0][0].lng],[layer._latlngs[0][1].lat,layer._latlngs[0][1].lng] ,[layer._latlngs[0][2].lat,layer._latlngs[0][2].lng] ,[layer._latlngs[0][3].lat,layer._latlngs[0][3].lng] ] ],lev,des];
				box.push(geombox);
				console.log(box);
			}
			);

  			
		
		}
		
		else if( type=="polygon" && $("#Polygon1").is(":checked")==true) {



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
		for (var pas = 0; pas < i; pas++) {
  			var t=[layer._latlngs[0][pas].lat,layer._latlngs[0][pas].lng];
  			tmp.push(t);
		}
		tmpa=[tmp,lev,des];
		polygon.push(tmpa);
		console.log(polygon);
		
			}
			);
		
		
		
		
		
		}
		
		editableLayers.addLayer(layer);

	});
