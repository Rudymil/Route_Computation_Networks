# Organisation

* [index.html](index.html) (*HTML structure of the application*)
* [css](css) (*folder of style files*)
  * [template.css](css/template.css) (*basic css*)
  * [Er-razki Sibawaih.css](css/Er-razki Sibawaih.css) (*!?!?!?*)
* [js](js) (*folder of script files*)
  * [template.js](js/template.js) (*basic scripts*)
  * [menu.js](js/menu.js) (*scripts of the menu*)
  * [geolocalisation.js](js/geolocalisation.js) (*!?!?!?*)
* [leaflet-routing-machine-3.2.5](leaflet-routing-machine-3.2.5) (*folder of the Leaflet Routing Machine Framework*)
  * [dist](leaflet-routing-machine-3.2.5/dist) (*scripts, css and images of the Leaflet Routing Machine Framework*)
  * [src](leaflet-routing-machine-3.2.5/src) (*js scripts of the Leaflet Routing Machine Framework*)

# API/Frameworks used

* [Bootstrap](http://getbootstrap.com/)
* [Leafletjs](http://leafletjs.com/)
* [jQuery](https://jquery.com/)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/)

# JS functions

```js
$("#nigeria").click(function(){...});
```
Reset la view de la carte sur Port Harcourt lorsqu'on clic sur le bouton **Nigeria** dans **Selection of the area**.
```js
$("#angola").click(function(){...});
```
Reset la view de la carte sur Luanda lorsqu'on clic sur le bouton **Angola** dans **Selection of the area**.
```js
$("#radius").change(function(){...});
```
Met à jour la valeur du **rayon** du cercle à dessiner.
```js
$("#geo").click(function(){...});
```
!?!?!?
```js
$(".radio_button").change(function (){...});
```
Met à jour le **choix** entre {navigate, circle, box, polygon}.
```js
map.addEventListener('click', function(e){...});
```
Intéraction de la carte avec le simple clic.
Déclenche la fonction ```draw_circle```, ```draw_box``` ou ```build_polygon``` en fonction du choix des radio boutons.
```js
map.addEventListener('dblclick', function(e){...});
```
Intéraction de la carte avec le doucle clic.
Déclenche la fonction ```draw_polygon``` en fonction du choix des radio boutons.
```js
function draw_circle(e){...});
```
Dessine un **cercle** dont le centre sera l'endroit cliqué sur la carte et le rayon celui précisé dans les radio boutons.
```js
function draw_box(e){...});
```
Enregistre le premier point cliqué sur la carte puis dessine le **rectangle** après avoir cliqué au deuxième point.
```js
function build_polygon(e){...});
```
Enregistre tous les points cliqués sur la carte constituant le futur **polygone**.
```js
function draw_polygon(e){...});
```
Dessine le **polygone** à partir de tous les points précédemment enregistrés.

# Literature

* [Leafler API Reference](http://leafletjs.com/reference.html)
* [Open Street Map (Partie 2) – Intégration d’une carte avec Leaflet](https://blog.netapsys.fr/open-street-map-partie-2-integration-dune-carte-avec-leaflet/)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/#getting-started)
* [jQuery : Ecrivez moins pour faire plus !](https://openclassrooms.com/courses/jquery-ecrivez-moins-pour-faire-plus/decouvrir-jquery)
