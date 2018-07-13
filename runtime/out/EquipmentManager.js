"use strict";
/**
 * 装备管理器
 */
var EquipmentManager = /** @class */ (function () {
    function EquipmentManager() {
        this.equipList = [];
    }
    EquipmentManager.prototype.init = function (callback) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'config/equip.json');
        xhr.send();
        xhr.onload = function () {
            var obj = JSON.parse(xhr.response);
            _this.parseFromConfig(obj);
            callback();
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
        for (var _b = 0, _c = config.consumable; _b < _c.length; _b++) {
            var item = _c[_b];
            var id = parseInt(item.id);
            var name_2 = item.name;
            var posID = parseInt(item.posID);
            var addHP = parseInt(item.addHP);
            var addMP = parseInt(item.addMP);
            var addCharm = parseInt(item.addCharm);
            var addEXP = parseInt(item.addEXP);
            var consum = new Consumable(id, name_2, posID, addHP, addMP, addCharm, addEXP);
            this.equipList.push(consum);
        }
    };
    EquipmentManager.prototype.getEquipByID = function (id) {
        for (var i = 0; i < equipManager.equipList.length; i++) {
            if (equipManager.equipList[i].id == id) {
                console.log(equipManager.equipList[i].name);
                return equipManager.equipList[i];
            }
        }
        return null;
    };
    return EquipmentManager;
}());
