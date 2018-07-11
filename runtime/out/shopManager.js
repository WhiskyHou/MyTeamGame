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
        // this.storeEquipment = [
        //     [   new Equipment(0,"",0,0,0,0,0),
        //         new Equipment(0,"",0,0,0,0,0),
        //     ],
        //     []
        // ]
    };
    shopManager.prototype.init = function (callback) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'config/product.json');
        xhr.send();
        xhr.onload = function () {
            var obj = JSON.parse(xhr.response);
            _this.parseFromConfig(obj);
            callback();
        };
    };
    shopManager.prototype.parseFromConfig = function (config) {
        var productList = [];
        for (var _i = 0, _a = config.product; _i < _a.length; _i++) {
            var item = _a[_i];
            var price = parseInt(item.price);
            var productID = parseInt(item.productID);
            var equipmentID = parseInt(item.equipmentID);
            var equipment = equipManager.equipList[equipmentID];
            var descriptionPath = item.description;
            var descriptionImg = new Image();
            descriptionImg.src = descriptionPath;
            var description = new Bitmap(0, 0, descriptionImg);
            var product = new Product(productID, equipment, price, description);
            productList.push(product);
            console.log(product.toString());
        }
    };
    return shopManager;
}(EventDispatcher));
