# Osmosis

[Osmosis](http://wiki.openstreetmap.org/wiki/Osmosis "link to osmosis") is a Java tool for osm. It manipulates osm data for many ways. In our case, we use it for extract only the roads (highways in osm language) from the latest osm files.  

## Installation

All the different installation are described [here](http://wiki.openstreetmap.org/wiki/Osmosis/Installation#Linux). For debian:

    su  
    apt-get install osmosis

Simply!

## Use

Osmosis has many applications. Here, we extract the highways data. But first we need a osm file, for example, the angola osm file.

    wget http://download.geofabrik.de/africa/angola-latest.osm.pbf

Then we can manipulate the data:

    osmosis --read-pbf angola-latest.osm.pbf --tf accept-ways highway=* --used-node --write-pbf angola-highways.pbf

For more examples of the use of osmosis, see  [osmosis wiki examples](http://wiki.openstreetmap.org/wiki/Osmosis/Examples) or the [detailled functions](http://wiki.openstreetmap.org/wiki/Osmosis/Detailed_Usage_0.45).  

To verified the obtained file, open it with Qgis.
