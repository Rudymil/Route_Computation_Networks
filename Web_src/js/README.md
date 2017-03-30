# JS functions
## codeColor.js  
```js
function codeColorRed(value){...};
```  
Couleur rgb .
```js
function heatMapColorforValue(value){...};
```  
Couleur hsl.  
```js
function getColor(value){...};
```  
Echelle de couleur tous les 10.  
## grid.js
```js
function addGrid(json){...};
```  
Ajout d'une grille de couleurs selon l'intensité du danger en créant des rectangles.  
```js
function addHeatPolygon(json){...};
```
Ajout de polygones de couleurs selon l'intensité du danger.  
## menu.js
```js
function ajax_types(url,type){...}
```
Requête ajax pour recupérer les **types**.
```js
$("body").ready(function(){...});
```
S'exécute lorsque le **body** est chargé.
```js
function ajax_grid(){...}
```
Requête ajax pour recupérer une **grille**.
```js
function ajax_polygon(){...}  
```  
Requête ajax pour recupérer des **polygones**.
```js
function notify_warning_zones_none(){...}
```
Notifie qu'il n'y a pas de **warning zones** reçues.
```js
function remove_warning_zones(){...}
```
Supprime les **warning zones** de la carte.
```js
function add_warning_zones(url){...}
```
Ajoute toutes les **warning zones** de la **bbox** from la **BDD**.
```js
$("#map").ready(function(){...});
```
S'exécute lorsque la **carte** est chargée.
```js
function check_latlng(latlng){...}
```
Renvoi 0 si la variable d'entrée contient bien **2 couples de coordonnées**, -1 sinon.
```js
$("#calculate").click(function(){...});
```
Envoye les **points** de départ et d'arrivée à **l'algo**.
```js
function notify_shape_empty(shape){...}
```
Signale une erreur : aucune **shape**.
```js
function notify_none(shape){...}
```
Signale une info : aucune **shape** à envoyer.
```js
function notify_ajax_sending_areas_success(code, statut){...}
```
Signale un succès de l'envoi des **shapes**.
```js
function notify_ajax_sending_areas_error(erreur, statut){...}
```
Signale une erreur de l'envoi des **shapes**.
```js
function fill_geojson(circle,box,polygon,geojson){...}
```
Rempli **geojson** des objects contenus dans **circle**, **box** et **polygon**. Return -1 si les objects contiennent des objects vides, 0 sinon.
```js
function send_ajax_geojson(geojson,type,url){...}
```
Envoie le **geojson** et le **type** à l'**url**. Return 0 si succès, -1 sinon.
```js
function style_shape(shape){...}
```
Modifie le **style** de chaque **shape**.
```js
$("#submit1").click(function(){...});
```
Envoye les **warning zone** à la **BDD** après avoir vérifié leur format.
```js
$("#submit2").click(function(){...});
```
Envoye les **anomalies** à la **BDD** après avoir vérifié leur format.
## report_a_warning_zone.js
## report_an_anomaly.js
## set_the_route.js
```js
map.locate({setView: true, watch: true}).on('locationfound', function(e){...}).on('locationerror', function(e){});
```
Dessine un marqueur de départ sur la carte qui précise la localisation de l'utilisateur lorsqu'on clic sur le bouton de localisation et affiche un msg d'erreur s'il n'y a pas de GPS intégré.
```js
map.on('dblclick', function addmarker(e) {....});
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
$("#cm_debut").click(ep,function(){...};
```
Dessine un marqueur de départ en vert sur la carte et affiche ses coordonnées dans le 1er input text dans **Set the route** lorsqu'on choisit l'option **Definir comme départ** dans le menu.
```js
$("#cm_fin").click(ep,function(){...};
```
Dessine un marqueur de destination en rouge sur la carte et affiche ses coordonnées dans le 2ème input text dans **Set the route** lorsqu'on choisit l'option **Definir comme destination** dans le menu.
```js
$("#godep").click(function(){...});
```
Dessine sur la carte un marqueur de départ avec les coordonnées saisies à la main lorsqu'on clic sur le bouton **go en vert** dans **Set the route**.
```js
$("#godest").click(function(){...});
```
Dessine sur la carte un marqueur de destination avec les coordonnées saisies à la main lorsqu'on clic sur le bouton **go en rouge** dans **Set the route**.
```js
$("#inverse").click(function(){...});
```
Inverse les deux marqueurs de départ et de destination lorsqu'on clic sur le bouton avec les deux flèches dans **Set the route**.
```js
$("#remove").click(function(){...});
```
Supprime les marqueurs de la carte lorsqu'on clic sur le boutton **remove** dans **Set the route**.
```js
function affect(){...}
```
Affecter les coordonnées de départ et d'arrivée à la variable latlng.

## selection_of_the_area.js
```js
$("#nigeria").click(function(){...});
```
Reset la view de la carte sur Port Harcourt lorsqu'on clic sur le bouton **Nigeria** dans **Selection of the area**.
```js
$("#angola").click(function(){...});
```
Reset la view de la carte sur Luanda lorsqu'on clic sur le bouton **Angola** dans **Selection of the area**.
