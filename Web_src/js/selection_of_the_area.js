$("body").ready(function(){ // lorsque le body est charge
	if (DEBUG){
		console.log("EVENT : $('body').ready");
	}
	var DOM = $("#panel-element-204612>.panel-body");
});

$("#nigeria").click(function(){ // reset sur port harcourt
	map.setView(new L.LatLng(4.804448, 7.016409),13);
});

$("#angola").click(function(){ // reset sur luanda
	map.setView(new L.LatLng(-8.830395, 13.236284),14);
});