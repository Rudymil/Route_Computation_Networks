SELECT ST_isValid(geom), COUNT(*), 'OSM the 2 countries' AS type
FROM shp.osm_road
GROUP BY ST_isValid(geom)