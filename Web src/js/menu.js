// variables globales
var drawing = "set_the_route"; // choix de dessin

var nb_points = 0; // for boxes and polygons

// Json pour le dession et le point de départ et de fin 

// variable pour la saisie de zone de danger 
var latlng= new Array();
var circle = new Array(); // tableau de dictionnaire
var box = new Array(); // tableau de dictionnaire
var polygon = new Array(); // tableau de dictionnaire

// variable pour la saisie de zone de manque de donnees
var latlngl= new Array();
var circlel = new Array(); // tableau de dictionnaire
var boxl = new Array(); // tableau de dictionnaire
var polygonl = new Array(); // tableau de dictionnaire

$("#submit").click(function(){ // envoie toutes les donnees a l algo pour afficher l itineraire
	var json = new Array();
	json["circles"] = circle;
	json["boxes"] = box;
	json["polygons"] = polygon;
	//json = eval(json);
	console.log(json);
});

$("#calculate").click(function(){ // envoie toutes les donnees a l algo pour afficher l itineraire
	affect(); // fonction définie dans route.js pour affecter les coordonnées des points de départ et d'arrivée à latlng
	var json = new Array();
	//console.log(latlng[0][0]);
	//console.log(latlng[0][1]);
	//console.log(latlng[1][0]);
	//console.log(latlng[1][1]);
	if (latlng[0][0] != "" && latlng[0][1] != "" && latlng[1][0] != "" && latlng[1][0] != ""){
		json["point"] = latlng;
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