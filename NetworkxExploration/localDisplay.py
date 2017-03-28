# Visualization modules
import matplotlib.pyplot as plt
import matplotlib as mpl
import smopy # osm map

plt.figure(figsize=(12,12));
map = smopy.Map(pos0, pos1, z=15, margin=.1)
map.show_mpl(ax=plt)

def printSmopy():
    """

    """
    x = []
    y = []
    for n in listId:
        a,b = map.to_pixels(G.node[n]['lat'], G.node[n]['lon'])
        x.append(a)
        y.append(b)
    plt.plot(x[:], y[:], 'o', color=colorPrint, ms=sizePoint)
