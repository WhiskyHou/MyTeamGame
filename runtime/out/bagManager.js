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
var bagManager = /** @class */ (function (_super) {
    __extends(bagManager, _super);
    function bagManager() {
        var _this = _super.call(this) || this;
        _this.nowGroup = 0; //0:武器，1：防具，2：消耗品，3：其他
        _this.nowGroupEquipment = []; //当前组的装备数组
        return _this;
    }
    bagManager.prototype.openBag = function () {
        console.log('你打开背包');
        this.dispatchEvent('openBag', player);
    };
    bagManager.prototype.bagOn = function () {
        console.log('你穿上了装备');
    };
    bagManager.prototype.bagOff = function () {
        console.log('你脱下了装备');
    };
    bagManager.prototype.bagDown = function () {
        this.dispatchEvent('bagDown', player);
        console.log('你关闭了窗口');
    };
    bagManager.prototype.bagRight = function () {
        console.log('你点击了右键');
    };
    bagManager.prototype.bagLeft = function () {
        console.log('你点击了左键');
    };
    bagManager.prototype.bagOther = function () {
        console.log('你点击了其他');
    };
    bagManager.prototype.bagWeapon = function () {
        console.log('你点击了武器');
    };
    bagManager.prototype.bagArmor = function () {
        console.log('你点击了防具');
    };
    bagManager.prototype.bagConsumable = function () {
        console.log('你点击了消耗品');
    };
    bagManager.prototype.exportCheckedEquipment = function (nowGroup) {
        this.nowGroupEquipment = [];
        this.nowGroup = nowGroup;
        for (var i = 0; i < player.packageEquipment.length; i++) {
            if (player.packageEquipment[i].posID == this.nowGroup) {
                this.nowGroupEquipment.push(player.packageEquipment[i]);
            }
        }
        return this.nowGroupEquipment;
    };
    return bagManager;
}(EventDispatcher));
