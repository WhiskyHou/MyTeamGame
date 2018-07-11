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
        _this.nowNumber = -1;
        _this.storeProduct = [[], [], [], []]; //储存装备的
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
        if (this.nowNumber > -1 && this.nowNumber < 100) {
            var product = this.storeProduct[this.nowGroup][5 * this.nowPage + this.nowNumber];
            var price = product.price;
            var equipment = product.equipment;
            player.coin -= price;
            player.packageEquipment.push(equipment);
            console.log('你购买了商品');
            this.nowNumber = -1;
            this.shopUpdate();
        }
    };
    shopManager.prototype.changeNowProduct = function (num) {
        this.nowNumber = num;
        this.shopUpdate();
    };
    shopManager.prototype.changeNowGroup = function (num) {
        this.nowGroup = num;
        console.log('当前组', this.nowGroup);
        this.nowNumber = 100;
        this.nowPage = 0;
        this.shopUpdate();
    };
    shopManager.prototype.shopRight = function () {
        console.log('你点击了右键');
        var MaxPage = (this.storeProduct[this.nowGroup].length / 5) - 1;
        console.log(MaxPage);
        if (this.nowPage < MaxPage) {
            this.nowNumber = 100;
            this.nowPage++;
        }
        this.shopUpdate();
    };
    shopManager.prototype.shopLeft = function () {
        console.log('你点击了左键');
        if (this.nowPage > 0) {
            this.nowNumber = -1;
            this.nowPage--;
        }
        this.shopUpdate();
    };
    shopManager.prototype.shopUpdate = function () {
        this.dispatchEvent('updateShop', this.storeProduct);
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
            // if(this.getEquipment(equipmentID).posID<10){ }
            var equipment = this.getEquipment(equipmentID);
            var descriptionPath = item.description;
            var descriptionImg = new Image();
            descriptionImg.src = descriptionPath;
            var description = new Bitmap(0, 0, descriptionImg);
            var product = new Product(productID, equipment, price, description);
            productList.push(product);
            console.log(product.toString());
        }
        this.Equipment1TO2(productList);
    };
    shopManager.prototype.Equipment1TO2 = function (productList) {
        //准备好当前选中类别的装备
        for (var _i = 0, productList_1 = productList; _i < productList_1.length; _i++) {
            var item = productList_1[_i];
            var Group = this.posTOgroup(item.equipment.posID);
            this.storeProduct[Group].push(item);
        }
        this.shopUpdate();
    };
    shopManager.prototype.posTOgroup = function (pos) {
        if (pos == 0) { //武器
            return 0;
        }
        else if (pos > 0 && pos < 7) { //防具
            return 1;
        }
        else if (pos == 7) { //消耗品
            return 2;
        }
        else if (pos == 8) { //其他
            return 3;
        }
        else {
            return 4;
        }
    };
    shopManager.prototype.getNowProduct = function (num) {
        if (shpManager.storeProduct[shpManager.nowGroup][5 * shpManager.nowPage + num]) {
            return shpManager.storeProduct[shpManager.nowGroup][5 * shpManager.nowPage + num].equipment.name;
        }
        else {
            return '';
        }
    };
    shopManager.prototype.getNowProductInfo = function (num) {
        if (shpManager.storeProduct[shpManager.nowGroup][5 * shpManager.nowPage + num]) {
            var nowProductInfo = ["商品名称：" + shpManager.storeProduct[shpManager.nowGroup][5 * shpManager.nowPage + num].equipment.name,
                "商品价格：" + shpManager.storeProduct[shpManager.nowGroup][5 * shpManager.nowPage + num].price.toString() + '金币'
            ];
            return nowProductInfo;
        }
        else {
            return [];
        }
    };
    shopManager.prototype.getEquipment = function (equipID) {
        for (var _i = 0, _a = equipManager.equipList; _i < _a.length; _i++) {
            var item = _a[_i];
            if (equipID == item.id)
                return item;
        }
        return new Equipment(0, '', 0, 10, 0, 0, 0);
    };
    return shopManager;
}(EventDispatcher));
