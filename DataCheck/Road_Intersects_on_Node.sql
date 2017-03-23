--Liste des routes qui s'intersectent sur les extrémités
SELECT t.*, 'Intersection start/end sur start/end' AS requete
FROM FROM shp.road t
WHERE t.gid IN (
	SELECT t1.gid
	FROM shp.road_tmp t1, shp.road_tmp t2
	WHERE t1.gid < t2.gid
	AND t1.country ILIKE 'Nigeria'
	AND t2.country ILIKE 'Nigeria'
	AND (ST_Intersects(t1.st_startpoint, t2.st_startpoint)
	OR ST_Intersects(t1.st_startpoint, t2.st_endpoint)
	OR ST_Intersects(t1.st_endpoint, t2.st_startpoint)
	OR ST_Intersects(t1.st_endpoint, t2.st_endpoint)))