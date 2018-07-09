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
        //nowGroup : number = 0;//0:武器，1：防具，2：消耗品，3：其他
        // nowGroupEquipmentArray: Array<Array<any>>= new Array();
        _this.nowGroupEquipment = []; //当前组的装备数组
        _this.nowPage = 0;
        _this.nowGroup = 0;
        _this.nowNumber = 0;
        return _this;
    }
    bagManager.prototype.openBag = function () {
        console.log('你打开背包');
        this.dispatchEvent('openBag', player);
        this.bagWeapon();
    };
    bagManager.prototype.bagOn = function () {
        console.log('你穿上了装备');
        var pos = this.nowEquipment.posID;
        if (pos < 7) {
            if (player.mounthedEquipment[pos].id != 0) {
                this.nowMounthedEquipment = player.mounthedEquipment[pos];
                this.bagOff();
            }
            player.mounthedEquipment[pos] = this.nowEquipment;
            this.deletePackageEquipment(this.nowGroup, this.nowPage, this.nowNumber);
            this.changeNowEquipment(this.nowNumber);
            this.exportCheckedEquipment(false);
            this.bagUpdate();
        }
    };
    bagManager.prototype.bagOff = function () {
        console.log('你脱下了装备');
        if (this.nowMounthedEquipment.id != 0) {
            player.packageEquipment.push(this.nowMounthedEquipment);
            this.nowMounthedEquipment = new Equipment(0, '', 0, this.nowMounthedEquipment.posID, 0, 0, 0);
            player.mounthedEquipment[this.nowMounthedEquipment.posID] = this.nowMounthedEquipment;
            this.exportCheckedEquipment(false);
            this.bagUpdate();
        }
    };
    bagManager.prototype.bagDown = function () {
        this.dispatchEvent('bagDown', player);
        console.log('你关闭了窗口');
    };
    bagManager.prototype.bagRight = function () {
        console.log('你点击了右键');
        this.nowPage++;
        this.bagUpdate();
    };
    bagManager.prototype.bagLeft = function () {
        console.log('你点击了左键');
        this.nowPage--;
        this.bagUpdate();
    };
    bagManager.prototype.bagOther = function () {
        console.log('你点击了其他');
        this.nowGroup = 3;
        this.exportCheckedEquipment(true);
        this.bagUpdate();
    };
    bagManager.prototype.bagWeapon = function () {
        console.log('你点击了武器');
        this.nowGroup = 0;
        this.exportCheckedEquipment(true);
        this.bagUpdate();
    };
    bagManager.prototype.bagArmor = function () {
        console.log('你点击了防具');
        this.nowGroup = 1;
        this.exportCheckedEquipment(true);
        this.bagUpdate();
    };
    bagManager.prototype.bagConsumable = function () {
        console.log('你点击了消耗品');
        this.nowGroup = 2;
        this.exportCheckedEquipment(true);
        this.bagUpdate();
    };
    bagManager.prototype.exportCheckedEquipment = function (isUpdate) {
        //准备好当前选中类别的装备
        this.nowGroupEquipment = [];
        for (var i = 0; i < player.packageEquipment.length; i++) {
            if (this.posTOgroup(player.packageEquipment[i].posID) == this.nowGroup) {
                this.nowGroupEquipment.push(player.packageEquipment[i]);
            }
        }
        if (isUpdate) {
            this.nowPage = 0;
        }
        this.nowEquipment = this.nowGroupEquipment[this.nowPage * 5 + this.nowNumber];
    };
    bagManager.prototype.posTOgroup = function (pos) {
        if (pos == 0) {
            return 0;
        }
        else if (pos > 0 && pos < 7) {
            return 1;
        }
        else if (pos == 7) {
            return 2;
        }
        else {
            return 3;
        }
    };
    bagManager.prototype.deletePackageEquipment = function (nowG, nowP, nowN) {
        var newPackageEquipment = [];
        for (var i = 0; i < player.packageEquipment.length; i++) {
            if (this.posTOgroup(player.packageEquipment[i].posID) != nowG) {
                newPackageEquipment.push(player.packageEquipment[i]);
            }
        }
        this.nowGroup = nowG;
        this.exportCheckedEquipment(false);
        this.nowGroupEquipment.splice(5 * nowP + nowN, 1);
        for (var i = 0; i < this.nowGroupEquipment.length; i++) {
            newPackageEquipment.push(this.nowGroupEquipment[i]);
        }
        player.packageEquipment = newPackageEquipment;
    };
    bagManager.prototype.getNowEquipment = function (num) {
        if (this.nowGroupEquipment[5 * this.nowPage + num]) {
            return this.nowGroupEquipment[5 * this.nowPage + num].name;
        }
        else {
            return '';
        }
    };
    bagManager.prototype.changeNowEquipment = function (num) {
        this.nowNumber = num;
        if (this.nowGroupEquipment[5 * this.nowPage + this.nowNumber]) {
            this.nowEquipment = this.nowGroupEquipment[this.nowPage * 5 + this.nowNumber];
        }
    };
    bagManager.prototype.changeNowMounthedEquipment = function (num) {
        if (player.mounthedEquipment[num]) {
            this.nowMounthedEquipment = player.mounthedEquipment[num];
        }
    };
    bagManager.prototype.bagUpdate = function () {
        this.dispatchEvent('updateBag', player);
    };
    return bagManager;
}(EventDispatcher));
