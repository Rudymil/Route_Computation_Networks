# Architecture
* [lib](lib) (*API used*)
  * [bootbox.min.js](lib/bootbox.min.js)
  * [bootstrap.min.js](lib/bootstrap.min.js)
  * [bootstrap-notify.min.js](lib/bootstrap-notify.min.js)
  * [handlebars.min.js](lib/handlebars.min.js)
  * [jquery.min.js](lib/jquery.min.js)
  * [list.min.js](lib/list.min.js)
  * [typeahead.bundle.min.js](lib/typeahead.bundle.min.js)
  * [jquery-1.10.2.js](lib/jquery-1.10.2.js)
  * [jquery-ui](lib/jquery-ui.js)
  * [leaflet.circle.topolygon-min.js](lib/leaflet.circle.topolygon-min.js)
  * [leaflet.draw.js](lib/leaflet.draw.js)
  * [leaflet.js](lib/leaflet.js)
  * [leaflet.markercluster.js](lib/leaflet.markercluster.js)
* [codeColor.js](codeColor.js)
* [Control.Geocoder.js](Control.Geocoder.js)
* [Control.OSMGeocoder.js](Control.OSMGeocoder.js)
* [easy-button.js](easy-button.js)
* [leaflet-routing-machine.js](leaflet-routing-machine.js)
* [menu_editor.js](menu_editor.js) (*Ajax requests for editor*)
  * Recover Warning Zones from the DB
  * Recover Anomaly Zones from the DB
  * Send updates to the DB
* [menu_user.js](menu_user.js) (*Ajax requests for basic user*)
  * Recover Warning Zones from the DB
* [menu.js](menu.js) (*Ajax requests for basic user and editor*)
  * Recover countries from the DB
  * Recover types from the DB
  * Send shapes drawn to the DB
  * Send points selected to the DB
* [report_a_warning_zone.js](report_a_warning_zone.js)
* [report_an_anomaly.js](report_an_anomaly.js)
* [set_the_route.js](set_the_route.js)
* [template.js](template.js) (*Basic JS functions of the model*)
  * Animation functions
  * Initialisation of the map
