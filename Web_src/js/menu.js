var circle = new Array(); // danger
var box = new Array(); // danger
var polygon = new Array(); // danger
var circlel = new Array(); // lack
var boxl = new Array(); // lack
var polygonl = new Array(); // lack
var latlng = new Array(); // departure/arrival points
var string_circles = "Circles";
var string_boxes = "Boxes";
var string_polygons = "Polygons";
var url = 'http://172.31.56.223/api/server.php';
var warning_zones = new Array();
var layer_group_warning_zones;

function ajax_grid(){ // requete ajax pour recuperer une grille
	$.ajax({
		url : './php/heatGrid2json.php',
		type : 'POST',
		dataType : 'json',
		success : function(code_json, statut){
			//console.log("code_json : ",code_json);
			//console.log("statut : ",statut);
			$.notify(
				{
					title: "<strong>Grid request</strong>",
					message: statut
				},{
					type: "success",
					placement: {
						from: "bottom",
						align: "center"
					}
				}
			);
		},
		error : function(resultat, statut, erreur){
			//console.log("resultat : ",resultat);
			//console.log("statut : ",statut);
			//console.log("erreur : ",erreur);
			$.notify(
				{
					title: "<strong>Grid request</strong>",
					message: statut
				},{
					type: "danger",
					placement: {
						from: "bottom",
						align: "center"
					}
				}
			);
		},
		complete : function(resultat, statut){
			if (resultat.status == '200'){
				var json = resultat.responseJSON;
				//console.log(json);
				addGrid(json);
			}
		}
	});
}

function add_warning_zones(url){ // ajoute toutes les warning zones de la BDD
	$.ajax({
		url : url,
		type : 'GET',
		data : 'type=warning_zone',
		dataType : 'json',
		success : function(code_json, statut){
			//console.log("code_json : ",code_json);
			//console.log("statut : ",statut);
			$.notify(
				{
					title: "<strong>Warning zones request</strong>",
					message: statut
				},{
					type: "success",
					placement: {
						from: "bottom",
						align: "center"
					}
				}
			);
		},
		error : function(resultat, statut, erreur){
			//console.log("resultat : ",resultat);
			//console.log("statut : ",statut);
			//console.log("erreur : ",erreur);
			$.notify(
				{
					title: "<strong>Warning zones request</strong>",
					message: statut
				},{
					type: "danger",
					placement: {
						from: "bottom",
						align: "center"
					}
				}
			);
		},
		complete : function(resultat, statut){
			if (resultat.status == '200'){
				var json = resultat.responseJSON;
				if (!$.isEmptyObject(json)){ // si le resultat json n est pas vide
					//console.log(json);
					for (element in json){ // pour chaque object du geojson
						//console.log(element);
						//console.log(json[element]);
						warning_zones = []; // on vide les warning zones
						warning_zones.push(json[element]); // remplir la warning zone
					}
					layer_group_warning_zones = L.layerGroup(warning_zones); // groupe des couches warning zones
					var overlayMaps = {"Warning zones": layer_group_warning_zones}; // menu
					L.control.layers(null,overlayMaps).addTo(map); // ne pas oublier le null
				}
				else{
					$.notify(
						{
							title: "<strong>Warning zones request</strong>",
							message: "none"
						},{
							type: "info",
							placement: {
								from: "bottom",
								align: "center"
							}
						}
					);
				}
			}
		}
	});
}

$("#map").ready(function(){ // charge toutes les zones a eviter lorsque la carte est chargee
	ajax_grid();
	add_warning_zones(url);
});

function check_latlng(latlng){ // verifie que la variable d entree contient bien un couple de 2 coordonnees
	if (latlng.length == 2 && latlng[0].length == 2 && latlng[1].length == 2){ // si 2 couples de lat Lng
		if (latlng[0].includes("") || latlng[0].includes(NaN) || latlng[0].includes(undefined) || latlng[1].includes("") || latlng[1].includes(NaN) || latlng[1].includes(undefined)){ // si pas de point
			if (latlng[0].includes("") || latlng[0].includes(NaN) || latlng[0].includes(undefined)){
				$.notify(
					{
						title: "<strong>Departure</strong>",
						message: "Enter coordinates",
					},{
					type: "danger",
						placement: {
							from: "bottom",
							align: "center"
						}
					}
				);
			}
			if (latlng[1].includes("") || latlng[1].includes(NaN) || latlng[1].includes(undefined)){
				$.notify(
					{
						title: "<strong>Destination</strong>",
						message: "Enter coordinates",
					},{
						type: "danger",
						placement: {
							from: "bottom",
							align: "center"
						}
					}
				);
			}
			return -1;
		}
		else{
			return 0;
		}
	}
	else{
		$.notify(
			{
				title: "<strong>Array size</strong>",
				message: "incorrect",
			},{
				type: "danger",
				placement: {
					from: "bottom",
					align: "center"
				}
			}
		);
		return -1;
	}
}

$("#calculate").click(function(){ // envoie les points a l algo pour afficher l itineraire
	//console.log("latlng : ",latlng);
	affect(); // fonction définie dans set_the_route.js pour affecter les coordonnees des points de depart et d arrivee à latlng
	if (check_latlng(latlng) == 0){ // si la verification passe
	}
});

function notify_shape_empty(shape){ // notifie que l object est vide
	$.notify(
		{
			title: "<strong>"+shape+"</strong>",
			message: "empty"
		},{
			type: "danger",
			placement: {
				from: "bottom",
				align: "center"
			}
		}
	);
}

function notify_none(shape){ // notifie que rien est a envoyer
	$.notify(
		{
			title: "<strong>"+shape+"</strong>",
			message: "none",
		},{
			type: "info",
			placement: {
				from: "bottom",
				align: "center"
			}
		}
	);
}

function notify_ajax_sending_areas_success(code, statut){ // notifie que l envoi a reussi
	$.notify(
		{
			title: "<strong>Sending areas</strong>",
			message: statut,
		},{
			type: "success",
			placement: {
				from: "bottom",
				align: "center"
			}
		}
	);
}

function notify_ajax_sending_areas_error(code, statut){ // notifie que lenvoi a echoue
	$.notify(
		{
			title: "<strong>Sending areas</strong>",
			message: statut,
		},{
			type: "danger",
			placement: {
				from: "bottom",
				align: "center"
			}
		}
	);
}

function fill_geojson(circle,box,polygon,geojson){ // rempli le geojson a partir des shapes en parametres
	if (circle.length == 0){
		notify_none(string_circles);
	}
	else{
		for(element in circle){
			console.log("Circle :");
			console.log(circle[element]);
			if (circle[element] !== null){ // si c est pas nul
				geojson.push(circle[element]); // complete GeoJSON
			}
			else {
				notify_shape_empty(string_circles);
				return -1;
			}
		}
	}
	if (box.length == 0){
		notify_none(string_boxes);
	}
	else {
		for(element in box){
			console.log("Box :");
			console.log(box[element]);
			if (box[element] !== null){ // si c est pas nul
				geojson.push(box[element]); // complete GeoJSON
			}
			else {
				notify_shape_empty(string_boxes);
				return -1;
			}
		}
	}
	if (polygon.length == 0){
		notify_none(string_polygons);
	}
	else {
		for(element in polygon){
			console.log("Polygon :");
			console.log(polygon[element]);
			if (polygon[element] !== null){ // si c est pas nul
				geojson.push(polygon[element]); // complete GeoJSON
			}
			else {
				notify_shape_empty(string_polygons);
				return -1;
			}
		}
	}
	return 0;
}

function send_ajax_geojson(geojson,type,url){ // envoie en ajax le geojson et le type a l url en parametre
	$.ajax({
		url : url,
		type : 'POST',
		data : 'type='+type+'&geojson='+geojson,
		dataType : '',
		success : function(code, statut){
			//console.log("code_json : ",code);
			//console.log("statut : ",statut);
			notify_ajax_sending_areas_success(code, statut);
		},
		error : function(resultat, statut, erreur){
			//console.log("resultat : ",resultat);
			//console.log("statut : ",statut);
			//console.log("erreur : ",erreur);
			notify_ajax_sending_areas_error(code, statut);
		},
		complete : function(resultat, statut){
			//console.log("resultat : ",resultat);
			//console.log("statut : ",statut);
		}
	});
}

$("#submit1").click(function(){ // envoie toutes les warning zones
	/*console.log("Circles :");
	console.log(circle);
	console.log("Boxes :");
	console.log(box);
	console.log("Polygons :");
	console.log(polygon);*/
	var geojson = new Array();
	if (fill_geojson(circle,box,polygon,geojson) == 0){ // si pas d erreur
		console.log("geojson : ");
		console.log(geojson);
		if (!$.isEmptyObject(geojson)){ // si le geojson est plein
			circle = [];
			box = [];
			polygon = [];
			send_ajax_geojson(geojson,"warning_zone",url);
		}
	}
});

$("#submit2").click(function(){ // envoie toutes les anomaly
	/*console.log("Circles :");
	console.log(circlel);
	console.log("Boxes :");
	console.log(boxl);
	console.log("Polygons :");
	console.log(polygonl);*/
	var geojson = new Array();
	if (fill_geojson(circlel,boxl,polygonl,geojson) == 0){ // si pas d erreur
		console.log("geojson : ");
		console.log(geojson);
		if (!$.isEmptyObject(geojson)){ // si le geojson est plein
			circlel = [];
			boxl = [];
			polygonl = [];
			send_ajax_geojson(geojson,"anomaly_zone",url);
		}
	}
});