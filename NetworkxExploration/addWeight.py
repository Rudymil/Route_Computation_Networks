
import nx
import matplotlib.pyplot as plt
import networkx as netx
import json
from networkx.readwrite import json_graph

def read_json_file(filename):
    with open(filename) as f:
        js_graph = json.load(f)
    return json_graph.node_link_graph(js_graph)


def selectEdge(graph, source, target):
    id = 0
    for e in graph.edges_iter(data=True):
        print(e[0], e[1])
        if (source == e[0] and target == e[1]):
            return id
        id += 1


source = "53062784"
target = "53062794"

filename = 'JSONData.json'
G = read_json_file(filename)
# print(G.node[source])
print(G.edges(data=True))


# e = selectEdge(G, source, target)
# print(e)
# plt.plot([G.node[n]['lat']for n in G], [G.node[n]['lon'] for n in G], 'o', color='k')
# plt.show()
