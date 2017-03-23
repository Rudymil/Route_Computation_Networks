// rgb
// value between 0 and 1
function codeColorRed(value){
  var r = Math.floor(value/100 * 255);
  var g = 0;
  var b = 0;
  return color= "rgb("+r+" ,"+g+","+ b+")";
}

// hsl
// value between 0 and 1
function heatMapColorforValue(value){
  var h = (1.0 - value /100) * 130;
  return "hsl(" + h + ", 100%, 50%)";
}
