/*var markerDeparture=null;

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
            markerDeparture = L.marker([e.latitude, e.longitude],{icon: greenIcon, draggable: true}).bindPopup(e.latitude + ", " + e.longitude);
            map.addLayer(markerDeparture);
            $("#dep").val(e.latitude + ", " + e.longitude);
            markerDeparture.on("dragend",function(ev){
				$("#dep").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);
				markerDeparture.bindPopup(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng)});
              
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
					type: "warning",
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
 			markerDeparture = L.marker([ep.latlng.lat, ep.latlng.lng],{icon: greenIcon , draggable: true}).bindPopup(ep.latlng.lat + ", " + ep.latlng.lng);
            map.addLayer(markerDeparture);
            $("#dep").val(ep.latlng.lat + ", " + ep.latlng.lng);
            map.setView(markerDeparture.getLatLng(),13);
            hideContextMenu1();
             markerDeparture.on("dragend",function(ev){
				$("#dep").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);
				markerDeparture.bindPopup(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng)});

 	 });  
  
	$("#cm_fin").click(ep,function(){ 
  			if( markeraDestination != null ) {
			map.removeLayer(markeraDestination);
			}
  			markeraDestination= L.marker([ ep.latlng.lat , ep.latlng.lng],{icon: redIcon, draggable: true}).bindPopup(ep.latlng.lat + ", " + ep.latlng.lng);
  			map.addLayer(markeraDestination)
  			$("#dest").val(ep.latlng.lat + ", " + ep.latlng.lng);
  			map.setView(markeraDestination.getLatLng(),13);
  			hideContextMenu1();
  			markeraDestination.on("dragend",function(ev){
				$("#dest").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);
				markeraDestination.bindPopup(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng)});
  });  
  
}





// function to remove markers
$("#remove").click(function(){
	 if ($("#Navigate").is(":checked")){
	 $("#dep").val("");
	 $("#dest").val("");
	 map.removeLayer(markeraDestination);
	 map.removeLayer(markerDeparture);
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
			markerDeparture = L.marker([latdep, lngdep],{icon: greenIcon , draggable: true}).bindPopup(latdep + ", " +lngdep);
			map.addLayer(markerDeparture);
			$("#dep").val(temp2);
			$("#dest").val("");
			markerDeparture.on("dragend",function(ev){
				$("#dep").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);
				markerDeparture.bindPopup(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng)});
		}
		
		else if( $("#dest").val() == "" ) {
			map.removeLayer(markerDeparture);
			markeraDestination = L.marker([latdest, lngdest],{icon: redIcon , draggable: true}).bindPopup(latdest+ ", " +lngdest);
			map.addLayer(markeraDestination);
			$("#dest").val(temp1);
			$("#dep").val("");
			markeraDestination.on("dragend",function(ev){
				$("#dest").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);
				markeraDestination.bindPopup(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng)});
		}
		
			
		
		else {
		map.removeLayer(markerDeparture);
		map.removeLayer(markeraDestination);
			
		markerDeparture = L.marker([latdep, lngdep],{icon: greenIcon , draggable: true}).bindPopup(latdep+ ", " +lngdep);
		map.addLayer(markerDeparture);
		
		markeraDestination = L.marker([latdest, lngdest],{icon: redIcon , draggable: true}).bindPopup(latdest+ ", " +lngdest);
		map.addLayer(markeraDestination);
		
		$("#dest").val(temp1);
		$("#dep").val(temp2);
		markerDeparture.on("dragend",function(ev){
            $("#dep").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);
            markerDeparture.bindPopup(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng)});
            
        markeraDestination.on("dragend",function(ev){
            $("#dest").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);
            markeraDestination.bindPopup(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng)});
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
			markerDeparture= L.marker([lat ,lng],{icon: greenIcon , draggable: true}).bindPopup(lat+ ", " +lng);
			map.addLayer(markerDeparture);
			markerDeparture.on("dragend",function(ev){
				$("#dep").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);
				markerDeparture.bindPopup(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng)});
            //map.panTo(markerDeparture.getLatLng());
				map.setView(markerDeparture.getLatLng(),13);
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
			markeraDestination= L.marker([lat ,lng],{icon: redIcon , draggable: true}).bindPopup(lat+ ", " +lng);
			map.addLayer(markeraDestination);
			markeraDestination.on("dragend",function(ev){
				$("#dest").val(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng);
				markeraDestination.bindPopup(ev.target.getLatLng().lat + ", " + ev.target.getLatLng().lng)});
            //map.panTo(markeraDestination.getLatLng());
            map.setView(markeraDestination.getLatLng(),13);
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
}*/

spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
spanstart.addClass("start");
spanend = $(".leaflet-routing-geocoder").last().find("span");
spanend.addClass("end");

var controlPenalty = L.Routing.control({
    waypoints: [null],
    routeWhileDragging: true,
    show: true,
    language: 'en',
    geocoder: L.Control.Geocoder.nominatim(),
    autoRoute: true,
    createMarker: function(i, wp) {
        var marker = L.marker(wp.latLng, {
            draggable: true
        });
        marker.on("click", function(e) {
            marker.bindPopup(e.latlng.lat + ", " + e.latlng.lng);
            //alert (e.latlng.lat + ", " +e.latlng.lng);
        });
        return marker;
    },
    router: L.Routing.osrmv1({
        serviceUrl: 'http://172.31.57.114:5001/route/v1'
    }),
    lineOptions: {
        styles: [{
            color: 'blue',
            opacity: 1,
            weight: 5
        }]
    },
    summaryTemplate: '<h2><font color="blue">SAFE ROUTE</font> {name}</h2><h3>{distance}, {time}</h3>'
}).addTo(map);


function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}


map.on('click', function(e) {
    if ($("#Navigate").is(":checked") == true) {
        var container = L.DomUtil.create('div'),
            startBtn = createButton('Start from this location', container),
            destBtn = createButton('Go to this location', container);
        L.DomEvent.on(startBtn, 'click', function() {
            //controlPenalty.spliceWaypoints(0, 1, e.latlng);
            latlngstart = [e.latlng.lat, e.latlng.lng, "start"];
            position = e.latlng;
            send_ajax_point(latlngstart);
            spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
            spanstart.addClass("start");
            spanend = $(".leaflet-routing-geocoder").last().find("span");
            spanend.addClass("end");
            map.closePopup();
        });
        L.DomEvent.on(destBtn, 'click', function() {
            //controlPenalty.spliceWaypoints(controlPenalty.getWaypoints().length - 1, 1, e.latlng);
            latlngend = [e.latlng.lat, e.latlng.lng, "end"];
            position = e.latlng;
            send_ajax_point(latlngend);
            spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
            spanstart.addClass("start");
            spanend = $(".leaflet-routing-geocoder").last().find("span");
            spanend.addClass("end");
            map.closePopup();
        });
        L.popup()
            .setContent(container)
            .setLatLng(e.latlng)
            .openOn(map);
    }
});

var geoloc = L.easyButton({
    states: [{
        stateName: 'show me where I am',
        icon: 'fa-map-marker',
        title: 'Show me where I am, yo!',
        onClick: function(control) {
            //alert("test");
            control._map.on('locationfound', function(e) {
                controlPenalty.spliceWaypoints(0, 1, e.latlng);
                //map.closePopup();
            });
            control._map.on('locationerror', function(e) {
                $.notify({
                    title: "<strong>Geolocalisation</strong>",
                    message: "Location access denied."
                }, {
                    type: "warning",
                    placement: {
                        from: "bottom",
                        align: "center"
                    }
                });
            });

            control._map.locate({
                setView: true,
                maxZoom: 16
            });
        }
    }]
});

geoloc.addTo(map);



$(document).on('click', '.leaflet-routing-remove-waypoint.start', function() {
    //alert("start");
    countrystart = new Array(2);
    spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
    spanstart.addClass("start");
    spanend = $(".leaflet-routing-geocoder").last().find("span");
    spanend.addClass("end");
});



$(document).on('click', '.leaflet-routing-remove-waypoint.end', function() {
    //alert("end");
    countryend = new Array(2);
    spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
    spanstart.addClass("start");
    spanend = $(".leaflet-routing-geocoder").last().find("span");
    spanend.addClass("end");
});


$(document).on('click', '.leaflet-routing-add-waypoint', function() {
    //alert("test");
    spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
    spanstart.addClass("start");
    spanend = $(".leaflet-routing-geocoder").last().find("span");
    spanend.addClass("end");
});


/*var c=$( ".leaflet-routing-geocoder" ).eq(0).find("input");
 $(document).on('click', c ,function(){
		  alert("test");
          
 });*/