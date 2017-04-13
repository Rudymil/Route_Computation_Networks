/**
 * codeColorRed
 * @param  {float} value
 * @return {float} color [value between 0 and 1]
 */
function codeColorRed(value) {
    var r = Math.floor(value / 100 * 255);
    var g = 0;
    var b = 0;
    return color = "rgb(" + r + " ," + g + "," + b + ")";
}


/**
 * heatMapColorforValue : hsl
 * @param  {float} value
 * @return {string} "hsl(" + h + ", 100%, 50%)" [value between 0 and 1]
 */
function heatMapColorforValue(value) {
    var h = (1.0 - value / 100) * 130;
    return "hsl(" + h + ", 100%, 50%)";
}

/**
 * getColor : Scale of orange
 * @param  {int} value
 * @return {int}    [value between 0 and 100]
 */
// value between 0 and 100
function getColor(value) {
    return value > 90 ? '#4d1f00' :
        value > 80 ? '#b34700' :
        value > 70 ? '#e65c00' :
        value > 60 ? '#ff751a' :
        value > 50 ? '#ff944d' :
        value > 40 ? '#ffb380' :
        value > 30 ? '#ffd1b3' :
        value > 20 ? '#ffe0cc' :
        "#fff5eb";
}
