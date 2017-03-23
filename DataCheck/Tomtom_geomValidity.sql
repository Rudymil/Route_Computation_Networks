SELECT ST_isValid(geom), COUNT(*), 'Network Angola' AS type
FROM tomtom.network_a
GROUP BY ST_isValid(geom)

UNION 

SELECT ST_isValid(geom), COUNT(*), 'Network Nigeria' AS type
FROM tomtom.network_n
GROUP BY ST_isValid(geom)