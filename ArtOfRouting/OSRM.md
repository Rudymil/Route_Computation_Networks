#OSRM#

OSRM is a C++ routing engine using with OSM data.
It's working as an API

##Online demo##

[OSRM Demo](http://map.project-osrm.org/)

##OSRM Backend##

[Github Repository](https://github.com/Project-OSRM/osrm-backend)

##Installation##

*Source :
[dogeo.fr/osrm-installation](https://dogeo.fr/osrm-installation/)*

##Tools##

###OSRM Batch Routing###

This is a service to do massive routing.

[Doc](https://dogeo.fr/osrm-batch-routing-calculer-des-itineraires-par-lots/)

[App](https://dogeo.fr/_apps/OSRM-Batch-Routing/)

###JOSM Relations and Turn Based Restrictions###
![ ](https://josm.openstreetmap.de/svn/trunk/images_nodist/logo/josm_logo_header.jpg "JOSM Logo")

An application to edit OSM archive to create, modify, or delete roads relations and turn restrictions.
In our project, the **turn based restriction** can be useful. We can use it to *close* a road.

![ ](https://josm.openstreetmap.de/raw-attachment/wiki/Help/Plugin/TurnRestrictions/sample-screen-shot-1.png "TurnRestrictions")

![ ](https://josm.openstreetmap.de/raw-attachment/wiki/Help/Plugin/TurnRestrictions/toggle-dialog-screenshot.png "TurnRestrictions") 

[Wikipedia](http://wiki.openstreetmap.org/wiki/JOSM_Relations_and_Turn_Based_Restrictions)

##Conclusion##

With OSRM, right now, the only way I've found to do the job is by using turn or road restrictions.
This is not a really good way, the best would be to editing the network and delete roads or connexions.
The problem is : OSRM works directly with the OSM archive, no database.
If we choose this option, we will have a problem with the OSM data update. We should save in *a database (for example)* the road restrictions, to keep the history of all these modifications and reapply to each new updates.