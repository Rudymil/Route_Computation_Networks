# Merge OSM data with Osmosis

Based on [https://hub.docker.com/r/farberg/openstreetmap-osmosis-docker/](https://hub.docker.com/r/farberg/openstreetmap-osmosis-docker/)

## Aim

The goal is to obtain a unique pbf file from many countries pbf files.
The requirement : the data files must be on the hard drive.

## Pull the image
```bash
docker pull farberg/openstreetmap-osmosis-docker
```

## Move old merged data
```bash
mv /data/global-latest.osm.pbf /data/global-oldest.osm.pbf
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
	--write-pbf /data/global-latest.osm.pbf
```

Then the global-latest.osm.pbf is write on the directory.
Now we can use it for other services like Nominatim or tiles server.

## Tests

**Merge pbf to pbf (ziped)**
```bash
osmosis --read-pbf angola-latest.osm.pbf --read-pbf nigeria-latest.osm.pbf --merge --write-pbf global-latest.osm.pbf
INFOS: Total execution time: 33223 milliseconds.
```

**Merge pbf to osm (unziped)**
```
rmaziere@rks0910w029:/tmp$ osmosis --read-pbf angola-latest.osm.pbf --read-pbf nigeria-latest.osm.pbf --merge --write-xml global-latest.osm
INFOS: Total execution time: 96846 milliseconds.
```