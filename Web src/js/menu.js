$("#nigeria").click(function(){
	map.setView(new L.LatLng(4.804448, 7.016409),13);
});

$("#angola").click(function(){
	map.setView(new L.LatLng(-8.830395, 13.236284),14);
});

$("#geo").click(function(){
	var control = L.control.layers(map)
	console.log("je suis la");	
	L.control.locate({
		strings: {
			title: "Show me where I am, yo!"
		}
	}).addTo(map);
});

