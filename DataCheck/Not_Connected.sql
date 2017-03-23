BEGIN;

TRUNCATE public.not_connected;

INSERT INTO public.not_connected
SELECT *
FROM shp.road
WHERE gid NOT IN (SELECT gid
			FROM result);
			
COMMIT;
