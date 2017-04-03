$("body").ready(function(){ // lorsque le body est charge
	if (DEBUG){
		console.log("EVENT : $('body').ready");
	}
	var DOM = $("#panel-element-204612>.panel-body");
	for (object in json_countries){
		DOM.add("div").addClass("row").append("div").addClass("col-xs-12").append("center").append("button").addType("button").addClass("btn btn-primary btn-xm").addId(json_countries[object]["name"]).append(json_countries[object]["name"]);
	}
});

$("#nigeria").click(function(){ // reset sur port harcourt
	map.setView(new L.LatLng(4.804448, 7.016409),13);
});

$("#angola").click(function(){ // reset sur luanda
	map.setView(new L.LatLng(-8.830395, 13.236284),14);
});