
import nx
import matplotlib.pyplot as plt
import networkx as netx
import json

def savePath(filename, idList, graph):
    with open(filename, 'w') as f:
        print([[graph.node[p]['lat'], graph.node[p]['lon']] for p in idList], file=f)

G=nx.read_osm(nx.download_osm(-122.328,47.608,-122.31,47.61))
plt.plot([G.node[n]['lat']for n in G], [G.node[n]['lon'] for n in G], 'o', color='k')

source_id = "3788313781"
target_id = "53195060"

# print(G.node)
# print(G.node['3788313781']['data'])
# print(G.node['3788313781']['data'].lat)
# [print(G.node[n]['data'].lat) for n in G]

idList = []
[idList.append(p) for p in netx.shortest_path(G,source=source_id,target=target_id)]



print([[G.node[p]['lat'], G.node[p]['lon']] for p in idList])
plt.plot([G.node[n]['lat'] for n in idList], [G.node[n]['lon'] for n in idList], 'o' , color='b')
plt.plot([G.node[n]['lat'] for n in idList], [G.node[n]['lon'] for n in idList], color='b')


# print([p for p in netx.all_shortest_paths(G,source="3788313781",target="53195060")])


# plt.plot([G.node[source_id]['lat']], [G.node[source_id]['lon']], 'o', color='g')
# plt.plot([G.node[target_id]['lat']], [G.node[target_id]['lon']], 'o', color='r')
# plt.show()


#
# netx.draw(G)
# plt.draw()
# plt.show()
#
# outdir="/home/roselia/Bureau/osmPython"
# netx.write_shp(G, outdir)
# netx.write_gml(G, "outdir.gml")

from networkx.readwrite import json_graph
data = json_graph.node_link_data(G)

# s = json.dumps(data)
s = json.dumps(data, indent=4)
with open('JSONData.json', 'w') as f:
    json.dump(data, f, indent=4)

savePath("itineraire.json", idList, G)
