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
        anim.play(); ////
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
                anim.end(); ////
                player.moveStatus = true;
                callback();
                return;
            }
            _this.walk(path, callback);
        }, 128000 / PLAYER_WALK_SPEED);
    };
    return WalkCommand;
}(Command));
/**
 * 传送命令
 */
var PortalCommand = /** @class */ (function (_super) {
    __extends(PortalCommand, _super);
    function PortalCommand(portal) {
        var _this = _super.call(this) || this;
        _this.portal = portal;
        return _this;
    }
    PortalCommand.prototype.execute = function () {
        console.log("\u4F20\u9001\u76EE\u6807" + this.portal.toString());
    };
    return PortalCommand;
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
        var _this = this;
        console.log("\u5F00\u59CB\u548CNPC\uFF1A" + this.npc.toString() + "\u5BF9\u8BDD");
        player.talk(this.npc);
        var mission = null;
        if (this.npc.canAcceptMissions.length > 0) {
            mission = this.npc.canAcceptMissions[0];
        }
        if (this.npc.canSubmitMissions.length > 0) {
            mission = this.npc.canSubmitMissions[0];
        }
        console.log(mission);
        // console.log('任务长度' + missionManager.missions.length);
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
                    _this.npc.changeType(); //测试换类型！！！
                    callback();
                }
            });
        }
        else {
            if (this.npc.uselessTalks.length != 0) {
                var uselessTalkWindow = new UselessTalkWindow(100, 150);
                talkUIContainer.addChild(uselessTalkWindow);
                uselessTalkWindow.setNpc(this.npc);
                uselessTalkWindow.update();
                uselessTalkWindow.addEventListener("uselessTalkWiondowClose", function () {
                    talkUIContainer.deleteAll();
                });
            }
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
        _this.monster = new Monster(0, "1", 3, 4, 5, 6, 7, 8);
        _this.hasUselessTalk = false;
        _this.monster = monster;
        _this.monsterOriginHp = _this.monster.hp;
        _this.battleaudio = new AudioPlay(BattleAudio);
        _this.succeedaudio = new AudioPlay(SucceedAudio);
        _this.failaudio = new AudioPlay(FailAudio);
        _this.battleaudio.playOnlyOnce = false;
        _this.succeedaudio.playOnlyOnce = true;
        _this.failaudio.playOnlyOnce = true;
        if (monster.uselessTalks.length != 0) {
            _this.hasUselessTalk = true;
        }
        return _this;
    }
    FightCommand.prototype.execute = function (callback) {
        var _this = this;
        console.log("\u5F00\u59CB\u6253\u67B6\uFF1A" + this.monster.toString());
        if (this.hasUselessTalk) {
            var uselessTalkWindow = new UselessTalkWindow(100, 150);
            talkUIContainer.addChild(uselessTalkWindow);
            uselessTalkWindow.setMonster(this.monster);
            uselessTalkWindow.update();
            uselessTalkWindow.addEventListener("uselessTalkWiondowClose", function () {
                talkUIContainer.deleteAll();
                batteUIContainer.addChild(batUI);
                mainaudio.end();
                _this.battleaudio.play();
            });
        }
        var batUI = new battleUI(0, 0);
        var batEndLoseUI = new battleEndLoseUI(0, 0);
        batManager.dispatchEvent('enemyBattleStart', this.monster);
        if (!this.hasUselessTalk) {
            batteUIContainer.addChild(batUI);
            mainaudio.end();
            this.battleaudio.play();
        }
        batManager.addEventListener(this.monster.name + 'enemyDie', function (enemy) {
            batteUIContainer.addChild(batEndUI);
            _this.monster.changeType(); //此处测试换类型
            map.deleteMonster(_this.monster);
            _this.battleaudio.end();
            _this.succeedaudio.play();
            mainaudio.play();
        });
        batManager.addEventListener('backSceneWin', function (eventData) {
            batteUIContainer.deleteAll();
            _this.battleaudio.end();
            mainaudio.play();
        });
        batManager.addEventListener('playerDie', function (eventData) {
            _this.monster.hp = _this.monsterOriginHp;
            batteUIContainer.addChild(batEndLoseUI);
            _this.battleaudio.end();
            _this.failaudio.play();
            mainaudio.play();
        });
        batManager.addEventListener('backSceneLose', function (eventData) {
            batteUIContainer.deleteAll();
            _this.monster.hp = _this.monsterOriginHp;
            _this.battleaudio.end();
            mainaudio.play();
        });
        callback();
    };
    return FightCommand;
}(Command));
