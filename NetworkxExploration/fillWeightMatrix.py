## MODULES
import json
import networkx as netx
from networkx.readwrite import json_graph
import networkxGraphManager
from shapely.geometry import shape, Point

## PARAMETERS

### Filenames
graphFilenameInput = 'JSONData.json'
unallowedAreaFilenameInput = 'border_polygons.json'
graphFilenameOutput = 'test.json'

### Default variables
defaultWeight = 3.0
weightKeyToChange = 'weight'

## ALGORITHM

# Load the graph from networkx export file
G = networkxGraphManager.read_json_file(graphFilenameInput)

# Load GeoJSON file containing sectors
polygonList = []
with open(unallowedAreaFilenameInput) as f:
    js = json.load(f)
for feature in js:
    if feature["type"] == "Feature":
        polygon = shape(feature['geometry'])
        polygonList.append(polygon)

# Set the default weight
for u,v,d in G.edges_iter(data=True):
    G.add_weighted_edges_from([( u, v, defaultWeight)], weight=weightKeyToChange)

# Set the weight from the unallowedAreaFilenameInput file
for u,v,d in G.edges_iter(data=True):
    source = Point(G.node[u]["lat"], G.node[u]["lon"])
    target = Point(G.node[v]["lat"], G.node[v]["lon"])

    for polygon in polygonList:
            if polygon.contains(source) and polygon.contains(target):
                if (feature["properties"]["weight"] > 0):
                    new_weight = d["weight"] + feature["properties"]["weight"]
                    G.add_weighted_edges_from([( u, v, new_weight)], weight='weight')

# Export the modified graph
networkxGraphManager.write_graph_to_json_file(graphFilenameOutput, G)
