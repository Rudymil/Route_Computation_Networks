var drawControl=null;
var editableLayers=null;


var lleditableLayers=null;



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
		
	if( drawControl != null ) {
				
		map.removeControl(drawControl);
	}	
	// Initialise the FeatureGroup to store editable layers
	$("#dep").prop('disabled', true);
	$("#dest").prop('disabled', true);	
	markerDeparture.dragging.disable();	
	markeraDestination.dragging.disable();	
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
	
	
	
	else if ($("#Box1").is(":checked")==true ){
	
		
	if( drawControl != null ) {
		map.removeControl(drawControl);
	}	
	$("#dep").prop('disabled', true);
	$("#dest").prop('disabled', true);	
	markerDeparture.dragging.disable();	
	markeraDestination.dragging.disable();	
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
	
	
	
	else if ($("#Polygon1").is(":checked")==true ){
	
	
	if( drawControl != null ) {
		map.removeControl(drawControl);
	}	
	// Initialise the FeatureGroup to store editable layers
	$("#dep").prop('disabled', true);
	$("#dest").prop('disabled', true);	
	markerDeparture.dragging.disable();	
	markeraDestination.dragging.disable();	
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
  		if( type=="circle" && $("#Circle1").is(":checked")==true) {
    		

  		
  		
			var geomcircle=[[layer._latlng.lat,layer._latlng.lng],layer._mRadius]
			circlel.push(geomcircle);
			console.log(circlel);
			

		}
		
		else if( type=="rectangle" && $("#Box1").is(":checked")==true ) {
		

  		
  		var geombox=[[[layer._latlngs[0][0].lat,layer._latlngs[0][0].lng],[layer._latlngs[0][1].lat,layer._latlngs[0][1].lng] ,[layer._latlngs[0][2].lat,layer._latlngs[0][2].lng] ,[layer._latlngs[0][3].lat,layer._latlngs[0][3].lng] ] ]
		boxl.push(geombox);
		console.log(boxl);	
		
		}
		
		else if( type=="polygon" && $("#Polygon1").is(":checked")==true) {


		var i= layer._latlngs[0].length ;
		var tmp = [];
		console.log(layer);
		for (var pas = 0; pas < i; pas++) {
  			var t=[layer._latlngs[0][pas].lat,layer._latlngs[0][pas].lng];
  			tmp.push(t);
		}
		
		polygonl.push(tmp);
		console.log(polygonl);
		
		
		}
		
		leditableLayers.addLayer(layer);

	});