# OSRM Demo

## Services 

### 1- Penalty data generator

> https://github.com/Nilct/PenaltyMatrix

* **Input data**: json file describing warning zones (TODO: query to database)
* **Output data**: 
	* `penalty.asc` and `penalty.json`: used by OSRM and web client (debug)
	* `server_buildgraph_heat.sh`: bash script for the creation of the OSRM graph
	* `querylatlon.json`: used by web client (debug)
	
### 2- OSRM built for fastest route (debug)

> https://github.com/Nilct/Routing-as-a-Service

Built locally so it can be compared to *our* OSRM service

### 3- OSRM with warning zones

> https://github.com/Nilct/Routing-as-a-Service

* **Input data**: `penalty.asc` and `penalty.json`
* **Modified code**: `carheat.lua`, which take the warning zones into account
* **Launch scripts**:
	*  `server_buildgraph_heat.sh`: build graph
	*  `server_osrm_heat.sh`: launch server
	
### 4- OSRM frontend (temporary client)	

> https://github.com/Nilct/Routing-as-a-Service/frontend

* **Input data**: `penalty.asc` and `penalty.json`, `querylatlon.json` for debug

The web client shows both routes:
* **default**: fastest route (red)
* **penalty zones**: avoiding warning zones (blue)

In addition, the zones can be seen as vector forms or as a matrix (in use during the OSRM graph generation)