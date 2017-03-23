function codeCouleur(elev){
  var r = Math.floor(elev/100 * 255);
  var g = 0;
  var b = Math.floor((1-elev/100) * 255);
  return color= "rgb("+r+" ,"+g+","+ b+")";

}
