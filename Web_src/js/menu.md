# Documentation [menu.js](menu.js)
```js
/**
 * Ajax request asking all the type of risk or anomaly from the DB.
 * @param {string} url - Url to the Web API.
 * @param {string} type - Type between risk or anomaly.
 */
function ajax_types(url, type) {...}
```
```js
/**
 * Ajax request asking all the countries contained by the BD.
 * @param {string} url - Url to the Web API.
 */
function ajax_countries(url) {...}
```
```js
/**
 * Executed when the body DOM is ready.
 */
$("body").ready(function() {...});
```
```js
/**
 * Notify using Bootstrap Notify that the leaflet vector layer is empty.
 * @param {string} element - Type of leaflet vector layer.
 */
function notify_shape_empty(element) {...}
```
```js
/**
 * Notify using Bootstrap Notify that the array of leaflet vector layers is empty.
 * @param {string} collection - Type of leaflet vector layer.
 */
function notify_none(collection) {...}
```
```js
/**
 * Notify using Bootstrap Notify that the zones sending to the DB succeeded.
 * @param {object.statut} statut - Network code.
 */
function notify_ajax_sending_areas_success(statut) {...}
```
```js
/**
 * Notify using Bootstrap Notify that the zones sending to the DB failed.
 * @param {object.statut} statut - Network code.
 */
function notify_ajax_sending_areas_error(statut) {...}
```
```js
/**
 * Notify using Bootstrap Notify that the "risk_type" into the "properties" is not correct.
 */
function notify_risk_type_wrong() {...}
```
```js
/**
 * Notify using Bootstrap Notify that the "anomaly_type" into the "properties" is not correct.
 */
function notify_anomaly_type_wrong() {...}
```
```js
/**
 * Notify using Bootstrap Notify that the "description" into the "properties" is not correct.
 */
function notify_description_wrong() {...}
```
```js
/**
 * Notify using Bootstrap Notify that the "properties" is not correct.
 */
function notify_properties_wrong() {...}
```
```js
/**
 * Check that the "properties" of the shape is correctly written in function of the type.
 * @param {vector layer} shape - Leaflet vector layer.
 * @param {string} type - Type of leaflet vector layer.
 * @return {number} -1 - If the verification reveals an error.
 */
function verification(shape, type) {...}
```
```js
/**
 * Check that the "properties" of the shape is correctly written in function of the type.
 * @param {array} circle - Array containing leaflet vector layers (circles).
 * @param {array} box - Array containing leaflet vector layers (rectangles).
 * @param {array} polygon - Array containing leaflet vector layers (polygons).
 * @param {string} type - Type of leaflet vector layer (warning or anomaly).
 * @return {number} -1 - If the array contains empty objects.
 * @return {number} 0 - Else.
 */
function fill_geojson(circle, box, polygon, type) {...}
```
```js
/**
 * Ajax request sending all the zones to the BD by specifying the type.
 * @param {string} type - Type of leaflet vector layer (warning or anomaly).
 * @param {string} url - Url to the Web API.
 */
function send_ajax_geojson(type, url) {...}
```
```js
/**
 * Change the inner color in black of all the leaflet vector layers corresponding to the type.
 * @param {string} type - Type of leaflet vector layer (warning or anomaly).
 */
function style_layer(type) {...}
```
```js
/**
 * Convert a leaflet circle object to a polygon geojson form.
 * @return {array} - Of latitude longitude for circle in polygon form.
 */
function geojsoncircle(ci) {...}
```
```js
/**
 * Executed for sending all the "warning zones".
 */
$("#submit1").click(function() {...});
```
```js
/**
 * Executed for sending all the "anomaly zones".
 */
$("#submit2").click(function() {...});
```
```js
/**
 * Ajax request sending one point ("start"|"step"|"end").
 * @param {array(3)} point - Array containing lat, lng and type ("start"|"step"|"end").
 */
function send_ajax_point(point) {...}
```