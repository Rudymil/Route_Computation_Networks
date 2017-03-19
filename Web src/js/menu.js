// variables globales
var drawing = "Navigate"; // choix de dessin
var circle = new Array(); // tableau de dictionnaire
var radius = $("#radius").val(); // radius for circles
var box = new Array(); // tableau de dictionnaire
var rectangle = new Array();
var polygon = new Array(); // tableau de dictionnaire
var points = new Array();
var nb_points = 0; // for boxes and polygons

$("#nigeria").click(function(){ // reset sur port harcourt
	map.setView(new L.LatLng(4.804448, 7.016409),13);
});

$("#angola").click(function(){ // reset sur luanda
	map.setView(new L.LatLng(-8.830395, 13.236284),14);
});

$("#radius").change(function(){ // MAJ valeur du rayon
	radius = $("#radius").val();
	//console.log(radius);
});

$("#geo").click(function(){ // !?!?!?
	var control = L.control.layers(map)
	console.log("je suis la");	
	L.control.locate({
		strings: {
			title: "Show me where I am, yo!"
		}
	}).addTo(map);
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
	L.polygon(
		points, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(map);
	polygon.push([points]);
	//console.log(polygon);
	points = [];
	nb_points = 0;
}