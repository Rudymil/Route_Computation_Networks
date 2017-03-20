# Organisation
* [index.html](index.html) (*HTML structure of the application*)
* [css](css) (*folder of style files*)
  * [template.css](css/template.css) (*basic css*)
  * [context_menu1.css](css/context_menu1.css) (*define departure/arrival points*)
  * [context_menu2.css](css/context_menu2.css) (*remove shapes*)
* [js](js) (*folder of script files*)
  * [template.js](js/template.js) (*basic scripts*)
  * [menu.js](js/menu.js) (*data sending scripts + draw route*)
  * [selection_of_the_area.js](js/selection_of_the_area.js) (*Selection of the area section scripts*)
  * [set_the_route.js](js/set_the_route.js) (*Route section scripts*)
  * [report_a_trouble_zone.js](js/report_a_trouble_zone.js) (*Report a trouble zone section scripts*)
  * [report_a_lack_of_data.js](js/report_a_lack_of_data.js) (*Report a lack of data section scripts*)
* [leaflet-routing-machine-3.2.5](leaflet-routing-machine-3.2.5) (*folder of the Leaflet Routing Machine Framework*)
  * [dist](leaflet-routing-machine-3.2.5/dist) (*scripts, css and images of the Leaflet Routing Machine Framework*)
  * [src](leaflet-routing-machine-3.2.5/src) (*js scripts of the Leaflet Routing Machine Framework*)

# API/Frameworks used
* [Bootstrap](http://getbootstrap.com/)
* [Leafletjs](http://leafletjs.com/)
* [jQuery](https://jquery.com/)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/)

# JS functions
## menu.js
```js
$("#submit").click(function(){...});
```
Envoye le **JSON**.
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
```js
$("#radius").change(function(){...});
```
Met à jour la valeur du **rayon** du cercle à dessiner.
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
## report_a_lack_of_data.js
# Literature
* [Leafler API Reference](http://leafletjs.com/reference.html)
* [Open Street Map (Partie 2) – Intégration d’une carte avec Leaflet](https://blog.netapsys.fr/open-street-map-partie-2-integration-dune-carte-avec-leaflet/)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/#getting-started)
* [jQuery : Ecrivez moins pour faire plus !](https://openclassrooms.com/courses/jquery-ecrivez-moins-pour-faire-plus/decouvrir-jquery)
