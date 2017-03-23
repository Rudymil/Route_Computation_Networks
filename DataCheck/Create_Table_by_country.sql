CREATE TABLE shp.road AS
(
SELECT r.*, a.name AS country
FROM shp.osm_road r, work_area a
WHERE ST_Contains(a.geom, r.geom)
)