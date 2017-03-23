import json
from shapely.geometry import shape, Point

import matplotlib.pyplot as plt
import networkx as netx
import json
from networkx.readwrite import json_graph

def read_json_file(filename):
    with open(filename) as f:
        js_graph = json.load(f)
    return json_graph.node_link_graph(js_graph)

def write_graph_to_json_file(filename, graph):
    data = json_graph.node_link_data(G)

    # s = json.dumps(data, indent=4)
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

filename = 'JSONData.json'
G = read_json_file(filename)

# load GeoJSON file containing sectors
with open('border_polygons.json') as f:
    js = json.load(f)

defaultWeight = 3.0
for u,v,d in G.edges_iter(data=True):
    G.add_weighted_edges_from([( u, v, defaultWeight)], weight='weight')


for u,v,d in G.edges_iter(data=True):
    source = Point(G.node[u]["lat"], G.node[u]["lon"])
    target = Point(G.node[v]["lat"], G.node[v]["lon"])

    for feature in js:
        if feature["type"] == "Feature":
            polygon = shape(feature['geometry'])
            if polygon.contains(source) and polygon.contains(target):
                if (feature["properties"]["weight"] > 0):
                    new_weight = d["weight"] + feature["properties"]["weight"]
                    G.add_weighted_edges_from([( u, v, new_weight)], weight='weight')



# print("edge :", G.edges(data=True))
write_graph_to_json_file("test.json", G)
