# Documentation [report_a_warning_zone.js] 

```js
/*

function return the date of today in international standard  yyyy/mm/dd

*/
function datem()  { ... }
```

```js
/*

function build a html dynamique string which we have :
	- drop-down list of warning zones with dynamique content extract from database
	- description of the warning zone
	- expiration date of the warning zone
At the end the function return the html.
*/
function hmtlcw() { ... }
```

```js
/*

add listener on radio boutton, it uses to see if one of type of draw it is chosen.
If we chose a from to draw, the function adds just toolbar for the this form, otherwise the function remove the toolbar to draw. 

*/
$(".radio_button").change(function() { ... }
```

```js
/*

add a leaflet evenet listener when the user creat a layer, in this fonction we store informations about the layer created, if it is :
	- Circle we store the description , level of warning , leaflet id and expiration date of the warning zone.

*/
map.on('draw:created', function(e) {... }
```


