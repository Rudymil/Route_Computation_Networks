#!/bin/bash
cd /data

wget -P /data https://openmaptiles.os.zhdk.cloud.switch.ch/v3.3/extracts/nigeria.mbtiles

xvfb-run -a -e /dev/stdout --server-args="-screen 0 1024x768x24" node /usr/src/app/ -p 80 "$@"
