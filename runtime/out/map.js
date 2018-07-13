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
/**
 * 游戏地图容器
 */
var GameMap = /** @class */ (function (_super) {
    __extends(GameMap, _super);
    function GameMap(obj) {
        var _this = _super.call(this, 0, 0) || this;
        _this.mapMonster = [];
        _this.config = [];
        _this.equipmentConfig = {};
        _this.npcConfig = {};
        _this.monsterConfig = {};
        _this.portalConfig = {};
        _this.tileContainer = new DisplayObjectContainer(0, 0);
        _this.itemContainer = new DisplayObjectContainer(0, 0);
        _this.roleContainer = new DisplayObjectContainer(0, 0);
        _this.addChild(_this.tileContainer);
        _this.addChild(_this.itemContainer);
        _this.addChild(_this.roleContainer);
        _this.id = obj.id;
        _this.init(obj);
        return _this;
    }
    // 好像只调用了一次…… 初始化……
    GameMap.prototype.init = function (obj) {
        this.grid = new astar.Grid(COL_NUM, ROW_NUM);
        this.config = obj;
        var mapTile = obj.tile;
        for (var i = 0; i < mapTile.length; i++) {
            var row = mapTile[i];
            for (var j = 0; j < row.length; j++) {
                var item = row[j];
                var img = new Image();
                img.src = item;
                var tile = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, img);
                this.grid.setWalkable(j, i, true);
                this.tileContainer.addChild(tile);
            }
        }
        var mapItem = obj.item;
        for (var i = 0; i < mapItem.length; i++) {
            var row = mapItem[i];
            for (var j = 0; j < row.length; j++) {
                var item = row[j];
                if (item) {
                    var img = new Image();
                    img.src = item;
                    var building = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, img);
                    // this.grid.setWalkable(j, i, false);
                    this.tileContainer.addChild(building);
                }
            }
        }
        var mapWalkable = obj.walkable;
        for (var i = 0; i < mapWalkable.length; i++) {
            var row = mapWalkable[i];
            for (var j = 0; j < row.length; j++) {
                var item = row[j];
                if (item == 1) {
                    this.grid.setWalkable(j, i, false);
                }
            }
        }
        var mapNpc = obj.npc;
        for (var i = 0; i < mapNpc.length; i++) {
            var row = mapNpc[i];
            for (var j = 0; j < row.length; j++) {
                var item = row[j];
                if (item != 0) {
                    var id = item;
                    // console.log(npcManager.npcList.length);
                    for (var _i = 0, _a = npcManager.npcList; _i < _a.length; _i++) {
                        var npc = _a[_i];
                        if (npc.id == id) {
                            var npcView = npc.view;
                            var npcHead = npc.head;
                            // console.log(npcView.img.src)
                            npcView.x = TILE_SIZE * j;
                            npcView.y = TILE_SIZE * i;
                            npc.x = j;
                            npc.y = i;
                            npc.nowMapID = this.id;
                            var key = j + '_' + i;
                            this.npcConfig[key] = npc;
                            this.roleContainer.addChild(npcView);
                        }
                    }
                }
            }
        }
        var mapEquip = obj.equipment;
        for (var i = 0; i < mapEquip.length; i++) {
            var row = mapEquip[i];
            for (var j = 0; j < row.length; j++) {
                var id = row[j];
                // if (id == KILL_DARGON_KNIFE) {
                //     const equipmentView = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, knife);
                //     const equipmentTiem = new Equipment(1, '2', 3, 0, 5, 6, 7);
                //     equipmentTiem.view = equipmentView;
                //     equipmentTiem.name = '屠龙刀'
                //     equipmentTiem.attack = 35;
                //     equipmentTiem.x = j;
                //     equipmentTiem.y = i;
                //     const key = j + '_' + i;
                //     this.equipmentConfig[key] = equipmentTiem;
                //     this.itemContainer.addChild(equipmentView);
                //     // } else if (id == HP_BOTTLE) {
                //     //     // TODO
                //     const equipmentView = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, hp_bottle);
                //     const equipmentTiem = new Equipment(1, '2', 3, 7, 5, 6, 7);
                //     equipmentTiem.view = equipmentView;
                //     equipmentTiem.name = '扁鹊的药瓶'
                //     equipmentTiem.attack = 0;
                //     equipmentTiem.x = j;
                //     equipmentTiem.y = i;
                //     const key = j + '_' + i;
                //     this.equipmentConfig[key] = equipmentTiem;
                //     this.itemContainer.addChild(equipmentView);
                // }
                // else 
                if (id == 1004) {
                    var equipmentView = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, caihuaBookImg);
                    var equip = equipManager.getEquipByID(id);
                    var equipmentTiem = new Equipment(id, equip.name, equip.quality, equip.posID, equip.health, equip.attack, equip.criticalPer);
                    equipmentTiem.view = equipmentView;
                    equipmentTiem.x = j;
                    equipmentTiem.y = i;
                    var key = j + '_' + i;
                    this.equipmentConfig[key] = equipmentTiem;
                    this.itemContainer.addChild(equipmentView);
                }
                else if (id == 1005) {
                    var equipmentView = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, xiXingBookImg);
                    var equip = equipManager.getEquipByID(id);
                    var equipmentTiem = new Equipment(id, equip.name, equip.quality, equip.posID, equip.health, equip.attack, equip.criticalPer);
                    equipmentTiem.view = equipmentView;
                    equipmentTiem.x = j;
                    equipmentTiem.y = i;
                    var key = j + '_' + i;
                    this.equipmentConfig[key] = equipmentTiem;
                    this.itemContainer.addChild(equipmentView);
                }
                else if (id == 2) {
                    var equipmentView = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, saoBaImg);
                    var equip = equipManager.getEquipByID(id);
                    var equipmentTiem = new Equipment(id, equip.name, equip.quality, equip.posID, equip.health, equip.attack, equip.criticalPer);
                    equipmentTiem.view = equipmentView;
                    equipmentTiem.x = j;
                    equipmentTiem.y = i;
                    var key = j + '_' + i;
                    this.equipmentConfig[key] = equipmentTiem;
                    this.itemContainer.addChild(equipmentView);
                }
                else if (id == 7) {
                    var equipmentView = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, langTouImg);
                    var equip = equipManager.getEquipByID(id);
                    var equipmentTiem = new Equipment(id, equip.name, equip.quality, equip.posID, equip.health, equip.attack, equip.criticalPer);
                    equipmentTiem.view = equipmentView;
                    equipmentTiem.x = j;
                    equipmentTiem.y = i;
                    var key = j + '_' + i;
                    this.equipmentConfig[key] = equipmentTiem;
                    this.itemContainer.addChild(equipmentView);
                }
                else if (id == 1000) {
                    var equipmentView = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, healthPotImg);
                    var equip = equipManager.getEquipByID(id);
                    var equipmentTiem = new Consumable(id, equip.name, equip.posID, equip.addHP, equip.addMP, equip.addCharm, equip.addEXP);
                    equipmentTiem.view = equipmentView;
                    equipmentTiem.x = j;
                    equipmentTiem.y = i;
                    var key = j + '_' + i;
                    this.equipmentConfig[key] = equipmentTiem;
                    this.itemContainer.addChild(equipmentView);
                }
            }
        }
        this.mapMonster = obj.monster;
        for (var i = 0; i < this.mapMonster.length; i++) {
            var row = this.mapMonster[i];
            for (var j = 0; j < row.length; j++) {
                var item = row[j];
                if (item != 0) {
                    var id = item;
                    // console.log(monsManager.monsterList.length);
                    for (var _b = 0, _c = monsManager.monsterList; _b < _c.length; _b++) {
                        var monster = _c[_b];
                        if (monster.id == id) {
                            var monsterView = monster.view;
                            // const npcHead = npc.head;
                            monsterView.x = TILE_SIZE * j;
                            monsterView.y = TILE_SIZE * i;
                            monster.x = j;
                            monster.y = i;
                            monster.nowMapID = this.id;
                            var key = j + '_' + i;
                            this.monsterConfig[key] = monster;
                            this.roleContainer.addChild(monsterView);
                        }
                    }
                }
            }
        }
        var mapPortal = obj.portal;
        for (var i = 0; i < mapPortal.length; i++) {
            var row = mapPortal[i];
            for (var j = 0; j < row.length; j++) {
                var item = row[j];
                if (item != 0) {
                    var id = item;
                    console.log(portalManager.portalList.length);
                    for (var _d = 0, _e = portalManager.portalList; _d < _e.length; _d++) {
                        var portal = _e[_d];
                        if (portal.id == id) {
                            var key = j + '_' + i;
                            this.portalConfig[key] = portal;
                        }
                    }
                }
            }
        }
    }; // init() end
    GameMap.prototype.reset = function () {
        for (var i = 0; i < this.mapMonster.length; i++) {
            var row = this.mapMonster[i];
            for (var j = 0; j < row.length; j++) {
                var item = row[j];
                if (item != 0) {
                    var id = item;
                    console.log(monsManager.monsterList.length);
                    for (var _i = 0, _a = monsManager.monsterList; _i < _a.length; _i++) {
                        var monster = _a[_i];
                        if (monster.id == id) {
                            monster.resetHP();
                            var monsterView = monster.view;
                            // const npcHead = npc.head;
                            monsterView.x = TILE_SIZE * j;
                            monsterView.y = TILE_SIZE * i;
                            monster.x = j;
                            monster.y = i;
                            monster.nowMapID = this.id;
                            var key = j + '_' + i;
                            this.monsterConfig[key] = monster;
                            this.roleContainer.addChild(monsterView);
                        }
                    }
                }
            }
        }
    };
    // getNodeInfo(row: number, col: number) {
    //     for (let item of this.config.map.) {
    //         if (item.x == row && item.y == col) {
    //             return item;
    //         }
    //     }
    //     return null;
    // }
    GameMap.prototype.getEquipmentInfo = function (row, col) {
        var key = row + '_' + col;
        return this.equipmentConfig[key];
    };
    GameMap.prototype.getNpcInfo = function (row, col) {
        var key = row + '_' + col;
        return this.npcConfig[key];
    };
    GameMap.prototype.getMonsterInfo = function (row, col) {
        var key = row + '_' + col;
        return this.monsterConfig[key];
    };
    GameMap.prototype.getPortalInfo = function (row, col) {
        var key = row + '_' + col;
        return this.portalConfig[key];
    };
    GameMap.prototype.deleteEquipment = function (equipment) {
        var key = equipment.x + '_' + equipment.y;
        delete this.equipmentConfig[key];
        this.itemContainer.deleteChild(equipment.view);
    };
    GameMap.prototype.deleteMonster = function (monster) {
        var key = monster.x + '_' + monster.y;
        delete this.monsterConfig[key];
        this.roleContainer.deleteChild(monster.view);
    };
    GameMap.prototype.deleteNpc = function (npc) {
        var key = npc.x + '_' + npc.y;
        delete this.npcConfig[key];
        this.roleContainer.deleteChild(npc.view);
    };
    return GameMap;
}(DisplayObjectContainer));
