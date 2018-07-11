"use strict";
/**
 * 怪物管理器
 */
var monsterManager = /** @class */ (function () {
    function monsterManager() {
        this.monsterList = [];
    }
    monsterManager.prototype.init = function (callback) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'config/monster.json');
        xhr.send();
        xhr.onload = function () {
            var obj = JSON.parse(xhr.response);
            _this.parseFromConfig(obj);
            callback();
        };
    };
    monsterManager.prototype.parseFromConfig = function (config) {
        for (var _i = 0, _a = config.monster; _i < _a.length; _i++) {
            var item = _a[_i];
            var id = parseInt(item.id);
            var name_1 = item.name;
            var hp = parseInt(item.hp);
            var attack = parseInt(item.attack);
            var exp = parseInt(item.exp);
            var coin = parseInt(item.coin);
            var level = parseInt(item.level);
            var dropType = parseInt(item.dropType);
            var monster = new Monster(id, name_1, hp, attack, exp, coin, level, dropType);
            var viewPath = item.view;
            var viewImg = new Image();
            viewImg.src = viewPath;
            var view = new Bitmap(0, 0, viewImg);
            monster.view = view;
            this.monsterList.push(monster);
        }
    };
    return monsterManager;
}());
