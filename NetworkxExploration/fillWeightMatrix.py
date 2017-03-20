import json
from shapely.geometry import shape, Point

# load GeoJSON file containing sectors
with open('border_polygons.json') as f:
    js = json.load(f)

# construct point based on lon/lat returned by geocoder
point = Point(-100.001, 46.502)

# check each polygon to see if it contains the point
for feature in js:
    if feature["type"] == "Feature":
        polygon = shape(feature['geometry'])
        if polygon.contains(point):
            print ('Found containing polygon:', feature)
        else:
            print("not contained")
