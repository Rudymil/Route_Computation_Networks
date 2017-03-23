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
  * [report_a_warning_zone.js](js/report_a_warning_zone.js) (*Report a trouble zone section scripts*)
  * [report_a_lack_of_data.js](js/report_a_lack_of_data.js) (*Report a lack of data section scripts*)
* [php](php) (*folder of database access scripts*)
  * [select_all.php](php/select_all.php) (*Select all geometry in DB*)
  * [insert_to_valid.php](php/insert_to_valid.php) (*Insert selected area in DB*)
  * [insert_to_verify.php](php/insert_to_verify.php) (*Insert selected area in DB*)

# API/Frameworks used
* [Bootstrap](http://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* [Leafletjs](http://leafletjs.com/)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/)
* [Bootstrap Notify](http://bootstrap-notify.remabledesigns.com/)

# JSON used
## JSON warning zones
```json
{  
	circles : [[[[lat,lng],radius],"description"],[[[lat,lng],radius],"description"]]
	boxes : [[[[lat,lng],[lat,lng]],"description"],[[[lat,lng],[lat,lng]],"description"]]
	polygons : [[[[lat,ln],[lat,ln],[lat,ln]],"description"],[[[lat,ln],[lat,ln],[lat,ln]],"description"]]
}
```
## JSON lack of data
```json
{  
	circles : [[[[lat,lng],radius],"description"],[[[lat,lng],radius],"description"]]
	boxes : [[[[lat,lng],[lat,lng]],"description"],[[[lat,lng],[lat,lng]],"description"]]
	polygons : [[[[lat,ln],[lat,ln],[lat,ln]],"description"],[[[lat,ln],[lat,ln],[lat,ln]],"description"]]
}
```
# Literature
* [Découvrir jQuery](https://openclassrooms.com/courses/jquery-ecrivez-moins-pour-faire-plus/decouvrir-jquery)
* [Le fonctionnement de $.ajax()](https://openclassrooms.com/courses/un-site-web-dynamique-avec-jquery/le-fonctionnement-de-ajax)
* [Leaflet API Reference](http://leafletjs.com/reference.html)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/#getting-started)
* [Open Street Map (Partie 2) – Intégration d’une carte avec Leaflet](https://blog.netapsys.fr/open-street-map-partie-2-integration-dune-carte-avec-leaflet/)
