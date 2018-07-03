"use strict";
/**
 * 怪物管理器
 */
var monsterManager = /** @class */ (function () {
    function monsterManager() {
        this.monsList = [];
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
            var damage = parseInt(item.damage);
            var monster = new Monster(id, name_1, hp, damage);
            this.monsList.push(monster);
        }
    };
    return monsterManager;
}());
