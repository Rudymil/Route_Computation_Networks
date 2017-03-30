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
  * [heatGrid2json.php](php/heatGrid2json.php) (*Generate a json with all the informations for the heat grid*)
  * [heatPolygon.php](php/select_all.php) (*Read the json with the informations for the heat Polygon*)
* [data](data) (*folder of data files*)
  * [penalty.asc](data/penalty.asc) (*matrix of intensity for the grid*)
  * [penalty.json](data/penalty.json) (*parameters of the grid*)
  * [querylatlon.json](data/querylatlon.json) (*value and parameters for the heat polygon*)

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
  "type": "FeatureCollection",
  "zone_type": "warning_zone",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              7.0496536916202,
              4.851353550492
            ],
            [
              7.0510942257049,
              4.8472069037448
            ],
            [
              7.0582968961281,
              4.8489612573988
            ],
            [
              7.0587770741564,
              4.8540648057486
            ],
            [
              7.0496536916202,
              4.851353550492
            ]
          ]
        ]
      },
      "properties": {
        "risk_type": 1,
        "description": "Lorem ipsum dolor sit amet"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              7.0424510211969,
              4.8657071308718
            ],
            [
              7.0432513179106,
              4.8620390227449
            ],
            [
              7.0390897749994,
              4.860922638045
            ],
            [
              7.0378093002575,
              4.8637933378205
            ],
            [
              7.0424510211969,
              4.8657071308718
            ]
          ]
        ]
      },
      "properties": {
        "risk_type": 3,
        "description": "bla bla bla"
      }
    }
  ]
}
```
## GeoJSON anomalies
```json
{
  "type": "FeatureCollection",
  "zone_type": "anomaly_zone",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              7.0496536916202,
              4.851353550492
            ],
            [
              7.0510942257049,
              4.8472069037448
            ],
            [
              7.0582968961281,
              4.8489612573988
            ],
            [
              7.0587770741564,
              4.8540648057486
            ],
            [
              7.0496536916202,
              4.851353550492
            ]
          ]
        ]
      },
      "properties": {
        "anomaly_type": 1,
        "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              7.0424510211969,
              4.8657071308718
            ],
            [
              7.0432513179106,
              4.8620390227449
            ],
            [
              7.0390897749994,
              4.860922638045
            ],
            [
              7.0378093002575,
              4.8637933378205
            ],
            [
              7.0424510211969,
              4.8657071308718
            ]
          ]
        ]
      },
      "properties": {
        "anomaly_type": 3,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    }
  ]
}
```

## GeoJSON heat polygon
```json
{
  "type":"FeatureCollection",
  "features":[{
      "type":"Feature",
      "geometry":{
        "type":"Polygon",
        "coordinates":[
          [
            [-8.834868131113,13.227944321366],
            [-8.8358170914163,13.226583816953],
            [-8.8381104020621,13.229144766437],
            [-8.8372405272902,13.230585300522],
            [-8.834868131113,13.227944321366]
          ]
        ]
      },
      "properties":{
        "intensity":60
      }
    },{
      "type":"Feature",
      "geometry":{
        "type":"Polygon",
        "coordinates":[
          [
            [-8.8140694714179,13.239948772072],
            [-8.8180236794444,13.237868000616],
            [-8.822056928019,13.245390789725],
            [-8.8154139068956,13.246511205124],
            [-8.8140694714179,13.239948772072]
          ]
        ]
      },
      "properties":{
        "intensity":35
        }
      },{
        "type":"Feature",
        "geometry":{
          "type":"Polygon",
          "coordinates":[
            [
              [-8.8180236794444,13.24451046334],
              [-8.8204752671619,13.243069929255],
              [-8.8241130770021,13.252833549162],
              [-8.8222941765631,13.253393756862],
              [-8.8180236794444,13.24451046334]
            ]
          ]
        },
        "properties":{
          "intensity":90
          }
        }
      ]
    }
```

# Literature
* [Découvrir jQuery](https://openclassrooms.com/courses/jquery-ecrivez-moins-pour-faire-plus/decouvrir-jquery)
* [Le fonctionnement de $.ajax()](https://openclassrooms.com/courses/un-site-web-dynamique-avec-jquery/le-fonctionnement-de-ajax)
* [Leaflet API Reference](http://leafletjs.com/reference.html)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/#getting-started)
* [Open Street Map (Partie 2) – Intégration d’une carte avec Leaflet](https://blog.netapsys.fr/open-street-map-partie-2-integration-dune-carte-avec-leaflet/)
