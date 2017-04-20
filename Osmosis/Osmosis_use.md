# Extract OSM data with Osmosis
## Aim
The goal is to extract only the roads (highways in osm language) from the latest osm files
The requirement : the data files must be on the hard drive.

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

# Merge OSM data with Osmosis

## Aim

The goal is to obtain a unique pbf file from many countries pbf files.
The requirement : the data files must be on the hard drive.

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

# Create diff OSM data with Osmosis

## Aim

The goal is to obtain a unique diff file from many countries to update the nominatim database.
The requirement : the data files must be on the hard drive.

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
