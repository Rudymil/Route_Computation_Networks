# Web API

A **DEBUG** mode is available to have a verbose and explicit API with the JSON or GeoJSON data, the SQL request, by adding a DEBUG variable with no value, for example :
http://172.31.56.223/api/server.php?DEBUG&{...}

## Parameters

The Web API's availables parameters are:

- **DEBUG** : allows the debug mode to have more informations like the SQL request, number of entities, the request's result, the JSON or GeoJSON data,
- **type** : to select the object's type within : {warning_zone|anomaly_zone|risk_type|anomaly_type|country|poi}
- **warning_zone**
- **anomaly_zone**
- **waypoint**
- **bbox** : the bounding box to geographically limit the request [southWestLng,southWestLat,northEastLng,northEastLat]
- **action**
- **id** : to select a specific entity
- **expired** : {true|false}
- **validated** : {true|false}

## Interactions

The available data, its method and the format to send or receive data are :

|Data|GET|POST|
|---|---|---|
|country|GeoJSON|#NA|
|waypoint|GeoJSON|#NA|
|poi|GeoJSON|#NA|
|risk|JSON|#NA|
|anomaly_type|JSON|#NA|
|warning_zone|GeoJSON|GeoJSON|
|anomaly_zone|GeoJSON|GeoJSON|

*Reading example for warning_zone :*

- to read database data : do a GET HTML request, data will be receive in GeoJSON,
- to create and save object in database : do a POST request with data in GeoJSON.

## Insert data

To send data into backend and save it in the database, requests must be send in POST, the all available parameters are :

- warning_zone=[GeoJSON]
- anomaly_zone=[GeoJSON]

**Check :**
Before insert an area into database, a check is make and only area in one of the countries in database can be created.

**Return value :**
The return value is the number of entities affected, here the number of entities created in database.

## Update data

To update existing entities, requests must be send in POST, the all available parameters are :

- action=update
- type={warning_zone|anomaly_zone}
- {warning_zone|anomaly_zone}=[GeoJSON]

**Check :**
Only area in one of the countries in database can be updated.

**Return value :**
The return value is the number of entities affected, here the number of updated entities.

## Delete data

To delete data, requests must be send in GET, the all available parameters are :

- action=delete
- type=[warning_zone|anomaly_zone]
- id={object id}

**Return value :**
The return value is the number of entities affected, here the number of deleted entities.

## Formats

Examples of JSON and GeoJSON data formats used.

### Web API returned data (SELECT)

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
        "name": "type of risk",
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
        "name": "type of anomaly",
        "anomaly_type": #,
        "description": "Lorem ipsum dolor sit amet",
        "expiration_date": {"YYYY-MM-DD"|null}
      }
    },
    {another feature}
  ]
}
```

### GeoJSON in POST (INSERT)

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

### GeoJSON in POST (UPDATE)

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

## Checks and Security

### HTML codes
If Web API doesn't receive right parameters in GET or POST request, it returns an **error 400**.

### SQL Injections
[PHP Manuel](http://php.net/manual/fr/security.database.sql-injection.php)
https://www.acunetix.com/websitesecurity/sql-security/
https://www.acunetix.com/websitesecurity/php-security-1/

## Tools and help

### Online Validation

JSON online editor, validator, minify - [jsoneditoronline.org](http://www.jsoneditoronline.org/)

GeoJSON online validator - [geojsonlint.com](http://geojsonlint.com/)

### Help
In Javascript, the bounding box is available with the function :

```js
map.getBounds().toBBoxString()
```