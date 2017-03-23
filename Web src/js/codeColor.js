function codeCouleur(elev){
  var r = Math.floor(elev * 255);
  var g = 0;
  var b = Math.floor((1-elev) * 255);
  return color= "rgb("+r+" ,"+g+","+ b+")";

}
