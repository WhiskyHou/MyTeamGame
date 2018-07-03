"use strict";
/**
 * 装备管理器
 */
var EquipmentManager = /** @class */ (function () {
    function EquipmentManager() {
        this.equipList = [];
    }
    EquipmentManager.prototype.init = function () {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'config/equip.json');
        xhr.send();
        xhr.onload = function () {
            var obj = JSON.parse(xhr.response);
            _this.parseFromConfig(obj);
        };
    };
    EquipmentManager.prototype.parseFromConfig = function (config) {
        for (var _i = 0, _a = config.equip; _i < _a.length; _i++) {
            var item = _a[_i];
            var id = parseInt(item.id);
            var name_1 = item.name;
            var quality = parseInt(item.quality);
            var posID = parseInt(item.posID);
            var health = parseInt(item.health);
            var attack = parseInt(item.attack);
            var criticalPer = parseInt(item.criticalPer);
            var equip = new Equipment(id, name_1, quality, posID, health, attack, criticalPer);
            this.equipList.push(equip);
        }
    };
    return EquipmentManager;
}());
