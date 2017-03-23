##Traitment chain proposition

- Import data into PostgreSQL,
- Topology traitment with *topology* PostGIS extension,
- Network generation with *pgRouting*, route calculation and geoJSON export.

##Tools and libraries proposition

###PostGIS

PostGIS with the PostGIS Topology types and functions are used to manage topological objects such as faces, edges and nodes.

**Database creation & Extensions activation**

```sql
CREATE DATABASE "roadsdb";
CREATE EXTENSION postgis; --Activate PostGIS extension
CREATE EXTENSION postgis_topology; --Activate PostGIS Topology extension
SET search_path = topology,public; --Add the 'topology' schema into the path
SHOW search_path;
       search_path
---------------------------
 "$user", public, topology
(1 ligne)

```

**Topology creation and association**

[CreateTopology](http://postgis.net/docs/manual-dev/CreateTopology.html)
[AddTopoGeometryColumn](http://postgis.net/docs/manual-dev/AddTopoGeometryColumn.html)

```sql
SELECT topology.CreateTopology('roads_topo', 3857); --Without tolerance
SELECT topology.CreateTopology('roads_topo', 3857, 5); --With a 5 meters tolerance

SELECT topology.AddTopoGeometryColumn('roads_topo', 'public', 'test', 'topo_geom', 'LINESTRING');
```

[toTopoGeom](http://postgis.net/docs/manual-dev/toTopoGeom.html) — Converts a simple Geometry into a topo geometry

```sql
UPDATE roads SET topo_geom = topology.toTopoGeom(wkb_geometry, 'roads_topo', 1.0); --With a 1 meter tolerance
```

**Sources :**
[Utiliser les topologies PostGIS pour nettoyer un filaire de voirie](https://makina-corpus.com/blog/metier/2013/utiliser-les-topologies-postgis-pour-nettoyer-un-filaire-de-voirie)

###osm2pgrouting

Easily import OpenStreetMap data into a pgRouting database using osm2pgrouting tool.

**How to install :**

Download the latest version from osm2pgrouting [GitHub repository](https://github.com/pgRouting/osm2pgrouting) and extract the file:

Then compile:
```sh
cd /path/to/osm2pgrouting
make
```

If you get an error like

```sh
src/Export2DB.h:25:22: error: libpq-fe.h: Datei oder Verzeichnis nicht gefunden
src/Export2DB.h:84: error: ISO C++ forbids declaration of ‘PGconn’ with no type
src/Export2DB.h:84: error: expected ‘;’ before ‘*’ token
src/Export2DB.cpp: In constructor ‘Export2DB::Export2DB(std::string,
std::string, std::string, std::string, std::string)’:
... etc etc.
```

just change src/Export2DB.h and set the path to libpq-fe.h statically.

**How to use**

Start the program like this:

```sh
./osm2pgrouting -file your-OSM-XML-File.osm \
                                -conf mapconfig.xml \
                                -dbname routing \
                                -user postgres \
                                -clean
```

all available parameters are:

```sh
required:
-file <file>  -- name of your osm xml file
-dbname <dbname> -- name of your database
-user <user> -- name of the user, which have write access to the database
-conf <file> -- name of your configuration xml file
optional:
-host <host>  -- host of your postgresql database (default: 127.0.0.1)
-port <port> -- port of your database (default: 5432)
-passwd <passwd> --  password for database access
-clean -- drop peviously created tables
```


**Source :**
[pgrouting.org/docs](http://pgrouting.org/docs/tools/osm2pgrouting.html)

###pgRouting


#TEST

```sql
CREATE EXTENSION postgis_topology;
SET search_path = topology,public;


select topology.CreateTopology('test_topo', 3857);

select topology.addtopogeometrycolumn('test_topo', 'public', 'test', 'topo_geom', 'LINESTRING');

update test set topo_geom = topology.toTopoGeom(way, 'test_topo', 1, 2.0);


```