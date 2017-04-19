/**
 * Notify using Bootstrap Notify that the area targeted or viewed not contains "warning zones".
 */
function notify_warning_zones_none() {
    if (DEBUG) {
        console.log("FUNCTION : notify_warning_zones_none");
    }
    $.notify({
        title: "<strong>Warning zones request</strong>",
        message: "none"
    }, {
        type: "info",
        placement: {
            from: "bottom",
            align: "center"
        }
    });
}

/**
 * builds html popup content for layers extracted from the database.
 * @return {string} - Of informations about the layer in hmtl form.
 */
function getPopupContentmenu(couche) {
    if (DEBUG) {
        console.log("FUNCTION : getPopupContentmenu");
    }
    var type = undefined;
    for (element in types_warning_zones) {
        if (couche.properties.risk_type == types_warning_zones[element]["id"]) {
            type = types_warning_zones[element]["name"];
        }
    }
    var html = '<table>\
        <tr>\
            <td>Risk type : </td>\
            <td>' + type + '</td>\
        </tr>\
        <tr>\
            <td>Description : </td>\
            <td>' + couche.properties.description + '</td>\
        </tr>\
        <tr>\
            <td>Intensity : </td>\
            <td>' + couche.properties.intensity + '</td>\
        </tr>\
        <tr>\
            <td>Expiration date : </td>\
            <td>' + couche.properties.expiration_date + '</td>\
        </tr>\
    </table>'
    return html;
}

/**
 * Ajax request asking all the warning zones from the BD and contained into the bounding box of the map.
 * @param {string} url - Url to the Web API.
 * @param {string} bbox - Bounding box of the map.
 */
function add_warning_zones(url, bbox) {
    if (DEBUG) {
        console.log("FUNCTION : add_warning_zones");
        console.log("add_warning_zones url : ", url);
        console.log("add_warning_zones bbox : ", bbox);
    }
    $.ajax({
        url: url,
        type: 'GET',
        data: 'type=' + string_warning_zone + '&bbox=' + bbox + '&validated=true',
        dataType: 'json',
        success: function(code_json, statut) {
            if (DEBUG) {
                console.log("add_warning_zones code_json : ", code_json);
                console.log("add_warning_zones statut : ", statut);
            }
        },
        error: function(resultat, statut, erreur) {
            if (DEBUG) {
                console.log("add_warning_zones resultat : ", resultat);
                console.log("add_warning_zones statut : ", statut);
                console.log("add_warning_zones erreur : ", erreur);
            }
            $.notify({
                title: "<strong>Warning zones request</strong>",
                message: resultat.responseText
            }, {
                type: "danger",
                placement: {
                    from: "bottom",
                    align: "center"
                }
            });
        },
        complete: function(resultat, statut) {
            if (resultat.status == '200') {
                if (DEBUG) {
                    console.log("add_warning_zones resultat.status :", resultat.status);
                }
                var json = resultat.responseJSON;
                if (!$.isEmptyObject(json) && json != undefined) { // si le resultat json n est pas vide
                    if (DEBUG) {
                        console.log("add_warning_zones json :", json);
                    }
                    if (json["features"].length > 0) {
                        for (element in json["features"]) { // pour chaque object du geojson
                            if (DEBUG) {
                                console.log("add_warning_zones element :", element);
                                console.log("add_warning_zones json['features'][element] :", json["features"][element]);
                                console.log("add_warning_zones json['features'][element]['properties'].intensity :", json["features"][element]["properties"].intensity);
                            }
                            var shape = L.geoJSON(json["features"][element]);
                            var colorZone = getColor(json["features"][element]["properties"].intensity);
                            shape.setStyle({ // transforme en layer et change le style
                                fillColor: colorZone,
                                color: colorZone
                            });
                            shape.bindPopup(getPopupContentmenu(json["features"][element]));
                            warning_zones.push(shape); // remplir la warning zone
                        }
                        if (DEBUG) {
                            console.log("add_warning_zones layer_group_warning_zones :", layer_group_warning_zones);
                        }
                        layer_group_warning_zones = L.layerGroup(warning_zones); // groupe des couches warning zones
                        map.addLayer(layer_group_warning_zones);
                        overlayMaps["Warning zones"] = layer_group_warning_zones; // menu
                        if (Lcontrollayers != undefined || Lcontrollayers != null) {
                            Lcontrollayers.remove();
                        }
                        Lcontrollayers = new L.control.layers(baseMaps, overlayMaps, {
                            position: 'topleft'
                        }).addTo(map);
                        if (legend != undefined || legend != null) {
                            legend.remove();
                        }
                        legend = L.control({
                            position: 'bottomleft'
                        }); // ajout de la legende
                        legend.onAdd = function(map) {
                            var div = L.DomUtil.create('div', 'info legend'),
                                grades = [20, 30, 40, 50, 60, 70, 80, 90, 100],
                                labels = [];
                            var divLegend = "";
                            // loop through our density intervals and generate a label with a colored square for each interval
                            for (var i = 0; i < grades.length; i++) {
                                divLegend += ('<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'))
                            }
                            $(div).html(divLegend);
                            return div;
                        };
                        legend.addTo(map);
                    }
                } else {
                    if (DEBUG) {
                        console.log("add_warning_zones json :", json);
                    }
                    if (warning_zones.length > 0) {
                        remove_warning_zones();
                    }
                }
            }
        }
    });
}

/**
 * Build the html content for the layers extracted from the database.
 * @return {string} - Of informations about the layer in hmtl form.
 */
function getPopupContentmenuPOI(couche) {
    if (DEBUG) {
        console.log("FUNCTION : getPopupContentmenuPOI");
    }
    var html = '<table>\
    	<tr>\
            <td>Name : </td>\
            <td>' + couche.properties.name + '</td>\
        </tr>\
        <tr>\
            <td>Type : </td>\
            <td>' + couche.properties.type + '</td>\
        </tr>\
    </table>'
    return html;
}

/**
 * Removed from the map all "warning zones" displayed.
 */
function remove_warning_zones() {
    if (DEBUG) {
        console.log("FUNCTION : remove_warning_zones");
    }
    map.removeLayer(layer_group_warning_zones);
    warning_zones = new Array(); // on vide les warning zones
    delete overlayMaps["Warning zones"];
    if (Lcontrollayers != undefined || Lcontrollayers != null) {
        Lcontrollayers.remove();
    }
    if (legend != undefined || legend != null) {
        legend.remove();
    }
    Lcontrollayers = new L.control.layers(baseMaps, overlayMaps, {
        position: 'topleft'
    }).addTo(map);
}

/*
 * Execute when Warning zones is changed
 */
$('#Warning_zones').change(function() {
    if (DEBUG) {
        console.log("EVENT : $('#Warning_zones').change")
    }
    if ($('#Warning_zones').is(':checked')) {
        checkbox_Warning_zones = true;
        if (DEBUG) {
            console.log("$('#Warning_zones').change checkbox_Warning_zones :", checkbox_Warning_zones);
        }
        if (map.getZoom() > zoom) {
            bbox = map.getBounds().toBBoxString();
            add_warning_zones(url, bbox);
        }
    } else {
        checkbox_Warning_zones = false;
        if (DEBUG) {
            console.log("$('#Warning_zones').change checkbox_Warning_zones :", checkbox_Warning_zones);
        }
        remove_warning_zones();
    }
});

/*
 * Execute when POI is changed
 */
$('#POI').change(function() {
    if (DEBUG) {
        console.log("EVENT : $('#POI').change")
    }
    if ($('#POI').is(':checked')) {
        checkbox_POI = true;
        if (DEBUG) {
            console.log("$('#POI').change checkbox_POI :", checkbox_POI);
        }
        if (map.getZoom() > zoom) {
            bbox = map.getBounds().toBBoxString();
            ajax_POI(url, bbox);
        }
    } else {
        checkbox_POI = false;
        if (DEBUG) {
            console.log("$('#POI').change checkbox_POI :", checkbox_POI);
        }
        remove_POI();
    }
});

/*
 * Refresh layers on the map
 */
function refresh() {
    if (DEBUG) {
        console.log("refresh");
        console.log("refresh zoom :", map.getZoom())
    }
    if (map.getZoom() > zoom) {
        if (DEBUG) {
            console.log("refresh checkbox_Warning_zones :", checkbox_Warning_zones);
        }
        remove_warning_zones();
        if (checkbox_Warning_zones) {
            bbox = map.getBounds().toBBoxString();
            add_warning_zones(url, bbox);
        }
        if (DEBUG) {
            console.log("refresh checkbox_POI :", checkbox_POI);
        }
        remove_POI();
        if (checkbox_POI) {
            bbox = map.getBounds().toBBoxString();
            ajax_POI(url, bbox);
        }
    } else {
        remove_POI();
        remove_warning_zones();
    }
}