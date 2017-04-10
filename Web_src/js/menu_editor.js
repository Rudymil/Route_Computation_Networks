featureLayera = new L.FeatureGroup();
map.addLayer(featureLayera);
drawControla = new L.Control.Draw({
    edit: {
        featureGroup: featureLayera,
        edit: false,
        remove: false
    },
    draw: {
        polygon: false,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false
    }
}).addTo(map);
featureLayerw = new L.FeatureGroup();
drawControlw = new L.Control.Draw({
    edit: {
        featureGroup: featureLayerw,
        edit: false,
        remove: false
    },
    draw: {
        polygon: false,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false
    }
}).addTo(map);
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
    for (element in anomaly_zones) { // pour chaque anomalies zones
        if (DEBUG) {
            console.log("element :", element);
            console.log("anomaly_zones[element] :", anomaly_zones[element]);
        }
        anomaly_zones[element].removeFrom(map); // on enleve les anomalies zones de la map
    }
    anomaly_zones = new Array(); // on vide les anomalies zones
    delete overlayMaps["Anomaly zones"];
    if (Lcontrollayers != undefined || Lcontrollayers != null) {
        Lcontrollayers.remove();
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
            <td>Anomaly type : </td>\
            <td>' + couche.properties.anomaly_type + '</td>\
        </tr>\
        <tr>\
            <td>Description : </td>\
            <td>' + couche.properties.description + '</td>\
        </tr>\
        <tr>\
            <td>Expiration date : </td>\
            <td>' + couche.properties.expiration_date + '</td>\
        </tr>\
        <tr>\
            <td>ID : </td>\
            <td>' + couche.properties.id + '</td>\
        </tr>\
        <tr>\
            <td>Name : </td>\
            <td>' + couche.properties.name + '</td>\
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
                    anomaly_zones = new Array(); // on vide les anomaly zones
                    if (json["features"].length > 0) {
                        for (element in json["features"]) { // pour chaque object du geojson
                            if (DEBUG) {
                                console.log("add_anomaly_zones element :", element);
                                console.log("add_anomaly_zones json['features'][element] :", json["features"][element]);
                                console.log("add_anomaly_zones json['features'][element]['properties'].intensity :", json["features"][element]["properties"].intensity);
                            }
                            var shape = L.geoJSON(json["features"][element]).getLayers()[0];
                            shape.bindPopup(getPopupContentmenu_anomaly(json["features"][element]));
                            shape.setStyle({ // transforme en layer et change le style
                                fillColor: 'blue',
                                color: 'blue'
                            });

                            featureLayera.addLayer(shape);


                            /*var colorZone = getColor(json["features"][element]["properties"].intensity);
                            
                            
                            
                            shape.addTo(map); // ajout a la map
                            */

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
    warning_zones = new Array(); // on vide les warning zones
    delete overlayMaps["Warning zones"];
    if (Lcontrollayers != undefined || Lcontrollayers != null) {
        Lcontrollayers.remove();
    }
    if (legend != undefined || legend != null) {
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
            <td>Description : </td>\
            <td>' + couche.properties.description + '</td>\
        </tr>\
        <tr>\
            <td>Expiration Date : </td>\
            <td>' + couche.properties.expiration_date + '</td>\
        </tr>\
        <tr>\
            <td>ID : </td>\
            <td>' + couche.properties.id + '</td>\
        </tr>\
        <tr>\
            <td>Intensity : </td>\
            <td>' + couche.properties.intensity + '</td>\
        </tr>\
        <tr>\
            <td>Name : </td>\
            <td>' + couche.properties.name + '</td>\
        </tr>\
        <tr>\
            <td>Risk type : </td>\
            <td>' + couche.properties.risk_type + '</td>\
        </tr>\
        <tr>\
            <td>Validation date : </td>\
            <td>' + couche.properties.validation_date + '</td>\
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
                    if (json["features"].length > 0) {
                        for (element in json["features"]) { // pour chaque object du geojson
                            if (DEBUG) {
                                console.log("add_warning_zones element :", element);
                                console.log("add_warning_zones json['features'][element] :", json["features"][element]);
                                console.log("add_warning_zones json['features'][element]['properties'].intensity :", json["features"][element]["properties"].intensity);
                            }
                            var shape = L.geoJSON(json["features"][element]).getLayers()[0];
                            var colorZone = getColor(json["features"][element]["properties"].intensity);
                            shape.setStyle({ // transforme en layer et change le style
                                fillColor: colorZone,
                                color: colorZone
                            });
                            shape.bindPopup(getPopupContentmenu(json["features"][element]));
                            featureLayerw.addLayer(shape);
                            shape.addTo(map); // ajout a la map 
                            warning_zones.push(shape); // remplir la warning zone
                        }
                        layer_group_warning_zones = L.layerGroup(warning_zones); // groupe des couches warning zones
                        overlayMaps["Warning zones"] = layer_group_warning_zones; // menu
                        if (Lcontrollayers != undefined || Lcontrollayers != null) {
                            Lcontrollayers.remove();
                        }
                        Lcontrollayers = L.control.layers(null, overlayMaps, {
                            position: 'topleft'
                        }).addTo(map); // ne pas oublier le null
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
                                divLegend += ('<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'));
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
                    }
                    //notify_warning_zones_none();
                }
            }
        }
    });
    $.ajax({
        url: url,
        type: 'GET',
        data: 'type=' + string_warning_zone + '&bbox=' + bbox + '&validated=false',
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
                    if (json["features"].length > 0) {
                        for (element in json["features"]) { // pour chaque object du geojson
                            if (DEBUG) {
                                console.log("add_warning_zones element :", element);
                                console.log("add_warning_zones json['features'][element] :", json["features"][element]);
                                console.log("add_warning_zones json['features'][element]['properties'].intensity :", json["features"][element]["properties"].intensity);
                            }
                            var shape = L.geoJSON(json["features"][element]).getLayers()[0];
                            var colorZone = getColor(json["features"][element]["properties"].intensity);
                            shape.setStyle({ // transforme en layer et change le style
                                fillColor: colorZone,
                                color: 'red'
                            });
                            shape.bindPopup(getPopupContentmenu(json["features"][element]));
                            featureLayerw.addLayer(shape);
                            shape.addTo(map); // ajout a la map 
                            warning_nonchecked.push(shape); // remplir la warning zone
                        }
                        layer_group_warning_nonchecked = L.layerGroup(warning_nonchecked); // groupe des couches warning zones
                        overlayMaps["Warning zones to check"] = layer_group_warning_nonchecked; // menu
                        if (Lcontrollayers != undefined || Lcontrollayers != null) {
                            Lcontrollayers.remove();
                        }
                        Lcontrollayers = L.control.layers(null, overlayMaps, {
                            position: 'topleft'
                        }).addTo(map); // ne pas oublier le null
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
                    }
                    //notify_warning_zones_none();
                }
            }
        }
    });
}
/**
 * Send to the DB all the update for one type.
 * @param {string} type - Type of the GeoJSON to update.
 */
function send_ajax_update(type) {
    if (DEBUG) {
        console.log("send_ajax_update");
        console.log("send_ajax_update type :", type);
    }
    geojson["type"] = "FeatureCollection";
    geojson["zone_type"] = type;
    if (type == string_warning_zone) {
        geojson["features"] = wzupdate;
    }
    if (type == string_anomaly_zone) {
        geojson["features"] = azupdate;
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: 'action=update&' + type + '=' + JSON.stringify(geojson), // object -> string
        dataType: 'json',
        success: function(code, statut) {
            if (DEBUG) {
                console.log("send_ajax_update code_json : ", code);
                console.log("send_ajax_update statut : ", statut);
            }
            //notify_ajax_sending_areas_success(statut);
        },
        error: function(resultat, statut, erreur) {
            if (DEBUG) {
                console.log("send_ajax_update resultat : ", resultat);
                console.log("send_ajax_update statut : ", statut);
                console.log("send_ajax_update erreur : ", erreur);
            }
            notify_ajax_sending_areas_error(resultat);
        },
        complete: function(resultat, statut) {
            nb_MAJ = nb_MAJ + resultat.responseJSON;
            if (DEBUG) {
                console.log("send_ajax_update resultat.responseJSON : ", resultat.responseJSON);
                console.log("send_ajax_update nb_MAJ : ", nb_MAJ);
                console.log("send_ajax_update statut : ", statut);
            }
        }
    });
}
/**
 * Send to the DB one id for one type.
 * @param {string} id - Id of the GeoJSON to delete.
 * @param {string} type - Type of GeoJSON to delete.
 */
function send_ajax_delete(id, type) {
    if (DEBUG) {
        console.log("send_ajax_delete");
        console.log("send_ajax_delete id :", id);
        console.log("send_ajax_delete type :", type);
    }
    $.ajax({
        url: url,
        type: 'GET',
        data: 'action=delete&type=' + type + '&id=' + id,
        dataType: 'json',
        success: function(code, statut) {
            if (DEBUG) {
                console.log("send_ajax_update code_json : ", code);
                console.log("send_ajax_update statut : ", statut);
            }
            //notify_ajax_sending_areas_success(statut);
        },
        error: function(resultat, statut, erreur) {
            if (DEBUG) {
                console.log("send_ajax_update resultat : ", resultat);
                console.log("send_ajax_update statut : ", statut);
                console.log("send_ajax_update erreur : ", erreur);
            }
            notify_ajax_sending_areas_error(resultat);
        },
        complete: function(resultat, statut) {
            nb_MAJ = nb_MAJ + resultat.responseJSON;
            if (DEBUG) {
                console.log("send_ajax_update resultat.responseJSON : ", resultat.responseJSON);
                console.log("send_ajax_update nb_MAJ : ", nb_MAJ);
                console.log("send_ajax_update statut : ", statut);
            }
        }
    });
}
/**
 * Executed for sending all the updates and deletes.
 */
$("#submit3").click(function() {
    if (DEBUG) {
        console.log("EVENT : $('#submit3').click");
        console.log("EVENT : $('#submit3').click nb_MAJ :", nb_MAJ);
        console.log("EVENT : $('#submit3').click wzupdate :", wzupdate);
        console.log("EVENT : $('#submit3').click wzupdate.length :", wzupdate.length);
        console.log("EVENT : $('#submit3').click azupdate :", azupdate);
        console.log("EVENT : $('#submit3').click azupdate.length :", azupdate.length);
        console.log("EVENT : $('#submit3').click wzdelete :", wzdelete);
        console.log("EVENT : $('#submit3').click wzdelete.length :", wzdelete.length);
        console.log("EVENT : $('#submit3').click azdelete :", azdelete);
        console.log("EVENT : $('#submit3').click azdelete.length :", azdelete.length);
    }
    /*nb_MAJ = wzupdate.length + azupdate.length + wzdelete.length.length + azdelete.length;
    $.notify({
        title: "<strong>Number of objects sent</strong>",
        message: nb_MAJ
    }, {
        type: "info",
        placement: {
            from: "bottom",
            align: "center"
        }
    });*/
    nb_MAJ = 0;
    if (wzupdate == null || wzupdate.length <= 0) { // si pas de warning zones a MAJ
        //notify_none("Warning zones updated");
    } else {
        send_ajax_update(string_warning_zone);
        wzupdate = new Array();
    }
    if (azupdate == null || azupdate.length <= 0) { // si pas d anomaly zones a MAJ
        //notify_none("Anomaly zones updated");
    } else {
        send_ajax_update(string_anomaly_zone);
        azupdate = new Array();
    }
    if (wzdelete == null || wzdelete.length <= 0) { // si pas de warning zones a supprimer
        //notify_none("Warning zones deleted");
    } else {
        for (element in wzdelete) {
            send_ajax_delete(wzdelete[element], string_warning_zone);
        }
        wzdelete = new Array();
    }
    if (azdelete == null || azdelete.length <= 0) { // si pas d anomaly zones a supprimer
        //notify_none("Warning zones deleted");
    } else {
        for (element in azdelete) {
            send_ajax_delete(azdelete[element], string_anomaly_zone);
        }
        azdelete = new Array();
    }
    /*$.notify({
        title: "<strong>Number of objects modified</strong>",
        message: nb_MAJ
    }, {
        type: "info",
        placement: {
            from: "bottom",
            align: "center"
        }
    });
    nb_MAJ = 0;*/
});