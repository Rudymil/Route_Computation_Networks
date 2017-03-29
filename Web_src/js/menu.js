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
//var url = './php/server.php';
var warning_zones = new Array();
var layer_group_warning_zones;
var grid = L.layerGroup();
var heatPoly = L.layerGroup();
var overlayMaps = new Array();
var Lcontrollayers;
var types_warning_zones = new Array();
var types_anomalies = new Array();
var string_warning_zone = "warning_zone";
var string_anomaly_zone = "anomaly_zone";
var string_risk_type = "risk_type";
var string_anomaly_type = "anomaly_type";
var bbox; // bounding box de la map
var DEBUG = false;

function ajax_types(url,type){ // requete ajax sur les types
	if (DEBUG){
		console.log("FUNCTION : ajax_types");
		console.log("ajax_types url : ", url);
		console.log("ajax_types type : ", type);
	}
	$.ajax({
		url : url,
		type : 'GET',
		data: 'type='+type,
		dataType : 'json',
		success : function(code_json, statut){
			if (DEBUG){
				console.log("ajax_types code_json : ", code_json);
				console.log("ajax_types statut : ", statut);
			}
		},
		error : function(resultat, statut, erreur){
			if (DEBUG){
				console.log("ajax_types resultat : ", resultat);
				console.log("ajax_types statut : ", statut);
				console.log("ajax_types erreur : ", erreur);
			}
			$.notify(
				{
					title: "<strong>"+type+" request</strong>",
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
			if (DEBUG){
				console.log("ajax_types resultat.status :", resultat.status);
			}
			if (resultat.status == '200'){
				var json = resultat.responseJSON;
				if (!$.isEmptyObject(json)){ // si le resultat json n est pas vide
					if (DEBUG){
						console.log("json : ", json);
					}
					if (type == string_risk_type){
						types_warning_zones = json;
					}
					else if (type == string_anomaly_type){
						types_anomalies = json;
					}
				}
			}
		}
	});
}

$("body").ready(function(){ // lorsque le body est charge
	if (DEBUG){
		console.log("EVENT : $('body').ready");
	}
	ajax_types(url,string_risk_type);
	if (DEBUG){
		console.log("types_warnheatGrid2json.phping_zones :", types_warning_zones);
	}
	ajax_types(url,string_anomaly_type);
	if (DEBUG){
		console.log("types_anomalies :", types_anomalies);
	}
});

function ajax_grid(){ // requete ajax pour recuperer une grille
	if (DEBUG){
		console.log("FUNCTION : ajax_grid");
	}
	$.ajax({
		url : './php/heatGrid2json.php',
		type : 'POST',
		dataType : 'json',
		success : function(code_json, statut){
			if (DEBUG){
				console.log("ajax_grid code_json : ", code_json);
				console.log("ajax_grid statut : ", statut);
			}
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
			if (DEBUG){
				console.log("ajax_grid resultat : ", resultat);
				console.log("ajax_grid statut : ", statut);
				console.log("ajax_grid erreur : ", erreur);
			}
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
				if (DEBUG){
					console.log("ajax_grid json : ", json);
				}
				addGrid(json);
				overlayMaps["Grid"] = grid; // menu
				if (Lcontrollayers != undefined){
					Lcontrollayers.remove();
				}
				Lcontrollayers = L.control.layers(null,overlayMaps).addTo(map);
			}
		}
	});
}

function ajax_polygon(){ //requete ajax pour recuperer un polygon
	if (DEBUG){
		console.log("FUNCTION : ajax_polygon");
	}
	$.ajax({
		url : './php/heatPolygon.php',
		type : 'POST',
		dataType : 'json',
		success : function(code_json, statut){
			if (DEBUG){
				console.log("ajax_polygon code_json : ", code_json);
				console.log("ajax_polygon statut : ", statut);
			}
			$.notify(
				{
					title: "<strong>Heat polygon request</strong>",
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
			if (DEBUG){
				console.log("ajax_polygon resultat : ", resultat);
				console.log("ajax_polygon statut : ", statut);
				console.log("ajax_polygon erreur : ", erreur);
			}
			$.notify(
				{
					title: "<strong>Heat polygon request</strong>",
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
				if (DEBUG){
					console.log("ajax_polygon json : ", resultat.responseJSON);
				}
				var json = resultat.responseJSON;
				addHeatPolygon(json);
				overlayMaps["Heat Polygon"] = heatPoly; // menu
				if (Lcontrollayers != undefined){
					Lcontrollayers.remove();
				}
				Lcontrollayers = L.control.layers(null,overlayMaps).addTo(map);
			}
		}
	});
}

function add_warning_zones(url,bbox){ // ajoute toutes les warning zones de la bbox from la BDD
	if (DEBUG){
		console.log("FUNCTION : add_warning_zones");
		console.log("add_warning_zones url : ", url);
		console.log("add_warning_zones bbox : ", bbox);
	}
	$.ajax({
		url : url,
		type : 'GET',
		data : 'type='+string_warning_zone+'&bbox='+bbox,
		dataType : 'json',
		success : function(code_json, statut){
			if (DEBUG){
				console.log("add_warning_zones code_json : ", code_json);
				console.log("add_warning_zones statut : ", statut);
			}
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
			if (DEBUG){
				console.log("add_warning_zones resultat : ", resultat);
				console.log("add_warning_zones statut : ", statut);
				console.log("add_warning_zones erreur : ", erreur);
			}
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
				if (DEBUG){
					console.log("add_warning_zones resultat.status :", resultat.status);
				}
				var json = resultat.responseJSON;
				if (!$.isEmptyObject(json) && json != undefined){ // si le resultat json n est pas vide
					if (DEBUG){
						console.log("add_warning_zones json :", json);
					}
					if (warning_zones.length > 0){
						for (element in warning_zones){ // pour chaque warning zones
							if (DEBUG){
								console.log("element :", element);
								console.log("warning_zones[element] :", warning_zones[element]);
							}
							warning_zones[element].removeFrom(map); // on enleve les warning zones de la map
						}
					}
					warning_zones = []; // on vide les warning zones
					for (element in json){ // pour chaque object du geojson
						if (DEBUG){
							console.log("element :", element);
							console.log("json[element] :", json[element]);
						}
						var shape = L.geoJSON(json[element]);
						shape.setStyle({ // transforme en layer et change le style
							fillColor: '#878787' // grey
						});
						shape.addTo(map); // ajout a la map
						warning_zones.push(shape); // remplir la warning zone
					}
					layer_group_warning_zones = L.layerGroup(warning_zones); // groupe des couches warning zones
					overlayMaps["Warning zones"] = layer_group_warning_zones; // menu
					Lcontrollayers.remove();
					Lcontrollayers = L.control.layers(null,overlayMaps).addTo(map); // ne pas oublier le null
				}
				else{
					if (DEBUG){
						console.log("add_warning_zones json :", json);
					}
					if (warning_zones.length > 0){
						for (element in warning_zones){ // pour chaque warning zones
							if (DEBUG){
								console.log("element :", element);
								console.log("warning_zones[element] :", warning_zones[element]);
							}
							warning_zones[element].removeFrom(map); // on enleve les warning zones de la map
						}
						warning_zones = []; // on vide les warning zones
						delete overlayMaps["Warning zones"];
						Lcontrollayers.remove();
						Lcontrollayers = L.control.layers(null,overlayMaps).addTo(map); // ne pas oublier le null
					}
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

$("#map").ready(function(){ // lorsque la carte est chargee
	if (DEBUG){
		console.log("EVENT : $('#map').ready");
	}
	ajax_grid();
	ajax_polygon();
	//bbox = map.getBounds().toBBoxString();
	//add_warning_zones(url,bbox);
	map.on('dragend', function(){ // lorsqu on se deplace dans la carte
		bbox = map.getBounds().toBBoxString();
		add_warning_zones(url,bbox);
    });
    map.on('zoomend', function() { // lorsqu on zoom dans la carte
		bbox = map.getBounds().toBBoxString();
		add_warning_zones(url,bbox);
    });
});

function check_latlng(latlng){ // verifie que la variable d entree contient bien un couple de 2 coordonnees
	if (DEBUG){
		console.log("FUNCTION : check_latlng");
		console.log("latlng : ", latlng);
	}
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
	if (DEBUG){
		console.log("EVENT : $('#calculate').click");
	}
	affect(); // fonction définie dans set_the_route.js pour affecter les coordonnees des points de depart et d arrivee à latlng
	if (check_latlng(latlng) == 0){ // si la verification passe
	}
});

function notify_shape_empty(shape){ // notifie que l object est vide
	if (DEBUG){
		console.log("FUNCTION : notify_shape_empty");
		console.log("shape : ", shape);
	}
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
	if (DEBUG){
		console.log("FUNCTION : notify_none");
		console.log("shape : ", shape);
	}
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
	if (DEBUG){
		console.log("FUNCTION : notify_ajax_sending_areas_success");
		console.log("code : ", code);
		console.log("statut : ", statut);
	}
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

function notify_ajax_sending_areas_error(erreur, statut){ // notifie que lenvoi a echoue
	if (DEBUG){
		console.log("FUNCTION : notify_ajax_sending_areas_error");
		console.log("erreur : ", erreur);
		console.log("statut : ", statut);
	}
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
	if (DEBUG){
		console.log("FUNCTION : fill_geojson");
		console.log("circle : ", circle);
		console.log("box : ", box);
		console.log("polygon : ", polygon);
		console.log("geojson : ", geojson);
	}
	if (circle.length == 0){
		notify_none(string_circles);
	}
	else{
		for(element in circle){
			if (DEBUG){
				console.log("Circle :", circle[element]);
			}
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
			if (DEBUG){
				console.log("Box :", box[element]);
			}
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
			if (DEBUG){
				console.log("Polygon :", polygon[element]);
			}
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
	if (DEBUG){
		console.log("FUNCTION : send_ajax_geojson");
		console.log("send_ajax_geojson geojson : ", geojson);
		console.log("send_ajax_geojson type : ", type);
		console.log("send_ajax_geojson url : ", url);
	}
	$.ajax({
		url : url,
		type : 'POST',
		data : type+'='+geojson,
		dataType : '',
		success : function(code, statut){
			if (DEBUG){
				console.log("send_ajax_geojson code_json : ", code);
				console.log("send_ajax_geojson statut : ", statut);
			}
			notify_ajax_sending_areas_success(code, statut);
			return 0;
		},
		error : function(resultat, statut, erreur){
			if (DEBUG){
				console.log("send_ajax_geojson resultat : ", resultat);
				console.log("send_ajax_geojson statut : ", statut);
				console.log("send_ajax_geojson erreur : ", erreur);
			}
			notify_ajax_sending_areas_error(erreur, statut);
			return -1;
		},
		complete : function(resultat, statut){
			if (DEBUG){
				console.log("send_ajax_geojson resultat : ", resultat);
				console.log("send_ajax_geojson statut : ", statut);
			}
		}
	});
}

function style_shape(shape){ // modifie le style de chaque forme
	if (DEBUG){
		console.log("FUNCTION : style_shape");
		console.log("shape : ", shape);
	}
	if (DEBUG){
		console.log("shape : ", shape);
	}
	if (shape.length > 0){
		for (element in shape){
			if (DEBUG){
				console.log("element : ", element);
				console.log("shape[element] : ", shape[element]);
			}
			var layer = L.geoJSON(shape[element]); // transform into shape
			if (DEBUG){
				console.log("layer : ", layer);
			}
			layer.setStyle({ // change le style de la shape
				//opacity: 0.1, // weak opacity
				fillColor: 'yellow' // jaune
			});
			if (DEBUG){
				console.log("layer : ", layer);
			}
			layer.addTo(map); // ajout a la map
		}console.log("ajax_polygon json : ", resultat.responseJSON);
	}
}

$("#submit1").click(function(){ // envoie toutes les warning zones
	if (DEBUG){
		console.log("EVENT : $('#submit1').click");
	}
	if (DEBUG){
		console.log("Circles :", circle);
		console.log("Boxes :", box);
		console.log("Polygons :", polygon);
	}
	var geojson = new Array();
	if (fill_geojson(circle,box,polygon,geojson) == 0){ // si pas d erreur
		if (DEBUG){
			console.log("geojson : ", geojson);
			console.log(Object.keys(geojson).length);
		}
		if (!$.isEmptyObject(geojson) && Object.keys(geojson).length != 0){ // si le geojson est plein
			if (send_ajax_geojson(geojson,string_warning_zone,url) == 0){ // si pas d'erreur a l envoie
				weak_opacity_shape(circle);
				circle = [];
				weak_opacity_shape(box);
				box = [];
				weak_opacity_shape(polygon);
				polygon = [];
			}
		}
	}
});

$("#submit2").click(function(){ // envoie toutes les anomaly
	if (DEBUG){
		console.log("EVENT : $('#submit1').click");
	}
	if (DEBUG){
		console.log("Circles :", circlel);
		console.log("Boxes :", boxl);
		console.log("Polygons :", polygonl);
	}
	var geojson = new Array();
	if (fill_geojson(circlel,boxl,polygonl,geojson) == 0){ // si pas d erreur
		if (DEBUG){
			console.log("geojson : ", geojson);
			console.log(Object.keys(geojson).length);
		}
		if (!$.isEmptyObject(geojson) && Object.keys(geojson).length != 0){ // si le geojson est plein
			if (send_ajax_geojson(geojson,string_warning_zone,url) == 0){ // si pas d'erreur a l envoie
				weak_opacity_shape(circlel);
				circlel = [];
				weak_opacity_shape(boxl);
				boxl = [];
				weak_opacity_shape(polygonl);
				polygonl = [];
			}
		}
	}
});
