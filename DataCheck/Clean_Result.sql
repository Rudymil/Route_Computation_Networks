BEGIN;

DELETE FROM shp.road_connexion
WHERE gid IN (
		SELECT gid 
		FROM shp.road_connexion
		WHERE requete = 'Intersection start/end sur polyline'
		)
AND requete = 'Intersection polyline sur polyline';

DELETE FROM shp.road_connexion
WHERE gid IN (
		SELECT gid 
		FROM shp.road_connexion
		WHERE requete = 'Intersection start/end sur start/end'
		)
AND requete = 'Intersection start/end sur polyline';

COMMIT;
