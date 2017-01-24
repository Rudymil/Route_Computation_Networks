# Routing

## General information

### [Routing OSM wikipage](https://wiki.openstreetmap.org/wiki/Routing)

List offline, embedded, web based routing service based on OSM data.

3 types of users:
* **end-users**: request a route from two locations, some parameters available (ie bike)  
* **mappers**: improve data, add map features (OSM tags like road type, building, average speed, etc.) 
* **developers**: are responsible for the routing engine

> Note for **mappers**: [WayCheck](https://wiki.openstreetmap.org/wiki/WayCheck) is a Quality Assurance tool used to improve the quality of OSM data particularly for routing applications. It checks for connections and routing.

> Note for **developers**: there are many software in different languages (C++, java, android, python) with different algorithms and options (elevation awareness, alternatives, one or many routes, etc.). In addition, there is a certain number of [frameworks](https://wiki.openstreetmap.org/wiki/Frameworks#Navigation) that can be integrated in our own software.

At the end of the page, there is some general information on some road tags and their effect on routing.

### [Frameworks wikipage](https://wiki.openstreetmap.org/wiki/Frameworks)

List all types of framework (which can be embedded in an application), particularly:
* viewer (displaying static or dynamic maps)
* routing/navigation libraries
* data manipulation (format translation, data processing)



> Framework of interest: [BRouter](https://wiki.openstreetmap.org/wiki/BRouter)
> -> mixes OSM data with elevation data to produce a route


### [Map features wikipage](https://wiki.openstreetmap.org/wiki/Map_Features#Highway)


# NON TRIE

(https://www.mapbox.com/blog/smart-directions-with-osrm-graph-model/) 
explication du modele de routing utilisé par mapbox

(http://gis.stackexchange.com/questions/13943/help-choosing-a-suitable-routing-engine)

https://bitbucket.org/maproom/qmapshack/wiki/AdvRoutes
Creation de routes à la main
