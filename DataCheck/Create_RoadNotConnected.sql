BEGIN;

--TRUNCATE shp.road_not_connected;

CREATE TABLE shp.road_not_connected AS
--INSERT INTO shp.road_not_connected
SELECT *
FROM shp.road
WHERE gid NOT IN (SELECT gid
		FROM shp.road_connexion
		);

COMMIT;