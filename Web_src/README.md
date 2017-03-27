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
[{
    "type": "Feature",
    "properties": {
        "type": "warningType",
        "description": "blablabla",
        "deadline": "date"
    },
    "geometry": {
        "type": "Circle",
        "coordinates": [[
            [lat, lng],radius
        ]]
    }
}, {
    "type": "Feature",
    "properties": {
        "type": "warningType",
        "description": "blablabla",
        "deadline": "date"
    },
    "geometry": {
        "type": "Rectangle",
        "coordinates": [[
            [lat, lng],
            [lat, lng],
            [lat, lng],
            [lat, lng]
        ]]
    }
}, {
    "type": "Feature",
    "properties": {
        "type": "warningType",
        "description": "blablabla",
        "deadline": "date"
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [lat, lng],
            [...],
        ]]
    }
}]
```
## GeoJSON anomalies
```json
[{
    "type": "Feature",
    "properties": {
        "type": "anomalyType",
        "description": "blablabla"
    },
    "geometry": {
        "type": "Circle",
        "coordinates": [[
            [lat, lng],radius
        ]]
    }
}, {
    "type": "Feature",
    "properties": {
        "type": "anomalyType",
        "description": "blablabla"
    },
    "geometry": {
        "type": "Rectangle",
        "coordinates": [[
            [lat, lng],
            [lat, lng],
            [lat, lng],
            [lat, lng]
        ]]
    }
}, {
    "type": "Feature",
    "properties": {
        "type": "anomalyType",
        "description": "blablabla"
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [lat, lng],
            [...],
        ]]
    }
}]
```
# Literature
* [Découvrir jQuery](https://openclassrooms.com/courses/jquery-ecrivez-moins-pour-faire-plus/decouvrir-jquery)
* [Le fonctionnement de $.ajax()](https://openclassrooms.com/courses/un-site-web-dynamique-avec-jquery/le-fonctionnement-de-ajax)
* [Leaflet API Reference](http://leafletjs.com/reference.html)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/#getting-started)
* [Open Street Map (Partie 2) – Intégration d’une carte avec Leaflet](https://blog.netapsys.fr/open-street-map-partie-2-integration-dune-carte-avec-leaflet/)
