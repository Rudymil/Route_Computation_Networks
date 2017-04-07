# Organisation
* [index_editor.html](index_editor.html) (*HTML file of the editor's application*)
* [index.html](index.html) (*HTML file of the basic user's application*)
* [img](img) (*folder of pictures used*)
* [css](css) (*folder of style files*)
* [js](js) (*folder of script files*)
* [php](php) (*folder of database scripts*)

# API/Frameworks/Tools used
* [Bootstrap](http://getbootstrap.com/)
* [The GeoJSON Format Specification](http://geojson.org/geojson-spec.html)
* [jQuery](https://jquery.com/)
* [Leafletjs](http://leafletjs.com/)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/)
* [Bootstrap Notify](http://bootstrap-notify.remabledesigns.com/)

# Literature
* [Découvrir jQuery](https://openclassrooms.com/courses/jquery-ecrivez-moins-pour-faire-plus/decouvrir-jquery)
* [Le fonctionnement de $.ajax()](https://openclassrooms.com/courses/un-site-web-dynamique-avec-jquery/le-fonctionnement-de-ajax)
* [Leaflet API Reference](http://leafletjs.com/reference.html)
* [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/#getting-started)
* [Open Street Map (Partie 2) – Intégration d’une carte avec Leaflet](https://blog.netapsys.fr/open-street-map-partie-2-integration-dune-carte-avec-leaflet/)

# GeoJSON used
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
