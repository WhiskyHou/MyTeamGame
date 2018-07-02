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
    function GameMap() {
        var _this = _super.call(this, 0, 0) || this;
        _this.config = [
            { x: 0, y: 0, id: GRASS_L }, { x: 1, y: 0, id: GRASS_D }, { x: 2, y: 0, id: GRASS_L }, { x: 3, y: 0, id: GRASS_D }, { x: 4, y: 0, id: GRASS_L }, { x: 5, y: 0, id: GRASS_D, npc: NPC1 }, { x: 6, y: 0, id: GRASS_L }, { x: 7, y: 0, id: GRASS_D },
            { x: 0, y: 1, id: GRASS_D, wall: WALL_LEFT }, { x: 1, y: 1, id: GRASS_L, wall: WALL_MIDDLE }, { x: 2, y: 1, id: GRASS_D, wall: WALL_MIDDLE }, { x: 3, y: 1, id: GRASS_L, wall: WALL_RIGHT }, { x: 4, y: 1, id: GRASS_D }, { x: 5, y: 1, id: GRASS_L }, { x: 6, y: 1, id: GRASS_D }, { x: 7, y: 1, id: GRASS_L, monster: MONSTER },
            { x: 0, y: 2, id: GRASS_L, monster: MONSTER }, { x: 1, y: 2, id: GRASS_D, tree: TREE }, { x: 2, y: 2, id: GRASS_L }, { x: 3, y: 2, id: GRASS_D }, { x: 4, y: 2, id: GRASS_L }, { x: 5, y: 2, id: GRASS_D }, { x: 6, y: 2, id: GRASS_L }, { x: 7, y: 2, id: GRASS_D },
            { x: 0, y: 3, id: GRASS_D }, { x: 1, y: 3, id: GRASS_L }, { x: 2, y: 3, id: GRASS_D }, { x: 3, y: 3, id: GRASS_L, wall: WALL_LEFT }, { x: 4, y: 3, id: GRASS_D, wall: WALL_MIDDLE }, { x: 5, y: 3, id: GRASS_L, wall: WALL_RIGHT }, { x: 6, y: 3, id: GRASS_D }, { x: 7, y: 3, id: GRASS_L },
            { x: 0, y: 4, id: GRASS_L }, { x: 1, y: 4, id: GRASS_D }, { x: 2, y: 4, id: GRASS_L, tree: TREE }, { x: 3, y: 4, id: GRASS_D, npc: NPC3 }, { x: 4, y: 4, id: GRASS_L }, { x: 5, y: 4, id: GRASS_D, equipment: KILL_DARGON_KNIFE }, { x: 6, y: 4, id: GRASS_L }, { x: 7, y: 4, id: GRASS_D },
            { x: 0, y: 5, id: GRASS_D, npc: NPC2 }, { x: 1, y: 5, id: GRASS_L }, { x: 2, y: 5, id: GRASS_D }, { x: 3, y: 5, id: GRASS_L }, { x: 4, y: 5, id: GRASS_D }, { x: 5, y: 5, id: GRASS_L }, { x: 6, y: 5, id: GRASS_D }, { x: 7, y: 5, id: GRASS_L, npc: NPC5 },
            { x: 0, y: 6, id: GRASS_L }, { x: 1, y: 6, id: GRASS_D }, { x: 2, y: 6, id: GRASS_L }, { x: 3, y: 6, id: GRASS_D, equipment: HP_BOTTLE }, { x: 4, y: 6, id: GRASS_L, wall: WALL_LEFT }, { x: 5, y: 6, id: GRASS_D, wall: WALL_MIDDLE }, { x: 6, y: 6, id: GRASS_L, wall: WALL_MIDDLE }, { x: 7, y: 6, id: GRASS_D, wall: WALL_RIGHT },
            { x: 0, y: 7, id: GRASS_D, npc: NPC4 }, { x: 1, y: 7, id: GRASS_L }, { x: 2, y: 7, id: GRASS_D }, { x: 3, y: 7, id: GRASS_L }, { x: 4, y: 7, id: GRASS_D, monster: MONSTER }, { x: 5, y: 7, id: GRASS_L }, { x: 6, y: 7, id: GRASS_D }, { x: 7, y: 7, id: GRASS_L, monster: MONSTER }
        ];
        _this.equipmentConfig = {};
        _this.npcConfig = {};
        _this.monsterConfig = {};
        _this.tileContainer = new DisplayObjectContainer(0, 0);
        _this.itemContainer = new DisplayObjectContainer(0, 0);
        _this.roleContainer = new DisplayObjectContainer(0, 0);
        _this.addChild(_this.tileContainer);
        _this.addChild(_this.itemContainer);
        _this.addChild(_this.roleContainer);
        _this.init();
        return _this;
    }
    // 好像只调用了一次…… 初始化……
    GameMap.prototype.init = function () {
        var _this = this;
        this.grid = new astar.Grid(COL_NUM, ROW_NUM);
        var xhr = new XMLHttpRequest();
        xhr.open("get", "config/map.json");
        xhr.send();
        var obj;
        xhr.onload = function () {
            obj = JSON.parse(xhr.response);
            var mapTile = obj.map[0].tile;
            for (var i = 0; i < mapTile.length; i++) {
                var row = mapTile[i];
                for (var j = 0; j < row.length; j++) {
                    var item = row[j];
                    var img = new Image();
                    img.src = item;
                    var tile = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, img);
                    _this.grid.setWalkable(j, i, true);
                    _this.tileContainer.addChild(tile);
                }
            }
            var mapItem = obj.map[0].item;
            for (var i = 0; i < mapItem.length; i++) {
                var row = mapItem[i];
                for (var j = 0; j < row.length; j++) {
                    var item = row[j];
                    if (item) {
                        var img = new Image();
                        img.src = item;
                        var building = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, img);
                        _this.grid.setWalkable(j, i, false);
                        _this.tileContainer.addChild(building);
                    }
                }
            }
        };
        // for (let item of this.config) {
        //     const img = item.id == GRASS_L ? grassLight : grassDark;
        //     const tile = new Bitmap(TILE_SIZE * item.x, TILE_SIZE * item.y, img);
        //     this.grid.setWalkable(item.x, item.y, true);
        //     this.tileContainer.addChild(tile);
        //     if (item.tree) {
        //         const tile = new Bitmap(TILE_SIZE * item.x, TILE_SIZE * item.y, tree);
        //         this.grid.setWalkable(item.x, item.y, false);
        //         this.tileContainer.addChild(tile);
        //     }
        //     if (item.wall) {
        //         const img = item.wall == WALL_MIDDLE ? wall_middle : (item.wall == WALL_LEFT ? wall_left : wall_right);
        //         const tile = new Bitmap(TILE_SIZE * item.x, TILE_SIZE * item.y, img);
        //         this.grid.setWalkable(item.x, item.y, false);
        //         this.tileContainer.addChild(tile);
        //     }
        //     if (item.equipment) {
        //         const id = item.equipment;
        //         if (id == KILL_DARGON_KNIFE) {
        //             const equipmentView = new Bitmap(TILE_SIZE * item.x, TILE_SIZE * item.y, knife);
        //             const equipmentTiem = new Equipment();
        //             equipmentTiem.view = equipmentView;
        //             equipmentTiem.name = '屠龙刀'
        //             equipmentTiem.attack = 35;
        //             equipmentTiem.x = item.x;
        //             equipmentTiem.y = item.y;
        //             const key = item.x + '_' + item.y;
        //             this.equipmentConfig[key] = equipmentTiem;
        //             this.itemContainer.addChild(equipmentView);
        //         } else if (id == HP_BOTTLE) {
        //             // TODO
        //             const equipmentView = new Bitmap(TILE_SIZE * item.x, TILE_SIZE * item.y, hp_bottle);
        //             const equipmentTiem = new Equipment();
        //             equipmentTiem.view = equipmentView;
        //             equipmentTiem.name = '扁鹊的药瓶'
        //             equipmentTiem.attack = 0;
        //             equipmentTiem.x = item.x;
        //             equipmentTiem.y = item.y;
        //             const key = item.x + '_' + item.y;
        //             this.equipmentConfig[key] = equipmentTiem;
        //             this.itemContainer.addChild(equipmentView);
        //         }
        //     }
        //     if (item.monster) {
        //         const monsterView = new Bitmap(TILE_SIZE * item.x, TILE_SIZE * item.y, captain);
        //         const monsterItem = new Monster();
        //         monsterItem.name = '队长';
        //         monsterItem.view = monsterView;
        //         monsterItem.hp = 120;
        //         monsterItem.x = item.x;
        //         monsterItem.y = item.y;
        //         const key = item.x + '_' + item.y;
        //         this.monsterConfig[key] = monsterItem;
        //         this.roleContainer.addChild(monsterView);
        //     }
        //     if (item.npc) {
        //         const id = item.npc;
        //         for (let npc of npcManager.npcList) {
        //             if (npc.id == id) {
        //                 const npcView = npc.view;
        //                 const npcHead = npc.head;
        //                 npcView.x = TILE_SIZE * item.x;
        //                 npcView.y = TILE_SIZE * item.y;
        //                 npc.x = item.x;
        //                 npc.y = item.y;
        //                 const key = item.x + '_' + item.y;
        //                 this.npcConfig[key] = npc;
        //                 this.roleContainer.addChild(npcView);
        //             }
        //         }
        //     }
        // }
    };
    GameMap.prototype.getNodeInfo = function (row, col) {
        for (var _i = 0, _a = this.config; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.x == row && item.y == col) {
                return item;
            }
        }
        return null;
    };
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
    return GameMap;
}(DisplayObjectContainer));
