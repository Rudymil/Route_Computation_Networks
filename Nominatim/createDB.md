# Create Nominatim database and Import first data

```
FROM img_nominatim
MAINTAINER Hugo BALTZ <hugobaltz@gmail.com>

# Load initial data
RUN mkdir -p /app/src/
# Mapping à faire entre /app/src/ et /data/ de la machine

RUN sudo -u postgres psql postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='nominatim'" | grep -q 1 || sudo -u postgres createuser -s nominatim && \
    sudo -u postgres psql postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='www-data'" | grep -q 1 || sudo -u postgres createuser -SDR www-data && \
    
    useradd -m -p password1234 nominatim && \
    chown -R nominatim:nominatim ./src
    
#Create the databases nominatim if not exists
RUN sudo -u postgres psql postgres --host=127.0.0.1 -tAc "SELECT 1 FROM pg_database WHERE datname = 'nominatim'" | grep -q 1 || sudo -u postgres -c "CREATE DATABASE nominatim" && \
        
    sudo -u nominatim /app/src/utils/setup.php --osm-file /app/src/global-latest.osm.pbf --all --threads 2
```