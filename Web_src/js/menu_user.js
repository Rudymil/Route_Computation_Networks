/**
 * Ajax request asking all the type of risk or anomaly from the DB.
 * @param {string} url - Url to the Web API.
 * @param {string} type - Type between risk or anomaly.
 */
function ajax_types(url, type) {
    if (DEBUG) {
        console.log("FUNCTION : ajax_types");
        console.log("ajax_types url : ", url);
        console.log("ajax_types type : ", type);
    }
    $.ajax({
        url: url,
        type: 'GET',
        data: 'type=' + type,
        dataType: 'json',
        success: function(code_json, statut) {
            if (DEBUG) {
                console.log("ajax_types code_json : ", code_json);
                console.log("ajax_types statut : ", statut);
            }
        },
        error: function(resultat, statut, erreur) {
            if (DEBUG) {
                console.log("ajax_types resultat : ", resultat);
                console.log("ajax_types statut : ", statut);
                console.log("ajax_types erreur : ", erreur);
            }
            $.notify({
                title: "<strong>" + type + " request</strong>",
                message: statut
            }, {
                type: "danger",
                placement: {
                    from: "bottom",
                    align: "center"
                }
            });
        },
        complete: function(resultat, statut) {
            if (DEBUG) {
                console.log("ajax_types resultat.status :", resultat.status);
            }
            if (resultat.status == '200') {
                var json = resultat.responseJSON;
                if (!$.isEmptyObject(json)) { // si le resultat json n est pas vide
                    if (DEBUG) {
                        console.log("json : ", json);
                    }
                    if (type == string_risk_type) {
                        types_warning_zones = json;
                        if (DEBUG) {
                            console.log("ajax_types types_warning_zones :", types_warning_zones);
                        }
                    } else if (type == string_anomaly_type) {
                        types_anomalies = json;
                        if (DEBUG) {
                            console.log("ajax_types types_anomalies :", types_anomalies);
                        }
                    }
                }
            }
        }
    });
}
/**
 * Ajax request asking all the countries contained by the BD.
 * @param {string} url - Url to the Web API.
 */
function ajax_countries(url) {
    if (DEBUG) {
        console.log("ajax_countries url : ", url);
    }
    $.ajax({
        url: url,
        type: 'GET',
        data: 'type=country',
        dataType: 'json',
        success: function(code_json, statut) {
            if (DEBUG) {
                console.log("ajax_countries code_json : ", code_json);
                console.log("ajax_countries statut : ", statut);
            }
        },
        error: function(resultat, statut, erreur) {
            if (DEBUG) {
                console.log("ajax_countries resultat : ", resultat);
                console.log("ajax_countries statut : ", statut);
                console.log("ajax_countries erreur : ", erreur);
            }
            $.notify({
                title: "<strong>Countries request</strong>",
                message: statut
            }, {
                type: "danger",
                placement: {
                    from: "bottom",
                    align: "center"
                }
            });
        },
        complete: function(resultat, statut) {
            if (DEBUG) {
                console.log("ajax_countries resultat.status :", resultat.status);
            }
            if (resultat.status == '200') {
                var json = resultat.responseJSON;
                if (!$.isEmptyObject(json)) { // si le resultat json n est pas vide
                    if (DEBUG) {
                        console.log("json['features'] : ", json['features']);
                    }
                    json_countries = json['features'];
                    if (json_countries.length > 0) { // si y a des pays
                        var fonctions = new Array();
                        for (object in json_countries) {
                            if (DEBUG) {
                                console.log("ajax_countries object : ", object);
                                console.log("ajax_countries json_countries[object] : ", json_countries[object]);
                            }
                            $("#panel-element-204612>.panel-body").append("<div class='row'><div class='col-xs-12' ><center><button type='button' class='btn btn-primary btn-xm' style='margin-bottom:5px;' id=" + object + ">" + json_countries[object]['properties']['name'] + "</button></center></div></div>"); // ajout du bouton
                            $("#" + object).click(function(event) { // reset view
                                if (DEBUG) {
                                    console.log("ajax_countries event.target.id : ", event.target.id);
                                    console.log("ajax_countries json_countries[event.target.id]['geometry']['coordinates'][0] : ", json_countries[event.target.id]['geometry']['coordinates'][0]);
                                    console.log("ajax_countries json_countries[event.target.id]['geometry']['coordinates'][1] : ", json_countries[event.target.id]['geometry']['coordinates'][1]);
                                }
                                map.setView([json_countries[event.target.id]['geometry']['coordinates'][1], json_countries[event.target.id]['geometry']['coordinates'][0]], 6);
                            });
                        }
                    }
                }
            }
        }
    });
}
/**
 * Executed when the body DOM is ready.
 */
$("body").ready(function() {
    if (DEBUG) {
        console.log("EVENT : $('body').ready");
    }
    ajax_types(url, string_risk_type); // recupere les types des warning zones
    ajax_types(url, string_anomaly_type); // recupere les types des anomalies zones
    ajax_countries(url); // recupere la liste des pays
});
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
                        if (Lcontrollayers != undefined) {
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
                    }
                    //notify_warning_zones_none();
                }
            }
        }
    });
}
/**
 * Notify using Bootstrap Notify that the leaflet vector layer is empty.
 * @param {string} element - Type of leaflet vector layer.
 */
function notify_shape_empty(element) {
    if (DEBUG) {
        console.log("FUNCTION : notify_shape_empty");
        console.log("notify_shape_empty element : ", element);
    }
    $.notify({
        title: "<strong>" + element + "</strong>",
        message: "empty"
    }, {
        type: "danger",
        placement: {
            from: "bottom",
            align: "center"
        }
    });
}
/**
 * Notify using Bootstrap Notify that the array of leaflet vector layers is empty.
 * @param {string} collection - Type of leaflet vector layer.
 */
function notify_none(collection) {
    if (DEBUG) {
        console.log("FUNCTION : notify_none");
        console.log("notify_none collection : ", collection);
    }
    $.notify({
        title: "<strong>" + collection + "</strong>",
        message: "none",
    }, {
        type: "info",
        placement: {
            from: "bottom",
            align: "center"
        }
    });
}
/**
 * Notify using Bootstrap Notify that the zones sending to the DB succeeded.
 * @param {object.statut} statut - Network code.
 */
function notify_ajax_sending_areas_success(statut) {
    if (DEBUG) {
        console.log("FUNCTION : notify_ajax_sending_areas_success");
        console.log("notify_ajax_sending_areas_success statut : ", statut);
    }
    $.notify({
        title: "<strong>Sending areas</strong>",
        message: statut,
    }, {
        type: "success",
        placement: {
            from: "bottom",
            align: "center"
        }
    });
}
/**
 * Notify using Bootstrap Notify that the zones sending to the DB failed.
 * @param {object.statut} statut - Network code.
 */
function notify_ajax_sending_areas_error(statut) {
    if (DEBUG) {
        console.log("FUNCTION : notify_ajax_sending_areas_error");
        console.log("notify_ajax_sending_areas_error statut : ", statut);
    }
    $.notify({
        title: "<strong>Sending areas</strong>",
        message: statut,
    }, {
        type: "danger",
        placement: {
            from: "bottom",
            align: "center"
        }
    });
}
/**
 * Notify using Bootstrap Notify that the "risk_type" into the "properties" is not correct.
 */
function notify_risk_type_wrong() {
    $.notify({
        title: "<strong>risk_type</strong>",
        message: 'wrong',
    }, {
        type: "danger",
        placement: {
            from: "bottom",
            align: "center"
        }
    });
}
/**
 * Notify using Bootstrap Notify that the "anomaly_type" into the "properties" is not correct.
 */
function notify_anomaly_type_wrong() {
    $.notify({
        title: "<strong>anomaly_type</strong>",
        message: 'wrong',
    }, {
        type: "danger",
        placement: {
            from: "bottom",
            align: "center"
        }
    });
}
/**
 * Notify using Bootstrap Notify that the "description" into the "properties" is not correct.
 */
function notify_description_wrong() {
    $.notify({
        title: "<strong>description</strong>",
        message: 'wrong',
    }, {
        type: "danger",
        placement: {
            from: "bottom",
            align: "center"
        }
    });
}
/**
 * Notify using Bootstrap Notify that the "properties" is not correct.
 */
function notify_properties_wrong() {
    $.notify({
        title: "<strong>properties</strong>",
        message: 'wrong',
    }, {
        type: "danger",
        placement: {
            from: "bottom",
            align: "center"
        }
    });
}
/**
 * Check that the "properties" of the shape is correctly written in function of the type.
 * @param {vector layer} shape - Leaflet vector layer.
 * @param {string} type - Type of leaflet vector layer.
 * @return {number} -1 - If the verification reveals an error.
 */
function verification(shape, type) {
    if (shape["properties"] != null) { // si y a des properties
        if (type == string_risk_type) {
            if (shape["properties"]["risk_type"] == null || shape["properties"]["risk_type"] == undefined) { // si pas de risque
                notify_risk_type_wrong();
                return -1;
            }
            if (shape["properties"]["description"] == null || shape["properties"]["description"] == undefined) { // si pas de description
                notify_description_wrong();
                return -1;
            }
            if (shape["properties"]["expiration_date"] == null || shape["properties"]["expiration_date"] == undefined) { // si pas de date
                notify_description_wrong();
                return -1;
            }
        }
        if (type == string_anomaly_type) {
            if (shape["properties"]["anomaly_type"] == null || shape["properties"]["anomaly_type"] == undefined) { // si pas de type
                notify_anomaly_type_wrong();
                return -1;
            }
            if (shape["properties"]["description"] == null || shape["properties"]["description"] == undefined) { // si pas de description
                notify_description_wrong();
                return -1;
            }
            if (shape["properties"]["expiration_date"] == null || shape["properties"]["expiration_date"] == undefined) { // si pas de date
                notify_description_wrong();
                return -1;
            }
        }
    } else {
        notify_properties_wrong();
        return -1;
    }
}
/**
 * Check that the "properties" of the shape is correctly written in function of the type.
 * @param {array} circle - Array containing leaflet vector layers (circles).
 * @param {array} box - Array containing leaflet vector layers (rectangles).
 * @param {array} polygon - Array containing leaflet vector layers (polygons).
 * @param {string} type - Type of leaflet vector layer (warning or anomaly).
 * @return {number} -1 - If the array contains empty objects.
 * @return {number} 0 - Else.
 */
function fill_geojson(circle, box, polygon, type) {
    if (DEBUG) {
        console.log("FUNCTION : fill_geojson");
        console.log("fill_geojson circle : ", circle);
        console.log("fill_geojson box : ", box);
        console.log("fill_geojson polygon : ", polygon);
        console.log("fill_geojson geojson : ", geojson);
    }
    var features = new Array();
    if (circle.length == 0) {
        notify_none(string_circles);
    } else {
        for (element in circle) {
            if (DEBUG) {
                console.log("Circle :", circle[element]);
            }
            if (circle[element] !== null) { // si c est pas nul
                if (verification(circle[element], type) == -1) { // verification des properties
                    return -1;
                } else {
                    features.push(circle[element]); // complete GeoJSON
                }
            } else {
                notify_shape_empty(string_circles);
                return -1;
            }
        }
    }
    if (box.length == 0) {
        notify_none(string_boxes);
    } else {
        for (element in box) {
            if (DEBUG) {
                console.log("Box :", box[element]);
            }
            if (box[element] !== null) { // si c est pas nul
                if (verification(box[element], type) == -1) { // verification des properties
                    return -1;
                } else {
                    features.push(box[element]); // complete GeoJSON
                }
            } else {
                notify_shape_empty(string_boxes);
                return -1;
            }
        }
    }
    if (polygon.length == 0) {
        notify_none(string_polygons);
    } else {
        for (element in polygon) {
            if (DEBUG) {
                console.log("fill_geojson Polygon :", polygon[element]);
            }
            if (polygon[element] !== null) { // si c est pas nul
                if (verification(polygon[element], type) == -1) { // verification des properties
                    return -1;
                } else {
                    features.push(polygon[element]); // complete GeoJSON
                }
            } else {
                notify_shape_empty(string_polygons);
                return -1;
            }
        }
    }
    if (features.length > 0) {
        geojson["type"] = "FeatureCollection";
        geojson["zone_type"] = type;
        geojson["features"] = features;
        if (DEBUG) {
            console.log("fill_geojson features :", features);
            console.log("fill_geojson geojson :", geojson);
        }
    }
    return 0;
}
/**
 * Ajax request sending all the zones to the BD by specifying the type.
 * @param {string} type - Type of leaflet vector layer (warning or anomaly).
 * @param {string} url - Url to the Web API.
 */
function send_ajax_geojson(type, url) {
    if (DEBUG) {
        console.log("FUNCTION : send_ajax_geojson");
        console.log("send_ajax_geojson geojson : ", geojson);
        console.log("send_ajax_geojson geojson.toString() : ", geojson.toString());
        console.log("send_ajax_geojson JSON.stringify(geojson) : ", JSON.stringify(geojson));
        console.log("send_ajax_geojson type : ", type);
        console.log("send_ajax_geojson url : ", url);
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: type + '=' + JSON.stringify(geojson), // object -> string
        dataType: 'json',
        success: function(code, statut) {
            if (DEBUG) {
                console.log("send_ajax_geojson code_json : ", code);
                console.log("send_ajax_geojson statut : ", statut);
            }
            notify_ajax_sending_areas_success(statut);
            if (type == string_warning_zone) {
                style_layer(string_warning_zone); // changement de style
            }
            if (type == string_anomaly_zone) {
                style_layer(string_anomaly_zone); // changement de style
            }
        },
        error: function(resultat, statut, erreur) {
            if (DEBUG) {
                console.log("send_ajax_geojson resultat : ", resultat);
                console.log("send_ajax_geojson statut : ", statut);
                console.log("send_ajax_geojson erreur : ", erreur);
            }
            notify_ajax_sending_areas_error(statut);
        },
        complete: function(resultat, statut) {
            if (DEBUG) {
                console.log("send_ajax_geojson resultat : ", resultat);
                console.log("send_ajax_geojson statut : ", statut);
            }
            geojson = new Object(); // reinitialisation
            if (type == string_warning_zone) {
                circle = new Array();
                box = new Array();
                polygon = new Array();
            }
            if (type == string_anomaly_zone) {
                circlel = new Array();
                boxl = new Array();
                polygonl = new Array();
            }
        }
    });
}
/**
 * Change the inner color in black of all the leaflet vector layers corresponding to the type.
 * @param {string} type - Type of leaflet vector layer (warning or anomaly).
 */
function style_layer(type) {
    couche = new L.FeatureGroup();
    if (DEBUG) {
        console.log("FUNCTION : style_layer");
        console.log("style_layer type :", type);
        console.log("style_layer couche :", couche);
    }
    if (type == string_warning_zone) {
        if (DEBUG) {
            console.log("style_layer editableLayers :", editableLayers);
        }
        editableLayers.eachLayer(function(layer) {
            if (DEBUG) {
                console.log("style_layer layer : ", layer)
            }
            layer.setStyle({ // change le style de la layer
                //opacity: 0.1, // weak opacity
                color: 'red', // rouge
                fillColor: 'black' // noir
            });
            couche.addLayer(layer); // ajout a la map
        });
        editableLayers.clearLayers();
        if (DEBUG) {
            console.log("style_layer couche :", couche);
        }
        map.addLayer(couche);
    }
    if (type == string_anomaly_zone) {
        if (DEBUG) {
            console.log("style_layer leditableLayers :", leditableLayers);
        }
        leditableLayers.eachLayer(function(layer) {
            if (DEBUG) {
                console.log("style_layer layer : ", layer)
            }
            layer.setStyle({ // change le style de la layer
                //opacity: 0.1, // weak opacity
                color: '#0033ff', // bleu
                fillColor: '#140004' // noir
            });
            couche.addLayer(layer); // ajout a la map	
        });
        leditableLayers.clearLayers();
        if (DEBUG) {
            console.log("style_layer couche :", couche);
        }
        map.addLayer(couche);
    }
}
/**
 * Convert a leaflet circle object to a polygon geojson form.
 * @return {array} - Of latitude longitude for circle in polygon form.
 */
function geojsoncircle(ci) {
    var circlejson = new Array();
    var n = ci.length;
    var i = n - 1;
    while (i >= 0) {
        circlejson.push([ci[i].lat, ci[i].lng]);
        i--;
    }
    circlejson.push([ci[n - 1].lat, ci[n - 1].lng]);
    return circlejson;
}
/**
 * Executed for sending all the "warning zones".
 */
$("#submit1").click(function() { // envoie toutes les warning zones
    editableLayers.eachLayer(function(layer) { // stockage des couches dans les variables globales pour les warning zones
        if (layer instanceof L.Circle) {
            var n = infosc.length;
            var i = 0;
            while (i < n) {
                if (infosc[i][2] == layer._leaflet_id) {
                    var temp = {
                        "type": "Feature",
                        "properties": {
                            "risk_type": infosc[i][1],
                            "description": infosc[i][0],
                            "expiration_date": infosc[i][3]
                        },
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [geojsoncircle(layer.toPolygon())]
                        }
                    };
                    circle.push(temp);
                }
                i++;
            }
        }
        if (layer instanceof L.Rectangle) {
            var n = infosb.length;
            var i = 0;
            while (i < n) {
                if (infosb[i][2] == layer._leaflet_id) {
                    var temp = layer.toGeoJSON();
                    temp.properties = {
                        "risk_type": infosb[i][1],
                        "description": infosb[i][0],
                        "expiration_date": infosb[i][3]
                    };
                    box.push(temp);
                }
                i++;
            }
        }
        if (layer instanceof L.Polygon) {
            var n = infosp.length;
            var i = 0;
            while (i < n) {
                if (infosp[i][2] == layer._leaflet_id) {
                    var temp = layer.toGeoJSON();
                    temp.properties = {
                        "risk_type": infosp[i][1],
                        "description": infosp[i][0],
                        "expiration_date": infosp[i][3]
                    };
                    polygon.push(temp);
                }
                i++;
            }
        }
    });
    if (DEBUG) {
        console.log("EVENT : $('#submit1').click");
    }
    if (DEBUG) {
        console.log("$('#submit1').click Circles :", circle);
        console.log("$('#submit1').click Boxes :", box);
        console.log("$('#submit1').click Polygons :", polygon);
    }
    if (fill_geojson(circle, box, polygon, string_warning_zone) == 0) { // si pas d erreur
        if (DEBUG) {
            console.log("$('#submit1').click geojson : ", geojson);
            console.log("$('#submit1').click Object.keys(geojson).length : ", Object.keys(geojson).length);
        }
        if (!$.isEmptyObject(geojson) && Object.keys(geojson).length != 0) { // si le geojson est plein
            send_ajax_geojson(string_warning_zone, url);
        }
    }
});
/**
 * Executed for sending all the "anomaly zones".
 */
$("#submit2").click(function() { // envoie toutes les anomaly
    leditableLayers.eachLayer(function(layer) { // stockage des couches dans les variables globales pour les anomalies zones
        if (layer instanceof L.Circle) {
            var n = infoscl.length;
            var i = 0;
            while (i < n) {
                if (infoscl[i][2] == layer._leaflet_id) {
                    var temp = {
                        "type": "Feature",
                        "properties": {
                            "anomaly_type": infoscl[i][1],
                            "description": infoscl[i][0],
                            "expiration_date": infoscl[i][3]
                        },
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [geojsoncircle(layer.toPolygon())]
                        }
                    };
                    circlel.push(temp);
                }
                i++;
            }
        }
        if (layer instanceof L.Rectangle) {
            var n = infosbl.length;
            var i = 0;
            while (i < n) {
                if (infosbl[i][2] == layer._leaflet_id) {
                    var temp = layer.toGeoJSON();
                    temp.properties = {
                        "anomaly_type": infosbl[i][1],
                        "description": infosbl[i][0],
                        "expiration_date": infosbl[i][3]
                    };
                    boxl.push(temp);
                }
                i++;
            }
        }
        if (layer instanceof L.Polygon) {
            var n = infospl.length;
            var i = 0;
            while (i < n) {
                if (infospl[i][2] == layer._leaflet_id) {
                    var temp = layer.toGeoJSON();
                    temp.properties = {
                        "anomaly_type": infospl[i][1],
                        "description": infospl[i][0],
                        "expiration_date": infospl[i][3]
                    }
                    polygonl.push(temp);
                }
                i++;
            }
        }
    });
    if (DEBUG) {
        console.log("EVENT : $('#submit1').click");
    }
    if (DEBUG) {
        console.log("$('#submit1').click Circles :", circlel);
        console.log("$('#submit1').click Boxes :", boxl);
        console.log("$('#submit1').click Polygons :", polygonl);
    }
    if (fill_geojson(circlel, boxl, polygonl, string_anomaly_zone) == 0) { // si pas d erreur
        if (DEBUG) {
            console.log("$('#submit1').click geojson : ", geojson);
            console.log("$('#submit1').click Object.keys(geojson).length : ", Object.keys(geojson).length);
        }
        if (!$.isEmptyObject(geojson) && Object.keys(geojson).length != 0) { // si le geojson est plein
            send_ajax_geojson(string_anomaly_zone, url);
        }
    }
});
/**
 * Ajax request sending one point ("start"|"step"|"end").
 * @param {array(3)} point - Array containing lat, lng and type ("start"|"step"|"end").
 */
function send_ajax_point(point) {
    if (point.length == 3 && point[0] != null && point[0] != undefined && point[1] != null && point[1] != undefined && point[2] != null && point[2] != undefined) {
        var json = new Object();
        if (DEBUG) {
            console.log("send_ajax_point point[0] : ", point[0]);
            console.log("send_ajax_point point[1] : ", point[1]);
            console.log("send_ajax_point point[2] : ", point[2]);
        }
        json["type"] = "Point";
        json["waypoint"] = point[2];
        json["coordinates"] = [point[1], point[0]];
        if (DEBUG) {
            console.log("send_ajax_point json : ", json);
        }
        $.ajax({
            url: url,
            type: 'POST',
            data: 'waypoint=' + JSON.stringify(json),
            dataType: 'json',
            success: function(code_json, statut) {
                if (DEBUG) {
                    console.log("send_ajax_point code_json : ", code_json);
                    console.log("send_ajax_point statut : ", statut);
                }
            },
            error: function(resultat, statut, erreur) {
                if (DEBUG) {
                    console.log("send_ajax_point resultat : ", resultat);
                    console.log("send_ajax_point statut : ", statut);
                    console.log("send_ajax_point erreur : ", erreur);
                }
                $.notify({
                    title: "<strong>Point request</strong>",
                    message: "Out of the area"
                }, {
                    type: "danger",
                    placement: {
                        from: "bottom",
                        align: "center"
                    }
                });
            },
            complete: function(resultat, statut) {
                if (DEBUG) {
                    console.log("send_ajax_point resultat.status :", resultat.status);
                }
                if (resultat.status == '200') {
                    var reponse = resultat.responseJSON;
                    if (!$.isEmptyObject(reponse) && reponse != undefined) { // si le resultat json n est pas vide
                        if (DEBUG) {
                            console.log("send_ajax_point reponse :", reponse);
                        }
                        if (reponse == false) { // si error
                        } else { // sinon
                            if (point[2] == "start") { // si point de depart
                                if (DEBUG) {
                                    console.log("send_ajax_point countrystart[0] : ", countrystart[0]);
                                    console.log("send_ajax_point countrystart[1] : ", countrystart[1]);
                                    console.log("send_ajax_point reponse['id'] : ", reponse['id']);
                                    console.log("send_ajax_point reponse['name'] : ", reponse['name']);
                                }
                                countrystart[0] = reponse["id"];
                                countrystart[1] = reponse["name"];
                                if (countryend[0] != null || countryend[0] != undefined && countryend[1] != null || countryend[0] != undefined) { // si point d arrivee
                                    if (countrystart[0] == countryend[0] && countrystart[1] == countryend[1]) { // si egalite
                                        controlPenalty.spliceWaypoints(0, 1, position);
                                    } else { // sinon
                                        $.notify({
                                            title: "<strong>Localisation</strong>",
                                            message: "This position does not exist in the country of destination"
                                        }, {
                                            type: "warning",
                                            placement: {
                                                from: "bottom",
                                                align: "center"
                                            }
                                        });
                                    }
                                } else {
                                    controlPenalty.spliceWaypoints(0, 1, position);
                                }

                            }
                            if (point[2] == "end") { // si point d arrivee
                                if (DEBUG) {
                                    console.log("send_ajax_point countryend[0] : ", countryend[0]);
                                    console.log("send_ajax_point countryend[1] : ", countryend[1]);
                                    console.log("send_ajax_point reponse['id'] : ", reponse['id']);
                                    console.log("send_ajax_point reponse['name'] : ", reponse['name']);
                                }
                                countryend[0] = reponse["id"];
                                countryend[1] = reponse["name"];
                                if (countrystart[0] != null || countrystart[0] != undefined && countrystart[1] != null || countrystart[0] != undefined) { // si point de depart
                                    if (countrystart[0] == countryend[0] && countrystart[1] == countryend[1]) { // si egalite
                                        controlPenalty.spliceWaypoints(controlPenalty.getWaypoints().length - 1, 1, position);
                                    } else { // sinon
                                        $.notify({
                                            title: "<strong>Localisation</strong>",
                                            message: "This position does not exist in the country of departure"
                                        }, {
                                            type: "warning",
                                            placement: {
                                                from: "bottom",
                                                align: "center"
                                            }
                                        });
                                    }
                                } else {
                                    controlPenalty.spliceWaypoints(controlPenalty.getWaypoints().length - 1, 1, position);
                                }
                            }
                            if (point[2] == "step") { // si point intermediaire
                                if (DEBUG) {
                                    console.log("send_ajax_point countrystart[0] : ", countrystart[0]);
                                    console.log("send_ajax_point countrystart[1] : ", countrystart[1]);
                                    console.log("send_ajax_point countryend[0] : ", countryend[0]);
                                    console.log("send_ajax_point countryend[1] : ", countryend[1]);
                                    console.log("send_ajax_point reponse['id'] : ", reponse['id']);
                                    console.log("send_ajax_point reponse['name'] : ", reponse['name']);
                                }
                                if (countrystart[0] != null || countrystart[0] != undefined && countrystart[1] != null || countrystart[0] != undefined && countryend[0] != null || countryend[0] != undefined && countryend[1] != null || countryend[0] != undefined) { // si point de depart et d arrivee
                                    if (countrystart[0] == countryend[0] && countrystart[1] == countryend[1] && countrystart[0] == reponse["id"] && countryend[0] == reponse["id"] && countrystart[1] == reponse["name"] && countryend[1] == reponse["name"]) { // si egalite
                                    } else { // sinon
                                    }
                                } else { // sinon
                                    $.notify({
                                        title: "<strong>Points</strong>",
                                        message: 'none'
                                    }, {
                                        type: "danger",
                                        placement: {
                                            from: "bottom",
                                            align: "center"
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        });
    } else {
        $.notify({
            title: "<strong>Point</strong>",
            message: 'wrong'
        }, {
            type: "danger",
            placement: {
                from: "bottom",
                align: "center"
            }
        });
    }
}