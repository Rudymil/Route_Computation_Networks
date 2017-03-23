SELECT COUNT(*), '*' AS country, 'osm_road' AS table
FROM shp.osm_road

UNION

SELECT COUNT(*), '*' AS country, 'test' AS table
FROM shp.test

UNION

SELECT COUNT(*), 'Angola' AS country, 'road' AS table
FROM shp.road
WHERE country ILIKE 'Angola'

UNION

SELECT COUNT(*), 'Angola' AS country, 'road_tmp' AS table
FROM shp.road_tmp
WHERE country ILIKE 'Angola'

UNION

SELECT COUNT(*), 'Nigeria' AS country, 'road' AS table
FROM shp.road
WHERE country ILIKE 'Nigeria'

UNION

SELECT COUNT(*), 'Nigeria' AS country, 'road_tmp' AS table
FROM shp.road_tmp
WHERE country ILIKE 'Nigeria'