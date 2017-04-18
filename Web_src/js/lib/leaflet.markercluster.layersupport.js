/*!
 Leaflet.MarkerCluster.LayerSupport 1.0.3+1372080
 (c) 2015-2016 Boris Seang
 License MIT
 */
! function(e, r) {
    "function" == typeof define && define.amd ? define(["leaflet"], r) : r("object" == typeof module && module.exports ? require("leaflet") : e.L)
}(this, function(e, r) {
    var i = e.MarkerClusterGroup,
        o = i.prototype,
        t = i.extend({
            options: {
                singleAddRemoveBufferDuration: 100
            },
            initialize: function(e) {
                o.initialize.call(this, e), this._featureGroup = new a, this._featureGroup.addEventParent(this), this._nonPointGroup = new a, this._nonPointGroup.addEventParent(this), this._layers = {}, this._proxyLayerGroups = {}, this._proxyLayerGroupsNeedRemoving = {}, this._singleAddRemoveBuffer = []
            },
            checkIn: function(e) {
                var r = this._toArray(e);
                return this._checkInGetSeparated(r), this
            },
            checkOut: function(r) {
                var i, o, t = this._toArray(r),
                    a = this._separateSingleFromGroupLayers(t, {
                        groups: [],
                        singles: []
                    }),
                    s = a.groups,
                    n = a.singles;
                for (i = 0; i < n.length; i++) o = n[i], delete this._layers[e.stamp(o)], delete o._mcgLayerSupportGroup;
                for (this._originalRemoveLayers(n), i = 0; i < s.length; i++) o = s[i], this._dismissProxyLayerGroup(o);
                return this
            },
            addLayers: function(r) {
                var i, o, t, a = this._toArray(r),
                    s = this._checkInGetSeparated(a),
                    n = s.groups;
                for (this._originalAddLayers(s.singles), i = 0; i < n.length; i++) o = n[i], t = e.stamp(o), this._proxyLayerGroups[t] = o, delete this._proxyLayerGroupsNeedRemoving[t], this._map && this._map._originalAddLayer(o)
            },
            addLayer: function(e) {
                return this._bufferSingleAddRemove(e, "addLayers"), this
            },
            _originalAddLayer: o.addLayer,
            _originalAddLayers: o.addLayers,
            removeLayers: function(r) {
                var i, o, t = this._toArray(r),
                    a = this._separateSingleFromGroupLayers(t, {
                        groups: [],
                        singles: []
                    }),
                    s = a.groups,
                    n = a.singles,
                    p = 0;
                for (this._originalRemoveLayers(n); p < s.length; p++) i = s[p], o = e.stamp(i), delete this._proxyLayerGroups[o], this._map ? this._map._originalRemoveLayer(i) : this._proxyLayerGroupsNeedRemoving[o] = i;
                return this
            },
            removeLayer: function(e) {
                return this._bufferSingleAddRemove(e, "removeLayers"), this
            },
            _originalRemoveLayer: o.removeLayer,
            _originalRemoveLayers: o.removeLayers,
            onAdd: function(r) {
                r._originalAddLayer = r._originalAddLayer || r.addLayer, r._originalRemoveLayer = r._originalRemoveLayer || r.removeLayer, e.extend(r, n);
                var i, t, a, s = this._removePreAddedLayers(r);
                o.onAdd.call(this, r);
                for (i in this._proxyLayerGroups) t = this._proxyLayerGroups[i], r._originalAddLayer(t);
                for (i in this._proxyLayerGroupsNeedRemoving) t = this._proxyLayerGroupsNeedRemoving[i], r._originalRemoveLayer(t), delete this._proxyLayerGroupsNeedRemoving[i];
                for (a = 0; a < s.length; a++) r.addLayer(s[a])
            },
            _bufferSingleAddRemove: function(r, i) {
                var o, t = this.options.singleAddRemoveBufferDuration;
                t > 0 ? (this._singleAddRemoveBuffer.push({
                    type: i,
                    layer: r
                }), this._singleAddRemoveBufferTimeout || (o = e.bind(this._processSingleAddRemoveBuffer, this), this._singleAddRemoveBufferTimeout = setTimeout(o, t))) : this[i](r)
            },
            _processSingleAddRemoveBuffer: function() {
                for (var e, r, i = this._singleAddRemoveBuffer, o = 0, t = []; o < i.length; o++) e = i[o], r || (r = e.type), e.type === r ? t.push(e.layer) : (this[r](t), t = [e.layer]);
                this[r](t), i.length = 0, clearTimeout(this._singleAddRemoveBufferTimeout), this._singleAddRemoveBufferTimeout = null
            },
            _checkInGetSeparated: function(r) {
                var i, o, t = this._separateSingleFromGroupLayers(r, {
                        groups: [],
                        singles: []
                    }),
                    a = t.groups,
                    s = t.singles;
                for (i = 0; i < a.length; i++) o = a[i], this._recruitLayerGroupAsProxy(o);
                for (i = 0; i < s.length; i++) o = s[i], this._removeFromOtherGroupsOrMap(o), this._layers[e.stamp(o)] = o, o._mcgLayerSupportGroup = this;
                return t
            },
            _separateSingleFromGroupLayers: function(r, i) {
                for (var o, t = i.groups, a = i.singles, s = e.Util.isArray, n = 0; n < r.length; n++) o = r[n], o instanceof e.LayerGroup ? (t.push(o), this._separateSingleFromGroupLayers(o.getLayers(), i)) : s(o) ? this._separateSingleFromGroupLayers(o, i) : a.push(o);
                return i
            },
            _recruitLayerGroupAsProxy: function(r) {
                var i = r._proxyMcgLayerSupportGroup;
                if (i) {
                    if (i === this) return;
                    i.checkOut(r)
                } else this._removeFromOwnMap(r);
                r._proxyMcgLayerSupportGroup = this, r._originalAddLayer = r._originalAddLayer || r.addLayer, r._originalRemoveLayer = r._originalRemoveLayer || r.removeLayer, e.extend(r, s)
            },
            _dismissProxyLayerGroup: function(i) {
                if (i._proxyMcgLayerSupportGroup !== r && i._proxyMcgLayerSupportGroup === this) {
                    delete i._proxyMcgLayerSupportGroup, i.addLayer = i._originalAddLayer, i.removeLayer = i._originalRemoveLayer;
                    var o = e.stamp(i);
                    delete this._proxyLayerGroups[o], delete this._proxyLayerGroupsNeedRemoving[o], this._removeFromOwnMap(i)
                }
            },
            _removeFromOtherGroupsOrMap: function(e) {
                var r = e._mcgLayerSupportGroup;
                if (r) {
                    if (r === this) return;
                    r.checkOut(e)
                } else e.__parent ? e.__parent._group.removeLayer(e) : this._removeFromOwnMap(e)
            },
            _removeFromOwnMap: function(e) {
                e._map && e._map.removeLayer(e)
            },
            _removePreAddedLayers: function(e) {
                var r, i = this._layers,
                    o = [];
                for (var t in i) r = i[t], r._map && (o.push(r), e._originalRemoveLayer(r));
                return o
            },
            _toArray: function(r) {
                return e.Util.isArray(r) ? r : [r]
            }
        }),
        a = e.FeatureGroup.extend({
            addLayer: function(r) {
                if (this.hasLayer(r)) return this;
                r.addEventParent(this);
                var i = e.stamp(r);
                return this._layers[i] = r, this._map && this._map._originalAddLayer(r), this.fire("layeradd", {
                    layer: r
                })
            },
            removeLayer: function(r) {
                if (!this.hasLayer(r)) return this;
                r in this._layers && (r = this._layers[r]), r.removeEventParent(this);
                var i = e.stamp(r);
                return this._map && this._layers[i] && this._map._originalRemoveLayer(this._layers[i]), delete this._layers[i], this.fire("layerremove", {
                    layer: r
                })
            },
            onAdd: function(e) {
                this._map = e, this.eachLayer(e._originalAddLayer, e)
            },
            onRemove: function(e) {
                this.eachLayer(e._originalRemoveLayer, e), this._map = null
            }
        }),
        s = {
            addLayer: function(e) {
                var r = this.getLayerId(e);
                return this._layers[r] = e, this._map ? this._proxyMcgLayerSupportGroup.addLayer(e) : this._proxyMcgLayerSupportGroup.checkIn(e), this
            },
            removeLayer: function(e) {
                var r = e in this._layers ? e : this.getLayerId(e);
                return this._proxyMcgLayerSupportGroup.removeLayer(e), delete this._layers[r], this
            }
        },
        n = {
            addLayer: function(e) {
                return e._mcgLayerSupportGroup ? e._mcgLayerSupportGroup._originalAddLayer(e) : this._originalAddLayer(e)
            },
            removeLayer: function(e) {
                return e._mcgLayerSupportGroup ? e._mcgLayerSupportGroup._originalRemoveLayer(e) : this._originalRemoveLayer(e)
            }
        };
    e.markerClusterGroup.layerSupport = function(e) {
        return new t(e)
    }
});