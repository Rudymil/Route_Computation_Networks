/**
 * Notify using Bootstrap Notify that the area targeted or viewed not contains "anomaly zones".
 */
function notify_anomaly_zones_none() {
    $.notify({
        title: "<strong>Anomaly zones request</strong>",
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
 * Removed from the map all "anomaly zones" displayed.
 */
function remove_anomaly_zones() {
    for (element in anomaly_zones) { // pour chaque warning zones
        if (DEBUG) {
            console.log("element :", element);
            console.log("anomaly_zones[element] :", anomaly_zones[element]);
        }
        anomaly_zones[element].removeFrom(map); // on enleve les warning zones de la map
    }
    anomaly_zones = []; // on vide les warning zones
    delete overlayMaps["Anomaly zones"];
    if (Lcontrollayers != undefined) {
        Lcontrollayers.remove();
        legend.remove();
    }
    //Lcontrollayers = L.control.layers(null,overlayMaps).addTo(map); // ne pas oublier le null
}
/**
 * Build the html content for the layers extracted from the database.
 * @return {string} - Of informations about the layer in hmtl form.
 */
function getPopupContentmenu_anomaly(couche) {
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
    </table>'
    return html;
}
/**
 * Ajax request asking all the anomaly zones from the BD and contained into the bounding box of the map.
 * @param {string} url - Url to the Web API.
 * @param {string} bbox - Bounding box of the map.
 */
function add_anomaly_zones(url, bbox) {
    if (DEBUG) {
        console.log("FUNCTION : add_anomaly_zones");
        console.log("add_anomaly_zones url : ", url);
        console.log("add_anomaly_zones bbox : ", bbox);
    }
    $.ajax({
        url: url,
        type: 'GET',
        data: 'type=' + string_anomaly_zone + '&bbox=' + bbox,
        dataType: 'json',
        success: function(code_json, statut) {
            if (DEBUG) {
                console.log("add_anomaly_zones code_json : ", code_json);
                console.log("add_anomaly_zones statut : ", statut);
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
                console.log("add_anomaly_zones resultat : ", resultat);
                console.log("add_anomaly_zones statut : ", statut);
                console.log("add_anomaly_zones erreur : ", erreur);
            }
            /*$.notify(
            	{
            		title: "<strong>Anomaly zones request</strong>",
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
                    console.log("add_anomaly_zones resultat.status :", resultat.status);
                }
                var json = resultat.responseJSON;
                if (!$.isEmptyObject(json) && json != undefined) { // si le resultat json n est pas vide
                    if (DEBUG) {
                        console.log("add_anomaly_zones json :", json);
                    }
                    if (anomaly_zones.length > 0) {
                        for (element in anomaly_zones) { // pour chaque anomaly zones
                            if (DEBUG) {
                                console.log("element :", element);
                                console.log("anomaly_zones[element] :", anomaly_zones[element]);
                            }
                            anomaly_zones[element].removeFrom(map); // on enleve les anomaly zones de la map
                        }
                    }
                    anomaly_zones = []; // on vide les anomaly zones
                    if (json["features"].length > 0) {
                        for (element in json["features"]) { // pour chaque object du geojson
                            if (DEBUG) {
                                console.log("add_anomaly_zones element :", element);
                                console.log("add_anomaly_zones json['features'][element] :", json["features"][element]);
                                console.log("add_anomaly_zones json['features'][element]['properties'].intensity :", json["features"][element]["properties"].intensity);
                            }
                            var shape = L.geoJSON(json["features"][element]);
                            var colorZone = getColor(json["features"][element]["properties"].intensity);
                            shape.setStyle({ // transforme en layer et change le style
                                fillColor: 'blue',
                                color: 'blue'
                            });
                            shape.bindPopup(getPopupContentmenu_anomaly(json["features"][element]));
                            shape.addTo(map); // ajout a la map
                            anomaly_zones.push(shape); // remplir la anomaly zone
                        }
                        layer_group_anomaly_zones = L.layerGroup(anomaly_zones); // groupe des couches anomaly zones
                        overlayMaps["Anomaly zones"] = layer_group_anomaly_zones; // menu
                        if (Lcontrollayers != undefined) {
                            Lcontrollayers.remove();
                        }
                        Lcontrollayers = L.control.layers(null, overlayMaps, {
                            position: 'topleft'
                        }).addTo(map); // ne pas oublier le null
                        /*$.notify(
                        	{
                        		title: "<strong>Anomaly zones request</strong>",
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
                        //notify_anomaly_zones_none();
                    }
                } else {
                    if (DEBUG) {
                        console.log("add_anomaly_zones json :", json);
                    }
                    if (anomaly_zones.length > 0) {
                        remove_anomaly_zones();
                    }
                    //notify_anomaly_zones_none();
                }
            }
        }
    });
}