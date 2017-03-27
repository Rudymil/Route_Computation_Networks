"""
Manage a networkx graph

Use python3.6

Copyright (C) 2017 Loïc Messal (github : Tofull)

"""
import json
from networkx.readwrite import json_graph
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



def applyRandomWeight(graph, weightKeyToChange = 'weight_random', lowestBound = 0, highestBound = 50000):
    """
    Set a random weight (between lowestBound and highestBound) to the graph
    """
    for u,v,d in G.edges_iter(data=True):
        graph.add_weighted_edges_from([( u, v, random.randint(lowestBound, highestBound))], weight = weightKeyToChange)



def applyDefaultWeight(graph, defaultWeight = 0.0, weightKeyToChange = 'weight'):
    """
    Set a default weight to the graph
    """
    for u,v,d in graph.edges_iter(data=True):
        graph.add_weighted_edges_from([( u, v, defaultWeight)], weight=weightKeyToChange)


def fusionWeight(graph, fieldA = 'weight_to_avoid', fieldB = 'length', alpha = 1, beta = 1, weightKeyToChange = 'weight_fusion'):
    """
    Set a weight to the graph from the relation :
        fieldA ^ alpha * fieldB ^ beta
    """
    for u,v,d in graph.edges_iter(data=True):
        newWeight = (d[fieldA]**alpha) * (d[fieldB] ** beta)
        graph.add_weighted_edges_from([( u, v, newWeight)], weight=weightKeyToChange)
