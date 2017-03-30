#!/bin/sh

echo "heat map (carheat.lua), expected osm data in ./data"
echo "output data in : ./data_heatcentral"

echo "-- copy osm.pbf --"
mkdir -p data_heatcentral
cp $(pwd)/data/luanda_angola.osm.pbf $(pwd)/data_heatcentral
cp $(pwd)/data/carheat.lua $(pwd)/data_heatcentral
cp $(pwd)/data/penalty.asc $(pwd)/data_heatcentral
cp $(pwd)/data/penalty.json $(pwd)/data_heatcentral

echo "-- extract --"
docker run -t \
-v $(pwd)/data_heatcentral:/data_heatcentral \
-e OSRM_RASTER_SOURCE=/data_heatcentral/penalty.asc \
-e LAT_MIN="-8.838110" -e LAT_MAX="-8.814069" -e LON_MIN="13.226584" -e LON_MAX="13.253394" -e NROWS="50" -e NCOLS="40" \
osrm/osrm-backend:v5.6.0 osrm-extract -p /data_heatcentral/carheat.lua /data_heatcentral/luanda_angola.osm.pbf

echo "-- contract --"
docker run -t -v $(pwd)/data_heatcentral:/data_heatcentral osrm/osrm-backend:v5.6.0 osrm-contract /data_heatcentral/luanda_angola.osrm

echo "-- Done Finito Fertig Hasta luego --"
