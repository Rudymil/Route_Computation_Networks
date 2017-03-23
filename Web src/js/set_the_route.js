var markerDeparture=null;

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
            //console.log(e);
            //alert("Location access denied.");
            $.notify(
	            {
	            	title: "<strong>Geolocalisation</strong>",
	            	message: "Location access denied."
	            },
	            {
					type: "danger",
					placement: {
						from: "bottom",
						align: "center"
					}
	            }
            );
        });

var markeraDestination=null;

//Function to define the state of the marker drawn on the map 
map.on('dblclick', function addmarker(e) {
	if ($("#Navigate").is(":checked")){
	map.doubleClickZoom.disable();
	
	var pos = {
      x: e.originalEvent.pageX,
      y: e.originalEvent.pageY
    };
	//console.log(e.latlng.lat);
	var ce=e;
	showContextMenu1( markeraDestination, pos,ce);
	}

});

map.on("click", function() {
hideContextMenu1();
});

//Function to hide the marker state menu
function hideContextMenu1(){
$("#context_menu1").css("display","none");
}

//Function to vizualize the marker state menu
function showContextMenu1( marker, pos,ep){

  // positionne le context menu
  var oElem = $("#context_menu1");    
   $("#context_menu1").css("left",pos.x +'px');
   $("#context_menu1").css("top",pos.y +'px');
   $("#context_menu1").css("display","block");
   
  //affecte les fonctions
 	$("#cm_debut").click(ep,function(){
 			if( markerDeparture != null ) {
			map.removeLayer(markerDeparture);
			}
 			markerDeparture = L.marker([ep.latlng.lat, ep.latlng.lng],{icon: greenIcon , draggable: true}).bindPopup('Your are here');
            map.addLayer(markerDeparture);
            $("#dep").val(ep.latlng.lat + ", " + ep.latlng.lng);
            hideContextMenu1();
             markerDeparture.on("dragend",function(ev){
            $("#dep").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);});

 	 });  
  
	$("#cm_fin").click(ep,function(){ 
  			if( markeraDestination != null ) {
			map.removeLayer(markeraDestination);
			}
  			markeraDestination= L.marker([ ep.latlng.lat , ep.latlng.lng],{icon: redIcon, draggable: true}).bindPopup('Your destination');
  			map.addLayer(markeraDestination)
  			$("#dest").val(ep.latlng.lat + ", " + ep.latlng.lng);
  			hideContextMenu1();
  			markeraDestination.on("dragend",function(ev){
            $("#dest").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);});
  });  
  
}





// function to remove markers
$("#remove").click(function(){
	 if ($("#Navigate").is(":checked")){
	 $("#dep").val("");
	 $("#dest").val("");
	 map.removeLayer(markeraDestination);
	 map.removeLayer(markerDeparture);
	 markerDeparture.on("dragend",function(ev){
            $("#dep").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);});
 }
});

// function to switch departure and destination markers
$("#inverse").click(function(){
	if ($("#Navigate").is(":checked")){
		var temp1=$("#dep").val();
		var temp2=$("#dest").val();
		
		
		var latdep= temp2.substring(0, temp2.indexOf(","));
		var lngdep=temp2.substring(temp2.indexOf(",") + 1);
		
		var latdest= temp1.substring(0, temp1.indexOf(","));
		var lngdest=temp1.substring(temp1.indexOf(",") + 1);
		
	  
		if( $("#dep").val() == "" ) {
			map.removeLayer(markeraDestination);
			markerDeparture = L.marker([latdep, lngdep],{icon: greenIcon , draggable: true});
			map.addLayer(markerDeparture);
			$("#dep").val(temp2);
			$("#dest").val("");
			markerDeparture.on("dragend",function(ev){
            $("#dep").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);});
		}
		
		else if( $("#dest").val() == "" ) {
			map.removeLayer(markerDeparture);
			markeraDestination = L.marker([latdest, lngdest],{icon: redIcon , draggable: true});
			map.addLayer(markeraDestination);
			$("#dest").val(temp1);
			$("#dep").val("");
			markeraDestination.on("dragend",function(ev){
            $("#dest").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);});
		}
		
			
		
		else {
		map.removeLayer(markerDeparture);
		map.removeLayer(markeraDestination);
			
		markerDeparture = L.marker([latdep, lngdep],{icon: greenIcon , draggable: true});
		map.addLayer(markerDeparture);
		
		markeraDestination = L.marker([latdest, lngdest],{icon: redIcon , draggable: true});
		map.addLayer(markeraDestination);
		
		$("#dest").val(temp1);
		$("#dep").val(temp2);
		markerDeparture.on("dragend",function(ev){
            $("#dep").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);});
        markeraDestination.on("dragend",function(ev){
            $("#dest").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);});
		}
	}
});


 // function to validate the coordinates of the marker departure and draw it on the map
$("#godep").click(function(){ 
	if ($("#Navigate").is(":checked")){

		var value=$("#dep").val();
		var lat= value.substring(0, value.indexOf(","));
		var lng=value.substring(value.indexOf(",") + 1);
        var temp=value.split('');
        var temp1=0;
        var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
       
        for(var i = 0; i < temp.length; i++)
        {
            if(temp[i] == ',')
                temp1++;
        }
        
        if (lat == '' || lng == '' || lat == '.' || lng == '.' || temp1>1 || (!floatRegex.test(lat) && !floatRegex.test(lng))||(isNaN(lat) && isNaN(lng)) || lat > 90 || lat < -90 || lng > 90 || lng < -90){
			//alert ("coordinates not valid");
			$.notify(
				{
					title: "<strong>Departure</strong>",
					message: "coordinates not valid",
				},{
					type: "danger",
					placement: {
						from: "bottom",
						align: "center"
					}
				}
			);
			$("#dep").val(markerDeparture.getLatLng().lat + ", " + markerDeparture.getLatLng().lng);
		}
        else {	
			if( markerDeparture !=null) {	
				map.removeLayer(markerDeparture);
			}
			markerDeparture= L.marker([lat ,lng],{icon: greenIcon , draggable: true});
			map.addLayer(markerDeparture);
			markerDeparture.on("dragend",function(ev){
            $("#dep").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);});
            map.panTo(markerDeparture.getLatLng());
		}
	}
		
});

// function to validate the coordinates of the marker destination and draw it on the map
$("#godest").click(function(){ 
	if ($("#Navigate").is(":checked")){

		var value=$("#dest").val();
		var lat= value.substring(0, value.indexOf(","));
		var lng=value.substring(value.indexOf(",") + 1);
        var temp=value.split('');
        var temp1=0;
        var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
       
        for(var i = 0; i < temp.length; i++)
        {
            if(temp[i] == ',')
                temp1++;
        }
        
        if (lat == '' || lng == '' || lat == '.' || lng == '.' || temp1>1 || (!floatRegex.test(lat) && !floatRegex.test(lng))||(isNaN(lat) && isNaN(lng)) || lat > 90 || lat < -90 || lng > 90 || lng < -90){
			//alert ("coordinates not valid");
			$.notify(
				{
					title: "<strong>Destination</strong>",
					message: "coordinates not valid",
				},{
					type: "danger",
					placement: {
						from: "bottom",
						align: "center"
					}
				}
			);
			$("#dest").val(markeraDestination.getLatLng().lat + ", " + markeraDestination.getLatLng().lng);
		}
        else {
			if( markeraDestination !=null){	
				map.removeLayer(markeraDestination);
			}
			markeraDestination= L.marker([lat ,lng],{icon: redIcon , draggable: true});
			map.addLayer(markeraDestination);
			markeraDestination.on("dragend",function(ev){
            $("#dest").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);});
            map.panTo(markeraDestination.getLatLng());
		}
	}
		
});



var latlng = new Array(2); //  contiendra le debut et la fin de l itineraire

// fonction pour affecter les coordonnées de départ et d'arrivée à la variable latlng
function affect(){
var latdep= $("#dep").val().substring(0, $("#dep").val().indexOf(","));
var lngdep=$("#dep").val().substring($("#dep").val().indexOf(",") + 1);
var temp= new Array(2);
//console.log(latdep);
//console.log(lngdep);
temp[0]=[latdep,lngdep];
latlng[0]=temp[0];
//console.log(latlng[0]);
//latlng[0][0]=latdep;
//latlng[0][1]=lngdep;

var latdes= $("#dest").val().substring(0, $("#dest").val().indexOf(","));
var lngdes=$("#dest").val().substring($("#dest").val().indexOf(",") + 1);
temp[1]=[latdes,lngdes];
latlng[1]=temp[1];
//latlng[1][0]=latdes;
//latlng[1][1]=lngdes;
}