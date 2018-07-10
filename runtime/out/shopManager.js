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
var shopManager = /** @class */ (function (_super) {
    __extends(shopManager, _super);
    function shopManager() {
        var _this = _super.call(this) || this;
        _this.nowGroup = 0;
        _this.nowPage = 0;
        _this.nowNumber = 0;
        _this.storeEquipment = []; //产品二维数组
        _this.getProductList();
        return _this;
    }
    shopManager.prototype.openShop = function () {
        console.log('你打开商店');
        this.dispatchEvent('openShop', player);
    };
    shopManager.prototype.shopDown = function () {
        this.dispatchEvent('shopDown', player);
        console.log('你关闭了窗口');
    };
    shopManager.prototype.shopBuy = function () {
        this.dispatchEvent('shopDown', player);
        console.log('你关闭了窗口');
    };
    shopManager.prototype.changeNowProduct = function (num) {
        // this.nowNumber = num;
        // if(this.nowGroupEquipment[5*this.nowPage+this.nowNumber]){
        //     this.nowEquipment = this.nowGroupEquipment[this.nowPage*5+this.nowNumber]
    };
    shopManager.prototype.shopRight = function () {
        console.log('你点击了右键');
    };
    shopManager.prototype.shopLeft = function () {
        console.log('你点击了左键');
    };
    shopManager.prototype.getProductList = function () {
        //id,name,quality,posID,hp,attack,critical,
        this.storeEquipment = [
            [new Equipment(0, "", 0, 0, 0, 0, 0),
                new Equipment(0, "", 0, 0, 0, 0, 0),
            ],
            []
        ];
    };
    return shopManager;
}(EventDispatcher));
