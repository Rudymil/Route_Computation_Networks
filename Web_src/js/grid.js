function addGrid(json){
  // params
  var latmin = json.params.latMin;
      latmax = json.params.latMax;
      lonmin = json.params.lngMin;
      lonmax = json.params.lngMax;
      nb_col = json.params.rows;
      nb_lig = json.params.cols;

  // creation of the grid composed of rectangles
  for (var i=0; i<nb_lig; i++){
      for (var j=0; j<nb_col; j++){
        if (json.data[i*nb_col+j]>20){
          // color corresponding of the danger
          var color=getColor(json.data[i*nb_col+j]);
          // rectangle
          var rectanglePoints = [[latmin+j*(latmax-latmin)/nb_col, lonmin+i*(lonmax-lonmin)/nb_lig],
                                [latmin+(j+1)*(latmax-latmin)/nb_col, lonmin+(i+1)*(lonmax-lonmin)/nb_lig]];
          var rectangle = new L.rectangle(rectanglePoints, {stroke: false, fillOpacity: 0.4, color: color,fillColor: color});
          // add to the gid
          rectangle.addTo(grid);
        }
      }
    }
    //map.setView(new L.LatLng((latmin+latmax)/2,(lonmax+lonmin)/2),13);
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
            fillOpacity: 0.4,
            color: "#000000",
            fillColor: color,
        });
        // add to the polygon
        polygon.addTo(heatPoly);
        //polygon.addTo(map);
      }
    }

      //map.setView(new L.LatLng(-8.834868131113,13.227944321366), 13);
  }
