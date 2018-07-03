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
var EquipmentSet = /** @class */ (function () {
    function EquipmentSet() {
        this.idSet = [];
    }
    EquipmentSet.prototype.buildEquip = function () {
        var count = this.idSet.length - 1;
        var ran = this.getRandom(0, count);
        var equipID = this.idSet[ran];
        for (var i = 0; i < equipManager.equipList.length; i++) {
            if (equipManager.equipList[i].id == equipID) {
                console.log(equipManager.equipList[i].name);
            }
        }
        return equipID;
    };
    EquipmentSet.prototype.getRandom = function (n, m) {
        return Math.round(Math.random() * (m - n) + n);
    };
    EquipmentSet.prototype.addEquipID = function (id) {
        this.idSet.push(id);
    };
    return EquipmentSet;
}());
var lv1EquipSet = /** @class */ (function (_super) {
    __extends(lv1EquipSet, _super);
    function lv1EquipSet() {
        return _super.call(this) || this;
    }
    return lv1EquipSet;
}(EquipmentSet));
var lv2EquipSet = /** @class */ (function (_super) {
    __extends(lv2EquipSet, _super);
    function lv2EquipSet() {
        return _super.call(this) || this;
    }
    return lv2EquipSet;
}(EquipmentSet));
var lv3EquipSet = /** @class */ (function (_super) {
    __extends(lv3EquipSet, _super);
    function lv3EquipSet() {
        return _super.call(this) || this;
    }
    return lv3EquipSet;
}(EquipmentSet));
var lv4EquipSet = /** @class */ (function (_super) {
    __extends(lv4EquipSet, _super);
    function lv4EquipSet() {
        return _super.call(this) || this;
    }
    return lv4EquipSet;
}(EquipmentSet));
var lv5EquipSet = /** @class */ (function (_super) {
    __extends(lv5EquipSet, _super);
    function lv5EquipSet() {
        return _super.call(this) || this;
    }
    return lv5EquipSet;
}(EquipmentSet));
var lv1Set = new lv1EquipSet();
var lv2Set = new lv2EquipSet();
var lv3Set = new lv3EquipSet();
var lv4Set = new lv4EquipSet();
var lv5Set = new lv5EquipSet();
function equipSetInit(equipManager) {
    for (var i = 0; i < equipManager.equipList.length; i++) {
        switch (equipManager.equipList[i].quality) {
            case 1:
                lv1Set.addEquipID(equipManager.equipList[i].id);
                break;
            case 2:
                lv2Set.addEquipID(equipManager.equipList[i].id);
                break;
            case 3:
                lv3Set.addEquipID(equipManager.equipList[i].id);
                break;
            case 4:
                lv4Set.addEquipID(equipManager.equipList[i].id);
                break;
            case 5:
                lv5Set.addEquipID(equipManager.equipList[i].id);
                break;
        }
    }
}
