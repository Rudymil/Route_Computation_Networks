//var warning_zones = new Array(); // liste des warning zones
//var anomaly_zones = new Array(); // liste des anomaly zones

$(".radio_button").change(function(e) {
	
	if ( $("#warning").is(":checked") ) {
		
		featureLayerw.on('click', function(e) {  
			e.layer.closePopup();	
		});
		
		if( drawControla !=null ) {
			map.removeControl(drawControla);
		}
		if( drawControlw !=null ) {
			map.removeControl(drawControlw);
		}
		
		drawControlw = new L.Control.Draw({     
										edit: {
											featureGroup: featureLayerw,
											edit: true,
											remove: true
											},
										draw: {
											polygon: false,
											polyline: false,
											rectangle: false,
											circle: false,
											marker: false
										} }).addTo(map);
		
	}
	else if (  $("#anomaly").is(":checked") ) {
		
		featureLayera.on('click', function(e) {  
			e.layer.closePopup();	
		});
		
		if( drawControla !=null ) {
			map.removeControl(drawControla);
		}
		if( drawControlw !=null ) {
			map.removeControl(drawControlw);
		}
		
		drawControla = new L.Control.Draw({     
										edit: {
											featureGroup: featureLayera,
											edit: false,
											remove: true
											},
										draw: {
											polygon: false,
											polyline: false,
											rectangle: false,
											circle: false,
											marker: false
										} }).addTo(map);
		
	}
	else {
		
		map.openPopup();
		
		if( drawControla !=null ) {
			map.removeControl(drawControla);
		}
		if( drawControlw !=null ) {
			map.removeControl(drawControlw);
		}
		
	}
	
	
});



map.on('draw:edited', function(e) {
	
	var type = e.layerType;
	var layers = e.layers;
	if ( $("#warning").is(":checked") ) {
		layers.eachLayer(function (layer) {
			
			console.log(layer);
			var temp = layer.toGeoJSON();
			//console.log(JSON.stringify(temp));
			wzupdate.push(temp);
		});
	}
	else if (  $("#anomaly").is(":checked") ) {
		layers.eachLayer(function (layer) {
			
			//console.log(layer);
			//var temp = layer.toGeoJSON();
			//console.log(JSON.stringify(temp));
			//azupdate.push(temp);
		});
		
	}

});

map.on('draw:deleted', function(e) {

	var type = e.layerType;
    var layers = e.layers;
    if ( $("#warning").is(":checked") ) {
		layers.eachLayer(function (layer) {
			map.removeLayer(layer);
			var temp = layer.toGeoJSON();
			console.log(JSON.stringify(temp));
			wzdelete.push(temp.properties.id);
			
		});
	
	}
	else if (  $("#anomaly").is(":checked") ) {
		layers.eachLayer(function (layer) {
			map.removeLayer(layer);
			var temp = layer.toGeoJSON();
			console.log(JSON.stringify(temp));
			azdelete.push(temp.properties.id);
		});
		
	}
	
	
});
