$("body").ready(function(){ // lorsque le body est charge
	if (DEBUG){
		console.log("EVENT : $('body').ready");
	}
	while (json_countries.length <= 0){ // tant que pas rempli
		var i = 0;
		if (DEBUG){
			console.log(i);
		}
		i++;
	}
	if (DEBUG){
		console.log("EVENT : $('body').ready json_countries : ", json_countries);
	}
	if (json_countries.lenght > 0){ // si y a des pays
		for (object in json_countries){
		$("#panel-element-204612>.panel-body").append("div").addClass("row").append("div").addClass("col-xs-12").append("center").append("button").addType("button").addClass("btn btn-primary btn-xm").addId(json_countries[object]["name"]).append(json_countries[object]["name"]);
		}
	}
});

$("#nigeria").click(function(){ // reset sur port harcourt
	map.setView(new L.LatLng(4.804448, 7.016409),13);
});

$("#angola").click(function(){ // reset sur luanda
	map.setView(new L.LatLng(-8.830395, 13.236284),14);
});