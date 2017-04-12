var map, featureList, boroughSearch = [],
    theaterSearch = [],
    museumSearch = [];

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
    var osm = new L.TileLayer(url_tiles_Angola, {
        minZoom: 1,
        maxZoom: 18,
        attribution: Attrib,
        id: "osm-bright" // "klokantech-basic"
    });
    map.addLayer(osm);
    map.setView([0.0, 0.0], 1);
});