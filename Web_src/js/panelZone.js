$(document).on('click', '.zone_info .panel-heading', function(e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
    }
});


$(document).ready(function() {
    $(".leaflet-routing-geocoders ").after("<div id='warning_zone_info' class='zone_info pull-right'></div>");
    $(".leaflet-routing-geocoders ").after("<div id='anomaly_zone_info' class='zone_info pull-right'></div>");
    /*$(".radio_button_edit").change(function(e) {
        if ($("#anomaly").is(":checked")) {
            triggerParser("#anomaly", "#anomaly_zone_info", "#warning_zone_info", "#Anomaly_zones", anomaly_zones, "<p>No anomaly zones</p>", printInfoAnomalyZone);
        } else if ($("#warning").is(":checked")) {
            triggerParser("#warning", "#warning_zone_info", "#anomaly_zone_info", "#Warning_zones", warning_nonchecked, "<p>No warning zone to validate.</p>", printInfoWarningZone);
        } else {
            clearZoneInfo("#anomaly_zone_info");
            clearZoneInfo("#warning_zone_info");
            $(".leaflet-routing-geocoders").show();
        }
    });*/
});


function triggerParser(tagRadioButton, tagInfoZone, tagInfoZoneToRemove, layerRadioButton, zonesArray, outputIfZoneArrayEmpty, callbackPrinter) {
    zone_ui_activation(tagRadioButton, layerRadioButton);
    // Wait for ajax request fills zone object
    setTimeout(function() {
        zone_ui_deactivation(tagInfoZone, tagInfoZoneToRemove);
        parseZones(zonesArray, tagInfoZone, outputIfZoneArrayEmpty, callbackPrinter);
    }, 2000);
}


function zone_ui_activation(tagRadioButton, layerRadioButton) {
    $("#Navigate").click();
    if (!$(tagRadioButton).is(":checked")) {
        $(tagRadioButton).prop("checked", !$(tagRadioButton).prop("checked"));
    }
    if (!$(layerRadioButton).is(":checked")) {
        $(layerRadioButton).click();
    }
    map.spin(true);
}


function zone_ui_deactivation(tagInfoZone, tagInfoZoneToRemove) {
    clearZoneInfo(tagInfoZoneToRemove);
    clearLeafletRoutingGeocoders();
    map.spin(false);
    $(tagInfoZone).show();
}


function clearLeafletRoutingGeocoders() {
    $(".anomaly_zone_info").html("");
    $(".warning_zone_info").html("");
    $(".leaflet-routing-geocoders ").hide();
    $(".leaflet-routing-container").addClass("changedStyle");
}


function clearZoneInfo(tagInfoZoneToRemove) {
    $(tagInfoZoneToRemove).hide();
    $(".leaflet-routing-container").removeClass("changedStyle");
}


function parseZones(zonesArray, tagInfoZone, outputIfZoneArrayEmpty, callbackPrinter) {
    var output = "";
    if (zonesArray.length > 0) {
        output += "<div class='panel-group'>";
        for (var zoneIndex in zonesArray) {
            var zone = zonesArray[zoneIndex];
            output += callbackPrinter(zone);
        }
        output += "</div>";
    } else {
        output += outputIfZoneArrayEmpty;
    }
    $(tagInfoZone).html(output);
}


function centering(center) {
    map.flyTo(center, 15, {
        duration: 0.8
    });
}

function computeOnClick(object) {
    if (object.typeZone == 'anomaly') {
        if (!$("#Anomaly_zones").is(":checked")) {
            $("#Anomaly_zones").trigger('click');
        }
    } else if (object.typeZone == 'warning') {
        if (!$("#Warning_zones").is(":checked")) {
            $("#Warning_zones").trigger('click');
        }
    }
    map.flyTo(object.center, 15, {
        duration: 0.8
    });
}


/**
 * printInfoWarningZone
 * @param  {array} zone
 * @return {html} output html
 */
function printInfoAnomalyZone(zone) {
    var output = "";
    if (zone.hasOwnProperty("feature")) {
        if (zone.feature.hasOwnProperty("properties")) {
            output += "<div class='panel panel-primary'>";
            output += "<div class='panel-heading panel-collapsed' onclick=computeOnClick(" + JSON.stringify({
                center: zone.getBounds().getCenter(),
                typeZone: 'anomaly'
            }) + ")>";
            output += "<div>";
            output += "<h3 class='panel-title'>";
            output += zone.feature.properties.name;
            output += "</h3>";
            output += "<span class='pull-right'>";
            if (zone.feature.properties.expiration_date != null) {
                output += zone.feature.properties.expiration_date;
            }
            output += "</span>";
            output += "</div>";
            output += "</div>";
            output += "<div class='panel-body collapse'>";
            output += "<div class='row'>";
            output += "<dl class='dl-horizontal'>";
            output += addDlItem("Description :", zone.feature.properties.description);
            output += addDlItem("Expiration date :", zone.feature.properties.expiration_date);
            output += "</dl>";
            output += "</div>";
            output += "</div>";
            output += "</div>";
        }
    }
    return output;
}

function addDlItem(label, data) {
    var output;
    output += "<dt>";
    output += label;
    output += "</dt>";
    output += "<dd>";
    output += data;
    output += "</dd>";
    return output;
}

/**
 * printInfoWarningZone
 * @param  {array} zone
 * @return {html} output html
 */
function printInfoWarningZone(zone) {
    var output = "";
    if (zone.hasOwnProperty("feature")) {
        if (zone.feature.hasOwnProperty("properties")) {
            output += "<div class='panel panel-primary'>";
            output += "<div class='panel-heading panel-collapsed' onclick=computeOnClick(" + JSON.stringify({
                center: zone.getBounds().getCenter(),
                typeZone: 'warning'
            }) + ")>";
            output += "<div>";
            output += "<h3 class='panel-title'>";
            output += zone.feature.properties.name;
            output += "</h3>";
            output += "<span class='pull-right'>";
            if (zone.feature.properties.expiration_date != null) {
                output += zone.feature.properties.expiration_date;
            }
            output += "</span>";
            output += "</div>";
            output += "</div>";
            output += "<div class='panel-body collapse'>";
            output += "<div class='row'>";
            output += "<dl class='dl-horizontal'>";
            output += addDlItem("Description :", zone.feature.properties.description);
            output += addDlItem("Intensity :", zone.feature.properties.intensity);
            output += addDlItem("Expiration date :", zone.feature.properties.expiration_date);
            output += "</dl>";
            output += "</div>";
            output += "</div>";
            output += "</div>";
        }
    }
    return output;
}