# Merge OSM data with Osmosis

Based on [https://hub.docker.com/r/farberg/openstreetmap-osmosis-docker/](https://hub.docker.com/r/farberg/openstreetmap-osmosis-docker/)

## Aim

The goal is to obtain a unique pbf file from many countries pbf files.
The requirement : the data files must be on the hard drive.

## Pull the image
```bash
docker pull farberg/openstreetmap-osmosis-docker
```

## Run the image

```bash
docker run --rm 
	-t
	-i
	farberg/openstreetmap-osmosis-docker
	-v /var/pbf_data:/data 
	--read-pbf /data/angola-latest.osm.pbf 
	--read-pbf /data/nigeria-latest.osm.pbf 
	--merge 
	--write-pbf /data/merge.osm.pbf
```

Then the merge.osm.pbf is write on the directory.
Now we can use it for other services like Nominatim or tiles server.