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
		url : '../php/select_all.php',
		type : 'POST',
		dataType : 'json',
		success : function(code_json, statut){
			//console.log("code_json : ",code_json);
			//console.log("statut : ",statut);
			$.notify(
				"Loading areas succes", 
				{
					position: "top"
				},
				"success"
			);
		},
		error : function(resultat, statut, erreur){
			//console.log("resultat : ",resultat);
			//console.log("statut : ",statut);
			//console.log("erreur : ",erreur);
			$.notify(
				"Loading areas error", 
				{
					position: "top"
				},
				"success"
			);
		},
		complete : function(resultat, statut){
			if (status == 200){
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
				$("#dep").notify(
					"Enter departure !!!", 
					{
						position: "top center"
					},
					"error"
				);
			}
			if (latlng[1].includes("") || latlng[1].includes(NaN) || latlng[1].includes(undefined)){
				$("#dest").notify(
					"Enter destination !!!", 
					{
						position: "top center"
					},
					"error"
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
					$("#calculate").notify(
						"Request succes", 
						{
							position: "bottom center"
						},
						"success"
					);
				},
				error : function(resultat, statut, erreur){
					//console.log("resultat : ",resultat);
					//console.log("statut : ",statut);
					//console.log("erreur : ",erreur);
					$("#calculate").notify(
						"Request error", 
						{
							position: "bottom center"
						},
						"error"
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
		$("#calculate").notify(
			"Size error !!!", 
			{
				position: "bottom center"
			},
			"error"
		);
	}
});

$("#submit1").click(function(){ // envoie toutes les zones dangereuses
	var json = new Array();
	//console.log(json);
	$.ajax({
		url : '../php/insert_to_valid.php',
		type : 'POST',
		dataType : '',
		success : function(code, statut){
			//console.log("code_json : ",code_json);
			//console.log("statut : ",statut);
			$("#submit1").notify(
				"Request succes", 
				{
					position: "bottom center"
				},
				"success"
			);
		},
		error : function(resultat, statut, erreur){
			//console.log("resultat : ",resultat);
			//console.log("statut : ",statut);
			//console.log("erreur : ",erreur);
			$("#submit1").notify(
				"Request error", 
				{
					position: "bottom center"
				},
				"error"
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
	//console.log(json);
	$.ajax({
		url : '../php/insert_to_verify.php',
		type : 'POST',
		dataType : '',
		success : function(code, statut){
			//console.log("code_json : ",code_json);
			//console.log("statut : ",statut);
			$("#submit2").notify(
				"Request succes", 
				{
					position: "bottom center"
				},
				"success"
			);
		},
		error : function(resultat, statut, erreur){
			//console.log("resultat : ",resultat);
			//console.log("statut : ",statut);
			//console.log("erreur : ",erreur);
			$("#submit2").notify(
				"Request error", 
				{
					position: "bottom center"
				},
				"error"
			);
		},
		complete : function(resultat, statut){
			//console.log("resultat : ",resultat);
			//console.log("statut : ",statut);
			json = resultat;
		}
	});
});