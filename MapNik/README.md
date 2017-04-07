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
