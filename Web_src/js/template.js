var map, featureList, boroughSearch = [],
    theaterSearch = [],
    museumSearch = [];

$("#sidebar").hide();

$("#list-btn").click(function() {
    animateSidebar();
    return false;
});

$("#sidebar-toggle-btn").click(function() {
    animateSidebar();
    return false;
});

$("#sidebar-hide-btn").click(function() {
    animateSidebar();
    return false;
});

function animateSidebar() {
    $("#sidebar").animate({
        width: "toggle"
    }, 350, function() {
        map.invalidateSize();
    });
}

map = new L.Map(
    'map',
    dragging: true, // Whether the map be draggable with mouse/touch or not.
    touchZoom: true, // Whether the map can be zoomed by touch-dragging with two fingers.
    scrollWheelZoom: true, // Whether the map can be zoomed by using the mouse wheel. If passed 'center', it will zoom to the center of the view regardless of where the mouse was.
    doubleClickZoom: true, // Whether the map can be zoomed in by double clicking on it and zoomed out by double clicking while holding shift. If passed 'center', double-click zoom will zoom to the center of the view regardless of where the mouse was.
    boxZoom: true, // Whether the map can be zoomed to a rectangular area specified by dragging the mouse while pressing shift.
    tap: true, // Enables mobile hacks for supporting instant taps (fixing 200ms click delay on iOS/Android) and touch holds (fired as contextmenu events).
    tapTolerance: 15, // The max number of pixels a user can shift his finger during touch for it to be considered a valid tap.
    trackResize: true, // Whether the map automatically handles browser window resize to update itself.
    keyboard: true, // Makes the map focusable and allows users to navigate the map with keyboard arrows and +/- keys.
    zoomControl: true, // Whether the zoom control is added to the map by default.
    attributionControl: true // Whether the attribution control is added to the map by default.
);

$("#map").ready(function() {
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {
        minZoom: 1,
        maxZoom: 18,
        attribution: osmAttrib
    });
    map.addLayer(osm);
    map.setView([0.0, 0.0], 1);
});