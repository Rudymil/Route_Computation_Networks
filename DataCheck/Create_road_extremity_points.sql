BEGIN;

TRUNCATE shp.road_extremity_points;

INSERT INTO shp.road_extremity_points
SELECT gid, ST_StartPoint(geom) startpoint, ST_EndPoint(geom) endpoint, country
FROM shp.road;

COMMIT;