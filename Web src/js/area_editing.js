$("#radius").change(function(){ // MAJ valeur du rayon
	radius = $("#radius").val();
	//console.log(radius);
});

$(".radio_button").change(function (){ // choix de dessin
	if ($("#Navigate").is(":checked")){
		//console.log("Navigate");
		drawing = "Navigate"; // pas de dessin
		nb_points = 0;
		rectangle = [];
		points = [];
	}
	else if ($("#Circle").is(":checked")){
		//console.log("Circle");
		drawing = "Circle"; // dessiner un cercle
		nb_points = 0;
		rectangle = [];
		points = [];
	}
	else if ($("#Box").is(":checked")){
		//console.log("Box");
		drawing = "Box"; // dessiner une box
		nb_points = 0;
		rectangle = [];
		points = [];
	}
	else if ($("#Polygon").is(":checked")){
		//console.log("Polygon");
		drawing = "Polygon"; // dessiner un polygone
		nb_points = 0;
		rectangle = [];
		points = [];
	}
});

//$("#map").click(function (e){ // lorsqu on click sur la carte (jQuery)
map.addEventListener('click', function(e){ // lorsqu on click sur la carte
	switch(drawing) {
		case "Navigate":
			//console.log(drawing);
			break;
		case "Circle":
			//console.log(drawing);
			//console.log(e.latlng.lat);
			//console.log(e.latlng.lng);
			draw_circle(e); // dessin du cercle
			break;
		case "Box":
			//console.log(drawing);
			//console.log(e.latlng.lat);
			//console.log(e.latlng.lng);
			draw_box(e);
			break;
		case "Polygon":
			//console.log(drawing);
			//console.log(e.latlng.lat);
			//console.log(e.latlng.lng);
			build_polygon(e);
			break;
	}
});

//$("#map").dblclick(function (e){ // lorsqu on click sur la carte (jQuery)
map.addEventListener('dblclick', function(e){ // lorsqu on double click sur la carte
	switch(drawing) {
		case "Navigate":
			//console.log(drawing);
			break;
		case "Polygon":
			//console.log(drawing);
			//console.log(e.latlng.lat);
			//console.log(e.latlng.lng);
			draw_polygon(e);
			break;
	}
});

function draw_circle(e){ // dessin du cercle
	if (radius > 0 && radius != null){
		L.circle(
			[e.latlng.lat, e.latlng.lng], {
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: radius
			}
		).addTo(map);
		// ajout du cercle
		var latlng = new Array();
		var cercle = new Array();
		latlng["lat"] = e.latlng.lat;
		latlng["lng"] = e.latlng.lng;
		cercle["latlng"] = latlng;
		cercle["radius"] = radius;
		circle.push(cercle);
		//console.log(circle);
	}
	else{
		alert("radius not correct !!!");
	}
}

function draw_box(e){ // dessin du cercle
	if (nb_points == 0){ // si 1 seul point
		rectangle.push(e.latlng.lat);
		rectangle.push(e.latlng.lng);
		nb_points ++;
	}
	else if (nb_points == 1){
		rectangle.push(e.latlng.lat);
		rectangle.push(e.latlng.lng);
		L.rectangle( // si 2 points
			[[rectangle[0],rectangle[1]],[rectangle[2],rectangle[3]]], {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
		}).addTo(map);
		box.push([[rectangle[0],rectangle[1]],[rectangle[2],rectangle[3]]]);
		//console.log(box);
		rectangle = [];
		nb_points = 0;
	}
	else{
		alert("impossible to draw the box !!!");
	}
}

function build_polygon(e){ // construction du polygon
	points.push([e.latlng.lat,e.latlng.lng]);
	nb_points ++;
}

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





