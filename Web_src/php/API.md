# API Web

A des fins de tests et dev, une instance de l'API est disponible à l'adresse suivant (PC fixe Rmaziere) :
http://172.31.56.223/api/server.php

Le mode **DEBUG** est activable en ajoutant la variable DEBUG dans l'URL sans valeur, exemple : http://172.31.56.223/api/server.php?DEBUG&{...}

## GET data

Pour récupérer des données stockées en base, les requêtes sont à effectuer en GET, les différents paramètres disponibles sont les suivants :

- type=[warning_zone|anomaly_zone|risk_type|anomaly_type|country] : pour récupérer au choix : les warning_zone ou les anomaly_zone ou les risk_type ou les anomaly_type ou la liste des pays.
- bbox=[southWestLng,southWestLat,northEastLng,northEastLat] **(optionnel)** : permet la limitation des zones retournées suivant une bounding box

La chaine des coordonnées de la bounding box est disponible via la fonction javascript :

```js
map.getBounds().toBBoxString()
```

## SEND data

Pour envoyer des données au backend et les stocker en base, les requêtes sont à effectuer en POST, les différents paramètres disponibles sont les suivants :

- warning_zone=[GeoJSON]
- anomaly_zone=[GeoJSON]
- waypoint=[GeoJSON]

### GeoJSON Formats

**warning_zone** 

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
          [[
              7.0,
              4.0
            ],
            {...}
            [
              7.1,
              4.0
            ]]]
      },
      "properties": {
        "risk_type": "#",
        "description": "texte de description"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [[
              7.0,
              4.0
            ],
            {...}
            [
              7.1,
              4.0
            ]]]
      },
      "properties": {
        "risk_type": "#",
        "description": "texte de description"
      }
    }
  ]
}
```

**anomaly_zone** 

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
          [[
              7.0,
              4.0
            ],
            {...}
            [
              7.1,
              4.0
            ]]]
      },
      "properties": {
        "anomaly_type": #,
        "description": "Excepteur sint occaecat cupidatat non proident."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [[
              7.0,
              4.0
            ],
            {...}
            [
              7.1,
              4.0
            ]]]
      },
      "properties": {
        "anomaly_type": #,
        "description": "Excepteur sint occaecat cupidatat non proident."
      }
    }
  ]
}
```


**waypoint** 

```json
{
  "type": "Point",
  "waypoint": {"start"|"step"|"end"},
  "coordinates": [
    8.097,
    9.592
  ]
}
```

## Sécurité & Contrôle

Si l'API Web est appelée, mais que les requêtes GET ou POST ne passent pas les paramètres obigatoires, elle retournera une **erreur HTML code 400**.