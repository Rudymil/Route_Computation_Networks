# Setup, Use, etc

## Docker

See [Docker recipe for osrm-backend](https://github.com/Project-OSRM/osrm-backend-docker)

Clone git repo and build osrm backend

## Documentation

<http://project-osrm.org/>

## Code

C++14

Accès : **libosrm** <https://github.com/Project-OSRM/osrm-backend/blob/master/docs/libosrm.md>

* Données en input : data.osrm (à partir de xxx.osm.pbf)
* fichier config

Exemple :

``` sh
docker run -t -v $(pwd):/data osrm/osrm-backend:vX.Y.Z osrm-extract -p /opt/car.lua /data/berlin-latest.osm.pbf
docker run -t -v $(pwd):/data osrm/osrm-backend:vX.Y.Z osrm-contract /data/berlin-latest.osrm
docker run -t -i -p 5000:5000 -v $(pwd):/data osrm/osrm-backend:vX.Y.Z osrm-routed /data/berlin-latest.osrm
```
* extraction des données **pbf**
* construction réseau osrm
* lance serveur de routing

## Profile 

`osrm/osrm-backend:vX.Y.Z osrm-extract -p /opt/car.lua /data/berlin-latest.osm.pbf`

**.lua** file : définit un profil (voiture, vélo) et des pénalités (ex: tournant)

> A voir si on peut inclure une grille *heatmap* à combiner aux poids du graphe

**rasterbot.lua** et **rasterbotinterp.lua** permet d'ajouter un fichier **heatmap** !!


## Data

Raw OpenStreetMap datasets (PBF and XML)
https://mapzen.com/data/metro-extracts/metro/luanda_angola/

http://wiki.openstreetmap.org/wiki/PBF_Format

## Go reader

https://github.com/glaslos/go-osm
https://github.com/qedus/osmpbf 