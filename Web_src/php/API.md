# API Web

A des fins de tests et dev, une instance de l'API est disponible à l'adresse suivant (PC fixe Rmaziere) :
http://172.31.56.223/api/server.php

Le mode **DEBUG** est activable en ajoutant la variable DEBUG dans l'URL sans valeur, exemple : http://172.31.56.223/api/server.php?DEBUG&{...}

## Les paramètres

Les différents paramètres de l'API sont :

- **DEBUG** : permet d'activer le mode debug,
- **type** : spécifie le type d'objet demandé, au choix parmi : {warning_zone|anomaly_zone|risk_type|anomaly_type|country|poi}
- **warning_zone**
- **anomaly_zone**
- **waypoint**
- **bbox** : permet la limitation des zones retournées suivant une bounding box [southWestLng,southWestLat,northEastLng,northEastLat]
- **action**
- **id** : permet de cibler une entité particulière
- **expired** : {true|false}
- **validated** : {true|false}

## Interactions

Les données disponibles via l'API ainsi que leur méthode et format d'envoi et/ou de retour sont :

|Données|GET|POST|
|---|---|---|
|country|GeoJSON|#NA|
|waypoint|GeoJSON|#NA|
|poi|#NA|GeoJSON|
|risk|JSON|#NA|
|anomaly_type|JSON|#NA|
|warning_zone|GeoJSON|GeoJSON|
|anomaly_zone|GeoJSON|GeoJSON|

*Exemple de lecture concernant les warning_zone :*

- pour récupérer celles en base : faire une requête en GET, les données retournées seront au format GeoJSON,
- pour en créer en base : faire une requête en POST avec les données au format GeoJSON.

## Insert data

Pour envoyer des données au backend et les stocker en base, les requêtes sont à effectuer en POST, les différents paramètres disponibles sont les suivants :

- warning_zone=[GeoJSON]
- anomaly_zone=[GeoJSON]

**Contrôle :**
Seules les zones se situant dans un pays présent en base pourront être créées.

**Retour :**
La valeur retournée par l'API sera le nombre d'entités affectées, ici le nombre d'objets créés en base.

## Update data

Pour mettre à jour des entités existantes, les requêtes sont à effectuer en POST, les différents paramètres disponibles sont les suivants :

- action=update
- type={warning_zone|anomaly_zone}
- {warning_zone|anomaly_zone}=[GeoJSON]

**Contrôle :**
Seules les zones dont la géométrie se situe dans un pays présent en base pourront être mise à jour.

**Retour :**
La valeur retournée par l'API sera le nombre d'entités affectées, ici le nombre d'objets modifiés en base.

## Delete data

Pour supprimer des données stockées en base, les requêtes sont à effectuer en GET, les différents paramètres disponibles sont les suivants :

- action=delete
- type=[warning_zone|anomaly_zone]
- id={identifiant de l'objet}

**Retour :**
La valeur retournée par l'API sera le nombre d'entités affectées, ici le nombre d'objets supprimés.

## Formats

Exemples de formats de données JSON & GeoJSON utilisés.

### Retours de l'API (SELECT)

#### JSON

**risk|anomaly_zone**
```json
[
  {"id": 1, "name": "Nom 1"},
  {"id": 2, "name": "Nom 2"}
]
```

#### GeoJSON

**country**

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.00001,
          -10.00001
        ]
      },
      "properties": {
        "id": 1,
        "name": "Pays 1"
      }
    },
    {another feature}
  ]
}
```

**poi**

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.00001,
          -10.00001
        ]
      },
      "properties": {
        "id": #,
        "name": "name of POI",
        "type": "category"
      }
    },
    {another feature}
  ]
}
```

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
          [
            [13.254404067993, -8.8440258142784],
            [13.254404067993, -8.8402941462384],
            [13.265390396118, -8.8402941462384],
            [13.265390396118, -8.8440258142784],
            [13.254404067993, -8.8440258142784]
          ]
        ]
      },
      "properties": {
        "id": #,
        "name": "type de risque",
        "risk_type": #,
        "description": "Lorem ipsum dolor sit amet",
        "intensity": #,
        "expiration_date": {"YYYY-MM-DD"|null},
        "validation_date": {"YYYY-MM-DD"|null}
      }
    },
    {another feature}
  ]
}
```

**anomaly_zone** 

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [13.254404067993, -8.8440258142784],
            [13.254404067993, -8.8402941462384],
            [13.265390396118, -8.8402941462384],
            [13.265390396118, -8.8440258142784],
            [13.254404067993, -8.8440258142784]
          ]
        ]
      },
      "properties": {
        "id":#,
        "name": "type d'anomalie",
        "anomaly_type": #,
        "description": "Lorem ipsum dolor sit amet",
        "expiration_date": {"YYYY-MM-DD"|null}
      }
    },
    {another feature}
  ]
}
```

### GeoJSON en POST (INSERT)

**warning_zone** 

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [13.254404067993, -8.8440258142784],
            [13.254404067993, -8.8402941462384],
            [13.265390396118, -8.8402941462384],
            [13.265390396118, -8.8440258142784],
            [13.254404067993, -8.8440258142784]
          ]
        ]
      },
      "properties": {
        "risk_type": #,
        "description": "Lorem ipsum dolor sit amet",
        "expiration_date": "2017-06-01"
      }
    },
    {another feature}
  ]
}
```

**anomaly_zone** 

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [13.254404067993, -8.8440258142784],
            [13.254404067993, -8.8402941462384],
            [13.265390396118, -8.8402941462384],
            [13.265390396118, -8.8440258142784],
            [13.254404067993, -8.8440258142784]
          ]
        ]
      },
      "properties": {
        "anomaly_zone": #,
        "description": "Lorem ipsum dolor sit amet",
        "expiration_date": "2017-06-01"
      }
    },
    {another feature}
  ]
}
```

**waypoint** 

```json
{
  "type": "Point",
  "waypoint": {"start"|"step"|"end"},
  "coordinates": [8.097, 9.592]
}
```

### GeoJSON en POST (UPDATE)

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
          [
            [13.254404067993, -8.8440258142784],
            [13.254404067993, -8.8402941462384],
            [13.265390396118, -8.8402941462384],
            [13.265390396118, -8.8440258142784],
            [13.254404067993, -8.8440258142784]
          ]
        ]
      },
      "properties": {
        "id": #,
        "risk_type": #,
        "description": "Lorem ipsum dolor sit amet",
        "intensity": #,
        "expiration_date": "2017-06-01",
        "validated": {true|false}
      }
    },
    {another feature}
  ]
}
```

**anomaly_zone** 

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [13.254404067993, -8.8440258142784],
            [13.254404067993, -8.8402941462384],
            [13.265390396118, -8.8402941462384],
            [13.265390396118, -8.8440258142784],
            [13.254404067993, -8.8440258142784]
          ]
        ]
      },
      "properties": {
        "id":#,
        "anomaly_zone": #,
        "description": "Lorem ipsum dolor sit amet",
        "expiration_date": "2017-06-01"
      }
    },
    {another feature}
  ]
}
```

## Sécurité & Contrôle

### Code HTML
Si l'API Web est appelée, mais que les requêtes GET ou POST ne passent pas les paramètres obligatoires, elle retournera une **erreur HTML code 400**.

### Injections SQL
[PHP Manuel](http://php.net/manual/fr/security.database.sql-injection.php)
https://www.acunetix.com/websitesecurity/sql-security/
https://www.acunetix.com/websitesecurity/php-security-1/

## Outils & Aide

### Validation en ligne

Editeur, validateur, minifieur en ligne JSON - [jsoneditoronline.org](http://www.jsoneditoronline.org/)

Validateur en ligne GeoJSON - [geojsonlint.com](http://geojsonlint.com/)

### Divers
La chaîne des coordonnées de la bounding box est disponible via la fonction javascript :

```js
map.getBounds().toBBoxString()
```