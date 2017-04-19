# Editor documentation
## Architecture
### Navigation bar
The navigation bar at the top is called **Navigation bar**. It is composed by on button named **menu** which allows to display or hidden the menu section.

![User documentation 1](img/Editor documentation 1.jpg)

In function if you use a small screen like smartphone or tablet, the menu section is automatically hidden.

![User documentation 2](img/User documentation 2.jpg)

![User documentation 3](img/Editor documentation 2.jpg)

### Map
Basicly, the map contains several features at the top left.
#### Zoom
The **zoom** is set at **1** and you may move until **18**.

![User documentation 3.1](img/Editor documentation 3.jpg)

#### Geolocalisation
The application propose to you to locate you.

![User documentation 3.2](img/Editor documentation 4.jpg)

If you use this feature, a departure green marker will be add to the map if you are located in a country containing data necessary for calculating itinerary.
#### Control Layers
It is possible to choose 2 different background map, the style **osm-bright** is selected by default.

![User documentation 4](img/User documentation 4.jpg)

### Menu
This section propose you with application-specific functionality.
#### Selection of the area
You may find here, the **list of countries** contained into the Database.

![User documentation 5](img/Editor documentation 5.jpg)

For each button, you set the view of the map on the country corresponding.
Furthermore, you display at the screen the tiles set specific to the same country.
Basicly, the **set view of the map** is focus on the **whole world**.
It is thus necessary to choose the right country before to move inside.

![User documentation 6](img/Editor documentation 6.jpg)

![User documentation 7](img/Editor documentation 7.jpg)

#### Layers
This sub menu, propose you all data available from the Database.

![User documentation 8](img/Editor documentation 8.jpg)

In order to request data from the Database, select the checkbox.
As it happens, you can choose to request all **anomaly zones** and/or all **warning zones** and/or all **point of interest**.

![User documentation 9](img/Editor documentation 9.jpg)

If Warning Zones are display, the map propose you a **legend** of the intensity of this zones.
Also, if the warning zones don't correspond to the legend and appear in *red*, that means this zones are **not verified**.
Furthermore, the **Control Layers** give you the possibility to display or not the layers downloaded from the Database.

![User documentation 10](img/Editor documentation 10.jpg)

The Points of Interest are grouped together into **clusters** to facilitate the display.
You may click on one cluster in order to display the markers inside.

![User documentation 11](img/Editor documentation 11.jpg)

Concerning Zones like for markers, you may click on to display theirs properties thank to a **popup**.

![User documentation 12](img/Editor documentation 12.jpg)

![User documentation 13](img/Editor documentation 13.jpg)

#### Itinerary
The itinerary mod is the basic state of the application.
It is selected by default when the application is loaded.
In this mod, you may choose by click on the map, your departure or arrival point.

![User documentation 14](img/Editor documentation 14.jpg)

**Warning**. Some rules exist about itinerary markers.
You cannot place markers into a country which doesn't contain **graph for the itinerary**.

![User documentation 15](img/Editor documentation 15.jpg)

You cannot place markers into **2 different countries**.

![User documentation 16](img/Editor documentation 16.jpg)

When the two types of markers are set, one itinerary appears between them, avoiding warning zones, and the **detail of the itinerary** is written in the windows at the top right of the map.

![User documentation 17](img/User documentation 17.jpg)

Thank to this windows you may add **intermediary points** to the itinerary and click on intersection to see its position on the map.
This same window has the possibility of reducing itself when using a small screen, thanks to the cross in the top right.

![User documentation 18](img/User documentation 18.jpg)

#### Report a warning zone
As a user, you are invited to report a warning zone.
For this purpose, you have the choice between draw boxes or polygons.

![Editor documentation 28](img/Editor documentation 28.jpg)

Firstly, choose the **type of drawing**.
Then click on **draw** and follow the instructions.
For boxes : *Click and drag to draw restangle.* then *Release mouse to finish drawing.*

![Editor documentation 29](img/Editor documentation 29.jpg)

For polygons : *Click to start drawing shape.* then *Click to continue drawing shape* and *Click first point to close this shape.*

![Editor documentation 30](img/Editor documentation 30.jpg)

Also for polygons, you can *Delete the last point*.

![Editor documentation 31](img/Editor documentation 31.jpg)

When you finished to draw your shape, you are invite to fill out a **form** :
* The **Types** must specify the type of warning.
* The **Description** must be completed by you and describe more precisly the warning.
* The **Expiration date** (*optional*) corresponds to the date when the zone will be remove from de Database.

You can cancel the process at any moment.
You may check the information of your shape by clicking on and displaying a popup.

![Editor documentation 32](img/Editor documentation 32.jpg)

Once the form has been validated, you may modify the geometry of shapes drawn : *Drag handles, or marker to edit feature.*

![Editor documentation 33](img/Editor documentation 33.jpg)

You may also delete the shape drawn : *Click on a feature to remove*

![Editor documentation 34](img/Editor documentation 34.jpg)

Don't forget to *save* your modifications.
When you are sure and agreed with your shapes, you may **Submit** to send them to the Database by clicking on the red button.

![Editor documentation 35](img/Editor documentation 35.jpg)

If the shapes are correctly sent, they are grayed out.
**Warning**. Only the shapes within countries with graph will be recorded into the Database.
Drawing boxes is only available for large screens.
#### Report an anomaly
The process is exactly the same that for warning zones.

![Editor documentation 36](img/Editor documentation 36.jpg)

The only differences are the color of the button **Submit** and shapes : *red* for warning and *blue* for anomaly.
#### Edition
As a editor, you are invited to update all zones from de Database displayed on screen.

![Editor documentation 17](img/Editor documentation 17.jpg)

You have the choice to update warning zones or anomaly zones.
In all the cases, a windows appears at the top right of the map and display all zones (*warning* or *anomaly*).
In this windows, you can click on every *blue* case to fly on the map toward the corresponding zone.

![Editor documentation 19](img/Editor documentation 19.jpg)

If you are on warning zones, you may check information thank to a popup in clincking on the shape.
You may also *Delete zones.*.

![Editor documentation 20](img/Editor documentation 20.jpg)

![Editor documentation 21](img/Editor documentation 21.jpg)

Then, you have just to *Click on a feature to remove.* like for the reporting.
You may also *Edit layers.*.

![Editor documentation 22](img/Editor documentation 22.jpg)

Then, you have just to *Drag handles, or marker to edit feature.* like for the reporting in order to modify the **geometry**.

![Editor documentation 23](img/Editor documentation 23.jpg)

In the same mod, if you want modify the **properties**, you have just to click on the shape to open the **form** :
* The **Types** must specify the type of warning.
* The **Description** must be completed by you and describe more precisly the warning.
* The **intensity** must represent numerically the warning of the zone.
* The **Expiration date** (*optional*) corresponds to the date when the zone will be remove from de Database.
* The **Validation** (*optional*) ensures that the shape be taken into account by the itinerary if it is *true*.

Don't forget to *save* or *cancel* at the end of all your processes.
If you are on anomaly zones, you may only *Delete zones.* like for warning zones.

![Editor documentation 24](img/Editor documentation 24.jpg)

Don't forget to click on the *green* button to send your *Update* to Database.
