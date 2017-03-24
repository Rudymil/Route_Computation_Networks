# JS functions
## codeColor.js  
```js
function codeColorRed(value){};
```
```js
function heatMapColorforValue(value){};
```  
## grid.js
```js
function addGrid(json){};
```  
Ajoute une grille de couleur sur la carte.
## menu.js
```js
$("#map").ready(function(){...});
```
Charge une **grille**.
```js
$("#calculate").click(function(){...});
```
Envoye les **points** de départ et d'arrivée à **l'algo**.
```js
function notify_wrong_format(shape){...}
```
Signale que le format de la **shape** n'est pas celui attendu.
```js
function notify_none(shape){...}
```
Signale qu'il n'y aucune **shape** à envoyer.
```js
function notify_ajax_sending_areas_success(code, statut){...}
```
Signale un succès de l'envoi des **shapes**.
```js
function notify_ajax_sending_areas_error(code, statut){...}
```
Signale une erreur de l'envoi des **shapes**.
```js
$("#submit1").click(function(){...});
```
Envoye les **warning zone** à la **BDD** après avoir vérifié leur format.
```js
$("#submit2").click(function(){...});
```
Envoye les **zones à vérifier** à la **BDD** après avoir vérifié leur format.
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
Dessine un marqueur de départ en vert sur la carte et affiche ses coordonnées dans le 1er input text dans **Route** lorsqu'on choisit l'option **Definir comme départ** dans le menu.
```js
$("#cm_fin").click(ep,function(){...};
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
$("#inverse").click(function(){...});
```
Inverse les deux marqueurs de départ et de destination lorsqu'on clic sur le bouton avec les deux flèches dans **Route**.
```js
$("#remove").click(function(){...});
```
Supprime les marqueurs de la carte lorsqu'on clic sur le boutton **remove** dans **Route**.
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
