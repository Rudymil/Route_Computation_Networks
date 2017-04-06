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

map = new L.Map('map');

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