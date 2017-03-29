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
  var source = L.marker([-8.813164208307176, 13.239684104919435], {icon: sourceIcon});


  source.addTo(map);

  var destinationIcon = L.divIcon({className: 'destination-div-icon'});
  var destination = L.marker([-8.826236443833862,13.251399993896486], {icon: destinationIcon});
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

          route('weight_fusion', displayGreenRouting);
          route('length', displayRedRouting);
      });
  });

  function updateBounds() {
    map.fitBounds(group.getBounds());
    map.setZoom(map.getBoundsZoom(group.getBounds()) - 3);
    return group.getBounds();
  }

  $.ajax({
    dataType: "json",
    url : "../NetworkxExploration/getWarningZones.php",
    type : "GET",
    success : function(data){
      var geojsonFeature = JSON.parse(data);
      L.geoJSON(geojsonFeature,
        {
          style: function(feature) {

            return {color: "rgb("+(255-feature.properties.weight)+","+feature.properties.weight+",255)"};
          }
        }
      ).addTo(map);
    }
  })



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


  function toRadian(degrees) {
    return degrees * Math.PI / 180 ;
  };

  function toDegrees(radians) {
    return radians * 180 / Math.PI;
  };

  function norm(vector)
  {
      var norm = 0;

      for (var i = 0; i < vector.length; i++) {
        norm += vector[i] * vector[i];
      }

      return Math.sqrt(norm);
  }

  function dot(vector1, vector2)
  {
      prod = 0;

      for (var i = 0; i < vector1.length; i++) {
        prod += (vector1[i] * vector2[i]);
      }

      return prod;
  }

  function vectorize(from, to){
    var vector = new Array();

    for (var i = 0; i < from.length; i++) {
      vector.push(to[i] - from[i]);
    }

    return vector;
  }

  function multiply(vector1, vector2){
    var vector = new Array();

    for (var i = 0; i < vector1.length; i++) {
      vector.push(vector1[i] * vector2[i]);
    }

    return vector;
  }

  function computeAngle(vector1, vector2){
    // var angle = Math.acos(dot(vector1, vector2) / (norm(vector1) * norm(vector2)));
    // var sinusSigne = norm(multiply(vector1, vector2)) / (norm(vector1)*norm(vector2));
    // console.log(sinusSigne);

    // atan2(v2.y,v2.x) - atan2(v1.y,v1.x)

    var angle = Math.atan2(vector2[1],vector2[0]) - Math.atan2(vector1[1], vector1[0]);
    if (angle < 0){
      angle += 2*Math.PI;
    }
    return angle;
    // return Math.sign(sinusSigne) * angle; // angle in radians
  }


  function haversine(lon1, lat1, lon2, lat2){
    // Calculate the great circle distance between two points
    // on the earth (specified in decimal degrees)
    // default unit : km

    // convert decimal degrees to radians

    [lon1, lat1, lon2, lat2] = [lon1, lat1, lon2, lat2].map(toRadian);

    // haversine formula
    dlon = lon2 - lon1 ;
    dlat = lat2 - lat1 ;
    a = Math.sin(dlat/2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon/2)**2 ;
    c = 2 * Math.asin(Math.sqrt(a)) ;
    r = 6371 ; // Radius of earth in kilometers. Use 3956 for miles
    r *= 1000 ; // to meters
    return c * r ;
  }


  function generateRoadMap(data){
    // console.log(data);
    arrayData = JSON.parse(data);


    // for (var coor in arrayData) {
    //
    //     lat = arrayData[coor][0];
    //     lon = arrayData[coor][1];
    //     console.log(lat,lon);
    // }
    var i = 0;
    var x;
    var y;
    var z;
    var n = 3;

    // var index = 0;
    // [x, y, z] = arrayData.slice(index, index + n);
    //
    // var distance = haversine(x[0], x[1], y[0], y[1])
    // console.log("distance : ", distance, "m");
    //
    // var angle = computeAngle(vectorize(y,x), vectorize(y,z))
    // console.log("angle : ", toDegrees(angle), "degrees");

    i = arrayData.length - n ;
    var index = 0;
    var cumulDistance = 0;
    var seuilDistance = 500;
    while (i>0){
      [x, y, z] = arrayData.slice(index, index + n);

      var distance = haversine(x[0], x[1], y[0], y[1])
      if (cumulDistance == 0){

        cumulDistance = distance;
      } else {
        cumulDistance += distance;
      }
      if (cumulDistance < seuilDistance) {
        console.log("distance trop courte ");
      }

      console.log("distance : ", distance, "m");

      var angle = computeAngle(vectorize(y,x), vectorize(y,z));
      angle = toDegrees(angle);
      console.log("angle : ", angle, "degrees");

      if ( angle < 170 && angle > 0 ){
        console.log("direction : gauche");
      } else if (angle < 360 && angle > 190 ) {
        console.log("direction : droite");

      } else {
        console.log("direction : tout droit");
      }


      index++;
      i--;
    }


  }


  function route(weightType, functionDisplay){
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
        functionDisplay(data);
      }
    })
    // console.log(POINTS);
  }

  var displayGreenRouting = function (data, textStatus, xhr){

    generateRoadMap(data);
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
