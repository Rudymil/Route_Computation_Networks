// variables globales
var drawing = "Navigate"; // choix de dessin
var circle = new Array(); // tableau de dictionnaire
var radius = $("#radius").val(); // radius for circles
var box = new Array(); // tableau de dictionnaire
var rectangle = new Array();
var polygon = new Array(); // tableau de dictionnaire
var points = new Array();
var nb_points = 0; // for boxes and polygons

// Define icons
var greenIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-green.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});
var redIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-red.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

$("#submit").click(function(){ // envoie toutes les donnees a l algo pour afficher l itineraire
	affect(); // fonction définie dans route.js pour affecter les coordonnées des points de départ et d'arrivée à latlng
	var json = new Array();
	//console.log(latlng[0][0]);
	//console.log(latlng[0][1]);
	//console.log(latlng[1][0]);
	//console.log(latlng[1][1]);
	if (latlng[0][0] != "" && latlng[0][1] != "" && latlng[1][0] != "" && latlng[1][0] != ""){
		json["points"] = latlng;
		json["circles"] = circle;
		json["boxes"] = box;
		json["polygons"] = polygon;
		//json = eval(json);
		console.log(json);
	}
	else{
		alert("Please, enter points !!!");
	}
});