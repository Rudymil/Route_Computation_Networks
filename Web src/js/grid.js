function addGrille(){
  var latmin = -8.977323;
      latmax = -8.916531;
      lonmin = 13.139992;
      lonmax = 13.222647;
      nb_col = 5;
      nb_lig = 5;

  var grille = L.layerGroup();

  for (var i=0; i<nb_lig; i++){
      for (var j=0; j<nb_col; j++){

        var elev = Math.random();
        var color=codeCouleur(elev);
        var rectanglePoints = [[latmin+j*(latmax-latmin)/nb_col,lonmin+i*(lonmax-lonmin)/nb_lig], [latmin+(j+1)*(latmax-latmin)/nb_col,lonmin+(i+1)*(lonmax-lonmin)/nb_lig]];
        var rectangle = new L.rectangle(rectanglePoints, {fillOpacity: 0.6, color: color,fillColor: color});
        rectangle.addTo(grille);
      }
    }
    grille.addTo(map);
}
