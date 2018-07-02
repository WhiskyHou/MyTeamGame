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
var MAX_LEVEL = 99;
var MAX_HP = 140;
var MAX_ATTACK = 200;
var USER_ATTACK_PRE = 100;
/**
 * 玩家
 */
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moveStatus = true;
        _this.name = '';
        _this.hp = 10;
        _this.mounthedEquipment = [];
        _this.packageEquipment = [];
        return _this;
    }
    Object.defineProperty(User.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (level) {
            this._level = level;
            this.dispatchEvent('updateUserInfo', null);
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.pick = function (equipment) {
        this.mounthedEquipment.push(equipment);
        this.dispatchEvent('updateUserInfo', null);
        this.dispatchEvent('pickEquipment', { name: equipment.name });
    };
    User.prototype.drop = function () {
    };
    User.prototype.fight = function (monster) {
        this.dispatchEvent('fightWithMonster', { name: monster.name });
    };
    User.prototype.talk = function (npc) {
        this.dispatchEvent('talkWithNpc', { name: npc.name });
    };
    Object.defineProperty(User.prototype, "attack", {
        get: function () {
            var equipmentAttack = 0;
            for (var _i = 0, _a = this.mounthedEquipment; _i < _a.length; _i++) {
                var equipment = _a[_i];
                equipmentAttack += equipment.attack;
            }
            return this.level * USER_ATTACK_PRE + equipmentAttack;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.changeGridPos = function (row, col) {
        this.x = row;
        this.y = col;
    };
    User.prototype.moveSmooth = function () {
        // 角色每帧移动
        var targetX = player.x * TILE_SIZE;
        var targetY = player.y * TILE_SIZE;
        if (player.view.x == targetX && player.view.y == targetY) {
            return;
        }
        var stepX = 0;
        var stepY = 0;
        if (Math.abs(targetX - player.view.x) > 2) {
            stepX = TILE_SIZE * INTERVAL / PLAYER_WALK_SPEED;
            stepX = (targetX < player.view.x) ? -stepX : stepX;
            player.view.x += stepX;
        }
        else {
            player.view.x = targetX;
        }
        if (Math.abs(targetY - player.view.y) > 2) {
            stepY = TILE_SIZE * INTERVAL / PLAYER_WALK_SPEED;
            stepY = (targetY < player.view.y) ? -stepY : stepY;
            player.view.y += stepY;
        }
        else {
            player.view.y = targetY;
        }
    };
    User.prototype.levelUp = function () {
        this.level += 1;
    };
    User.prototype.levelDown = function () {
        this.level -= 1;
    };
    User.prototype.update = function () {
        this.moveSmooth();
    };
    User.prototype.toString = function () {
        return "[User ~ name:" + this.name + ", level:" + this.level + ", hp:" + this.hp + ", attack:" + this.attack + "]";
    };
    return User;
}(EventDispatcher));
/**
 * 装备
 */
var Equipment = /** @class */ (function () {
    function Equipment() {
        this.x = 0;
        this.y = 0;
        this.name = '';
        this.attack = 10;
    }
    Equipment.prototype.toString = function () {
        return "[Equipment ~ name:" + this.name + ", attack:" + this.attack + "]";
    };
    return Equipment;
}());
/**
 * 任务
 */
var MissionStatus;
(function (MissionStatus) {
    MissionStatus[MissionStatus["UNACCEPT"] = 0] = "UNACCEPT";
    MissionStatus[MissionStatus["CAN_ACCEPT"] = 1] = "CAN_ACCEPT";
    MissionStatus[MissionStatus["DURRING"] = 2] = "DURRING";
    MissionStatus[MissionStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    MissionStatus[MissionStatus["FINISH"] = 4] = "FINISH";
})(MissionStatus || (MissionStatus = {}));
var Mission = /** @class */ (function () {
    function Mission(type, going, reward) {
        this.id = 0;
        this.name = '';
        this.needLevel = 0;
        this.fromNpcId = 0;
        this.toNpcId = 0;
        this.isAccepted = false;
        this.isSubmit = false;
        this.isReward = false;
        this.canAcceptContent = [];
        this.canSubmitContent = [];
        this.current = 0;
        this.total = 1;
        this.status = MissionStatus.UNACCEPT;
        this.going = going;
        this.reward = reward;
        player.addEventListener(type, this.going);
    }
    Mission.prototype.update = function () {
        var nextStatus = MissionStatus.UNACCEPT;
        if (this.isSubmit) {
            if (!this.isReward) {
                this.reward();
                this.isReward = true;
            }
            nextStatus = MissionStatus.FINISH;
        }
        else if (this.isAccepted) {
            if (this.current >= this.total) {
                nextStatus = MissionStatus.CAN_SUBMIT;
            }
            else {
                nextStatus = MissionStatus.DURRING;
            }
        }
        else {
            if (player.level >= this.needLevel) {
                nextStatus = MissionStatus.CAN_ACCEPT;
            }
        }
        if (nextStatus != this.status) {
            this.status = nextStatus;
            return true;
        }
        else {
            return false;
        }
    };
    Mission.prototype.toString = function () {
        return "[Mission ~ id:" + this.id + ", name:" + this.name + "]";
    };
    return Mission;
}());
/**
 * NPC
 */
var Npc = /** @class */ (function () {
    function Npc(id, name) {
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.name = '';
        this.id = 0;
        this.canAcceptMissions = [];
        this.canSubmitMissions = [];
        this.id = id;
        this.name = name;
        missionManager.addEventListener('missionUpdate', function (eventData) {
            _this.update();
        });
    }
    Npc.prototype.update = function () {
        this.canAcceptMissions = [];
        this.canSubmitMissions = [];
        for (var _i = 0, _a = missionManager.missions; _i < _a.length; _i++) {
            var mission = _a[_i];
            if (mission.status == MissionStatus.CAN_ACCEPT && mission.fromNpcId == this.id) {
                this.canAcceptMissions.push(mission);
            }
            if (mission.status == MissionStatus.CAN_SUBMIT && mission.toNpcId == this.id) {
                this.canSubmitMissions.push(mission);
            }
        }
    };
    Npc.prototype.toString = function () {
        return "[NPC ~ id:" + this.id + "]";
    };
    return Npc;
}());
/**
 * 怪物
 */
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 0;
        _this.y = 0;
        _this.id = 0;
        _this.name = '';
        _this.hp = 100;
        _this.attack = 100;
        return _this;
    }
    Monster.prototype.toString = function () {
        return "[Monster ~ id:" + this.id + ", name:" + this.name + ", hp:" + this.hp + ", attack:" + this.attack + "]";
    };
    return Monster;
}(EventDispatcher));
