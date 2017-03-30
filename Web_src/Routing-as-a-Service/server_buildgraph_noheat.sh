#!/bin/sh

echo "no heat map (default : car.lua), expected osm data in ./data"
echo "output data in : ./data_noheat"

echo "-- copy osm.pbf --"
mkdir -p data_noheat
cp $(pwd)/data/luanda_angola.osm.pbf $(pwd)/data_noheat

echo "-- extract --"
docker run -t -v $(pwd)/data_noheat:/data_noheat osrm/osrm-backend:v5.6.0 osrm-extract -p /opt/car.lua /data_noheat/luanda_angola.osm.pbf

echo "-- contract --"
docker run -t -v $(pwd)/data_noheat:/data_noheat osrm/osrm-backend:v5.6.0 osrm-contract /data_noheat/luanda_angola.osrm

echo "-- Done Finito Fertig Hasta luego --"

