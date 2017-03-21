var drawControl=null;
var editableLayers=null;


$(".radio_button").change(function (){ // choix de dessin
<<<<<<< HEAD

	console.log("kqsdqsdqs");
	
	if ($("#Navigate").is(":checked") ){
	
		map.removeControl(drawControl);
=======
	if ($("#Navigate").is(":checked")){
		//console.log("Navigate");
		$("#dep").prop('disabled', false);	
		$("#dest").prop('disabled', false);	
		drawing = "set_the_route"; // pas de dessin
		nb_points = 0;
		rectangle = [];
		points = [];
	}
	else if ($("#Circle1").is(":checked")){
		//console.log("Circle");
		$("#dep").prop('disabled', true);
		$("#dest").prop('disabled', true);		
		drawing = "Circle1"; // dessiner un cercle
		nb_points = 0;
		rectangle = [];
		points = [];
	}
	else if ($("#Box1").is(":checked")){
		//console.log("Box");
		$("#dep").prop('disabled', true);
		$("#dest").prop('disabled', true);	
		drawing = "Box1"; // dessiner une box
		nb_points = 0;
		rectangle = [];
		points = [];
	}
	else if ($("#Polygon1").is(":checked")){
		//console.log("Polygon");
		$("#dep").prop('disabled', true);
		$("#dest").prop('disabled', true);	
		drawing = "Polygon1"; // dessiner un polygone
		nb_points = 0;
		rectangle = [];
		points = [];
	}
	else if ($("#Circle2").is(":checked")){	
		$("#dep").prop('disabled', true);
		$("#dest").prop('disabled', true);	
		
	}
	else if ($("#Box2").is(":checked")){	
		$("#dep").prop('disabled', true);
		$("#dest").prop('disabled', true);	
		
	}
	else if ($("#Polygon2").is(":checked")){	
		$("#dep").prop('disabled', true);
		$("#dest").prop('disabled', true);	
		
	}
});

//$("#map").click(function (e){ // lorsqu on click sur la carte (jQuery)
map.addEventListener('click', function(e){ // lorsqu on click sur la carte
	switch(drawing) {
		case "set_the_route":
			hideContextMenu1();
			//console.log(drawing);
			break;
		case "Circle1":
			//console.log(drawing);
			//console.log(e.latlng.lat);
			//console.log(e.latlng.lng);
			draw_circle(e); // dessin du cercle
			break;
		case "Box1":
			//console.log(drawing);
			//console.log(e.latlng.lat);
			//console.log(e.latlng.lng);
			draw_box(e);
			break;
		case "Polygon1":
			//console.log(drawing);
			//console.log(e.latlng.lat);
			//console.log(e.latlng.lng);
			build_polygon(e);
			break;
>>>>>>> 648d681bd9d3f364c8faa96c9d810d637ff04908
	}
	
	
	
	else if ($("#Circle1").is(":checked")==true ){
		
	if( drawControl != null ) {
		
		map.removeControl(drawControl);
	}	
	// Initialise the FeatureGroup to store editable layers
	
	editableLayers = new L.FeatureGroup();
	map.addLayer(editableLayers);

<<<<<<< HEAD
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
	
=======
//$("#map").dblclick(function (e){ // lorsqu on click sur la carte (jQuery)
map.addEventListener('dblclick', function(e){ // lorsqu on double click sur la carte
	switch(drawing) {
		case "set_the_route":
			addmarker(e);
			//console.log(drawing);
			break;
		case "Polygon1":
			//console.log(drawing);
			//console.log(e.latlng.lat);
			//console.log(e.latlng.lng);
			draw_polygon(e);
			break;
>>>>>>> 648d681bd9d3f364c8faa96c9d810d637ff04908
	}
	
	
	
	else if ($("#Box1").is(":checked")==true ){
	
		
	if( drawControl != null ) {
		map.removeControl(drawControl);
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
    		

  		
  		
			var geomcircle=[[layer._latlng.lat,layer._latlng.lng],layer._mRadius]
			circle.push(geomcircle);
			console.log(circle);
			

		}
		
		else if( type=="rectangle" && $("#Box1").is(":checked")==true ) {
		

  		
  		var geombox=[[[layer._latlngs[0][0].lat,layer._latlngs[0][0].lng],[layer._latlngs[0][1].lat,layer._latlngs[0][1].lng] ,[layer._latlngs[0][2].lat,layer._latlngs[0][2].lng] ,[layer._latlngs[0][3].lat,layer._latlngs[0][3].lng] ] ]
		box.push(geombox);
		console.log(box);	
		
		}
		
		else if( type=="polygon" && $("#Polygon1").is(":checked")==true) {


		var i= layer._latlngs[0].length ;
		var tmp = [];
		console.log(layer);
		for (var pas = 0; pas < i; pas++) {
  			var t=[layer._latlngs[0][pas].lat,layer._latlngs[0][pas].lng];
  			tmp.push(t);
		}
		
		polygon.push(tmp);
		console.log(polygon);
		
		
		}
		
		editableLayers.addLayer(layer);

<<<<<<< HEAD
	});
=======
function draw_polygon(e){ // dessin du polygon
	//console.log(points[points.length-1]);
	//console.log(points[points.length-2]);
	points.splice(points.length-1,1); // supprime le dernier point
	L.polygon(
		points, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(map);
	polygon.push(points);
	//console.log(points);
	//console.log(polygon);
	points = [];
	nb_points = 0;
}
>>>>>>> 648d681bd9d3f364c8faa96c9d810d637ff04908
