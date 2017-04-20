# Osmosis

[Osmosis](http://wiki.openstreetmap.org/wiki/Osmosis "link to osmosis") is a Java tool for osm. It manipulates osm data for many ways.

## In General
### Installation

All the different installation are described [here](http://wiki.openstreetmap.org/wiki/Osmosis/Installation#Linux). For debian:

    su  
    apt-get install osmosis

Simply!

### Use

Osmosis has many applications. Here, we extract the highways data. But first we need a osm file, for example, the angola osm file.

    wget http://download.geofabrik.de/africa/angola-latest.osm.pbf

Then we can manipulate the data:

    osmosis --read-pbf angola-latest.osm.pbf --tf accept-ways highway=* --used-node --write-pbf angola-highways.pbf

For more examples of the use of osmosis, see [osmosis wiki examples](http://wiki.openstreetmap.org/wiki/Osmosis/Examples) or the [detailled functions](http://wiki.openstreetmap.org/wiki/Osmosis/Detailed_Usage_0.45).  

To verified the obtained file, open it with Qgis.

<!-- -->

## With Docker
Based on [https://hub.docker.com/r/farberg/openstreetmap-osmosis-docker/](https://hub.docker.com/r/farberg/openstreetmap-osmosis-docker/)

### Pull the image
```
docker pull farberg/openstreetmap-osmosis-docker
```

### Create the repository
```bash
mkdir /var/osmosis
```

### Run the image and the command
**The requirement:** the data files must be on the hard drive.
Osmosis takes no volume with Docker and to use it, it needs only one command, for example:

    docker run --rm
      -t -i -v
      /path/to/your/data:/data
      farberg/openstreetmap-osmosis-docker
      --read-xml file="planetin.osm"
      --write-xml file="planetout.osm"
