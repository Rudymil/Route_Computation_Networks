spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
spanstart.addClass("start");
spanend = $(".leaflet-routing-geocoder").last().find("span");
spanend.addClass("end");
var posinit;
var latlngmar;

/**
 * Defines the type of the marker's icon according to its position
 * @param {number} i - index of the waypoint
 * @param {number} n - number of waypoints of the control routing .
 * @return {L.icon}  - The type of the marker's icon.
 */
function makeIcon(i, n) {
    var url = 'img/marker-via-icon-2x.png';
    var markerList = ['img/marker-start-icon-2x.png', 'img/marker-end-icon-2x.png'];
    if (i === 0) {
        return L.icon({
            iconUrl: markerList[0],
            iconSize: [20, 56],
            iconAnchor: [10, 28]
        });
    }
    if (i === n - 1) {
        return L.icon({
            iconUrl: markerList[1],
            iconSize: [20, 56],
            iconAnchor: [10, 28]
        });
    } else {
        return L.icon({
            iconUrl: url,
            iconSize: [20, 56],
            iconAnchor: [10, 28]
        });
    }
};

/**
 * Define the marker's position according to the index of the waypoint
 * @param {number} i - index of the waypoint
 * @param {number} n - number of waypoints of the control routing .
 * @return {string} "start", "end" or "step" - The marker's position.
 */
function pos(i, n) {
    if (i === 0) {
        return "start";
    }
    if (i === n - 1) {
        return "end"
    } else {
        return "step";
    }
};

var controlPenalty = L.Routing.control({
    waypoints: [null],
    routeWhileDragging: true,
    show: true,
    language: 'en',
    geocoder: L.Control.Geocoder.nominatim(),
    autoRoute: true,
    /**
     * Create a separate marker for each single waypoint.
     */
    createMarker: function(i, wp) {
        var marker = L.marker(wp.latLng, {
            draggable: true,
            icon: makeIcon(i, controlPenalty.getWaypoints().length)
        });

        /**
         * Display the coordinates of the marker in a pop up on marker click
         */
        marker.on("click", function(e) {
            marker.bindPopup(e.latlng.lat + ", " + e.latlng.lng);
            //alert (e.latlng.lat + ", " +e.latlng.lng);
        });

        /**
         * Retrieve the coordinates of the marker on marker drag start
         */

        marker.on("dragstart", function(ev) {
            posinit = this.getLatLng();
        });

        /**
         * Retrieve the coordinates of the marker on marker drag end, verify its coordinates and modify its location
         */

        marker.on("dragend", function(ev) {
            var latlng = [ev.target.getLatLng().lat, ev.target.getLatLng().lng, pos(i, controlPenalty.getWaypoints().length)];
            position = ev.target.getLatLng();
            send_ajax_point(latlng);
            spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
            spanstart.addClass("start");
            spanend = $(".leaflet-routing-geocoder").last().find("span");
            spanend.addClass("end");
            marker.setLatLng(posinit).update();
        });
        return marker;

    },
    router: L.Routing.osrmv1({
        serviceUrl: 'http://172.31.57.114:5001/route/v1'
    }),
    lineOptions: {
        styles: [{
            color: 'blue',
            opacity: 1,
            weight: 5
        }]
    },
    summaryTemplate: '<h2><font color="blue">SAFE ROUTE</font> {name}</h2><h3>{distance}, {time}</h3>'
}).addTo(map);


function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

/**
 * Display a context menu with two buttons to create a start or end marker on map click
 */
map.on('click', function(e) {
    if ($("#Navigate").is(":checked") == true) {
        var container = L.DomUtil.create('div'),
            startBtn = createButton('Start from this location', container),
            destBtn = createButton('Go to this location', container);

        /**
         * Verify the coordinates of the position and create a start marker when we click on the boutton Start from this location
         */
        L.DomEvent.on(startBtn, 'click', function() {
            latlngstart = [e.latlng.lat, e.latlng.lng, "start"];
            position = e.latlng;
            send_ajax_point(latlngstart);
            spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
            spanstart.addClass("start");
            spanend = $(".leaflet-routing-geocoder").last().find("span");
            spanend.addClass("end");
            map.closePopup();
        });

        /**
         * Verify the coordinates of the position and create an end marker when we click on the boutton Go to this location
         */
        L.DomEvent.on(destBtn, 'click', function() {
            latlngend = [e.latlng.lat, e.latlng.lng, "end"];
            position = e.latlng;
            send_ajax_point(latlngend);
            spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
            spanstart.addClass("start");
            spanend = $(".leaflet-routing-geocoder").last().find("span");
            spanend.addClass("end");
            map.closePopup();
        });
        L.popup()
            .setContent(container)
            .setLatLng(e.latlng)
            .openOn(map);
    }
});

var geoloc = L.easyButton({
    states: [{
        stateName: 'show me where I am',
        icon: 'fa-map-marker',
        title: 'Show me where I am, yo!',

        /**
         * Verify the coordinates of the user's position and create a marker.
         */
        onClick: function(control) {
            control._map.on('locationfound', function(e) {
                latlngstart = [e.latlng.lat, e.latlng.lng, "start"];
                position = e.latlng;
                send_ajax_point(latlngstart);
                spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
                spanstart.addClass("start");
                spanend = $(".leaflet-routing-geocoder").last().find("span");
                spanend.addClass("end");
            });

            /**
             * Display an error message if the location is not accessible
             */
            control._map.on('locationerror', function(e) {
                $.notify({
                    title: "<strong>Geolocalisation</strong>",
                    message: "Location access denied."
                }, {
                    type: "warning",
                    placement: {
                        from: "bottom",
                        align: "center"
                    }
                });
            });

            control._map.locate({
                setView: true,
                maxZoom: 16
            });
        }
    }]
});

geoloc.addTo(map);

/**
 * empty the global variable countrystart
 */
$(document).on('click', '.leaflet-routing-remove-waypoint.start', function() {
    countrystart = new Array(2);
    spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
    spanstart.addClass("start");
    spanend = $(".leaflet-routing-geocoder").last().find("span");
    spanend.addClass("end");
});


/**
 * empty the global variable countryend
 */
$(document).on('click', '.leaflet-routing-remove-waypoint.end', function() {
    countryend = new Array(2);
    spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
    spanstart.addClass("start");
    spanend = $(".leaflet-routing-geocoder").last().find("span");
    spanend.addClass("end");
});


$(document).on('click', '.leaflet-routing-add-waypoint', function() {
    spanstart = $(".leaflet-routing-geocoder").eq(0).find("span");
    spanstart.addClass("start");
    spanend = $(".leaflet-routing-geocoder").last().find("span");
    spanend.addClass("end");
});