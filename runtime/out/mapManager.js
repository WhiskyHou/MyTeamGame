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
var MapManager = /** @class */ (function (_super) {
    __extends(MapManager, _super);
    function MapManager() {
        var _this = _super.call(this) || this;
        _this.maps = [];
        return _this;
    }
    MapManager.prototype.init = function (callback) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open("get", "config/map.json");
        xhr.send();
        xhr.onload = function () {
            var obj = JSON.parse(xhr.response);
            // console.log(xhr.response)
            _this.parseFromConfig(obj);
            callback();
        };
    };
    MapManager.prototype.parseFromConfig = function (obj) {
        for (var _i = 0, _a = obj.map; _i < _a.length; _i++) {
            var item = _a[_i];
            var map_1 = new GameMap(item);
            this.maps.push(map_1);
        }
    };
    MapManager.prototype.getMap = function (index) {
        if (index < this.maps.length) {
            var map_2 = this.maps[index];
            map_2.addEventListener('onClick', function (eventData) {
                if (player.moveStatus) {
                    clickaudio.play();
                    var globalX = eventData.globalX;
                    var globalY = eventData.globalY;
                    var localPos = map_2.getLocalPos(new math.Point(globalX, globalY));
                    // 确定被点击的格子位置
                    var row = Math.floor(localPos.x / TILE_SIZE);
                    var col = Math.floor(localPos.y / TILE_SIZE);
                    // 添加行走命令
                    var walk = new WalkCommand(player.x, player.y, row, col);
                    commandPool.addCommand(walk);
                    // 获取被点击格子的装备信息 如果有东西的话 就添加一个拾取命令
                    var equipmentInfo = map_2.getEquipmentInfo(row, col);
                    if (equipmentInfo) {
                        var pick = new PickCommand(equipmentInfo);
                        commandPool.addCommand(pick);
                    }
                    var npcInfo = map_2.getNpcInfo(row, col);
                    if (npcInfo) {
                        if (npcInfo.id == 6) {
                            shpManager.openShop();
                        }
                        else {
                            var talk = new TalkCommand(npcInfo);
                            commandPool.addCommand(talk);
                        }
                    }
                    var monsterInfo = map_2.getMonsterInfo(row, col);
                    if (monsterInfo) {
                        // console.log('monster Info');
                        var fight = new FightCommand(monsterInfo);
                        commandPool.addCommand(fight);
                    }
                    var portalInfo = map_2.getPortalInfo(row, col);
                    if (portalInfo) {
                        var portal = new PortalCommand(portalInfo);
                        commandPool.addCommand(portal);
                    }
                    player.moveStatus = false;
                    // 执行命令池的命令
                    commandPool.execute();
                }
            });
            return map_2;
        }
        return null;
    };
    return MapManager;
}(EventDispatcher));
