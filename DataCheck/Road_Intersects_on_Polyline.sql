SELECT COUNT(*)
FROM shp.road t1, shp.road t2
WHERE t1.gid < t2.gid
AND t1.country ILIKE 'Angola'
AND t2.country ILIKE 'Angola'
AND (ST_Intersects(ST_StartPoint(t1.geom), t2.geom)
OR ST_Intersects(ST_EndPoint(t1.geom), t2.geom))