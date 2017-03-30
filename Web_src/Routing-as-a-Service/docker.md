# Docker

See docs.docker.com for instruction. Follow <https://docs.docker.com/engine/installation/linux/linux-postinstall/#manage-docker-as-a-non-root-user>

## Build osrm files and launch backend

### Debian

#### Backend

Checking that service is up, check proxy setup
``` sh
$ ~/Dev/Routing-as-a-Service$ sudo service --status-all | grep docker
 [ + ]  docker
$ sudo systemctl daemon-reload
$ /etc/systemd/system/docker.service.d$ systemctl show --property=Environment docker
Environment=HTTP_PROXY=http://10.0.4.2:3128/ HTTPS_PROXY=http://10.0.4.2:3128/ NO_PROXY=localhost,127.0.0.1
$ sudo systemctl restart docker
```

Clone repo and build latest version
``` sh
$ git clone https://github.com/Project-OSRM/osrm-backend-docker.git
``` 
** OR **
use Dockerfile from [dockerhub](https://hub.docker.com/r/osrm/osrm-backend/tags/)
``` sh
docker pull osrm/osrm-backend:v5.6.0
```
> **Note** : there is no `latest` tag !

``` sh
$ mkdir dockerdata ; cd dockerdata
$ wget http://download.geofabrik.de/europe/monaco-latest.osm.pbf
$ cd ..
$ docker run -t -v $(pwd)/dockerdata:/dockerdata osrm/osrm-backend:v5.6.0 osrm-extract -p /opt/car.lua /dockerdata/monaco-latest.osm.pbf
$ docker run -t -v $(pwd)/dockerdata:/dockerdata osrm/osrm-backend:v5.6.0 osrm-contract /dockerdata/monaco-latest.osrm
$ docker run -t -i -p 5000:5000 -v $(pwd)/dockerdata:/dockerdata osrm/osrm-backend:v5.6.0 osrm-routed /dockerdata/monaco-latest.osrm
``` 

#### Frontend

https://github.com/cartography/osrm-frontend-docker

### Rasbian

> Todo

## Query