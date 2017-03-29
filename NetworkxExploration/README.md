Install  
python3.6
> sudo apt-get install python3-pip  
> sudo -E python3.6 -m pip install networkx  
> sudo -E python3.6 -m pip install shapely  
> sudo -E python3.6 -m pip install matplotlib  
> sudo -E python3.6 -m pip install smopy  

Tests de solutions avec networkx
> python3.6 -m pip install smopy

> sudo apt-get install libgeos-dev
> pip3 install shapely

Load the graph and compute the route
> python3 osmToPython.py

(to merge with addWeight) [Final : Associate a weight to each edge of a graph from a geojson polygon list]
Currently, check if a point is inside a polygon from geojson  
> python3.5 fillWeightMatrix.py

![Schema](routing_via_networkx.png)


> python3.5 osm2itinerary.py 43.6026628 3.8776791 43.594988110031814 3.8692045211791997 "length"

> cd .. & php -S 127.0.0.1:8082

Open a web browser :
> http://127.0.0.1:8082/clientWebMockup/

Exemple of API routing query :
> http://127.0.0.1:8082/NetworkxExploration/server.php?lonSource=3.8776791&latSource=43.6026628&lonTarget=3.8692045211791997&latTarget=43.594988110031814&weightType="length"
