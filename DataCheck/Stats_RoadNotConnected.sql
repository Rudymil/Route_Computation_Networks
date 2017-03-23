SELECT country, COUNT(*)
FROM shp.road_not_connected
GROUP BY country
ORDER BY country;

SELECT country, COUNT(*), SUM(ST_Length(geom)) / 0.0990026932021432 * 11021 AS long_cumul, SUM(ST_Length(geom)) / 0.0990026932021432 * 11021 / COUNT(*) AS long_moy
FROM shp.road_not_connected
GROUP BY country
ORDER BY country;

SELECT country, fclass, COUNT(*) AS quantity
FROM shp.road_not_connected
GROUP BY country, fclass
ORDER BY country, quantity DESC;