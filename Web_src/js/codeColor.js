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
