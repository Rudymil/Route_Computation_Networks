//var warning_zones = new Array(); // liste des warning zones
//var anomaly_zones = new Array(); // liste des anomaly zones
function hmtlcwe(description,name,intensity,validationDate,expirationDate,id) {
    var nw = types_warning_zones.length;
    var debutw = "<div class='form-group'>\
			<label for='text'>Type :</label>\
			<select class='form-control' id='risk'>";
    var finw = "</select>\
			</div>\
			<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' value='"+ description +"'>\
				</div>\
			<div class='form-group'>\
  				<label for='usr'>Name:</label>\
  				<input type='text' class='form-control' id='name' value='"+ name +"'>\
				</div>\
				<div class='form-group'>\
  				<label for='usr'>Intensity :</label>\
  				<input type='number' class='form-control' id='intensity' value='"+ intensity +"'>\
				</div>\
				<div class='form-group'>\
  				<label for='usr'>Validation date :</label>\
  				<input type='date' class='form-control' id='datev' value='"+ validationDate +"'>\
				</div>\
				<div class='form-group'>\
					<label for='text'>Expiration date :</label>\
					<select class='form-control' id='datee'>\
					<option value="+ expirationDate +"  selected >"+ expirationDate +"</option>\
					<option value=true> true</option>\
					<option value=false>false</option>\
				</select>\
				</div>";

    for (var i = 0; i < nw; i++) {
		console.log(" types_warning_zones : " + types_warning_zones[i].id  + " id geojson : " + id ); 
		if ( types_warning_zones[i].id == id ) {
			console.log(" inside ");
			
			debutw = debutw + "<option value=" + types_warning_zones[i].id + " selected >" + types_warning_zones[i].name + "</option>";
		}
		else {
			//console.log(" types_warning_zones : " + types_warning_zones[i].id  + " id geojson : " + id );
			debutw = debutw + "<option value=" + types_warning_zones[i].id + " >" + types_warning_zones[i].name + "</option>";
		}
    }

    var htmlw = debutw + finw;

    return htmlw;
}


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
		
		featureLayerw.on('click', function(e) {  
			e.layer.openPopup();	
		});
		
		if( drawControla !=null ) {
			map.removeControl(drawControla);
		}
		if( drawControlw !=null ) {
			map.removeControl(drawControlw);
		}
		
	}
	
	
});



map.on('draw:editstart', function(e) {
	console.log(e);
	featureLayerw.on('click', function(e) {  
		if ( $("#warning").is(":checked") ) {
			console.log(e);	
			var layer = e.layer ;
			var layerjson= layer.toGeoJSON();
			console.log(JSON.stringify(layerjson));
			bootbox.confirm(hmtlcwe(layerjson.properties.description,layerjson.properties.name,
			layerjson.properties.intensity,layerjson.properties.validation_date,
			layerjson.properties.expiration_date,layerjson.properties.risk_type)
			, function(result) {
				if( result ) {
					//console.log("inside");
					var des = $('#description').val();
					var risk = $('#risk').val();
					var dae= $('#datee').val();
					var dav= $('#datev').val();
					var name= $('#name').val();
					var inte= $('#intensity').val();
			
					/*if (risk == null) {
						return false ;
					}*/
				
					//console.log(da);
					if (des == "") {
						return false ;
					}

					/*if (dae!=true || dae!=false )
					{
						return false;
						//da=true;
					}*/
					
					var timestamp=Date.parse(dav)
					//console.log(timestamp);
					if (isNaN(timestamp) )
					{
						return false;
						//da=null;

					}
					if ( name=="" ) {
						return false;
					}
					
					if ( isNaN(parseFloat(inte)) || !isFinite(inte)  || inte<0 ) {
						return false;
					}
					console.log(dae+' != '+layerjson.properties.expiration_date);
					console.log(layerjson.properties.description+' != '+des);
					console.log(layerjson.properties.name+' != '+name);
					console.log(layerjson.properties.intensity+' != '+inte);
					console.log(layerjson.properties.risk_type+' != '+risk);
					console.log(layerjson.properties.validation_date+' != '+dav);
					
					if ( layerjson.properties.description!=des ||
						 layerjson.properties.name!=name ||
						 layerjson.properties.intensity!=inte ||
						 layerjson.properties.risk_type!=risk ||
						 layerjson.properties.validation_date!=dav ||
						 layerjson.properties.expiration_date!=dae 
					 ) {
					
						layerjson.properties.description=des;
						layerjson.properties.name=name;
						layerjson.properties.intensity=inte;
						layerjson.properties.risk_type=risk;
						layerjson.properties.validation_date=dav;
						layerjson.properties.expiration_date=dae;
					
					
						wzupdate.push(layerjson);
					}
			
				}
				else {
					
				}

});

}
});


});


map.on('draw:edited', function(e) {
	
	var type = e.layerType;
	var layers = e.layers;
	if ( $("#warning").is(":checked") ) {
		layers.eachLayer(function (layer) {
			var b=false ;
			var j=-1;
			console.log(layer);
			var temp = layer.toGeoJSON();
			for ( var i=0 ; i<wzupdate.length ; i++) {
				if ( wzupdate[i].properties.id==temp.properties.id) {
					b=true;
					j=i;
				}
			
			}
			if ( b== false ) {
				//console.log(JSON.stringify(temp));
				wzupdate.push(temp);
			}
			else if ( b==true ) {
				wzupdate[j].geometry=temp.geometry;
			}
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
