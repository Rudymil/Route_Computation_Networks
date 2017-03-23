# A changer #

Date  (BDD et php)  
% de risque  (BDD et php)


# Zones chaudes et zones à vérifier #


### Format des données ###

Données issues de la partie visualisation :
```
{
  circles : [[[[lat,lng],radius],type,description], ...]    
  boxes : [[[[lat,lng],[lat,lng],[lat,lng],[lat,lng]],type,description], ...]]    
  polygons : [[[[lat,ln],[lat,ln],[lat,ln], ...],type,description], ... }
}
```

Nous avons les information suivantes :
- Pour un cercle :
  - le centre [lat,lng]
  - le rayon   
  - le type : parmi une liste
  - le descriptif : % de risque ou texte
- Pour une boxe et un polygone:
  - une suite de points [lat,lng],...   
  - le type : parmi une liste
  - le descriptif : % de risque ou texte

Code de projection : 4326

Nous pouvons voir dans la [documentation de postgresql](https://www.postgresql.org/docs/9.4/static/datatype-geometric.html) que nous pouvons manipuler plusieurs géometries avec les [fonctionnalités de postgis](http://postgis.net/docs/reference.html).


Idée pour la date :
```
date date NOT NULL DEFAULT CURRENT_DATE
select to_char(date, 'dd-mmyyyy') from hot_area;
```

### Création des tables ###

Nous avons trois table :
- la table de zones à risque intermédiaire demandant la validation

| id | type_geom | geom | type_risque | risque | date | deadline |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| - | - | - | - | - | - | - |

- la table de zones à risque validées

| id | type_geom | geom | type_risque | risque| date | deadline |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| - | - | - | - | - | - | - |

- la table de zones à vérifier car manque d'information

| id | type_geom | geom | type | description | date |
| :---: | :---: | :---: | :---: | :---: | :---: |
| - | - | - | - | - | - |

Création de la table :
```SQL
CREATE EXTENSION postgis;
CREATE TABLE hot_area(
  id serial,
  type_geom varchar,
  type_risque varchar,
  risque real,
  date date NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE conf_hot_area(
  id serial,
  type_geom varchar,
  type_risque varchar,
  risque real,
  date date NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE verif_area(
  id serial,
  type_geom varchar,
  type varchar,
  description varchar,
  date date NOT NULL DEFAULT CURRENT_DATE
);
```

Création de la géometrie :
```SQL
ALTER TABLE conf_hot_area ADD COLUMN geom geometry(Geometry,4326);
ALTER TABLE hot_area ADD COLUMN geom geometry(Geometry,4326);
ALTER TABLE verif_area ADD COLUMN geom geometry(Geometry,4326);
```

### Ajout d'information à une table ###

Ajout pour un cercle :
```SQL
-- Avant
--INSERT INTO conf_hot_area (type, geom) VALUES ('CIRCLE', ST_Buffer(ST_SetSRID(ST_MakePoint(lat, lng),4326), radius));

INSERT INTO conf_hot_area (type, geom, risque) VALUES ('CIRCLE', ST_Buffer(ST_SetSRID(ST_MakePoint(lat, lng),4326), radius), risque);
-- Exemple
INSERT INTO conf_hot_area (type, geom, risques) VALUES ('CIRCLE', ST_Buffer(ST_SetSRID(ST_MakePoint(2, 43),4326), 20),50);

```

Ajout pour un box :
```SQL
-- Avant
-- INSERT INTO conf_hot_area (type, geom) VALUES ('BOX', ST_SetSRID(ST_MakeBox2D(ST_Point(lat, lng), ST_Point(lat, lng)),4326));

INSERT INTO conf_hot_area (type, geom, risque) VALUES ('BOX', ST_Polygon(ST_GeomFromText('LINESTRING(lat lng,lat lng,...)'), 4326), risque);
-- Exemple
INSERT INTO conf_hot_area (type, geom, risque) VALUES ('BOX', ST_Polygon(ST_GeomFromText('LINESTRING(2 56,3 57,3 56, 2 56)'), 4326), 60);
```

Ajout pour un polygone :
```SQL
-- Avant
-- INSERT INTO conf_hot_area (type, geom) VALUES ('POLYGON', ST_Polygon(ST_GeomFromText('LINESTRING(lat lng,lat lng,...)'), 4326));
INSERT INTO conf_hot_area (type, geom, risque) VALUES ('POLYGON', ST_Polygon(ST_GeomFromText('LINESTRING(lat lng,lat lng,...)'), 4326), risque);
-- Exemple
INSERT INTO conf_hot_area (type, geom, risque) VALUES ('POLYGON', ST_Polygon(ST_GeomFromText('LINESTRING(2 56,3 57,3 56, 2 56)'), 4326),30);

```
Après l'ajout des 3 géometries, Postgres les enregistre comme des polygones

### Récupération d'informations ###

Sélection pour un cercle :
```SQL
-- Récupération du centre : POINT(lat, lng)
SELECT id, ST_AsText(ST_centroid(geom)) FROM conf_hot_area WHERE type = 'CIRCLE';
-- Récupération du centre : lat et lng
SELECT ST_X(ST_centroid(geom)), ST_Y(ST_centroid(geom)) FROM conf_hot_area WHERE type = 'CIRCLE';
-- Récupération du rayon
SELECT ST_MaxDistance(ST_centroid(geom), geom) FROM conf_hot_area;
```

Sélection pour un box :
```SQL
SELECT * FROM conf_hot_area WHERE type = 'BOX';
-- Récupération de la liste de points : POLYGON((lat lng, lat lng, ...))
SELECT ST_AsText(geom) FROM hot_area WHERE type = 'BOX';
-- Récupération de la liste de points : lat lng, lat lng, ...
SELECT substring(left(ST_AsText(geom),-2),10) FROM hot_area WHERE type = 'BOX';
```

Sélection pour un polygone :
```SQL
SELECT * FROM conf_hot_area WHERE type = 'POLYGON';
-- Récupération de la liste de points : POLYGON((lat lng, lat lng, ...))
SELECT ST_AsText(geom) FROM hot_area WHERE type = 'POLYGON';
-- Récupération de la liste de points : lat lng, lat lng, ...
SELECT substring(left(ST_AsText(geom),-2),10) FROM hot_area WHERE type = 'POLYGON';
```
