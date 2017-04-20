# Merge OSM data with Osmosis

Based on [https://hub.docker.com/r/farberg/openstreetmap-osmosis-docker/](https://hub.docker.com/r/farberg/openstreetmap-osmosis-docker/)

## Aim

The goal is to extract only the roads (highways in osm language) from the latest osm files
The requirement : the data files must be on the hard drive.

## Pull the image
```bash
docker pull farberg/openstreetmap-osmosis-docker
```

## Get the source file
First download the source file of osm (angola-latest.osm.pbf for example).  
```bash
wget -P /var/osmosis http://download.geofabrik.de/africa/angola-latest.osm.pbf
```

## Run the image and the command

```bash
docker run --rm
-t -i
-v /var/osmosis:/data
farberg/openstreetmap-osmosis-docker
--read-pbf /data/angola-latest.osm.pbf
--tf accept-ways highway=*
--used-node
--write-pbf /data/angola-highways.pbf
```

### Remove the source file
```bash
rm /var/osmosis/angola-latest.osm.pbf
```

## With an orchestrator

![osmosis](./osmosis_scheme.png)

The orchestrator will launch the same commands in the same order than when you do it manually
