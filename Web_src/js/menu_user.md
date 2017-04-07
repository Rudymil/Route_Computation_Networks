# Documentation [menu_user.js](menu_user.js)
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