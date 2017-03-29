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
