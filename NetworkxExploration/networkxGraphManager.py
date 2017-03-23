"""
Manage a networkx graph

Use python3.6

Copyright (C) 2017 Loïc Messal (github : Tofull)

"""
import json
from networkx.readwrite import json_graph

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
