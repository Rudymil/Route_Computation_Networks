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

// Scale of color
// value between 0 and 100
function getColor(value) {
    return value > 90 ? '#7f2704' :
        value > 80  ? '#a63603' :
        value > 70  ? '#d94801' :
        value > 60  ? '#f16913' :
        value > 50  ? '#fd8d3c' :
        value > 40  ? '#fdae6b' :
        value > 30  ? '#fdd0a2' :
        value > 20  ? '#fee6ce' :
        "#fff5eb";
}
