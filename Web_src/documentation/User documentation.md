# User documentation
## Architecture
### Navigation bar
The navigation bar at the top is called **Navigation bar**. It is composed by on button named **menu** which allows to display or hidden the menu section.
In function if you use a small screen like smartphone or tablet, the menu section is automatically hidden.
### Map
Basicly, the map contains several features at the top left.
#### Zoom
The **zoom** is set at **1** and you may move until **18**.
#### Geolocalisation
The application propose to you to locate you. If you use this feature, a departure green marker will be add to the map if you are located in a country containing data necessary for calculating itinerary.
#### Control Layers
It is possible to choose 2 different background map, the style **osm-bright** is selected by default.
### Menu
This section propose you with application-specific functionality.
#### Selection of the area
You may find here, the **list of countries** contained into the Database.
For each button, you set the view of the map on the country corresponding.
Furthermore, you display at the screen the tiles set specific to the same country.
Basicly, the **set view of the map** is focus on the **whole world**.
It is thus necessary to choose the right country before to move inside.
#### Layers
This sub menu, propose you all data available from the Database.
In order to request data from the Database, select the checkbox.
As it happens, you can choose to request all **warning zones verified** and/or all **point of interest**.
However, despite the fact the checkbox is checked, it's not sufficient to display data.
Indeed, you are allow to display data only from the **zoom 12**.
If Warning Zones are display, the map propose you a **legend** of the intensity of this zones.
Furthermore, the **Control Layers** give you the possibility to display or not the layers downloaded from the Database.
The Points of Interest are grouped together into **clusters** to facilitate the display.
You may click on one cluster in order to display the markers inside.
Concerning Zones like for markers, you may click on to display theirs properties thank to a **popup**.
#### Itinerary
The itinerary mod is the basic state of the application.
It is selected by default when the application is loaded.
In this mod, you may choose by click on the map, your departure or arrival point.
**Warning**. Some rules exist about itinerary markers.
You cannot place markers into a country which doesn't contain **graph for the itinerary**.
You cannot place markers into **2 different countries**.
When the two types of markers are set, one itinerary appears between them, avoiding warning zones, and the **detail of the itinerary** is written in the windows at the top right of the map.
Thank to this windows you may add **intermediary points** to the itinerary and click on intersection to see its position on the map.
#### Report a warning zone
As a user, you are invited to report a warning zone.
For this purpose, you have the choice between draw boxes or polygons.
Firstly, choose the **type of drawing**.
Then click on **draw** and follow the instructions.
For boxes : *Click and drag to draw restangle.* then *Release mouse to finish drawing.*
For polygons : *Click to start drawing shape.* then *Click to continue drawing shape* and *Click first point to close this shape.*
Also for polygons, you can *Delete the last point*.
When you finished to draw your shape, you are invite to fill out a **form** :
* The **Types** must specify the type of warning.
* The **Description** must be completed by you and describe more precisly the warning.
* The **Expiration date** (*optional*) corresponds to the date when the zone will be remove from de Database.

You can cancel the process at any moment.
You may check the information of your shape by clicking on and displaying a popup.
Once the form has been validated, you may modify the geometry of shapes drawn : *Drag handles, or marker to edit feature.*
You may also delete the shape drawn : *Click on a feature to remove*
When you are sure and agreed with your shapes, you may **Submit** to send them to the Database by clicking on the red button.
If the shapes are correctly sent, they are grayed out.
**Warning**. Only the shapes within countries with graph will be recorded into the Database.
Drawing boxes is only available for large screens.
#### Report an anomaly
The process is exactly the same that for warning zones.
The only differences are the color of the button **Submit** and shapes : *red* for warning and *blue* for anomaly. 
