## MODULES
import json
import networkx as netx
from networkx.readwrite import json_graph
import networkxGraphManager
from shapely.geometry import shape, Point


def loadGeoJsonWarningZone(warningZoneFilenameInput):
    """
    Return data from geojson
    """
    with open(warningZoneFilenameInput) as f:
        js = json.load(f)
        return js

def fusionWarningZoneWithGraph(graph, featureList, featurePropertyDescribedWeight = "weight", weightKeyToChange = "weight"):
    """
    Apply weight from featureList to the graph
    """

    for u,v,d in graph.edges_iter(data=True):

        # Select the source and the target point of the edge
        source = Point(graph.node[u]["lon"], graph.node[u]["lat"])
        target = Point(graph.node[v]["lon"], graph.node[v]["lat"])

        # cumule the weight if the edge interferes with a warning zone
        for feature in featureList:
            if feature["type"] == "Feature":
                polygon = shape(feature['geometry'])
                if polygon.contains(source) and polygon.contains(target):
                    if (feature["properties"][featurePropertyDescribedWeight] > 0):
                        new_weight = d[weightKeyToChange] + feature["properties"][featurePropertyDescribedWeight]
                        graph.add_weighted_edges_from([( u, v, new_weight)], weight=weightKeyToChange)

def main(
        graphFilenameInput = 'JSONData.json',
        warningZoneFilenameInput = 'border_polygons.json',
        graphFilenameOutput = 'test.json',
        defaultWeight = 3.0,
        weightKeyToChange = 'weight'
    ):
    ## ALGORITHM
    # Load the graph from networkx export file
    G = networkxGraphManager.read_json_file(graphFilenameInput)

    # Load GeoJSON file containing warning zone sectors
    featureList = loadGeoJsonWarningZone(warningZoneFilenameInput)

    # Set the default weight to the graph
    networkxGraphManager.applyDefaultWeight(G, defaultWeight, weightKeyToChange)

    # Set the weight from the warningZoneFilenameInput file
    fusionWarningZoneWithGraph(G, featureList, "weight", weightKeyToChange)

    # Export the modified graph
    networkxGraphManager.write_graph_to_json_file(graphFilenameOutput, G)



if __name__ == '__main__':
    main()
