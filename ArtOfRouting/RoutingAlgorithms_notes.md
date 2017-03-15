# Basics for routing algorithms

Sources :
* [Presentation of the OSRM model](https://www.mapbox.com/blog/smart-directions-with-osrm-graph-model/)

## Very naive view

A road network is represented as a graph where:
* the entities (ie **nodes**) are intersections
* the roads are connections (ie **edges**)
* **weights** on edges represent the cost to traverse it (it can depends on the mode of transport, ie bike vs car)

More edges are necessary to model a curved road (this would represent the geometry).

The simplest algorithm is **[Dijkstra’s Algorithm](http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)** which computes only the shortest path (ie with the minimum weight). It fails when there is an intersection with one-way roads.

## [OSRM](http://project-osrm.org/) view

A road network is represented by an *edge-expanded* model. Basically, **nodes** are roads and **edges** are valid paths. This takes into account the "intersection with one-ways" problem.

This king of graph is about 4 times larger than the naive one.

It can take into account a cost associated with road connections. For instance, it can minimise turns, stop signs, traffic signals... (which would be useful for two-wheeled vehicles)

See : <https://github.com/Project-OSRM/osrm-backend/wiki/Graph-representation>


