#!/bin/sh

echo "-- launch server --"
docker run -t -i -p 172.31.57.114:5000:5000 -v $(pwd)/data_noheat:/data_noheat osrm/osrm-backend:v5.6.0 osrm-routed /data_noheat/luanda_angola.osrm



# local website http://127.0.0.1:5000/route/v1/driving/-8.977323,13.139992;-8.916531,13.222647?steps=true
