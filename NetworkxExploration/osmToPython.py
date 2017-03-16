
import nx
import matplotlib.pyplot as plt
import networkx as netx
import json

import smopy
import matplotlib as mpl
mpl.rcParams['figure.dpi'] = mpl.rcParams['savefig.dpi'] = 200

def savePath(filename, idList, graph):
    with open(filename, 'w') as f:
        print([[graph.node[p]['lat'], graph.node[p]['lon']] for p in idList], file=f)


G=nx.read_osm(nx.download_osm(3.8748,43.5964,3.89,43.6072, cache=True))
# G=nx.read_osm(nx.download_osm(-122.328,47.608,-122.31,47.61, cache=True))
# print(G.node)
# source_id = "3788313781"
# target_id = "53195060"
source_id = "4445471419"
target_id = "3945401293"

pos0 = (G.node[source_id]['lat'],G.node[source_id]['lon'])
pos1 = (G.node[target_id]['lat'],G.node[target_id]['lon'])
map = smopy.Map(pos0, pos1, z=15, margin=.1)
plt.figure(figsize=(12,12));
map.show_mpl(ax=plt);

# plt.plot([G.node[n]['lat']for n in G], [G.node[n]['lon'] for n in G], 'o', color='k')
# plt.plot([G.node[n]['lat']for n in G], [G.node[n]['lon'] for n in G], 'o', color='k')
# x, y = map.to_pixels(G.node[:]['lon'], G.node[:]['lat'])

x = []
y = []

for n in G:
    a,b = map.to_pixels(G.node[n]['lat'], G.node[n]['lon'])
    x.append(a)
    y.append(b)

plt.plot(x[:], y[:], 'o', color='k', ms=1);
# print(G.node)
# print(G.node['3788313781']['data'])
# print(G.node['3788313781']['data'].lat)
# [print(G.node[n]['data'].lat) for n in G]

import random


# for u,v,d in G.edges_iter(data=True):
#     G.add_weighted_edges_from([( u, v, random.randint(0,50000))], weight='weight_random')

idList = []
# [idList.append(p) for p in netx.shortest_path(G,source=source_id,target=target_id)]
[idList.append(p) for p in netx.shortest_path(G,source=source_id,target=target_id, weight='length')]
# [idList.append(p) for p in netx.shortest_path(G,source=source_id,target=target_id, weight='weight_random')]


# print(G.nodes(data=True))
# print(G.edges(data=True))

# print([[G.node[p]['lat'], G.node[p]['lon']] for p in idList])
# plt.plot([G.node[n]['lat'] for n in idList], [G.node[n]['lon'] for n in idList], 'o' , color='b')
# plt.plot([G.node[n]['lat'] for n in idList], [G.node[n]['lon'] for n in idList], color='b')

x = []
y = []

for n in idList:
    a,b = map.to_pixels(G.node[n]['lat'], G.node[n]['lon'])
    x.append(a)
    y.append(b)

plt.plot(x[:], y[:], 'o' , color='b', ms=1);
plt.plot(x[:], y[:], color='b', ms=1);
# print(x)
# plt.plot([map.to_pixels(G.node[n]['lat'], G.node[n]['lon']) for n in idList], 'o' , color='b', ms=1)
# plt.plot([map.to_pixels(G.node[n]['lat'], G.node[n]['lon']) for n in idList], color='b', ms=1)

x = []
y = []

for n in [source_id]:
    a,b = map.to_pixels(G.node[n]['lat'], G.node[n]['lon'])
    x.append(a)
    y.append(b)

plt.plot(x[:], y[:], 'o', color='g', ms=2);

x = []
y = []

for n in [target_id]:
    a,b = map.to_pixels(G.node[n]['lat'], G.node[n]['lon'])
    x.append(a)
    y.append(b)

plt.plot(x[:], y[:], 'o', color='r', ms=2);

# plt.plot([G.node[source_id]['lat']], [G.node[source_id]['lon']], 'o', color='g')
# plt.plot([G.node[target_id]['lat']], [G.node[target_id]['lon']], 'o', color='r')
plt.show()


# print([p for p in netx.all_shortest_paths(G,source="3788313781",target="53195060")])

#
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
