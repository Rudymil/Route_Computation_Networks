function countries_DOM(){
	if (DEBUG){
		console.log("countries_DOM json_countries : ", json_countries);
	}
	if (json_countries.length > 0){ // si y a des pays
		for (object in json_countries){
			if (DEBUG){
				console.log("countries_DOM object : ", object);
				console.log("countries_DOM json_countries[object] : ", json_countries[object]);
			}
			$("#panel-element-204612>.panel-body").append('<div class="row"><div class="col-xs-12" ></div><center><button type="button" class="btn btn-primary btn-xm" id='json_countries[object]["name"]'>'json_countries[object]["name"]'</button></center></div>');
		}
	}
}

$("#nigeria").click(function(){ // reset sur port harcourt
	map.setView(new L.LatLng(4.804448, 7.016409),13);
});

$("#angola").click(function(){ // reset sur luanda
	map.setView(new L.LatLng(-8.830395, 13.236284),14);
});