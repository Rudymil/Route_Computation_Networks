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
{
  "type":"FeatureCollection",
  "zone_type":"warning_zone",
  "features":[{
    "type":"Feature",
    "geometry":{
      "type":"Polygon",
      "coordinates":[
        [
          [7.0496536916202,4.851353550492],
          [7.0510942257049,4.8472069037448],
          [7.0582968961281,4.8489612573988],
          [7.0587770741564,4.8540648057486],
          [7.0496536916202,4.851353550492]
        ]
      ]
    },
    "properties":{
      "risk_type":1,
      "risk_intensity":99
    }
  },
  {
    "type":"Feature",
    "geometry":{
      "type":"Polygon",
      "coordinates":[
        [
          [7.0424510211969,4.8657071308718],
          [7.0432513179106,4.8620390227449],
          [7.0390897749994,4.860922638045],
          [7.0378093002575,4.8637933378205],
          [7.0424510211969,4.8657071308718]
        ]
      ]
    },
    "properties":{
      "risk_type":3,
      "risk_intensity":99
    }
  }]
}
```
## GeoJSON anomalies
```json
{
  "type":"FeatureCollection",
  "zone_type":"anomaly_zone",
  "features":[{
    "type":"Feature",
    "geometry":{
      "type":"Polygon",
      "coordinates":[
        [
          [7.0496536916202,4.851353550492],
          [7.0510942257049,4.8472069037448],
          [7.0582968961281,4.8489612573988],
          [7.0587770741564,4.8540648057486],
          [7.0496536916202,4.851353550492]
        ]
      ]
    },
    "properties":{
      "anomaly_type":1,
      "description":"Lorem ipsum."
    }
  },
  {
    "type":"Feature",
    "geometry":{
      "type":"Polygon",
      "coordinates":[
        [
          [7.0424510211969,4.8657071308718],
          [7.0432513179106,4.8620390227449],
          [7.0390897749994,4.860922638045],
          [7.0378093002575,4.8637933378205],
          [7.0424510211969,4.8657071308718]
        ]
      ]
    },
    "properties":{
      "anomaly_type":3,
      "description":"Lorem ipsum."
    }
  }]
}
```
# Literature
* [Découvrir jQuery](https://openclassrooms.com/courses/jquery-ecrivez-moins-pour-faire-plus/decouvrir-jquery)
* [Le fonctionnement de $.ajax()](https://openclassrooms.com/courses/un-site-web-dynamique-avec-jquery/le-fonctionnement-de-ajax)
* [Leaflet API Reference](http://leafletjs.com/reference.html)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/#getting-started)
* [Open Street Map (Partie 2) – Intégration d’une carte avec Leaflet](https://blog.netapsys.fr/open-street-map-partie-2-integration-dune-carte-avec-leaflet/)
