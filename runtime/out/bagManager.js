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
        return _this;
    }
    bagManager.prototype.openBag = function () {
        console.log('你打开背包');
        this.dispatchEvent('openBag', player);
        this.bagWeapon();
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
        this.nowPage++;
        this.dispatchEvent('updateBag', player);
    };
    bagManager.prototype.bagLeft = function () {
        console.log('你点击了左键');
        this.nowPage--;
        this.dispatchEvent('updateBag', player);
    };
    bagManager.prototype.bagOther = function () {
        console.log('你点击了其他');
        this.exportCheckedEquipment(3);
    };
    bagManager.prototype.bagWeapon = function () {
        console.log('你点击了武器');
        this.exportCheckedEquipment(0);
        this.dispatchEvent('updateBag', player);
    };
    bagManager.prototype.bagArmor = function () {
        console.log('你点击了防具');
        this.exportCheckedEquipment(1);
        this.dispatchEvent('updateBag', player);
    };
    bagManager.prototype.bagConsumable = function () {
        console.log('你点击了消耗品');
        this.exportCheckedEquipment(2);
        this.dispatchEvent('updateBag', player);
    };
    bagManager.prototype.exportCheckedEquipment = function (nowGroup) {
        //准备好当前选中类别的装备
        this.nowGroupEquipment = [];
        for (var i = 0; i < player.packageEquipment.length; i++) {
            if (player.packageEquipment[i].posID == nowGroup) {
                this.nowGroupEquipment.push(player.packageEquipment[i]);
            }
        }
        for (var i = 0; i < this.nowGroupEquipment.length; i++) {
            console.log(this.nowGroupEquipment[i].name);
        }
        // //把当前选中类别的装备分页打包
        // var page :number = Math.ceil(this.nowGroupEquipment.length/5)
        // for(var i=0;i<page;i++){
        //     this.nowGroupEquipmentArray[i] = new Array()
        //     for(var j=0;j<5;j++){
        //         if(nowGroupEquipment[j]){
        //             console.log('第',i,'页',this.nowGroupEquipment[5*i+j])
        //             this.nowGroupEquipmentArray[i][j] = nowGroupEquipment[5*i+j];
        //         }
        //     }
        // }
        this.nowPage = 0;
    };
    bagManager.prototype.getNowEquipment = function (num) {
        if (this.nowGroupEquipment[5 * this.nowPage + num]) {
            return this.nowGroupEquipment[5 * this.nowPage + num].name;
        }
        else {
            return '';
        }
    };
    return bagManager;
}(EventDispatcher));
