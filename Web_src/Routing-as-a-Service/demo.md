# Demo for Luanda

## Prerequisite

Docker installed, [usable](https://docs.docker.com/engine/installation/linux/linux-postinstall/#manage-docker-as-a-non-root-user) as non root

## OSRM Backend

Attention : each osrm server should have a different port (5000 for default with no heat map, 5001 for *smart* osrm). All osrm services are run through *dockers* (not setup necessary on the machine besides *docker service*).

### No heat map

Generate all the files .osrm.* provided one has the original *.osm.pbf file:
``` sh
$ bash ./server_buildgraph_noheat.sh
```

Then launch the server :

``` sh
$ server_osrm_noheat.sh
```

### With heat map

First data has to be generated from the warning zones database. This is a compiled program in go (which will be dockerised as well). 

``` sh
$ go run penaltygen
```
Those files are then copied in the adequates folder with :
``` sh
$ bash ./deploy.sh
```
Build OSRM graph (about 5 minutes on a modern machine) :
``` sh
$ bash ./server_buildgraph_noheat.sh
```
Rebuilding the graph is necessary if warning zones change.

Then launch the server :
``` sh
$ server_osrm_heat.sh
```

## OSRM Frontend 

### Official frontend

An official frontend is provided by [project-osrm.org](http://project-osrm.org/), it is possible to use our backend.

### Homemade frontend

Launch :
``` sh
php -S 172.31.57.114:8080
```

Then connect to the web client via 172.31.57.114:8080

This frontend compares both osrm engines and can show the raster or vectorized version of warning zones.