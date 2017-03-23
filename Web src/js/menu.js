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
		url : './php/select_all.php',
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
			if (status == "success"){
				console.log(resultat);
				var json = resultat;
				console.log(json);
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

$("#submit1").click(function(){ // envoie toutes les zones dangereuses
	var json = new Array();
	json["circles"]=[[[[0,0],1],"test1"],[[[1,1],2],"test2"],[[[2,2],3],"test3"],[[[3,3],4],"test4"],[[[4,4],5],"test5"]];
	json["boxes"]=[[[[10,0],[0,10]],"test1"],[[[20,0],[0,20]],"test2"],[[[30,0],[0,30]],"test3"],[[[40,0],[0,40]],"test4"]];
	json["polygons"]=[[[[10,1],[12,86],[74,95],[75,12],[15,45],[73,3]],"test1"],[[[3,7],[4,1],[9,1],[4,6]],"test2"]];
	console.log("json : ",json);
	$.ajax({
		url : './php/insert_to_valid.php',
		type : 'POST',
		data : 'json='+json,
		dataType : '',
		success : function(code, statut){
			//console.log("code_json : ",code_json);
			//console.log("statut : ",statut);
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
		},
		error : function(resultat, statut, erreur){
			//console.log("resultat : ",resultat);
			//console.log("statut : ",statut);
			//console.log("erreur : ",erreur);
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
		},
		complete : function(resultat, statut){
			//console.log("resultat : ",resultat);
			//console.log("statut : ",statut);
			json = resultat;
		}
	});
});

$("#submit2").click(function(){ // envoie toutes les zones a verifier
	var json = new Array();
	json["circles"]=[[[[0,0],1],"test1"],[[[1,1],2],"test2"],[[[2,2],3],"test3"],[[[3,3],4],"test4"],[[[4,4],5],"test5"]];
	json["boxes"]=[[[[10,0],[0,10]],"test1"],[[[20,0],[0,20]],"test2"],[[[30,0],[0,30]],"test3"],[[[40,0],[0,40]],"test4"]];
	json["polygons"]=[[[[10,1],[12,86],[74,95],[75,12],[15,45],[73,3]],"test1"],[[[3,7],[4,1],[9,1],[4,6]],"test2"]];
	console.log("json : ",json);
	$.ajax({
		url : './php/insert_to_verify.php',
		type : 'POST',
		data : 'json='+json,
		dataType : '',
		success : function(code, statut){
			//console.log("code_json : ",code_json);
			//console.log("statut : ",statut);
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
		},
		error : function(resultat, statut, erreur){
			//console.log("resultat : ",resultat);
			//console.log("statut : ",statut);
			//console.log("erreur : ",erreur);
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
		},
		complete : function(resultat, statut){
			//console.log("resultat : ",resultat);
			//console.log("statut : ",statut);
			json = resultat;
		}
	});
});