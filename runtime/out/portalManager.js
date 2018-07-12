"use strict";
var PortalManager = /** @class */ (function () {
    function PortalManager() {
        this.portalList = [];
    }
    PortalManager.prototype.init = function (callback) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'config/portal.json');
        xhr.send();
        xhr.onload = function () {
            var obj = JSON.parse(xhr.response);
            _this.parseFromConfig(obj);
            callback();
        };
    };
    PortalManager.prototype.parseFromConfig = function (obj) {
        for (var _i = 0, _a = obj.portal; _i < _a.length; _i++) {
            var item = _a[_i];
            var portal = new Portal(item.id, item.from, item.to, item.targetRow, item.targetCol);
            this.portalList.push(portal);
        }
    };
    return PortalManager;
}());
