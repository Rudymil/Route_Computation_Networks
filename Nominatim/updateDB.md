# Update Nominatim database using diff file

```
FROM hbaltz/nominatim
MAINTAINER Hugo BALTZ <hugobaltz@gmail.com>

# Load initial data
RUN mkdir -p /app/src/
# Mapping à faire entre /app/src/ et /data/ de la machine

RUN sudo -u nominatim ./src/utils/update.php --import-diff /data/global-diff.osc
```