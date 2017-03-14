
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
    for u,v,d in G.edges_iter(data=True):
        if (source == u and target == v):
            return id
        id += 1

    #
    #
    # for e in graph.edges_iter(data=True):
    #     print(e[0], e[1])
    #     if (source == e[0] and target == e[1]):
    #         return id
    return id


source = "53062784"
target = "4241681602"

filename = 'JSONData.json'
G = read_json_file(filename)
# print(G.nodes(data=True))
# print(G.edges(data=True))

# print(G[int(source)][int(target)])
e = selectEdge(G, source, target)
print("source :", source, "target :", target)
print("edge :", G.edges(data=True)[e])

source = "4241681602"
target = "53062785"
e = selectEdge(G, source, target)
print("source :", source, "target :", target)
print("edge :", G.edges(data=True)[e])

defaultWeight = 3.0
G.add_weighted_edges_from([( G.edges(data=True)[e][0], G.edges(data=True)[e][1], defaultWeight)])



print("edge :", G.edges(data=True)[e])
# print(e)
# plt.plot([G.node[n]['lat']for n in G], [G.node[n]['lon'] for n in G], 'o', color='k')
# plt.show()
