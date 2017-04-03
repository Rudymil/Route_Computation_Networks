function countries_DOM(){ // construit les boutons
	if (DEBUG){
		console.log("EVENT : $('body').ready");
		console.log("EVENT : $('body').ready json_countries : ", json_countries);
	}
	for (object in json_countries){
		$("#panel-element-204612>.panel-body").append("div").addClass("row").append("div").addClass("col-xs-12").append("center").append("button").addType("button").addClass("btn btn-primary btn-xm").addId(json_countries[object]["name"]).append(json_countries[object]["name"]);
	}
}

$("#nigeria").click(function(){ // reset sur port harcourt
	map.setView(new L.LatLng(4.804448, 7.016409),13);
});

$("#angola").click(function(){ // reset sur luanda
	map.setView(new L.LatLng(-8.830395, 13.236284),14);
});