/**
 * Notify using Bootstrap Notify that the area targeted or viewed not contains "warning zones".
 */
function notify_warning_zones_none() {
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
 * Removed from the map all "warning zones" displayed.
 */
function remove_warning_zones() {
    for (element in warning_zones) { // pour chaque warning zones
        if (DEBUG) {
            console.log("element :", element);
            console.log("warning_zones[element] :", warning_zones[element]);
        }
        warning_zones[element].removeFrom(map); // on enleve les warning zones de la map
    }
    warning_zones = []; // on vide les warning zones
    delete overlayMaps["Warning zones"];
    if (Lcontrollayers != undefined && legend != undefined) {
        Lcontrollayers.remove();
        legend.remove();
    }
    //Lcontrollayers = L.control.layers(null,overlayMaps).addTo(map); // ne pas oublier le null
}
/**
 * Build the html content for the layers extracted from the database.
 * @return {string} - Of informations about the layer in hmtl form.
 */
function getPopupContentmenu(couche) {
    var html = '<table>\
        <tr>\
            <td>Name : </td>\
            <td>' + couche.properties.name + '</td>\
        </tr>\
        <tr>\
            <td>Description : </td>\
            <td>' + couche.properties.description + '</td>\
        </tr>\
        <tr>\
            <td>ID : </td>\
            <td>' + couche.properties.id + '</td>\
        </tr>\
        <tr>\
            <td>Intensity : </td>\
            <td>' + couche.properties.intensity + '</td>\
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
        data: 'type=' + string_warning_zone + '&bbox=' + bbox,
        dataType: 'json',
        success: function(code_json, statut) {
            if (DEBUG) {
                console.log("add_warning_zones code_json : ", code_json);
                console.log("add_warning_zones statut : ", statut);
            }
            /*$.notify(
            	{
            		title: "<strong>Warning zones request</strong>",
            		message: statut
            	},{
            		type: "success",
            		placement: {
            			from: "bottom",
            			align: "center"
            		}
            	}
            );*/
        },
        error: function(resultat, statut, erreur) {
            if (DEBUG) {
                console.log("add_warning_zones resultat : ", resultat);
                console.log("add_warning_zones statut : ", statut);
                console.log("add_warning_zones erreur : ", erreur);
            }
            /*$.notify(
            	{
            		title: "<strong>Warning zones request</strong>",
            		message: statut
            	},{
            		type: "danger",
            		placement: {
            			from: "bottom",
            			align: "center"
            		}
            	}
            );*/
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
                    if (warning_zones.length > 0) {
                        for (element in warning_zones) { // pour chaque warning zones
                            if (DEBUG) {
                                console.log("element :", element);
                                console.log("warning_zones[element] :", warning_zones[element]);
                            }
                            warning_zones[element].removeFrom(map); // on enleve les warning zones de la map
                        }
                    }
                    warning_zones = []; // on vide les warning zones
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
                            shape.addTo(map); // ajout a la map
                            warning_zones.push(shape); // remplir la warning zone
                        }
                        layer_group_warning_zones = L.layerGroup(warning_zones); // groupe des couches warning zones
                        overlayMaps["Warning zones"] = layer_group_warning_zones; // menu
                        if (Lcontrollayers != undefined && legend != undefined) {
                            Lcontrollayers.remove();
                            legend.remove();
                        }
                        Lcontrollayers = L.control.layers(null, overlayMaps, {
                            position: 'topleft'
                        }).addTo(map); // ne pas oublier le null
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
                        /*$.notify(
                        	{
                        		title: "<strong>Warning zones request</strong>",
                        		message: 'received'
                        	},{
                        		type: "success",
                        		placement: {
                        			from: "bottom",
                        			align: "center"
                        		}
                        	}
                        );*/
                    } else {
                        //notify_warning_zones_none();
                    }
                } else {
                    if (DEBUG) {
                        console.log("add_warning_zones json :", json);
                    }
                    if (warning_zones.length > 0) {
                        remove_warning_zones();
                        if (Lcontrollayers != undefined && legend != undefined) {
                            Lcontrollayers.remove();
                            legend.remove();
                        }
                    }
                    //notify_warning_zones_none();
                }
            }
        }
    });
}