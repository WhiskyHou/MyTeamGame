"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MapManager = /** @class */ (function (_super) {
    __extends(MapManager, _super);
    function MapManager() {
        var _this = _super.call(this) || this;
        _this.maps = [];
        return _this;
    }
    MapManager.prototype.init = function () {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open("get", "config/map.json");
        xhr.send();
        xhr.onload = function () {
            var obj = JSON.parse(xhr.response);
            // console.log(xhr.response)
            _this.parseFromConfig(obj);
        };
    };
    MapManager.prototype.parseFromConfig = function (obj) {
        for (var _i = 0, _a = obj.map; _i < _a.length; _i++) {
            var item = _a[_i];
            var map_1 = new GameMap(item);
            this.maps.push(map_1);
        }
    };
    MapManager.prototype.getMap = function (index) {
        if (index < this.maps.length) {
            return this.maps[index];
        }
        return null;
    };
    return MapManager;
}(EventDispatcher));
