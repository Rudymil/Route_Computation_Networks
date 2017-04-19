# Create diff OSM data with Osmosis

Based on [https://hub.docker.com/r/farberg/openstreetmap-osmosis-docker/](https://hub.docker.com/r/farberg/openstreetmap-osmosis-docker/)

## Aim

The goal is to obtain a unique diff file from many countries to update the nominatim database.
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
	--read-pbf file="/data/global-latest.osm.pbf"
	--read-pbf file="/data/global-oldest.osm.pbf"
	--derive-change
	--write-xml-change file="/data/global-diff.osc"
```

Then the global-latest.osm.pbf is write on the directory.
Now we can use it with nominatim to update the database.