# Organisation
* [index.html](index.html) (*HTML structure of the application*)
* [css](css) (*folder of style files*)
  * [template.css](css/template.css) (*basic css*)
  * [context_menu1.css](css/context_menu1.css) (*define departure/arrival points*)
  * [route.css](css/route.css) (*define route and its points*)
* [js](js) (*folder of script files*)
  * [template.js](js/template.js) (*basic scripts*)
  * [menu.js](js/menu.js) (*data sending scripts + draw route*)
  * [selection_of_the_area.js](js/selection_of_the_area.js) (*Selection of the area section scripts*)
  * [set_the_route.js](js/set_the_route.js) (*Route section scripts*)
  * [report_a_warning_zone.js](js/report_a_warning_zone.js) (*Report a warning zone section scripts*)
  * [report_an_anomaly.js](js/report_an_anomaly.js) (*Report a anomaly section scripts*)
* [php](php) (*folder of database access scripts*)
  * [select_all.php](php/select_all.php) (*Select all geometry in DB*)
  * [insert_to_valid.php](php/insert_to_valid.php) (*Insert selected area in DB*)
  * [insert_to_verify.php](php/insert_to_verify.php) (*Insert selected area in DB*)

# API/Frameworks/Tools used
* [Bootstrap](http://getbootstrap.com/)
* [The GeoJSON Format Specification](http://geojson.org/geojson-spec.html)
* [jQuery](https://jquery.com/)
* [Leafletjs](http://leafletjs.com/)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/)
* [Bootstrap Notify](http://bootstrap-notify.remabledesigns.com/)

# GeoJSON used
## GeoJSON warning zones
```json
circle

[{
"type":"Feature",
"properties":
		{		
		"type":"warningType",
		"typeGeometry":"circle",
		"radius":898.2027678126368,
		"description":"dsqDQS",
		"level":"Road accident",
		"date":1490601231927
		},
"geometry":
		{
		"type":"Point",
		"coordinates":[13.228912353515627,-8.930861193495812]} // latitude, longitude
		}, 
		{ ...autre objet } ]

box

[
{
"type":"Feature",
"properties":{
	"type":"warningType",
	"description":"aaaaa",
	"level":"Criminal insecurity",
	"date":1490601964481},
"geometry":
{
	"type":"Polygon",
	"coordinates":[[[13.179817199707033,-8.944427358695835],	[13.179817199707033,-8.933235308866728],	[13.195266723632814,-8.933235308866728],	[13.195266723632814,-8.944427358695835],	[13.179817199707033,-8.944427358695835]]] // latitude, longitude
}
},
{ ... un autre objet ... }
]

polygon 

[
{
	"type":"Feature",
	"properties":{
	"type":"warningType",
	"description":"qqqqqq",
	"level":"Road closure",
	"date":1490602146306
},
"geometry":
{
	"type":"Polygon",
	"coordinates":[[[13.217926025390627,-8.949344968775677],	[13.21861267089844,-8.964775658381157],	[13.23131561279297,-8.952397245052008],	[13.230285644531252,-8.944596932563272],	[13.217926025390627,-8.949344968775677]]]}}, // latitude, longitude
{
... un autre objet ...
}

]

```
## GeoJSON anomalies
```json
circlel

[{
"type":"Feature",
"properties":
		{		
		"type":"anomalyType",
		"typeGeometry":"circle",
		"radius":898.2027678126368,
		"description":"dsqDQS",
		"level":"Road accident",
		"date":1490601231927
		},
"geometry":
		{
		"type":"Point",
		"coordinates":[13.228912353515627,-8.930861193495812]} // latitude, longitude
		}, 
		{ ...autre objet } ]

boxl

[
{
"type":"Feature",
"properties":{
	"type":"anomalyType",
	"description":"aaaaa",
	"level":"Criminal insecurity",
	"date":1490601964481},
"geometry":
{
	"type":"Polygon",
	"coordinates":[[[13.179817199707033,-8.944427358695835],	[13.179817199707033,-8.933235308866728],	[13.195266723632814,-8.933235308866728],	[13.195266723632814,-8.944427358695835],	[13.179817199707033,-8.944427358695835]]] // latitude, longitude
}
}, 
{ ... un autre objet ... }
]

polygonl 

[
{
	"type":"Feature",
	"properties":{
	"type":"anomalyType",
	"description":"qqqqqq",
	"level":"Road closure",
	"date":1490602146306
},
"geometry":
{
	"type":"Polygon",
	"coordinates":[[[13.217926025390627,-8.949344968775677],	[13.21861267089844,-8.964775658381157],	[13.23131561279297,-8.952397245052008],	[13.230285644531252,-8.944596932563272],	[13.217926025390627,-8.949344968775677]]]}}, // latitude, longitude
{
... un autre objet ...
}

]
```
# Literature
* [Découvrir jQuery](https://openclassrooms.com/courses/jquery-ecrivez-moins-pour-faire-plus/decouvrir-jquery)
* [Le fonctionnement de $.ajax()](https://openclassrooms.com/courses/un-site-web-dynamique-avec-jquery/le-fonctionnement-de-ajax)
* [Leaflet API Reference](http://leafletjs.com/reference.html)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/#getting-started)
* [Open Street Map (Partie 2) – Intégration d’une carte avec Leaflet](https://blog.netapsys.fr/open-street-map-partie-2-integration-dune-carte-avec-leaflet/)
