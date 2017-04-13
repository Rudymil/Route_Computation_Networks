$(document).on('click', '#warning_zone_info .panel-heading', function(e) {
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
    $(".leaflet-routing-geocoders ").after("<div id='warning_zone_info' class='pull-right'></div>");
    $(".radio_button").change(function(e) {
        if ($("#warning").is(":checked")) {
            clearLeafletRoutingGeocoders();
            parseWarningZones(warning_nonchecked);
        } else {
            clearWarningZoneInfo();
        }
    });
});


/**
 * clearLeafletRoutingGeocoders
 */
function clearLeafletRoutingGeocoders() {
    $(".leaflet-routing-geocoders ").hide();
    $(".warning_zone_info").html("");
    $( ".leaflet-routing-container" ).addClass( "changedStyle" );
    $("#warning_zone_info").show();
}

/**
 * clearWarningZoneInfo
 */
function clearWarningZoneInfo() {
    $("#warning_zone_info").hide();
    $( ".leaflet-routing-container" ).removeClass( "changedStyle" );
    $(".leaflet-routing-geocoders ").show();
}

/**
 * [parseWarningZones description]
 * @param  {array} warning_nonchecked
 * @return information on html
 */
function parseWarningZones(warning_nonchecked) {
    var output = "";
    console.log(warning_nonchecked);
    if (warning_nonchecked.length > 0) {
        output += "<div class='panel-group'>";
        for (var zone in warning_nonchecked) {
            warning_zone = warning_nonchecked[zone];
            output += printInfoWarningZone(warning_zone);
        }

        output += "</div>";
    } else {
        output += "<p> No warning zone to validate </p>";
    }
    $('#warning_zone_info').html(output);
}

/**
 * centering
 * @param  center
 */
function centering(center) {
    map.flyTo(center, 15, {
        duration: 0.8
    });
}

/**
 * printInfoWarningZone
 * @param  {array} warning_zone
 * @return {html} output html
 */
function printInfoWarningZone(warning_zone) {
    var output = "";
    if (warning_zone.hasOwnProperty("feature")) {
        if (warning_zone.feature.hasOwnProperty("properties")) {
            output += "<div class='panel panel-primary'>";
            output += "<div class='panel-heading panel-collapsed' onclick=centering(" + JSON.stringify(warning_zone.getBounds().getCenter()) + ")>";
            output += "<div>";
            output += "<h3 class='panel-title'>";
            output += warning_zone.feature.properties.name;
            output += "</h3>";
            output += "<span class='pull-right'>";
            output += warning_zone.feature.properties.expiration_date;
            output += "</span>";
            output += "</div>";
            output += "</div>";
            output += "<div class='panel-body collapse'>";
            output += "<div class='row'>";
            output += "<dl class='dl-horizontal'>";
            output += "<dt>";
            output += "Type de risque : ";
            output += "</dt>";
            output += "<dd>";
            output += warning_zone.feature.properties.risk_type;
            output += "</dd>";
            output += "<dt>";
            output += "Description :";
            output += "</dt>";
            output += "<dd>";
            output += warning_zone.feature.properties.description;
            output += "</dd>";
            output += "<dt>";
            output += "Intensity :";
            output += "</dt>";
            output += "<dd>";
            output += warning_zone.feature.properties.intensity;
            output += "</dd>";
            output += "<dt>";
            output += "Expiration date :";
            output += "</dt>";
            output += "<dd>";
            output += warning_zone.feature.properties.expiration_date;
            output += "</dd>";
            output += "</dl>";
            output += "</div>";

            output += "</div>";
            output += "</div>";
        }
    }
    return output;
}
