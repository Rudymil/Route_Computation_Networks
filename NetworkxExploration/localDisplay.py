# Visualization modules
import matplotlib.pyplot as plt
import matplotlib as mpl
import smopy # osm map

# Networks modules
import networkx as netx

def print_smopy(map, listId):
    """

    """
    ### Display target node
    x = []
    y = []
    for n in listId:
        a,b = map.to_pixels(G.node[n]['lat'], G.node[n]['lon'])
        x.append(a)
        y.append(b)
    # plt.plot(x[:], y[:], 'o', color=colorPrint, ms=sizePoint)
    return x,y

def display_opt(DISPLAY, source_id, target_id, idList, G):
    if (DISPLAY == "OSM_MAP"):
        plt.figure(figsize=(12,12));
        map = smopy.Map(pos0, pos1, z=15, margin=.1)
        map.show_mpl(ax=plt);

        # Graph
        x,y = print_smopy(map, G)
        plt.plot(x[:], y[:], 'o', color='k', ms=1);

        # itineraire
        x,y = print_smopy(map, idList)
        plt.plot(x[:], y[:], 'o' , color='b', ms=1);
        plt.plot(x[:], y[:], color='b', ms=1);

        # Start
        x,y = print_smopy(map, [source_id])
        plt.plot(x[:], y[:], 'o', color='g', ms=2)

        # End
        x,y = print_smopy(map, [target_id])
        plt.plot(x[:], y[:], 'o', color='r', ms=2)

    if (DISPLAY == "MAP"):
        ## Display each node
        plt.plot([G.node[n]['lat']for n in G], [G.node[n]['lon'] for n in G], 'o', color='k')

        ## Display step - nodes for the route
        plt.plot([G.node[n]['lat'] for n in idList], [G.node[n]['lon'] for n in idList], 'o' , color='b')
        plt.plot([G.node[n]['lat'] for n in idList], [G.node[n]['lon'] for n in idList], color='b')

        ## Display source node
        plt.plot([G.node[source_id]['lat']], [G.node[source_id]['lon']], 'o', color='g')

        ## Display target node
        plt.plot([G.node[target_id]['lat']], [G.node[target_id]['lon']], 'o', color='r')

        plt.show()

    if (DISPLAY == "GRAPH"):
        #### DISPLAY GRAPH
        netx.draw(G)
        # plt.savefig("simple_path.png") # save as png
        plt.show() # display
