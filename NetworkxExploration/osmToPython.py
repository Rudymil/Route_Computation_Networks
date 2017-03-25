"""
Read directional graph from Open Street Maps osm format

Based on the osm to networkx tool from Tofull : https://gist.github.com/Tofull/49fbb9f3661e376d2fe08c2e9d64320e
Use python3.6


Copyright (C) 2017 Loïc Messal (github : Tofull)

"""


## Modules
# Elementary modules
import random

# Data reader modules
import OSMParser # file OSMParser.py
import json


# Networks modules
import networkx as netx
from networkx.readwrite import json_graph
import fillWeightMatrix
import networkxGraphManager

# Visualization modules
import matplotlib.pyplot as plt
import matplotlib as mpl
import smopy # osm map


## CONFIGURATION VARIABLE
DISPLAY = "OSM_MAP"
# DISPLAY = "MAP"
# DISPLAY = "GRAPH"


def applyRandomWeight(graph):
    for u,v,d in G.edges_iter(data=True):
        G.add_weighted_edges_from([( u, v, random.randint(0,50000))], weight='weight_random')




def savePath(filename, idList, graph):
    """
        export the computed route (as a list of followed points targeted by their id) as array of lat lon location

        Result :
        [[43.6026628, 3.8776791], [43.6026417, 3.877659], [43.602617, 3.8776495]]
    """
    with open(filename, 'w') as f:
        # print([[graph.node[p]['lat'], graph.node[p]['lon']] for p in idList], file=f)
        counter = 0
        modulo = 1
        for p in idList:
            if (counter >= len(idList) - modulo ):
                comma = ""
            else:
                comma = ","
            if counter%modulo == 0:
                print("L.latLng("+str(graph.node[p]['lat'])+","+str(graph.node[p]['lon'])+")"+ comma, file=f)
            counter+=1


# Montpelllier Data
G = OSMParser.read_osm(OSMParser.download_osm(3.8748,43.5964,3.89,43.6072, cache=True, cacheTempDir = "/tmp/tmpOSM/"))
# print(G.nodes())
source_id = "4445471419"
target_id = "3670601901"

# Initial Data
# G = OSMParser.read_osm(OSMParser.download_osm(-122.328,47.608,-122.31,47.61, cache=True))
# source_id = "3788313781"
# target_id = "53195060"


pos0 = (G.node[source_id]['lat'],G.node[source_id]['lon'])
pos1 = (G.node[target_id]['lat'],G.node[target_id]['lon'])

warningZoneFilenameInput = 'border_polygons.json'
graphFilenameOutput = 'testAvoid.json'
defaultWeight = 3.0
weightKeyToChange = 'weight_to_avoid'
# Load GeoJSON file containing warning zone sectors
featureList = fillWeightMatrix.loadGeoJsonWarningZone(warningZoneFilenameInput)

# Set the default weight to the graph
networkxGraphManager.applyDefaultWeight(G, defaultWeight, weightKeyToChange)

# Set the weight from the warningZoneFilenameInput file
fillWeightMatrix.fusionWarningZoneWithGraph(G, featureList, "weight", weightKeyToChange)

networkxGraphManager.write_graph_to_json_file(graphFilenameOutput, G)
## ROUTING COMPUTATION


idList = []
# [idList.append(p) for p in netx.shortest_path(G,source=source_id,target=target_id)] ## Uniform weight
# [idList.append(p) for p in netx.shortest_path(G,source=source_id,target=target_id, weight='length')] ## Weight based on length of ways



[idList.append(p) for p in netx.shortest_path(G,source=source_id,target=target_id, weight='weight_to_avoid')] ## Weight based on length of ways
# applyRandomWeight(G)
# [idList.append(p) for p in netx.shortest_path(G,source=source_id,target=target_id, weight='weight_random')] ## Random weight




## WITH osm map
### Load map
if (DISPLAY == "OSM_MAP"):
    plt.figure(figsize=(12,12));
    map = smopy.Map(pos0, pos1, z=15, margin=.1)
    map.show_mpl(ax=plt);

    ### Display each node
    x = []
    y = []
    for n in G:
        a,b = map.to_pixels(G.node[n]['lat'], G.node[n]['lon'])
        x.append(a)
        y.append(b)

    plt.plot(x[:], y[:], 'o', color='k', ms=1);


    ### Display step - nodes for the route
    x = []
    y = []
    for n in idList:
        a,b = map.to_pixels(G.node[n]['lat'], G.node[n]['lon'])
        x.append(a)
        y.append(b)

    plt.plot(x[:], y[:], 'o' , color='b', ms=1);
    plt.plot(x[:], y[:], color='b', ms=1);



    ### Display source node
    x = []
    y = []
    for n in [source_id]:
        a,b = map.to_pixels(G.node[n]['lat'], G.node[n]['lon'])
        x.append(a)
        y.append(b)

    plt.plot(x[:], y[:], 'o', color='g', ms=2);



    ### Display target node
    x = []
    y = []
    for n in [target_id]:
        a,b = map.to_pixels(G.node[n]['lat'], G.node[n]['lon'])
        x.append(a)
        y.append(b)

    plt.plot(x[:], y[:], 'o', color='r', ms=2);

    ### Display target node
    x = []
    y = []
    points = []
    for feature in featureList:
        if feature["type"] == "Feature":
            if (feature['geometry']["type"] ==  "Polygon"):
                for point in feature['geometry']["coordinates"][0]:
                    # print(point[0], point[1])
                    a,b = map.to_pixels(point[0], point[1])
                    if (a >= 0) and (b >= 0):
                        points.append([a, b])

                if (len(points) > 0):
                    print(points)
                    plt.Polygon(points)
                points = []

    plt.show()


## WITHOUT osm map

if (DISPLAY == "MAP"):
    ## Display each node
    plt.plot([G.node[n]['lat']for n in G], [G.node[n]['lon'] for n in G], 'o', color='k')

    ## Display step - nodes for the route
    plt.plot([G.node[n]['lat'] for n in idList], [G.node[n]['lon'] for n in idList], 'o' , color='b')
    plt.plot([G.node[n]['lat'] for n in idList], [G.node[n]['lon'] for n in idList], color='b')

    ## Display source node
    plt.plot([G.node[source_id]['lat']], [G.node[source_id]['lon']], 'o', color='g')

    ## Display target node
    plt.plot([G.node[target_id]['lat']], [G.node[target_id]['lon']], 'o', color='r')

    plt.show()

if (DISPLAY == "GRAPH"):
    #### DISPLAY GRAPH
    netx.draw(G)
    # plt.savefig("simple_path.png") # save as png
    plt.show() # display


### DATA PRINTER
# print("nodes :", G.node)
# print(G.node['3788313781']['data'])
# print(G.node['3788313781']['data'].lat)
# [print(G.node[n]['data'].lat) for n in G]
# print([[G.node[p]['lat'], G.node[p]['lon']] for p in idList])
# print(G.nodes(data=True))
# print(G.edges(data=True))
# print([p for p in netx.all_shortest_paths(G,source="3788313781",target="53195060")])






# export graph
## To gml
# outfile="/tmp/export_graph.gml"
# netx.write_gml(G, outfile)

## To json
data = json_graph.node_link_data(G)

# s = json.dumps(data, indent=4)
with open('JSONData.json', 'w') as f:
    json.dump(data, f, indent=4)
savePath("itineraire.json", idList, G)
