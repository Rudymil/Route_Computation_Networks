// variables globales
var drawing = "set_the_route"; // choix de dessin
var nb_points = 0; // for boxes and polygons
// Json pour le dession et le point de départ et de fin
// variable pour la saisie de zone de danger
var circle = new Array(); // tableau de dictionnaire
var box = new Array(); // tableau de dictionnaire
var polygon = new Array(); // tableau de dictionnaire
// variable pour la saisie de zone de manque de donnees
var latlngl= new Array();
var circlel = new Array(); // tableau de dictionnaire
var boxl = new Array(); // tableau de dictionnaire
var polygonl = new Array(); // tableau de dictionnaire
var latlng= new Array(); // departure/arrival points

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
					title: "<strong>Trouble zones request</strong>",
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
					title: "<strong>Trouble zones request</strong>",
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
			console.log(statut);
			if (status == "success"){
				console.log(statut);
				/*console.log(resultat);
				var json = resultat.responseJSON;
				console.log(json);
				addGrid(json);*/
			}
			var json = resultat.responseJSON;
			addGrid(json);
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
			$.ajax({
				url : '',
				type : 'POST',
				data : 'json='+json,
				dataType : 'json',
				success : function(code_json, statut){
					//console.log("code_json : ",code_json);
					//console.log("statut : ",statut);
					$.notify(
						{
							title: "<strong>Routing request</strong>",
							message: statut,
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
							title: "<strong>Routing request</strong>",
							message: statut,
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
					//console.log("resultat : ",resultat);
					//console.log("statut : ",statut);
					if (status == 200){
						json = resultat;
					}
				}
			});
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
			type: "warning",
			placement: {
				from: "bottom",
				align: "center"
			}
		}
	);
}

function notify_none_coordinates(shape){
	$.notify(
		{
			title: "<strong>"+shape+" coordinates</strong>",
			message: "none",
		},{
			type: "danger",
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

function notify_wrong_description(shape){
	$.notify(
		{
			title: "<strong>"+shape+"</strong>",
			message: "wrong description",
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
	console.log(circle);
	console.log(box);
	console.log(polygon);
	var json = new Array();
	if (circle.length == 0 || circle.includes(NaN) || circle.includes(undefined) || circle.includes("")){
		notify_none("Circles");
	}
	else{
		for (element in circle){
			if (element.length != 2){ // si un cercle ne contient pas 2 elements numbers et description
				notify_wrong_format("Circles");
				return -1;
			}
			else {
				if (element[0].length != 2 || element[1].includes(NaN) || element[1].includes(undefined) || element[1].includes("")){
					if (element[0].length != 2){ // si numbers ne contient pas [lat,lng] et radius
						notify_wrong_format("Boxes");
					}
					if (element[1].includes(NaN) || element[1].includes(undefined) || element[1].includes("")){ // description
						notify_wrong_description("Boxes");
					}
					return -1;
				}
				else {
					if (element[0][0].length != 2 || element[0][1].includes(NaN) || element[0][1].includes(undefined) || element[0][1].includes("")){ // si les coordonnees ne contiennent pas de lat et de lng ou que le radius est mal defini
						notify_wrong_format("Circles");
						return -1;
					}
					else {
						for (coordinates in element[0][0]){
							if (coordinates.includes(NaN) || coordinates.includes(undefined) || coordinates.includes("")){
								notify_none_coordinates("Circles");
								return -1;
							}
						}
					}
				}
			}
		}
		json["circles"] = circle; // complete JSON
		circle = [];
	}
	if (box.length == 0 || box.includes(NaN) || box.includes(undefined) || box.includes("")){
		notify_none("Boxes");
	}
	else {
		for (element in box){
			if (element.length != 2){ // si une box ne contient pas 2 elements numbers et description
				notify_wrong_format("Boxes");
				return -1;
			}
			else {
				if (element[0].length != 4 || element[1].includes(NaN) || element[1].includes(undefined) || element[1].includes("")){
					if (element[0].length != 4){ // si numbers ne contient pas 4 [lat,lng]
						notify_wrong_format("Boxes");
					}
					if (element[1].includes(NaN) || element[1].includes(undefined) || element[1].includes("")){ // description
						notify_wrong_description("Boxes");
					}
					return -1;
				}
				else {
					for (coordinates in element[0]){
						if (coordinates.length != 2){ // si les coordonnees ne contiennent pas de lat et de lng
							notify_wrong_format("Boxes");
							return -1;
						}
						else {
							if (coordinates[0].includes(NaN) || coordinates[0].includes(undefined) || coordinates[0].includes("") || coordinates[1].includes(NaN) || coordinates[1].includes(undefined) || coordinates[1].includes("")){
								notify_none_coordinates("Boxes");
								return -1;
							}
						}
					}
				}
			}
		}
		json["boxes"] = box; // complete JSON
		box = [];
	}
	if (polygon.length == 0 || polygon.includes(NaN) || polygon.includes(undefined) || polygon.includes("")){
		notify_none("Polygons");
	}
	else {
		for (element in polygon){
			if (element.length != 2){ // si un polygon ne contient pas 2 elements numbers et description
				notify_wrong_format("Polygons");
				return -1;
			}
			else {
				if (element[1].includes(NaN) || element[1].includes(undefined) || element[1].includes("")){ // description
					notify_wrong_description("Polygons");
					return -1;
				}
				if (element[0].length == 0){ // si un polygon ne contient pas de [lat,lng]
					notify_none_coordinates("Polygons");
					return -1;
				}
				else {
					for (number in element[0]){
						if (number.length == 0 || number.length != 2){ // si un polygon ne contient pas de [lat,lng]
							if (number.length == 0){
								notify_none_coordinates("Polygons");
							}
							if (number.length != 2){
								notify_wrong_format("Polygons");
							}
							return -1;
						}
						else {
							if (number[0].includes(NaN) || number[0].includes(undefined) || number[0].includes("") || number[1].includes(NaN) || number[1].includes(undefined) || number[1].includes("")){ // les coordonnees
								notify_wrong_format("Polygons");
								return -1;
							}
						}
					}
				}
			}
		}
		json["polygons"] = polygon; // complete JSON
		polygon = [];
	}
	console.log("json : ",json);
	if (json.length != 0){
		$.ajax({
			url : './php/insert_to_valid.php',
			type : 'POST',
			data : 'json='+json,
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
	console.log(circlel);
	console.log(boxl);
	console.log(polygonl);
	var json = new Array();
	if (circlel.length == 0 || circlel.includes(NaN) || circlel.includes(undefined) || circlel.includes("")){
		notify_none("Circles");
	}
	else{
		for (element in circlel){
			if (element.length != 2){ // si un cercle ne contient pas 2 elements numbers et description
				notify_wrong_format("Circles");
				return -1;
			}
			else {
				if (element[0].length != 2 || element[1].includes(NaN) || element[1].includes(undefined) || element[1].includes("")){
					if (element[0].length != 2){ // si numbers ne contient pas [lat,lng] et radius
						notify_wrong_format("Boxes");
					}
					if (element[1].includes(NaN) || element[1].includes(undefined) || element[1].includes("")){ // description
						notify_wrong_description("Boxes");
					}
					return -1;
				}
				else {
					if (element[0][0].length != 2 || element[0][1].includes(NaN) || element[0][1].includes(undefined) || element[0][1].includes("")){ // si les coordonnees ne contiennent pas de lat et de lng ou que le radius est mal defini
						notify_wrong_format("Circles");
						return -1;
					}
					else {
						for (coordinates in element[0][0]){
							if (coordinates.includes(NaN) || coordinates.includes(undefined) || coordinates.includes("")){
								notify_none_coordinates("Circles");
								return -1;
							}
						}
					}
				}
			}
		}
		json["circles"] = circlel; // complete JSON
		circlel = [];
	}
	if (boxl.length == 0 || boxl.includes(NaN) || boxl.includes(undefined) || boxl.includes("")){
		notify_none("Boxes");
	}
	else {
		for (element in boxl){
			if (element.length != 2){ // si une box ne contient pas 2 elements numbers et description
				notify_wrong_format("Boxes");
				return -1;
			}
			else {
				if (element[0].length != 4 || element[1].includes(NaN) || element[1].includes(undefined) || element[1].includes("")){
					if (element[0].length != 4){ // si numbers ne contient pas 4 [lat,lng]
						notify_wrong_format("Boxes");
					}
					if (element[1].includes(NaN) || element[1].includes(undefined) || element[1].includes("")){ // description
						notify_wrong_description("Boxes");
					}
					return -1;
				}
				else {
					for (coordinates in element[0]){
						if (coordinates.length != 2){ // si les coordonnees ne contiennent pas de lat et de lng
							notify_wrong_format("Boxes");
							return -1;
						}
						else {
							if (coordinates[0].includes(NaN) || coordinates[0].includes(undefined) || coordinates[0].includes("") || coordinates[1].includes(NaN) || coordinates[1].includes(undefined) || coordinates[1].includes("")){
								notify_none_coordinates("Boxes");
								return -1;
							}
						}
					}
				}
			}
		}
		json["boxes"] = boxl; // complete JSON
		boxl = [];
	}
	if (polygonl.length == 0 || polygonl.includes(NaN) || polygonl.includes(undefined) || polygonl.includes("")){
		notify_none("Polygons");
	}
	else {
		for (element in polygonl){
			if (element.length != 2){ // si un polygon ne contient pas 2 elements numbers et description
				notify_wrong_format("Polygons");
				return -1;
			}
			else {
				if (element[1].includes(NaN) || element[1].includes(undefined) || element[1].includes("")){ // description
					notify_wrong_description("Polygons");
					return -1;
				}
				if (element[0].length == 0){ // si un polygon ne contient pas de [lat,lng]
					notify_none_coordinates("Polygons");
					return -1;
				}
				else {
					for (number in element[0]){
						if (number.length == 0 || number.length != 2){ // si un polygon ne contient pas de [lat,lng]
							if (number.length == 0){
								notify_none_coordinates("Polygons");
							}
							if (number.length != 2){
								notify_wrong_format("Polygons");
							}
							return -1;
						}
						else {
							if (number[0].includes(NaN) || number[0].includes(undefined) || number[0].includes("") || number[1].includes(NaN) || number[1].includes(undefined) || number[1].includes("")){ // les coordonnees
								notify_wrong_format("Polygons");
								return -1;
							}
						}
					}
				}
			}
		}
		json["polygons"] = polygonl; // complete JSON
		polygonl = [];
	}
	console.log("json : ",json);
	if (json.length != 0){
		$.ajax({
			url : './php/insert_to_verify.php',
			type : 'POST',
			data : 'json='+json,
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
