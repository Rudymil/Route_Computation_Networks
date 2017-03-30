# Input data

## OSM data

* Right now : extract from [MapZen](https://mapzen.com/) in *pbf* format 
* Future : extract from local database (public OSM + client OSM)

> *From MapZen* :
> Raw OSM data
> The raw, unformatted data in Metro Extracts from OpenStreetMap is stored in two formats: PBF and XML. This data is intended for use in a database (SQL for instance) as it includes everything from the extract and is not simplified at all. If you want to make custom groupings of the data through your own processing, this is the type for you! 

### Protocol Buffer Format (pbf)

Why **pbf** : faster to build than *xml*, 1/3rd smaller

> *From [wiki osm](http://wiki.openstreetmap.org/wiki/PBF_Format)
> At present, the reference implementation of PBF is the Osmosis implementation, split into two parts, the osmosis-specific part, contained in the Osmosis repository at [1], and an application-generic part at [2]. This application-generic part is used to build the osmpbf.jar (as used in osmosis and other Java-based PBF readers) and also contains the master definition of the PBF protocol buffer definitions (*.proto files).

* Reference tool : **Osmosis** (<http://wiki.openstreetmap.org/wiki/Osmosis>)

### From OSM to postgre

* <https://imposm.org/> : It reads PBF files and imports the data into PostgreSQL/PostGIS databases (v3 in go)
* osm2pgsql


## Heatmap

See format : https://github.com/Project-OSRM/osrm-backend/wiki/Integrating-third-party-raster-data