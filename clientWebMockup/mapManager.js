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
          route();
      });

      L.DomEvent.on(destBtn, 'click', function() {
          console.log("click dest button");
          // L.Control.spliceWaypoints(L.Control.getWaypoints().length - 1, 1, e.latlng);
          destination.setLatLng(e.latlng);
          map.closePopup();
          console.log(updateBounds());
          route();
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


  var pointList = [
    L.latLng(43.6026628,3.8776791),
    L.latLng(43.602678,3.8777077),
    L.latLng(43.6026856,3.8777415),
    L.latLng(43.6026873,3.8777763),
    L.latLng(43.6026848,3.8778096),
    L.latLng(43.6026763,3.877844),
    L.latLng(43.6026569,3.8778697),
    L.latLng(43.6026279,3.877884),
    L.latLng(43.6025997,3.877886),
    L.latLng(43.6025695,3.8778719),
    L.latLng(43.6025459,3.8778491),
    L.latLng(43.6025271,3.877817),
    L.latLng(43.6025168,3.8777916),
    L.latLng(43.6024817,3.877787),
    L.latLng(43.6024386,3.8777445),
    L.latLng(43.602397,3.8776377),
    L.latLng(43.6023997,3.8775129),
    L.latLng(43.6024338,3.8772702),
    L.latLng(43.6022658,3.8772257),
    L.latLng(43.6021847,3.8771467),
    L.latLng(43.6019688,3.8771205),
    L.latLng(43.6012678,3.8767154),
    L.latLng(43.5999689,3.8766114),
    L.latLng(43.5999205,3.8766262),
    L.latLng(43.5999482,3.8767767),
    L.latLng(43.6000638,3.8772407),
    L.latLng(43.6001237,3.8774923),
    L.latLng(43.6001995,3.8778084),
    L.latLng(43.6003049,3.8782202),
    L.latLng(43.6003273,3.8783053),
    L.latLng(43.5994878,3.8782253),
    L.latLng(43.5994507,3.8791063),
    L.latLng(43.5994421,3.8791503),
    L.latLng(43.5992535,3.8797729),
    L.latLng(43.599081,3.8803252),
    L.latLng(43.5989021,3.8808978),
    L.latLng(43.5986299,3.8817322),
    L.latLng(43.5993203,3.8821245),
    L.latLng(43.5990545,3.882812),
    L.latLng(43.5986888,3.8838074),
    L.latLng(43.598406,3.8846134),
    L.latLng(43.5982635,3.8849852),
    L.latLng(43.5982336,3.8850435),
    L.latLng(43.5981173,3.8852148),
    L.latLng(43.5978078,3.8856357),
    L.latLng(43.5976423,3.8858547),
    L.latLng(43.5976121,3.8858929),
    L.latLng(43.5976225,3.886153),
    L.latLng(43.5976295,3.886258),
    L.latLng(43.5976428,3.8863249),
    L.latLng(43.5975389,3.8864138),
    L.latLng(43.5974022,3.8865315),
    L.latLng(43.5973687,3.8865621),
    L.latLng(43.5973051,3.8866162),
    L.latLng(43.5972231,3.8866892),
    L.latLng(43.5971788,3.886726)


  ];

  var firstpolyline = new L.Polyline(pointList, {
      color: 'red',
      weight: 3,
      opacity: 0.5,
      smoothFactor: 1
  });
  firstpolyline.addTo(map);



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


  function route(){
    $.ajax({

      url : "../NetworkxExploration/server.php",
      type : "GET",
      data : 'lonSource=' + source.getLatLng().lng + '&latSource=' + source.getLatLng().lat + '&lonTarget=' + destination.getLatLng().lng + '&latTarget=' + destination.getLatLng().lat,
      success : function(data){
        console.log("success");
        arrayData = JSON.parse(data);
        console.log(arrayData);

        POINTS = [];

        for (var coor in arrayData) {
          lat = arrayData[coor][0];
          lon = arrayData[coor][1];
          POINTS.push(new L.latLng(lat, lon));
        }

        routing.setLatLngs(POINTS);
      }
    })
    // console.log(POINTS);
  }

  route();


  // L.Routing.control({
  //   waypoints: [
  //
  //   ]
  // }).addTo(map);

});
