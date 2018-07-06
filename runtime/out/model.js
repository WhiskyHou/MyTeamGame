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
var MAX_LEVEL = 20;
var MAX_HP = 140;
var MAX_ATTACK = 200;
var USER_ATTACK_PRE = 100;
/**
 * 玩家
 */
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super.call(this) || this;
        _this.moveStatus = true;
        _this.coin = 0;
        _this.diamond = 0;
        _this._originAttack = 10;
        _this._originHealth = 60;
        _this.mounthedEquipment = []; //已装备的装备
        _this.packageEquipment = []; //背包中的装备
        _this.skill = [];
        // skill: Skill[] = [];
        _this._attack = 10;
        _this.hp = 60;
        _this._criticalPer = 0;
        _this._suitDefensePer = 0;
        _this.suitAttackPer = 0;
        _this._suitCriticalPer = 0;
        // 以下测试用
        // let eq0 = new Equipment(1, '【毁天灭地】武器', 3, 0, 0, 3, 5);
        // let eq1 = new Equipment(2, '【毁天灭地】头盔', 3, 1, 3, 0, 0);
        // let eq2 = new Equipment(3, '【毁天灭地】肩甲', 3, 2, 8, 0, 0);
        // let eq3 = new Equipment(4, '【毁天灭地】衣服', 3, 3, 3, 0, 0);
        // let eq4 = new Equipment(5, '【毁天灭地】腰带', 3, 4, 3, 0, 0);
        // let eq5 = new Equipment(6, '【毁天灭地】护腿', 3, 5, 3, 0, 0);
        // this.mounthedEquipment.push(eq0);
        // this.mounthedEquipment.push(eq1);
        // this.mounthedEquipment.push(eq2);
        // this.mounthedEquipment.push(eq3);
        // this.mounthedEquipment.push(eq4);
        // this.mounthedEquipment.push(eq5);
        // this.changeEquipments();
        //以下测试技能用
        _this.skill.push(skillEmpty);
        _this.skill.push(skillSabi);
        _this.skill.push(skillCaihua);
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
    Object.defineProperty(User.prototype, "needEXP", {
        get: function () {
            return this._needEXP;
        },
        set: function (needEXP) {
            this._needEXP = needEXP;
            this.dispatchEvent('updateUserInfo', null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "currentEXP", {
        get: function () {
            return this._currentEXP;
        },
        set: function (currentEXP) {
            this._currentEXP = currentEXP;
            this.dispatchEvent('updateUserInfo', null);
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.pick = function (equipment) {
        this.packageEquipment.push(equipment);
        this.dispatchEvent('updateUserInfo', null);
        this.dispatchEvent('pickEquipment', { name: equipment.name });
        console.log('packageEquipemt', this.packageEquipment);
    };
    User.prototype.drop = function () {
    };
    User.prototype.fight = function (monster) {
        this.dispatchEvent('fightWithMonster', { name: monster.name });
    };
    User.prototype.talk = function (npc) {
        this.dispatchEvent('talkWithNpc', { name: npc.name });
    };
    // get attack(): number {
    //     let equipmentAttack = 0;
    //     for (let equipment of this.mounthedEquipment) {
    //         equipmentAttack += equipment.attack;
    //     }
    //     return this.level * USER_ATTACK_PRE + equipmentAttack;
    // }
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
        return "[User ~ name:" + this.name + ", level:" + this.level + ", hp:" + this.hp + ", attack:" + this._attack + "]";
    };
    //---------------------------------------------------------------
    User.prototype.changeEquipments = function () {
        this.initProperty();
        for (var i = 0; i < this.mounthedEquipment.length; i++) {
            this._attack += this.mounthedEquipment[i].attack;
            this.hp += this.mounthedEquipment[i].health;
            this._criticalPer += this.mounthedEquipment[i].criticalPer;
        }
        this.dispatchEvent("changeEquips", null);
        // this.checkSuit();
    };
    //TODO:套装属性检测
    User.prototype.checkSuit = function () {
        var suitIDSearchArray = new Array();
        //检索是否有套装属性加成
        //遍历装备整理成一个二维数组
        var nowSuitIDNum = 1; //当前存了几个suitID,上来先把武器给存了
        suitIDSearchArray[0][nowSuitIDNum - 1] = 0;
        suitIDSearchArray[1][nowSuitIDNum - 1] = 1;
        for (var i = 1; i < this.mounthedEquipment.length; i++) {
            var isStored = false;
            for (var j = 0; j < nowSuitIDNum; j++) {
                if (this.mounthedEquipment[i].suitID == suitIDSearchArray[0][j]) {
                    suitIDSearchArray[1][j]++;
                    isStored = true;
                }
            }
            if (!isStored) {
                nowSuitIDNum++;
                suitIDSearchArray[0][nowSuitIDNum - 1] = this.mounthedEquipment[i].suitID;
                suitIDSearchArray[1][nowSuitIDNum - 1] = 1;
            }
        }
        //判断是否有叠加属性
        for (var i = 0; i < nowSuitIDNum; i++) {
            if (suitIDSearchArray[1][i] > 2) {
                this.addSuitProperty(i);
            }
        }
    };
    User.prototype.addSuitProperty = function (suitIDNum) {
        for (var i = 0; i < this.mounthedEquipment.length; i++) {
            if (this.mounthedEquipment[i].suitID == suitIDNum) {
                this._suitDefensePer += this.mounthedEquipment[i].suitDefensePer;
                this.suitAttackPer += this.mounthedEquipment[i].suitAttackPer;
                this._suitCriticalPer += this.mounthedEquipment[i].suitCriticalPer;
            }
        }
    };
    // private _httpaaa: number
    // public get aaa(){
    //     return this._aaa;
    // }
    // public set aaa(v: number){
    //     this._aaa = v
    //     ..
    // }
    User.prototype.dressEquip = function (equip) {
        this.mounthedEquipment[equip.posID] = equip;
        this.changeEquipments();
    };
    User.prototype.initProperty = function () {
        this._attack = this._originAttack;
        this.hp = this._originHealth;
        this._criticalPer = 0;
        this._suitDefensePer = 0;
        this.suitAttackPer = 0;
        this._suitCriticalPer = 0;
    };
    User.prototype.die = function () {
    };
    return User;
}(EventDispatcher));
/**
 * 装备
 */
var Equipment = /** @class */ (function () {
    function Equipment(id, name, quality, posID, health, attack, criticalPer) {
        this.x = 0;
        this.y = 0;
        this.id = id;
        this.name = name;
        this.quality = quality;
        this.posID = posID;
        this.health = health;
        this.attack = attack;
        this.criticalPer = criticalPer;
        //, suitID: number, suitDefensePer: number, suitAttackPer: number, suitCriticalPer: number
        // this.suitID = suitID;
        // this.suitDefensePer = suitDefensePer;
        // this.suitAttackPer = suitAttackPer;
        // this.suitCriticalPer = suitCriticalPer;
    }
    Equipment.prototype.toString = function () {
        return "[Equipment ~ name:" + this.name + ", attack:" + this.attack + "]";
    };
    return Equipment;
}());
// class Skill {
//     x: number = 0;
//     y: number = 0;
//     view: Bitmap
//     public id: number;
//     public name: string;
//     public addattack: number;
//     constructor(id: number, name: string, addattack: number) {
//         this.id = id;
//         this.name = name;
//         this.addattack = addattack;
//     }
//     toString() {
//         return `[Equipment ~ name:${this.name}, attack:${this.addattack}]`;
//     }
// }
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
        this.id = 0;
        this.name = '';
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
        return "[NPC ~ id:" + this.id + ", name:" + this.name + "]";
    };
    return Npc;
}());
/**
 * 怪物
 */
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    function Monster(id, name, hp, attack, exp) {
        var _this = _super.call(this) || this;
        _this.x = 0;
        _this.y = 0;
        _this.id = 0;
        _this.name = '';
        _this.dropTime = 3; //掉落次数
        _this.exp = 0;
        _this.id = id;
        _this.name = name;
        _this.hp = hp;
        _this.attack = attack;
        _this.exp = exp;
        return _this;
    }
    Monster.prototype.toString = function () {
        return "[Monster ~ id:" + this.id + ", name:" + this.name + ", hp:" + this.hp + ", attack:" + this.attack + ", exp:" + this.exp + "]";
    };
    Monster.prototype.die = function () {
    };
    Monster.prototype.equipDrop = function () {
        var ran = Math.random() * 100;
        // lv5掉率2% lv4掉率10% lv3掉率20% lv2掉率28% lv1掉率40%
        if (ran >= 98) {
            return lv5Set.buildEquip();
        }
        else if (ran < 98 && ran >= 88) {
            return lv4Set.buildEquip();
        }
        else if (ran < 88 && ran >= 68) {
            return lv3Set.buildEquip();
        }
        else if (ran < 68 && ran >= 40) {
            return lv2Set.buildEquip();
        }
        else {
            return lv1Set.buildEquip();
        }
    };
    Monster.prototype.makeDrop = function () {
        var equipBox = [];
        for (var i = 0; i < this.dropTime; i++) {
            equipBox.push(this.equipDrop());
        }
        return equipBox;
    };
    return Monster;
}(EventDispatcher));
/**
 * 装备集（用于掉落）
 */
var EquipmentSet = /** @class */ (function () {
    function EquipmentSet() {
        this.idSet = [];
    }
    EquipmentSet.prototype.buildEquip = function () {
        var count = this.idSet.length - 1;
        var ran = this.getRandom(0, count);
        var equipID = this.idSet[ran];
        for (var i = 0; i < equipManager.equipList.length; i++) {
            if (equipManager.equipList[i].id == equipID) {
                console.log(equipManager.equipList[i].name);
            }
        }
        return equipID;
    };
    EquipmentSet.prototype.getRandom = function (n, m) {
        return Math.round(Math.random() * (m - n) + n);
    };
    EquipmentSet.prototype.addEquipID = function (id) {
        this.idSet.push(id);
    };
    return EquipmentSet;
}());
var lv1EquipSet = /** @class */ (function (_super) {
    __extends(lv1EquipSet, _super);
    function lv1EquipSet() {
        return _super.call(this) || this;
    }
    return lv1EquipSet;
}(EquipmentSet));
var lv2EquipSet = /** @class */ (function (_super) {
    __extends(lv2EquipSet, _super);
    function lv2EquipSet() {
        return _super.call(this) || this;
    }
    return lv2EquipSet;
}(EquipmentSet));
var lv3EquipSet = /** @class */ (function (_super) {
    __extends(lv3EquipSet, _super);
    function lv3EquipSet() {
        return _super.call(this) || this;
    }
    return lv3EquipSet;
}(EquipmentSet));
var lv4EquipSet = /** @class */ (function (_super) {
    __extends(lv4EquipSet, _super);
    function lv4EquipSet() {
        return _super.call(this) || this;
    }
    return lv4EquipSet;
}(EquipmentSet));
var lv5EquipSet = /** @class */ (function (_super) {
    __extends(lv5EquipSet, _super);
    function lv5EquipSet() {
        return _super.call(this) || this;
    }
    return lv5EquipSet;
}(EquipmentSet));
var lv1Set = new lv1EquipSet();
var lv2Set = new lv2EquipSet();
var lv3Set = new lv3EquipSet();
var lv4Set = new lv4EquipSet();
var lv5Set = new lv5EquipSet();
function equipSetInit(equipManager) {
    for (var i = 0; i < equipManager.equipList.length; i++) {
        switch (equipManager.equipList[i].quality) {
            case 1:
                lv1Set.addEquipID(equipManager.equipList[i].id);
                break;
            case 2:
                lv2Set.addEquipID(equipManager.equipList[i].id);
                break;
            case 3:
                lv3Set.addEquipID(equipManager.equipList[i].id);
                break;
            case 4:
                lv4Set.addEquipID(equipManager.equipList[i].id);
                break;
            case 5:
                lv5Set.addEquipID(equipManager.equipList[i].id);
                break;
        }
    }
}
/**
 * 技能
 */
var Skill = /** @class */ (function () {
    function Skill(id, name) {
        this.id = id;
        this.name = name;
    }
    return Skill;
}());
