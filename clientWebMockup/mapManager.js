$(function(){
  var map = L.map('map').setView([43.60, 3.85], 13);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  function createButton(label, container) {
      var btn = L.DomUtil.create('button', '', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = label;
      return btn;
  }

  var sourceIcon = L.divIcon({className: 'source-div-icon'});
  var source = L.marker([43.6026628, 3.8776791], {icon: sourceIcon});
  source.addTo(map);

  var destinationIcon = L.divIcon({className: 'destination-div-icon'});
  var destination = L.marker([43.5971788,3.886726], {icon: destinationIcon});
  destination.addTo(map);

  var group = new L.featureGroup([source, destination]);
  updateBounds();


  map.on('click', function(e) {
      var container = L.DomUtil.create('div'),
          startBtn = createButton('Start from this location', container),
          destBtn = createButton('Go to this location', container);


      L.popup()
          .setContent(container)
          .setLatLng(e.latlng)
          .openOn(map);

      L.DomEvent.on(startBtn, 'click', function() {
          console.log("click start button");
          console.log(e.latlng);
          source.setLatLng(e.latlng);
          map.closePopup();
          updateBounds();

          route('weight_fusion', displayGreenRouting);
          route('length', displayRedRouting);
      });

      L.DomEvent.on(destBtn, 'click', function() {
          console.log("click dest button");
          // L.Control.spliceWaypoints(L.Control.getWaypoints().length - 1, 1, e.latlng);
          destination.setLatLng(e.latlng);
          map.closePopup();
          console.log(updateBounds());

          route('weight_fusion', displayGreenRouting);
          route('length', displayRedRouting);
      });
  });

  function updateBounds() {
    map.fitBounds(group.getBounds());
    return group.getBounds();
  }






  // GEOJSON
  // Be careful : lat lon inversed
  var geojsonFeature = [{
    "type": "Feature",
    "properties": {
      "party": "Republican"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [3.87, 43.60],
          [3.87, 43.59],
          [3.889, 43.59],
          [3.889, 43.60],
          [3.87, 43.60],
        ]
      ]
    }
  }];

  L.geoJSON(geojsonFeature).addTo(map);




  var POINTS = [
    L.latLng(43.5772231,3.8766892),
    L.latLng(43.5871788,3.886726)
  ];
  var routing = new L.Polyline(POINTS , {
      color: 'green',
      weight: 3,
      opacity: 0.5,
      smoothFactor: 1
  });
  routing.addTo(map);


  var REDPOINTS = [
    L.latLng(43.5772231,3.8766892),
    L.latLng(43.5871788,3.886726)
  ];
  var RedRouting = new L.Polyline(REDPOINTS , {
      color: 'red',
      weight: 3,
      opacity: 0.5,
      smoothFactor: 1
  });
  RedRouting.addTo(map);


  function route(weightType, functionDisplay){
    console.log(weightType);
    $.ajax({

      url : "../NetworkxExploration/server.php",
      type : "GET",
      data : 'lonSource=' + source.getLatLng().lng + '&latSource=' + source.getLatLng().lat + '&lonTarget=' + destination.getLatLng().lng + '&latTarget=' + destination.getLatLng().lat + '&weightType=\"' + weightType + '\"',
      beforeSend: function() {
         map.spin(true);
      },
      complete: function(){
        map.spin(false);
      },
      success : function(data){
        console.log(data);
        functionDisplay(data);
      }
    })
    // console.log(POINTS);
  }

  var displayGreenRouting = function (data, textStatus, xhr){
    console.log("HEY it s working");
    console.log(data);
    arrayData = JSON.parse(data);

    POINTS = [];

    for (var coor in arrayData) {
      lat = arrayData[coor][0];
      lon = arrayData[coor][1];
      POINTS.push(new L.latLng(lat, lon));
    }

    routing.setLatLngs(POINTS);
  }

  var displayRedRouting = function (data, textStatus, xhr){
    arrayData = JSON.parse(data);
    REDPOINTS = [];
    for (var coor in arrayData) {
      lat = arrayData[coor][0];
      lon = arrayData[coor][1];
      REDPOINTS.push(new L.latLng(lat, lon));
    }

    RedRouting.setLatLngs(REDPOINTS);
  }

  route('weight_fusion', displayGreenRouting);
  route('length', displayRedRouting);


  // L.Routing.control({
  //   waypoints: [
  //
  //   ]
  // }).addTo(map);

});
