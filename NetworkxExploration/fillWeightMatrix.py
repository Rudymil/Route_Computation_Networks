## MODULES
import json
import networkx as netx
from networkx.readwrite import json_graph
import networkxGraphManager
from shapely.geometry import shape, Point
import os

def connection_postgres(warningZoneFilenameInput = 'WZone.json', host="172.31.56.216", dbname="projcomm", user="julie", password="julie", table="hot_area"):
    """
    Get a GeoJSON file with the warning zone from Postgres
    """
    try:
        os.system('rm '+warningZoneFilenameInput)
        os.system('ogr2ogr -f GeoJSON '+warningZoneFilenameInput+' "PG:host='+host+' port=5432 dbname='+dbname+' user='+user+' password='+password+'" \
        -sql "SELECT geom, risque AS weight FROM '+table+'"')
        print("Connect")

    except Exception as e:
        print("Can't connect")
        print(e)


def load_geojson_warning_zone(warningZoneFilenameInput):
    """
    Return data from geojson
    """
    with open(warningZoneFilenameInput) as f:
        js = json.load(f)
        return js["features"]

def fusion_warning_zone_with_graph(graph, featureList, featurePropertyDescribedWeight = "weight", weightKeyToChange = "weight"):
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
                polygon = shape(feature["geometry"])
                if polygon.contains(source) and polygon.contains(target):
                    if (feature["properties"][featurePropertyDescribedWeight] > 0):
                        # print(feature["properties"][featurePropertyDescribedWeight])
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
    # Get file
    connection_postgres(warningZoneFilenameInput)

    # Load the graph from networkx export file
    G = networkxGraphManager.read_json_file(graphFilenameInput)

    # Load GeoJSON file containing warning zone sectors
    featureList = load_geojson_warning_zone(warningZoneFilenameInput)

    # Set the default weight to the graph
    networkxGraphManager.apply_default_weight(G, defaultWeight, weightKeyToChange)

    # Set the weight from the warningZoneFilenameInput file
    fusion_warning_zone_with_graph(G, featureList, "weight", weightKeyToChange)

    # Export the modified graph
    networkxGraphManager.write_graph_to_json_file(graphFilenameOutput, G)


if __name__ == '__main__':
    main()
