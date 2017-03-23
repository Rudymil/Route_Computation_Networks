```sql
rmaziere=$ create database osm;
--CREATE DATABASE
rmaziere=$ \c osm 
--Vous êtes maintenant connecté à la base de données « osm » en tant qu'utilisateur « rmaziere ».
osm=$ create extension postgis;
--CREATE EXTENSION
osm=$ create extension hstore;
--CREATE EXTENSION 
```

## Load data into the database
```sh
osm2pgsql --create --slim --verbose --database osm angola-latest.osm.pbf nigeria-latest.osm.pbf 
```

## Update database's data
```sh
osm2pgsql --append --slim --verbose --database osm angola-latest.osm.pbf nigeria-latest.osm.pbf 
```