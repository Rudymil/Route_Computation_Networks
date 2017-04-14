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
    current_country = "Angola";
    map.addLayer(baseMaps["osm-bright"]);
    map.setView([15.0, 10.0], 2);
    Lcontrollayers = L.control.layers(baseMaps, null, {
        position: 'topleft'
    }).addTo(map);
});