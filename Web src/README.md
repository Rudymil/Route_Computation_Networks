# Organisation
* [index.html](index.html) (*HTML structure of the application*)
* [css](css) (*folder of style files*)
  * [template.css](css/template.css) (*basic css*)
  * [context_menu1.css](css/context_menu1.css) (*define departure/arrival points*)
* [js](js) (*folder of script files*)
  * [template.js](js/template.js) (*basic scripts*)
  * [menu.js](js/menu.js) (*data sending scripts + draw route*)
  * [selection_of_the_area.js](js/selection_of_the_area.js) (*Selection of the area section scripts*)
  * [set_the_route.js](js/set_the_route.js) (*Route section scripts*)
  * [report_a_trouble_zone.js](js/report_a_trouble_zone.js) (*Report a trouble zone section scripts*)
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

# JS functions
## menu.js
```js
$("#map").ready(function(){...});
```
Charge toutes les **zones de danger** sur la carte à partir de la **BDD**.
```js
$("#calculate").click(function(){...});
```
Envoye les **points** de départ et d'arrivée à **l'algo**.
```js
$("#submit1").click(function(){...});
```
Envoye les **zones de danger** à la **BDD**.
```js
$("#submit2").click(function(){...});
```
Envoye les **zones à vérifier** à la **BDD**.
## set_the_route.js
```js
map.locate({setView: true, watch: true}).on('locationfound', function(e){...}).on('locationerror', function(e){});
```
Dessine un marqueur de départ sur la carte qui précise la localisation de l'utilisateur lorsqu'on clic sur le bouton de localisation et affiche un msg d'erreur s'il n'y a pas de GPS intégré.
```js
map.on('dblclick', function(e) {....});
```
Affiche un menu sur la carte pour préciser s'il s'agit d'un point de départ ou de destination lorsqu'on double clic sur la carte.
```js
map.on("click", function() {...});
```
cache le menu lorsqu'on clic sur la carte.
```js
function hideContextMenu1(){...};
```
Cache le menu.
```js
function showContextMenu1( marker, pos,ep){...};
```
Afficher le menu sur la carte.
```js
function  $("#cm_debut").click(ep,function(){...};
```
Dessine un marqueur de départ en vert sur la carte et affiche ses coordonnées dans le 1er input text dans **Route** lorsqu'on choisit l'option **Definir comme départ** dans le menu.
```js
function  $("#cm_fin").click(ep,function(){...};
```
Dessine un marqueur de destination en rouge sur la carte et affiche ses coordonnées dans le 2ème input text dans **Route** lorsqu'on choisit l'option **Definir comme destination** dans le menu.
```js
$("#godep").click(function(){...});
```
Dessine sur la carte un marqueur de départ avec les coordonnées saisies à la main lorsqu'on clic sur le bouton **go en vert** dans **Route**.
```js
$("#godest").click(function(){...});
```
Dessine sur la carte un marqueur de destination avec les coordonnées saisies à la main lorsqu'on clic sur le bouton **go en rouge** dans **Route**.
```js
$("#godep").click(function(){...});
```
Dessine sur la carte un marqueur de départ avec les coordonnées saisies à la main lorsqu'on clic sur le bouton **go en vert** dans **Route**.
```js
$("#inverse").click(function(){...});
```
Inverse les deux marqueurs de départ et de destination lorsqu'on clic sur le bouton avec les deux flèches dans **Route**.
```js
$("#remove").click(function(){...});
```
Supprime les marqueurs de la carte lorsqu'on clic sur le boutton **remove** dans **Route**.
## selection_of_the_area.js
```js
$("#nigeria").click(function(){...});
```
Reset la view de la carte sur Port Harcourt lorsqu'on clic sur le bouton **Nigeria** dans **Selection of the area**.
```js
$("#angola").click(function(){...});
```
Reset la view de la carte sur Luanda lorsqu'on clic sur le bouton **Angola** dans **Selection of the area**.
## report_a_trouble_zone.js
## report_a_lack_of_data.js
# PHP functions
Manipulated formats :
```json
{  
	circles : [[[[lat,lng],radius],"description"],[[[lat,lng],radius],"description"]]
	boxes : [[[[lat,lng],[lat,lng]],"description"],[[[lat,lng],[lat,lng]],"description"]]
	polygons : [[[[lat,ln],[lat,ln],[lat,ln]],"description"],[[[lat,ln],[lat,ln],[lat,ln]],"description"]]
}
```
## select_all.php
## insert_to_valid.php
## insert_to_verify.php
# Literature
* [Découvrir jQuery](https://openclassrooms.com/courses/jquery-ecrivez-moins-pour-faire-plus/decouvrir-jquery)
* [Le fonctionnement de $.ajax()](https://openclassrooms.com/courses/un-site-web-dynamique-avec-jquery/le-fonctionnement-de-ajax)
* [Leaflet API Reference](http://leafletjs.com/reference.html)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/#getting-started)
* [Open Street Map (Partie 2) – Intégration d’une carte avec Leaflet](https://blog.netapsys.fr/open-street-map-partie-2-integration-dune-carte-avec-leaflet/)