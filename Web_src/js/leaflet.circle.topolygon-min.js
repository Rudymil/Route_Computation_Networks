(function(e) {
    var o;
    if (typeof define === "function" && define.amd) {
        define(["leaflet"], e)
    } else if (typeof module !== "undefined") {
        o = require("leaflet");
        module.exports = e(o)
    } else {
        if (typeof window.L === "undefined") {
            throw new Error("Leaflet must be loaded first")
        }
        e(window.L)
    }
})(function(e) {
    "use strict";
    e.Circle.SECTIONS_COUNT = 64;
    e.Circle.toPolygon = function(o, t, i) {
        i = i || o._map;
        if (!i) {
            throw Error("Can't figure out points without adding the feature to the map")
        }
        var n = [],
            r = i.options.crs,
            f = Math.PI * 2,
            a = 0,
            l, u, d, c, s;
        if (r === e.CRS.EPSG3857) {
            c = i.latLngToLayerPoint.bind(i);
            s = i.layerPointToLatLng.bind(i);
            u = o._radius
        } else {
            c = r.projection.project.bind(r.projection);
            s = r.projection.unproject.bind(r.projection);
            u = o._mRadius
        }
        l = c(o._latlng);
        t = t || e.Circle.SECTIONS_COUNT;
        for (var p = 0; p < t - 1; p++) {
            a -= f / t;
            d = new e.Point(l.x + u * Math.cos(a), l.y + u * Math.sin(a));
            if (p > 0 && d.equals(n[p - 1])) {
                continue
            }
            n.push(s(d))
        }
        return n
    };
    e.Circle.prototype.toPolygon = function(o, t) {
        return e.Circle.toPolygon(this, o, t || this._map)
    }
});