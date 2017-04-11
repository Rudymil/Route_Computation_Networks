# Documentation [menu_editor.js](menu_editor.js)
```js
/**
 * Notify using Bootstrap Notify that the area targeted or viewed not contains "anomaly zones".
 */
function notify_anomaly_zones_none() {...}
```
```js
/**
 * Removed from the map all "anomaly zones" displayed.
 */
function remove_anomaly_zones() {...}
```
```js
/**
 * Build the html content for the layers extracted from the database.
 * @return {string} - Of informations about the layer in hmtl form.
 */
function getPopupContentmenu_anomaly(couche) {...}
```
```js
/**
 * Ajax request asking all the anomaly zones from the BD and contained into the bounding box of the map.
 * @param {string} url - Url to the Web API.
 * @param {string} bbox - Bounding box of the map.
 */
function add_anomaly_zones(url, bbox) {...}
```
```js
/**
 * Notify using Bootstrap Notify that the area targeted or viewed not contains "warning zones".
 */
function notify_warning_zones_none() {...}
```
```js
/**
 * Removed from the map all "warning zones" displayed.
 */
function remove_warning_zones() {...}
```
```js
/**
 * Build the html content for the layers extracted from the database.
 * @return {string} - Of informations about the layer in hmtl form.
 */
function getPopupContentmenu(couche) {...}
```
```js
/**
 * Ajax request asking all the warning zones from the BD and contained into the bounding box of the map.
 * @param {string} url - Url to the Web API.
 * @param {string} bbox - Bounding box of the map.
 */
function add_warning_zones(url, bbox) {...}
```
```js
/**
 * Send to the DB all the update for one type.
 * @param {string} type - Type of the GeoJSON to update.
 * @return {number} resultat.responseJSON - Number of lines modified into the DB.
 * @return {number} -1 - If resultat.responseJSON is empty or NaN.
 */
function send_ajax_update (type) {...}
```
```js
/**
 * Send to the DB one id for one type.
 * @param {string} id - Id of the GeoJSON to delete.
 * @param {string} type - Type of GeoJSON to delete.
 * @return {number} resultat.responseJSON - Number of lines modified into the DB.
 * @return {number} -1 - If resultat.responseJSON is empty or NaN.
 */
function send_ajax_delete(id, type) {...}
```
```js
/**
 * Executed for sending all the updates and deletes.
 */
$("#submit3").click(function() {...});
```
