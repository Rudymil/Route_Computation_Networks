"""
Read directional graph from Open Street Maps osm format

Based on the osm to networkx tool from Tofull : https://gist.github.com/Tofull/49fbb9f3661e376d2fe08c2e9d64320e
Use python3.6


Copyright (C) 2017 Loïc Messal (github : Tofull)

"""
## Modules
# Elementary modules
import random

# Visualization modules
import matplotlib.pyplot as plt
import matplotlib as mpl
import smopy # osm map

# Data reader modules
import OSMParser # file OSMParser.py
import json
import sys

# Networks modules
import networkx as netx
from networkx.readwrite import json_graph
import fillWeightMatrix
import networkxGraphManager
import localDisplay


latSource = float(sys.argv[1])
lonSource = float(sys.argv[2])
latTarget = float(sys.argv[3])
lonTarget = float(sys.argv[4])
weightType = sys.argv[5]


VERBOSE = False

## CONFIGURATION VARIABLE
# DISPLAY = "OSM_MAP"
# DISPLAY = "MAP"
# DISPLAY = "GRAPH"
DISPLAY = "JSON"

def main():

    if (VERBOSE):
        print(latSource)
        print(lonSource)
        print(latTarget)
        print(lonTarget)

    ajout = 0.005
    G = OSMParser.read_osm(OSMParser.download_osm(round(min(lonSource, lonTarget),4)-ajout,round(min(latSource, latTarget),4)-ajout,round(max(lonSource, lonTarget),4)+ajout,round(max(latSource, latTarget),4)+ajout, cache=True, cacheTempDir = "/tmp/tmpOSM/", verbose = VERBOSE))

    source_id = networkxGraphManager.find_closest_node_id(G, latSource, lonSource)
    target_id = networkxGraphManager.find_closest_node_id(G, latTarget, lonTarget)

    if (VERBOSE):
        print("source_id : ", source_id)
        print("target_id : ", target_id)

    pos0 = (G.node[source_id]['lat'],G.node[source_id]['lon'])
    if (VERBOSE):
        print(pos0)
    pos1 = (G.node[target_id]['lat'],G.node[target_id]['lon'])

    warningZoneFilenameInput = 'border_polygons.json'
    graphFilenameOutput = 'testAvoid.json'
    defaultWeight = 3.0
    weightKeyToChange = 'weight_to_avoid'
    alphaValue = 0.5

    # Load GeoJSON file containing warning zone sectors
    featureList = fillWeightMatrix.load_geojson_warning_zone(warningZoneFilenameInput)

    # Set the default weight to the graph
    networkxGraphManager.apply_default_weight(G, defaultWeight, weightKeyToChange)

    # Set the weight from the warningZoneFilenameInput file
    fillWeightMatrix.fusion_warning_zone_with_graph(G, featureList, "weight", weightKeyToChange)

    networkxGraphManager.fusion_weight(G, alpha=alphaValue)

    networkxGraphManager.write_graph_to_json_file(graphFilenameOutput, G)
    ## ROUTING COMPUTATION


    idList = []
    [idList.append(p) for p in netx.shortest_path(G,source=source_id,target=target_id, weight=weightType)] ## Weight based on length of ways

    if (DISPLAY == "JSON"):
        print(networkxGraphManager.print_path(idList, G))
        # pass
    else :
        localDisplay.display_opt(DISPLAY, source_id, target_id, idList, G)


    # export graph
    ## To gml
    # outfile="/tmp/export_graph.gml"
    # netx.write_gml(G, outfile)

    ## To json
    data = json_graph.node_link_data(G)

    # s = json.dumps(data, indent=4)
    with open('JSONData.json', 'w') as f:
        json.dump(data, f, indent=4)
    networkxGraphManager.save_path("itineraire.json", idList, G)



if __name__ == '__main__':
    main()
