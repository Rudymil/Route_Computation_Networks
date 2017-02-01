# Libraries, API, source code

All the following examples uses OSM data.
See [comparison matrix 1](http://wiki.openstreetmap.org/wiki/Routing/online_routers) for a thorough list of online routers and [comparison matrix 1](http://wiki.openstreetmap.org/wiki/Routing/offline_routers) for offline routers (this one is *far* from up-to-date).

## OSRM

* Open source routing machine, [website] (http://project-osrm.org/) and [doc](http://project-osrm.org/docs/v5.5.4/api/#general-options)
* can be used as a library (C++) or through HTTP

Free, code available

## Distance API (and Directions API)

* Based on OSRM, it is provided by [Mapbox](https://www.mapbox.com/)
* Documentation : https://www.mapbox.com/api-documentation/#distance
Specificities:
* Can compute shortest round-trip given a set of coordinates
* Use raster data (= heatmap) to compute elevation costs 
* Can apply cost penalty 

Not free (requires access token).

## Osm-Routing-App

* Android app with offline routing (https://github.com/jgrunert/Osm-Routing-App)
* Algorithm is a partitioned routing graph + A* algorithm
* OSM data is transformed through [mapsforge](https://github.com/mapsforge/mapsforge), a Java tool.
* Student project

Could be an inspiration if we want to avoid C++ (OSRM)

## BRouter

* [website](http://brouter.de/brouter/), [server de test](http://h2096617.stratoserver.net/brouter-web)
* designed to calculate optimal cycling routes using OpenStreetMap and elevation data ([SRTM](https://wiki.openstreetmap.org/wiki/SRTM))
* available at a web service and and Android application
* provides best and alternative route, can process via-points and **nogo area** (forbidden zone around a point)

Seems quite old but provides details on the implementation, some discussion around this tool are in german.

## Leaflet routing machine

[Github](https://github.com/perliedman/leaflet-routing-machine)

Can handle multiple backend (OSRM, GraphHopper, Tomtom...)

## GraphHopper

http://wiki.openstreetmap.org/wiki/GraphHopper

* open source library and server written in java
* implements Dijkstra, A* and Contraction Hierarchies (simplification of routes, *we don't want that*)
* last update: oct. 2016