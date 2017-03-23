var circle = new Array(); // danger
var box = new Array(); // danger
var polygon = new Array(); // danger
var circlel = new Array(); // lack
var boxl = new Array(); // lack
var polygonl = new Array(); // lack
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
			type: "info",
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
	console.log("Circles :");
	console.log(circle);
	console.log("Boxes :");
	console.log(box);
	console.log("Polygons :");
	console.log(polygon);
	var json = new Array();
	if (circle.length == 0){
		notify_none("Circles");
	}
	else{
		for (element in circle){
			if (circle[element].length != 2){ // si circle[element] ne contient pas 2 elements numbers et description
				notify_wrong_format("Circles");
				console.log(1);
				return -1;
			}
			else {
				if (circle[element][0].length != 2 || circle[element][1] == undefined || circle[element][1] == ""){
					if (circle[element][0].length != 2){ // si circle[element][0] ne contient pas [lat,lng] ou radius
						notify_wrong_format("Circles");
						console.log(2);
					}
					if (circle[element][1] == undefined || circle[element][1] == ""){ // description
						notify_wrong_description("Circles");
						console.log(3);
					}
					return -1;
				}
				else {
					if (circle[element][0][0].length != 2 || circle[element][0][1] == NaN || circle[element][0][1] == undefined || circle[element][0][1] == ""){ // si les coordonnees ne contiennent pas de lat et de lng ou que le radius est mal defini
						notify_wrong_format("Circles");
						console.log(4);
						return -1;
					}
					else {
						for (coordinates in circle[element][0][0]){
							if (circle[element][0][0][coordinates] == NaN || circle[element][0][0][coordinates] == undefined || circle[element][0][0][coordinates] == ""){ // si les coordonnees sont males definies
								notify_none_coordinates("Circles");
								console.log(5);
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
	if (box.length == 0){
		notify_none("Boxes");
	}
	else {
		for (element in box){
			if (box[element].length != 2){ // si une box ne contient pas 2 elements numbers et description
				notify_wrong_format("Boxes");
				console.log(1);
				return -1;
			}
			else {
				if (box[element][0].length != 4 || box[element][1] == NaN || box[element][1] == undefined || box[element][1] == ""){
					if (box[element][0].length != 4){ // si numbers ne contient pas 4 [lat,lng]
						notify_wrong_format("Boxes");
						console.log(2);
					}
					if (box[element][1] == NaN || box[element][1] == undefined || box[element][1] == ""){ // description
						notify_wrong_description("Boxes");
						console.log(3);
					}
					return -1;
				}
				else {
					for (coordinates in box[element][0]){
						if (box[element][0][coordinates].length != 2){ // si les coordonnees ne contiennent pas de lat et de lng
							notify_wrong_format("Boxes");
							console.log(4);
							return -1;
						}
						else {
							if (box[element][0][coordinates][0] == NaN || box[element][0][coordinates][0] == undefined || box[element][0][coordinates][0] == "" || box[element][0][coordinates][1] == NaN || box[element][0][coordinates][1] == undefined || box[element][0][coordinates][1] == ""){ // si les coordonnees sont mal definies
								notify_none_coordinates("Boxes");
								console.log(5);
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
	if (polygon.length == 0){
		notify_none("Polygons");
	}
	else {
		for (element in polygon){
			if (polygon[element].length != 2){ // si un polygon ne contient pas 2 elements numbers et description
				notify_wrong_format("Polygons");
				console.log(1);
				return -1;
			}
			else {
				if (polygon[element][1] == NaN || polygon[element][1] == undefined || polygon[element][1] == ""){ // description
					notify_wrong_description("Polygons");
					console.log(2);
					return -1;
				}
				if (polygon[element][0].length == 0){ // si un polygon ne contient pas de [lat,lng]
					notify_none_coordinates("Polygons");
					console.log(3);
					return -1;
				}
				else {
					for (number in polygon[element][0]){
						if (polygon[element][0][number].length == 0 || polygon[element][0][number].length != 2){ // si un polygon ne contient pas de [lat,lng]
							if (polygon[element][0][number].length == 0){
								notify_none_coordinates("Polygons");
								console.log(4);
							}
							if (polygon[element][0][number].length != 2){
								notify_wrong_format("Polygons");
								console.log(5);
							}
							return -1;
						}
						else {
							if (polygon[element][0][number][0] == NaN || polygon[element][0][number][0] == undefined || polygon[element][0][number][0] == "" || polygon[element][0][number][1] == NaN || polygon[element][0][number][1] == undefined || polygon[element][0][number][1] == ""){ // les coordonnees
								notify_wrong_format("Polygons");
								console.log(6);
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
	console.log("json : ");
	console.log(json);
	if (!$.isEmptyObject(json)){
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
	console.log("Circles :");
	console.log(circlel);
	console.log("Boxes :");
	console.log(boxl);
	console.log("Polygons :");
	console.log(polygonl);
	var json = new Array();
	if (circlel.length == 0){
		notify_none("Circles");
	}
	else{
		for (element in circlel){
			if (circlel[element].length != 2){ // si circlel[element] ne contient pas 2 elements numbers et description
				notify_wrong_format("Circles");
				console.log(1);
				return -1;
			}
			else {
				if (circlel[element][0].length != 2 || circlel[element][1] == undefined || circlel[element][1] == ""){
					if (circlel[element][0].length != 2){ // si circlel[element][0] ne contient pas [lat,lng] ou radius
						notify_wrong_format("Circles");
						console.log(2);
					}
					if (circlel[element][1] == undefined || circlel[element][1] == ""){ // description
						notify_wrong_description("Circles");
						console.log(3);
					}
					return -1;
				}
				else {
					if (circlel[element][0][0].length != 2 || circlel[element][0][1] == NaN || circlel[element][0][1] == undefined || circlel[element][0][1] == ""){ // si les coordonnees ne contiennent pas de lat et de lng ou que le radius est mal defini
						notify_wrong_format("Circles");
						console.log(4);
						return -1;
					}
					else {
						for (coordinates in circlel[element][0][0]){
							if (circlel[element][0][0][coordinates] == NaN || circlel[element][0][0][coordinates] == undefined || circlel[element][0][0][coordinates] == ""){ // si les coordonnees sont males definies
								notify_none_coordinates("Circles");
								console.log(5);
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
	if (boxl.length == 0){
		notify_none("Boxes");
	}
	else {
		for (element in boxl){
			if (boxl[element].length != 2){ // si une boxl ne contient pas 2 elements numbers et description
				notify_wrong_format("Boxes");
				console.log(1);
				return -1;
			}
			else {
				if (boxl[element][0].length != 4 || boxl[element][1] == NaN || boxl[element][1] == undefined || boxl[element][1] == ""){
					if (boxl[element][0].length != 4){ // si numbers ne contient pas 4 [lat,lng]
						notify_wrong_format("Boxes");
						console.log(2);
					}
					if (boxl[element][1] == NaN || boxl[element][1] == undefined || boxl[element][1] == ""){ // description
						notify_wrong_description("Boxes");
						console.log(3);
					}
					return -1;
				}
				else {
					for (coordinates in boxl[element][0]){
						if (boxl[element][0][coordinates].length != 2){ // si les coordonnees ne contiennent pas de lat et de lng
							notify_wrong_format("Boxes");
							console.log(4);
							return -1;
						}
						else {
							if (boxl[element][0][coordinates][0] == NaN || boxl[element][0][coordinates][0] == undefined || boxl[element][0][coordinates][0] == "" || boxl[element][0][coordinates][1] == NaN || boxl[element][0][coordinates][1] == undefined || boxl[element][0][coordinates][1] == ""){ // si les coordonnees sont mal definies
								notify_none_coordinates("Boxes");
								console.log(5);
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
	if (polygonl.length == 0){
		notify_none("Polygons");
	}
	else {
		for (element in polygonl){
			if (polygonl[element].length != 2){ // si un polygonl ne contient pas 2 elements numbers et description
				notify_wrong_format("Polygons");
				console.log(1);
				return -1;
			}
			else {
				if (polygonl[element][1] == NaN || polygonl[element][1] == undefined || polygonl[element][1] == ""){ // description
					notify_wrong_description("Polygons");
					console.log(2);
					return -1;
				}
				if (polygonl[element][0].length == 0){ // si un polygonl ne contient pas de [lat,lng]
					notify_none_coordinates("Polygons");
					console.log(3);
					return -1;
				}
				else {
					for (number in polygonl[element][0]){
						if (polygonl[element][0][number].length == 0 || polygonl[element][0][number].length != 2){ // si un polygonl ne contient pas de [lat,lng]
							if (polygonl[element][0][number].length == 0){
								notify_none_coordinates("Polygons");
								console.log(4);
							}
							if (polygonl[element][0][number].length != 2){
								notify_wrong_format("Polygons");
								console.log(5);
							}
							return -1;
						}
						else {
							if (polygonl[element][0][number][0] == NaN || polygonl[element][0][number][0] == undefined || polygonl[element][0][number][0] == "" || polygonl[element][0][number][1] == NaN || polygonl[element][0][number][1] == undefined || polygonl[element][0][number][1] == ""){ // les coordonnees
								notify_wrong_format("Polygons");
								console.log(6);
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
	console.log("json : ");
	console.log(json);
	if (!$.isEmptyObject(json)){
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