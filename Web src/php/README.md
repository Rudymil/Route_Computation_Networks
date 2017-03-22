# A changer #

Date  (BDD et ph)
% de risque  (BDD et ph)


# Zones chaudes et zones à vérifier #

Données issues de la partie visualisation :
```
{
  circles : [[[lat,lng],radius]],[...]],
  boxes : [[[lat,lng],[lat,lng]],[...]],
  polygons : [[[lat,lng],[...],[...]],[...]]
}
```

Nous avons les information suivantes :
- Pour un cercle :
  - le centre [lat,lng]
  - le rayon   
  (- % de risque)
- Pour une boxe :
  - deux extemités [[lat,lng],[lat,lng]]  
  (- % de risque)
- Pour un polygone :
  - une suite de points [lat,lng],...  
  (- % de risque)

Code de projection : 4326

Nous pouvons voir dans la [documentation de postgresql](https://www.postgresql.org/docs/9.4/static/datatype-geometric.html) que nous pouvons manipuler plusieurs géometries avec les [fonctionnalités de postgis](http://postgis.net/docs/reference.html).

Nous allons avoir une unique base contenant toutes les zones à risques.

| id | type | geom | risque | date |
| :---: | :---: | :---: | :---: | :---: |
| - | - | - | - | - |

Idée pour la date :
```
date date not null default CURRENT_DATE
select to_char(date, 'dd-mmyyyy') from hot_area;
```

Création de la table :
```SQL
CREATE EXTENSION postgis;
CREATE TABLE hot_area(
  id serial,
  type varchar);
```

De même avec verif_area, conf_hot_area ! 

Création de la géometrie :
```SQL
ALTER TABLE hot_area ADD COLUMN geom geometry(Geometry,4326);
```

Ajout pour un cercle :
```SQL
INSERT INTO hot_area (type, geom) VALUES ('CIRCLE', ST_Buffer(ST_SetSRID(ST_MakePoint(lat, lng),4326), radius));

-- Exemple
INSERT INTO hot_area (type, geom) VALUES ('CIRCLE', ST_Buffer(ST_SetSRID(ST_MakePoint(2, 43),4326), 20));
-- Le retour est un polygone
```

Ajout pour un box :
```SQL
INSERT INTO hot_area (type, geom) VALUES ('BOX', ST_SetSRID(ST_MakeBox2D(ST_Point(lat, lng), ST_Point(lat, lng)),4326));

-- Exemple
INSERT INTO hot_area (type, geom) VALUES ('BOX', ST_SetSRID(ST_MakeBox2D(ST_Point(3, 44), ST_Point(4,45)),4326));
-- Le retour est un polygone
```

Ajout pour un polygone :
```SQL
INSERT INTO hot_area (type, geom) VALUES ('POLYGON', ST_Polygon(ST_GeomFromText('LINESTRING(lat lng,lat lng,...)'), 4326));

-- Exemple
INSERT INTO hot_area (type, geom) VALUES ('POLYGON', ST_Polygon(ST_GeomFromText('LINESTRING(2 56,3 57,3 56, 2 56)'), 4326));
-- Le retour est un polygone
```



Sélection pour un cercle :
```SQL
SELECT * FROM hot_area WHERE type = 'CIRCLE';
-- Récupération du centre
SELECT id, ST_AsText(ST_centroid(geom)) FROM hot_area;
-- Récupération du rayon
SELECT ST_MaxDistance(ST_centroid(geom), geom) FROM hot_area;
```

Sélection pour un box :
```SQL
SELECT * FROM hot_area WHERE type = 'BOX';
```

Sélection pour un polygone :
```SQL
SELECT * FROM hot_area WHERE type = 'POLYGON';
```
