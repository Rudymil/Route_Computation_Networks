"""
Manage a networkx graph

Use python3.6

Copyright (C) 2017 Loïc Messal (github : Tofull)

"""
import json
from networkx.readwrite import json_graph
import networkx as netx
import random

def read_json_file(filename):
    """
    Return a graph from a filename
    """
    with open(filename) as f:
        js_graph = json.load(f)
    return json_graph.node_link_graph(js_graph)

def write_graph_to_json_file(filename, graph):
    """
    Write the graph into the filename.
    """
    data = json_graph.node_link_data(graph)
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

def apply_random_weight(graph, weightKeyToChange = 'weight_random', lowestBound = 0, highestBound = 50000):
    """
    Set a random weight (between lowestBound and highestBound) to the graph
    """
    for u,v,d in G.edges_iter(data=True):
        graph.add_weighted_edges_from([( u, v, random.randint(lowestBound, highestBound))], weight = weightKeyToChange)

def apply_default_weight(graph, defaultWeight = 0.0, weightKeyToChange = 'weight'):
    """
    Set a default weight to the graph
    """
    for u,v,d in graph.edges_iter(data=True):
        graph.add_weighted_edges_from([( u, v, defaultWeight)], weight=weightKeyToChange)

def fusion_weight(graph, fieldA = 'weight_to_avoid', fieldB = 'length', alpha = 1, beta = 1, weightKeyToChange = 'weight_fusion'):
    """
    Set a weight to the graph from the relation :
        fieldA ^ alpha * fieldB ^ beta
    """
    for u,v,d in graph.edges_iter(data=True):
        newWeight = (d[fieldA]**alpha) * (d[fieldB] ** beta)
        graph.add_weighted_edges_from([( u, v, newWeight)], weight=weightKeyToChange)

def find_closest_node_id(graph, lat, lon):
    """

    """
    squaredistance = []
    id = []
    for n_id in graph.nodes_iter():
        id.append(n_id)
        squaredistance.append((lat - graph.node[n_id]['lat'])**2 + (lon - graph.node[n_id]['lon'])**2)

    return id[sorted(range(len(id)), key=lambda k: squaredistance[k])[0]]

def save_path(filename, idList, graph):
    """
    Export the computed route (as a list of followed points targeted by their id) as array of lat lon location

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

def print_path(idList, graph):
    """
    Export the computed route (as a list of followed points targeted by their id) as array of lat lon location

    Result :
    [[43.6026628, 3.8776791], [43.6026417, 3.877659], [43.602617, 3.8776495]]
    """

    # name=netx.get_edge_attributes(graph,'name')

    result = []
    for index_node in range(len(idList)-1):
        edge = graph[idList[index_node]][idList[index_node+1]]
        result.append([ str(graph.node[idList[index_node]]['lat']), str(graph.node[idList[index_node]]['lon']), edge.get('OSMNAME')])
    edge = graph[idList[index_node]][idList[index_node+1]]
    result.append([ str(graph.node[idList[len(idList)-1]]['lat']), str(graph.node[idList[len(idList)-1]]['lon']), edge.get('OSMNAME')])
    return json.dumps(result)
