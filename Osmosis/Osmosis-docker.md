# Osmosis

Based on [https://hub.docker.com/r/farberg/openstreetmap-osmosis-docker/](https://hub.docker.com/r/farberg/openstreetmap-osmosis-docker/)

## Pull the image
```
docker pull farberg/openstreetmap-osmosis-docker
```

## Run the image and the command
```
docker run --rm -t -i -v /path/to/your/data:/data farberg/openstreetmap-osmosis-docker --read-pbf /data/angola-latest.osm.pbf --tf accept-ways highway=* --used-node --write-pbf /data/angola-highways.pbf
```
