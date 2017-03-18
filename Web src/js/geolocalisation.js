// Define icons
var greenIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-green.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var redIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-red.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var markerDeparture=null;

// function for geolocation
map.locate({setView: true, watch: true}).on('locationfound', function(e){
 			if( markerDeparture != null ) {
			map.removeLayer(markerDeparture);
			}
            markerDeparture = L.marker([e.latitude, e.longitude],{icon: greenIcon, draggable: true}).bindPopup('Your are here');
            map.addLayer(markerDeparture);
            $("#dep").val(e.latitude + ", " + e.longitude);
              
        })
       .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
        });

var markeraDestination=null;

//Function to define the state of the marker drawn on the map 
map.on('dblclick', function(e) {
	map.doubleClickZoom.disable();
	
	var pos = {
      x: e.originalEvent.pageX,
      y: e.originalEvent.pageY
    };
	//console.log(e.latlng.lat);
	var ce=e;
	showContextMenu( markeraDestination, pos,ce)
});


//Function to hide the marker state menu
function hideContextMenu(){
$("#context_menu").css("display","none");
}

//Function to vizualize the marker state menu
function showContextMenu( marker, pos,ep){
  // positionne le context menu
  var oElem = $("#context_menu");    
   $("#context_menu").css("left",pos.x +'px');
   $("#context_menu").css("top",pos.y +'px');
   $("#context_menu").css("display","block");
   
  //affecte les fonctions
 	$("#cm_debut").click(ep,function(){
 			if( markerDeparture != null ) {
			map.removeLayer(markerDeparture);
			}
 			markerDeparture = L.marker([ep.latlng.lat, ep.latlng.lng],{icon: greenIcon , draggable: true}).bindPopup('Your are here');
            map.addLayer(markerDeparture);
            $("#dep").val(ep.latlng.lat + ", " + ep.latlng.lng);
 	 });  
  
  $("#cm_fin").click(ep,function(){ 
  			if( markeraDestination != null ) {
			map.removeLayer(markeraDestination);
			}
  			markeraDestination= L.marker([ ep.latlng.lat , ep.latlng.lng],{icon: redIcon, draggable: true}).bindPopup('Your destination');
  			map.addLayer(markeraDestination)
  			$("#dest").val(ep.latlng.lat + ", " + ep.latlng.lng);
  });  
  
}

// hide the menu
$("#document").bind("click",function(){
    hideContextMenu();
}, false);
$("#document").bind("click",function (e) {
    var key = e.keyCode;
    if (key === 27) {
        hideContextMenu();
    }
});

map.on('mousedown', function (e) {
    hideContextMenu();
});

//Function to drag the marker
map.on('click',
  function mapClickListen(e) {
  
	if( markerDeparture !=null) {
    //console.log('map click event');

    markerDeparture.on('drag', function(e) {
      //console.log('marker drag event');
    });
    
    
    markerDeparture.on('dragstart', function(e) {
      //console.log('marker dragstart event');
      map.off('click', mapClickListen);
    });
    
    
    markerDeparture.on('dragend', function(e) {
      //console.log('marker dragend event');
      setTimeout(function() {
        map.on('click', mapClickListen);
      }, 10);
     $("#dep").val(e.target._latlng.lat + ", " + e.target._latlng.lng);
    });
  
  }
  }
);


map.on('click',
  function mapClickListen(e) {
  
	if( markeraDestination !=null) {
    //console.log('map click event');

    markeraDestination.on('drag', function(e) {
      //console.log('marker drag event');
    });
    
    
    markeraDestination.on('dragstart', function(e) {
      //console.log('marker dragstart event');
      map.off('click', mapClickListen);
    });
    
    
    markeraDestination.on('dragend', function(e) {
      //console.log('marker dragend event');
      setTimeout(function() {
        map.on('click', mapClickListen);
      }, 10);
     $("#dest").val(e.target._latlng.lat + ", " + e.target._latlng.lng);
    });
  
  }
  }
);

// function to remove markers
$("#remove").click(function(){
	map.removeLayer(markeraDestination);
	map.removeLayer(markerDeparture);
	 $("#dep").val("");
	 $("#dest").val("");
});

// function to switch departure and destination markers
$("#inverse").click(function(){
	
	map.removeLayer(markeraDestination);
	map.removeLayer(markerDeparture);
	
	var temp1=$("#dep").val();
	var temp2=$("#dest").val();
	
	var latdep= temp2.substring(0, temp2.indexOf(","));
    var lngdep=temp2.substring(temp2.indexOf(",") + 1);
    
    var latdest= temp1.substring(0, temp1.indexOf(","));
    var lngdest=temp1.substring(temp1.indexOf(",") + 1);
    
	markerDeparture = L.marker([latdep, lngdep],{icon: greenIcon , draggable: true});
    map.addLayer(markerDeparture);
    
    markeraDestination = L.marker([latdest, lngdest],{icon: redIcon , draggable: true});
    map.addLayer(markeraDestination);
    
    $("#dest").val(temp1);
	$("#dep").val(temp2);
	
});

// function to Function to validate the coordinates of the marker and draw it on the map

	function gomarker(marker,value,icon){
		if( marker !=null) {
		map.removeLayer(marker);
	}
		
		var lat= value.substring(0, value.indexOf(","));
		var lng=value.substring(value.indexOf(",") + 1);
        
        if (lat == '' || lng == '' || lat == '.' || lng == '.')
			alert ("coordinates not valid")
        
        var temp=value.split('');
        var temp1=0;
         for(var i = 0; i < temp.length; i++)
        {
            if(temp[i] == ',')
                temp1++;
        }
        if (temp1>1)
        
			alert("coordinates not valid");
          
    var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
    if (!floatRegex.test(lat) && !floatRegex.test(lng))
        alert("coordinates not valid");

    //lat = parseFloat(lat);
    //lng = parseFloat(lng);
    
    if (isNaN(lat) && isNaN(lng))
        alert("coordinates not valid");
    if(lat > 90 || lat < -90 || lng > 90 || lng < -90)
        alert("coordinates not valid");
    
    marker= L.marker([lat ,lng],{icon: icon});
    map.addLayer(marker);
     }
$("#godep").click(function(){ gomarker(markerDeparture,$("#dep").val(),greenIcon)});
	
$("#godest").click(function(){ gomarker(markeraDestination,$("#dest").val(),redIcon)});
