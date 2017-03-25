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

$("#map").ready(function(){ // charge toutes les zones a eviter lorsque la carte est chargee
	$.ajax({
		url : './php/heatGrid2json.php',
		type : 'POST',
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
				//console.log(json);
				addGrid(json);
			}
		}
	});
});

$("#calculate").click(function(){ // envoie les points a l algo pour afficher l itineraire
	//console.log("latlng : ",latlng);
	affect(); // fonction définie dans set_the_route.js pour affecter les coordonnees des points de depart et d arrivee à latlng
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
		}
		else{
			var json = latlng;
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
	}
});

function notify_wrong_format(shape){
	$.notify(
		{
			title: "<strong>"+shape+"</strong>",
			message: "wrong format"
		},{
			type: "danger",
			placement: {
				from: "bottom",
				align: "center"
			}
		}
	);
}

function notify_none(shape){
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

function notify_ajax_sending_areas_success(code, statut){
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

function notify_ajax_sending_areas_error(code, statut){
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

$("#submit1").click(function(){ // envoie toutes les zones dangereuses
	/*console.log("Circles :");
	console.log(circle);
	console.log("Boxes :");
	console.log(box);
	console.log("Polygons :");
	console.log(polygon);*/
	var geojson = new Array();
	if (circle.length == 0){
		notify_none(string_circles);
	}
	else{
		for(element in circle){
			console.log("Circle :");
			console.log(circle[element]);
			if (circle[element] !== null){ // si la methode est compatible
				geojson.push(circle[element]); // complete GeoJSON
			}
			else {
				notify_wrong_format(string_circles);
				circle = [];
				return -1;
			}
		}
		circle = [];
	}
	if (box.length == 0){
		notify_none(string_boxes);
	}
	else {
		for(element in box){
			console.log("Box :");
			console.log(box[element]);
			if (box[element] !== null){ // si la methode est compatible
				geojson.push(box[element]); // complete GeoJSON
			}
			else {
				notify_wrong_format(string_boxes);
				box = [];
				return -1;
			}
		}
		box = [];
	}
	if (polygon.length == 0){
		notify_none(string_polygons);
	}
	else {
		for(element in polygon){
			console.log("Polygon :");
			console.log(polygon[element]);
			if (polygon[element] !== null){ // si la methode est compatible
				geojson.push(polygon[element]); // complete GeoJSON
			}
			else {
				notify_wrong_format(string_polygons);
				polygon = [];
				return -1;
			}
		}
		polygon = [];
	}
	console.log("geojson : ");
	console.log(geojson);
	if (!$.isEmptyObject(geojson)){
		$.ajax({
			url : './php/insert_to_valid.php',
			type : 'POST',
			data : 'geojson='+geojson,
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
});

$("#submit2").click(function(){ // envoie toutes les zones a verifier
	/*console.log("Circles :");
	console.log(circlel);
	console.log("Boxes :");
	console.log(boxl);
	console.log("Polygons :");
	console.log(polygonl);*/
	var geojson = new Array();
	if (circlel.length == 0){
		notify_none(string_circles);
	}
	else{
		for(element in circlel){
			console.log("Circle :");
			console.log(circlel[element]);
			if (circlel[element] !== null){ // si la methode est compatible
				geojson.push(circlel[element]); // complete GeoJSON
			}
			else {
				notify_wrong_format(string_circles);
				circlel = [];
				return -1;
			}
		}
		circlel = [];
	}
	if (boxl.length == 0){
		notify_none(string_boxes);
	}
	else {
		for(element in boxl){
			console.log("Box :");
			console.log(boxl[element]);
			if (boxl[element] !== null){ // si la methode est compatible
				geojson.push(boxl[element]); // complete GeoJSON
			}
			else {
				notify_wrong_format(string_boxes);
				boxl = [];
				return -1;
			}
		}
		boxl = [];
	}
	if (polygonl.length == 0){
		notify_none(string_polygons);
	}
	else {
		for(element in polygonl){
			console.log("Polygon :");
			console.log(polygonl[element]);
			if (polygonl[element] !== null){ // si la methode est compatible
				geojson.push(polygonl[element]); // complete GeoJSON
			}
			else {
				notify_wrong_format(string_polygons);
				polygonl = [];
				return -1;
			}
		}
		polygonl = [];
	}
	console.log("geojson : ");
	console.log(geojson);
	if (!$.isEmptyObject(geojson)){
		$.ajax({
			url : './php/insert_to_verify.php',
			type : 'POST',
			data : 'geojson='+geojson,
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
});