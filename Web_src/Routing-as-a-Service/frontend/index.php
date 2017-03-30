<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>OSRM Demo (TSI2017)</title>
        <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />

    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
    <link rel="stylesheet" href="leaflet-routing-machine-3.2.5/dist/leaflet-routing-machine.css" />
    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" />
    <style>
        body { margin:0; padding:0; }
        #map { position:absolute; top:0; bottom:0; width:100%; }
        #legend { position: absolute; bottom: 0; left: 0; font-family: sans-serif;}
        #legend div { display: inline-block; padding: 5px; margin: 0; }
    </style>

</head>

<body>
    <div id="map" class="map"></div>
<div id="legend">
    <div style="color: white;">Penalty:</div><div style="background: #fee6ce">20-30</div><div style="background: #fdd0a2">30-40</div><div style="background: #fdae6b">40-50</div><div style="background: #fd8d3c">50-60</div><div style="background: #f16913">60-70</div><div style="background: #d94801">70-80</div><div style="background: #a63603">80-90</div><div style="background: #7f2704">90+</div>
</div>

    <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
    <script src="leaflet-routing-machine-3.2.5/dist/leaflet-routing-machine.js"></script>
    <script src="leaflet-routing-machine-3.2.5/examples/Control.Geocoder.js"></script>
    <script>
        <?php
        include 'gridloader.php';
        ?>

        var map = L.map('map').setView([-8.95, 13.18], 11);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        var controlPenalty = L.Routing.control({
            waypoints: [null],
            routeWhileDragging: true,
            show: true,
            language: 'en',
            geocoder: L.Control.Geocoder.nominatim(),
            autoRoute: true,
            router: L.Routing.osrmv1({
                //serviceUrl: 'http://172.31.57.114:5001/route/v1'
                serviceUrl: '<?php echo $server_osrmheat; ?>'
            }),
            lineOptions: {
            styles: [{color: 'blue', opacity: 1, weight: 5}]},
            summaryTemplate: '<h2><font color="blue">SAFE ROUTE</font> {name}</h2><h3>{distance}, {time}</h3>'
        }).addTo(map);

        var controlSimple = L.Routing.control({
            waypoints: [null],
            lineOptions: {
             styles: [{color: 'red', opacity: 1, weight: 5}]},
            routeWhileDragging: true,
            show: true,
            language: 'en',
            geocoder: L.Control.Geocoder.nominatim(),
            autoRoute: true,
            router: L.Routing.osrmv1({
                serviceUrl: '<?php echo $server_osrmdefault; ?>'
            }),
            lineOptions: {
            styles: [{color: 'red', opacity: 1, weight: 5}]},
            summaryTemplate: '<h2><font color="red">DEFAULT</font> {name}</h2><h3>{distance}, {time}</h3>'
        }).addTo(map);

        function createButton(label, container) {
            var btn = L.DomUtil.create('button', '', container);
            btn.setAttribute('type', 'button');
            btn.innerHTML = label;
            return btn;
        }

        map.on('click', function(e) {
            var container = L.DomUtil.create('div'),
                startBtn = createButton('Start from this location', container),
                destBtn = createButton('Go to this location', container);
            L.DomEvent.on(startBtn, 'click', function() {
                controlSimple.spliceWaypoints(0, 1, e.latlng);
                controlPenalty.spliceWaypoints(0, 1, e.latlng);
                map.closePopup();
            });
            L.DomEvent.on(destBtn, 'click', function() {
                controlSimple.spliceWaypoints(controlSimple.getWaypoints().length - 1, 1, e.latlng);
                controlPenalty.spliceWaypoints(controlPenalty.getWaypoints().length - 1, 1, e.latlng);
                map.closePopup();
            });
            L.popup()
                .setContent(container)
                .setLatLng(e.latlng)
                .openOn(map);
        });

        function getColor(d) {
            //return d>20? '#000000' : '#ff0000';

            return d > 90 ? '#7f2704' :
                d > 80  ? '#a63603' :
                d > 70  ? '#d94801' :
                d > 60  ? '#f16913' :
                d > 50  ? '#fd8d3c' :
                d > 40  ? '#fdae6b' :
                d > 30  ? '#fdd0a2' :
                d > 20  ? '#fee6ce' :
                "#fff5eb";
        }

        /* Grid */
        function addGrid(jsondata) {
            gr= JSON.parse(jsondata)
            //console.log(gr)
            // params
            var latmin = gr.latMin;
            latmax = gr.latMax;
            lonmin = gr.lngMin;
            lonmax =gr.lngMax;
            ncol = gr.cols;
            nlin = gr.rows;

            dy= (latmax - latmin) / nlin;
            dx= (lonmax - lonmin) / ncol;
            /*console.log("latmax "+(latmax ) +" lonmax "+(lonmax ));
            console.log("latdiff "+(latmax - latmin) +" londiff "+(lonmax - lonmin));
            console.log("dylat "+dy +" dxlat "+dx);*/
            // creation of the grid composed of rectangles
            for (var y = 0; y < nlin; y++) {
                for (var x = 0; x < ncol; x++) {
                  if (gr.values[y * ncol + x]>20) {
                      // color corresponding of the danger
                      var color = getColor(gr.values[y * ncol + x]);
                      // rectangle
                      var def = [
                          [latmin + (nlin - y-1) * dy, lonmin + x * dx],
                          [latmin + (nlin- y) * dy, lonmin + (x + 1) * dx]
                      ];
                      var rectangle = new L.rectangle(def, {
                          stroke: false,
                          fillOpacity: 0.8,
                          color: "#000000",
                          fillColor: color,
                      });
                      // add to the grid
                      rectangle.addTo(grid);
                      //rectangle.addTo(map);
                    }
                }
            }
            map.setView(new L.LatLng((latmin + latmax) / 2, (lonmax + lonmin) / 2), 13);
        }

        /* Heat Polygon */
        function addHeatPolygon(jsondata) {
            data = jsondata.features;
            var n = data.length;

            for (var i=0; i < n; i++){
              if(data[i].properties.intensity>20){
                var color = getColor(data[i].properties.intensity);
                var polygon = new L.polygon(data[i].geometry.coordinates[0], {
                    stroke: false,
                    fillOpacity: 0.8,
                    color: "#000000",
                    fillColor: color,
                });
                // add to the polygon
                polygon.addTo(poly);
                //polygon.addTo(map);
              }
            }

              //map.setView(new L.LatLng(-8.834868131113,13.227944321366), 13);
          }


      

        // gridlayer
        var supergrid = <?php echo $jsongrid; ?>;
        //console.log(supergrid);
        var grid = L.layerGroup();
        addGrid(supergrid);
        // polylayer
        var superpolygon = <?php echo $jsonpolygon; ?>;
        var poly = L.layerGroup();
        addHeatPolygon(superpolygon);
        // option de visualisation
        var overlayMaps = {"Grid": grid, "Polygon": poly}; // menu
        L.control.layers(null,overlayMaps).addTo(map); // ne pas oublier le null
    </script>
</body>

</html>
