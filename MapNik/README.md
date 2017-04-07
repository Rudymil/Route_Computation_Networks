Inspired from [https://github.com/klokantech/tileserver-gl](https://github.com/klokantech/tileserver-gl).

# Configuration for angola 
```
cd config-angola
docker build -t mapnik-angola .
docker run -it -p 8080:80 mapnik-angola
```

# Configuration for nigeria
```
cd config-nigeria
docker build -t mapnik-nigeria .
docker run -it -p 8080:80 mapnik-nigeria
```

## Example 
You can use these tiles as a tilelayer on leaflet with the url : 
```
http://<ipServer:port>/styles/{id}/rendered/{z}/{x}/{y}.png
```
Where :
  - ipServer:port is the ip adress of where the docker is deployed
  - id is the identifier of the style :
    - klokantech-basic
    - osm-bright
