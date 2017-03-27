Installations

Les commandes sont données pour un système avec ubuntu server 14.04
## Installation des dépendances

```sh
sudo apt-get install libboost-all-dev subversion git-core tar unzip wget bzip2 build-essential autoconf libtool libxml2-dev libgeos-dev libgeos++-dev libpq-dev libbz2-dev libproj-dev munin-node munin libprotobuf-c0-dev protobuf-c-compiler libfreetype6-dev libpng12-dev libtiff5-dev libicu-dev libgdal-dev libcairo-dev libcairomm-1.0-dev apache2 apache2-dev libagg-dev liblua5.2-dev ttf-unifont lua5.1 liblua5.1-dev node-carto
```

## Installation de PostgreSQL & PostGIS

```sh
sudo apt-get install postgresql postgresql-contrib postgis postgresql-9.4-postgis-2.1
```

### Installation d’osm2pgsql

```sh
mkdir ~/src
cd ~/src
git clone git@github.com:openstreetmap/osm2pgsql.git
cd osm2pgsql

sudo apt-get install make cmake g++ libboost-dev libboost-system-dev \
  libboost-filesystem-dev libexpat1-dev zlib1g-dev \
  libbz2-dev libpq-dev libproj-dev lua5.2 liblua5.2-dev

mkdir build && cd build
cmake ..

make

sudo make install
```

### Installation de Mapnik

```sh
cd ~/src
git clone git@github.com:mapnik/mapnik.git
cd mapnik
git submodule update --init




git branch 2.2 origin/2.2.x
git checkout 2.2

python scons/scons.py configure INPUT_PLUGINS=all OPTIMIZATION=3 SYSTEM_FONTS=/usr/share/fonts/truetype/
make
sudo make install
sudo ldconfig
```

Installation de mod_tile & renderd

```sh
cd ~/src
git clone git://github.com/openstreetmap/mod_tile.git
cd mod_tile
./autogen.sh
./configure
make
sudo make install
sudo make install-mod_tile
sudo ldconfig
```
