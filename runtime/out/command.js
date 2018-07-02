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
 * 走路命令
 */
var WalkCommand = /** @class */ (function (_super) {
    __extends(WalkCommand, _super);
    function WalkCommand(fromX, fromY, toX, toY) {
        var _this = _super.call(this) || this;
        _this.fromX = fromX;
        _this.fromY = fromY;
        _this.toX = toX;
        _this.toY = toY;
        return _this;
    }
    WalkCommand.prototype.execute = function (callback) {
        console.log("\u5F00\u59CB\u8D70\u8DEF\uFF01\uFF01\uFF01\u4ECE(" + this.fromX + ", " + this.fromY + ")\u51FA\u53D1");
        map.grid.setStartNode(this.fromX, this.fromY);
        map.grid.setEndNode(this.toX, this.toY);
        var findpath = new astar.AStar();
        findpath.setHeurisitic(findpath.diagonal);
        var result = findpath.findPath(map.grid);
        // console.log(map.grid.toString());
        console.log(findpath._path);
        var path;
        if (result) {
            path = findpath._path;
            path.shift();
            this.walk(path, callback);
        }
        else {
            player.moveStatus = true;
            callback();
        }
    };
    WalkCommand.prototype.walk = function (path, callback) {
        var _this = this;
        setTimeout(function () {
            var node = path.shift();
            if (node) {
                // player.dispatchEvent('walkOneStep', { nodeX: node.x, nodeY: node.y });
                player.changeGridPos(node.x, node.y);
            }
            else {
                console.log("\u5230\u8FBE\u5730\u70B9\uFF01\uFF01\uFF01(" + _this.toX + "," + _this.toY + ")");
                player.moveStatus = true;
                callback();
                return;
            }
            _this.walk(path, callback);
        }, PLAYER_WALK_SPEED);
    };
    return WalkCommand;
}(Command));
/**
 * 拾取命令
 */
var PickCommand = /** @class */ (function (_super) {
    __extends(PickCommand, _super);
    function PickCommand(equipment) {
        var _this = _super.call(this) || this;
        _this.equipment = equipment;
        return _this;
    }
    PickCommand.prototype.execute = function (callback) {
        player.pick(this.equipment);
        console.log("\u6361\u8D77\u4E86" + this.equipment.toString());
        // map.dispatchEvent({ message: 'pickEquipment' });
        map.deleteEquipment(this.equipment);
        callback();
    };
    return PickCommand;
}(Command));
/**
 * 对话命令
 */
var TalkCommand = /** @class */ (function (_super) {
    __extends(TalkCommand, _super);
    function TalkCommand(npc) {
        var _this = _super.call(this) || this;
        _this.npc = npc;
        return _this;
    }
    TalkCommand.prototype.execute = function (callback) {
        console.log("\u5F00\u59CB\u548CNPC\uFF1A" + this.npc.toString() + "\u5BF9\u8BDD");
        player.talk(this.npc);
        var mission = null;
        if (this.npc.canAcceptMissions.length > 0) {
            mission = this.npc.canAcceptMissions[0];
        }
        if (this.npc.canSubmitMissions.length > 0) {
            mission = this.npc.canSubmitMissions[0];
        }
        if (mission) {
            var talkWindow_1 = new TalkWindow(100, 150);
            talkUIContainer.addChild(talkWindow_1);
            talkWindow_1.setMission(mission);
            talkWindow_1.setNpc(this.npc);
            talkWindow_1.addEventListener("talkWiondowClose", function () {
                talkUIContainer.deleteChild(talkWindow_1);
                if (mission) {
                    if (mission.status == MissionStatus.CAN_ACCEPT) {
                        console.log("\u63A5\u53D7\u4EFB\u52A1\uFF1A" + mission.toString());
                        missionManager.accept(mission);
                    }
                    else if (mission.status == MissionStatus.CAN_SUBMIT) {
                        console.log("\u5B8C\u6210\u4EFB\u52A1: " + mission.toString());
                        missionManager.submit(mission);
                    }
                    callback();
                }
            });
        }
        else {
            callback();
        }
    };
    return TalkCommand;
}(Command));
/**
 * 打架命令
 */
var FightCommand = /** @class */ (function (_super) {
    __extends(FightCommand, _super);
    function FightCommand(monster) {
        var _this = _super.call(this) || this;
        _this.monster = monster;
        return _this;
    }
    FightCommand.prototype.execute = function (callback) {
        console.log("\u5F00\u59CB\u6253\u67B6\uFF1A" + this.monster.toString());
        this.monster.hp -= player.attack;
        player.hp -= this.monster.attack;
        if (this.monster.hp <= 0) {
            player.fight(this.monster);
            map.deleteMonster(this.monster);
        }
        callback();
    };
    return FightCommand;
}(Command));
