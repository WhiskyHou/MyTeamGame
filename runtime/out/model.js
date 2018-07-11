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
        _this.diamond = 0;
        _this._originAttack = 10;
        _this._originHealth = 60;
        _this._originMp = 110;
        _this.maxHP = _this._originHealth;
        _this.maxMp = _this._originMp;
        _this.mounthedEquipment = []; //已装备的装备
        _this.packageEquipment = []; //背包中的装备
        _this.skill = [];
        _this._attack = _this._originAttack;
        _this._hp = _this._originHealth;
        _this._criticalPer = 0;
        _this._charm = 0;
        _this._mp = _this._originMp;
        _this._suitDefensePer = 0;
        _this.suitAttackPer = 0;
        _this._suitCriticalPer = 0;
        _this._needEXP = 20;
        // 以下测试用
        var eq0 = new Equipment(1, '一无是处的烂武器', 0, 0, 0, 0, 0);
        var eq1 = new Equipment(2, '一无是处的烂衣服', 0, 1, 0, 0, 0);
        var eq2 = new Equipment(3, '一无是处的烂手表', 0, 2, 0, 0, 0);
        var eq3 = new Equipment(4, '一无是处的烂裤子', 0, 3, 0, 0, 0);
        var eq4 = new Equipment(5, '一无是处的烂电话', 0, 4, 0, 0, 0);
        var eq5 = new Equipment(6, '一无是处的烂鞋子', 0, 5, 0, 0, 0);
        _this.mounthedEquipment.push(eq0);
        _this.mounthedEquipment.push(eq1);
        _this.mounthedEquipment.push(eq2);
        _this.mounthedEquipment.push(eq3);
        _this.mounthedEquipment.push(eq4);
        _this.mounthedEquipment.push(eq5);
        _this.changeEquipments();
        // this.packageEquipment.push(eq0)
        // this.packageEquipment.push(eq0)
        // this.packageEquipment.push(eq0)
        // this.packageEquipment.push(eq0)
        // this.packageEquipment.push(eq0)
        // this.packageEquipment.push(eq0)
        // this.packageEquipment.push(eq1)
        // this.packageEquipment.push(eq1)
        // this.packageEquipment.push(eq2)
        // this.packageEquipment.push(eq3)
        // this.packageEquipment.push(eq4)
        _this.skill.push(skillEmpty);
        _this.skill.push(skillEmpty);
        _this.skill.push(skillEmpty);
        _this.addEventListener('updateUserInfo', function () { return _this.calProperty(); });
        _this.head = new Bitmap(0, 0, playerHeadImg);
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
    Object.defineProperty(User.prototype, "coin", {
        get: function () {
            return this._coin;
        },
        set: function (coin) {
            this._coin = coin;
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
        if (Math.abs(targetX - player.view.x) > 5) {
            stepX = DELTA_TIME * PLAYER_WALK_SPEED;
            stepX = (targetX < player.view.x) ? -stepX : stepX;
            player.view.x += stepX;
        }
        else {
            player.view.x = targetX;
        }
        if (Math.abs(targetY - player.view.y) > 5) {
            stepY = DELTA_TIME * PLAYER_WALK_SPEED;
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
        return "[User ~ name:" + this.name + ", level:" + this.level + ", hp:" + this._hp + ", attack:" + this._attack + "]";
    };
    //---------------------------------------------------------------
    User.prototype.changeEquipments = function () {
        // let currentHp = this._hp;
        var subHP = this.maxHP - this._hp;
        this.initProperty();
        for (var i = 0; i < this.mounthedEquipment.length; i++) {
            this._attack += this.mounthedEquipment[i].attack;
            this._hp += this.mounthedEquipment[i].health;
            // currentHp += this.mounthedEquipment[i].health;
            this._criticalPer += this.mounthedEquipment[i].criticalPer;
        }
        this.maxHP = this._hp;
        this._hp -= subHP;
        // this._hp = currentHp;
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
    User.prototype.calProperty = function () {
        if (this._currentEXP >= this._needEXP) {
            this._level += 1;
            this._currentEXP = this._currentEXP - this._needEXP;
            this._needEXP = Math.floor(this._needEXP * 1.2);
            this._originHealth += 2;
            this._originAttack += 6;
            this._originMp += 10;
            this._mp = this._originMp;
            this.maxMp = this._originMp;
            this.maxHP = this._originHealth;
            this.changeEquipments();
            console.log('现在等级：' + this._level + ' 当前经验：' + this._currentEXP + " 需要经验：" + this._needEXP);
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
        this._hp = this._originHealth;
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
/**
 * 消耗品、其他、技能
 */
var Consumable = /** @class */ (function (_super) {
    __extends(Consumable, _super);
    function Consumable(id, name, posID, addHP, addMP, addCharm) {
        var _this = _super.call(this, id, name, 0, posID, 0, 0, 0) || this;
        _this.x = 0;
        _this.y = 0;
        _this.addHP = addHP;
        _this.addMP = addMP;
        _this.addCharm = addCharm;
        return _this;
    }
    Consumable.prototype.toString = function () {
        return "[Equipment ~ name:" + this.name + ", add:" + (this.addCharm + this.addHP + this.addMP) + "]";
    };
    return Consumable;
}(Equipment));
/**
 * 商品
 */
var Product = /** @class */ (function () {
    function Product(productID, equipment, price, description) {
        this.x = 0;
        this.y = 0;
        this.productID = productID;
        this.equipment = equipment;
        this.price = price;
        this.description = description;
    }
    Product.prototype.toString = function () {
        return "[Product ~ name:" + this.equipment.name + ", price:" + this.price + "]";
    };
    return Product;
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
        this.uselessTalks = [];
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
    function Monster(id, name, hp, attack, exp, coin, level, dropType) {
        var _this = _super.call(this) || this;
        _this.x = 0;
        _this.y = 0;
        _this.head = new Bitmap(0, 0, backButtonImg);
        _this.id = 0;
        _this.name = '';
        _this.dropTime = 2; //掉落次数
        _this.exp = 0;
        _this.coin = 0;
        _this.level = 0;
        _this.dropType = 0; //0默认掉落集，1初始主线小怪,2初级副本,3主线小怪2,4肥宅,5低级副本,6主线小怪3,7中级副本,8主线小怪4，9主线小怪5,10高级副本
        _this.uselessTalks = [];
        _this.id = id;
        _this.name = name;
        _this.hp = hp;
        _this.attack = attack;
        _this.exp = exp;
        _this.coin = coin;
        _this.level = level;
        _this.dropType = dropType;
        return _this;
    }
    Monster.prototype.toString = function () {
        return "[Monster ~ id:" + this.id + ", name:" + this.name + ", hp:" + this.hp + ", attack:" + this.attack + ", exp:" + this.exp + ", coin:" + this.coin + ", level:" + this.level + "]";
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
    Monster.prototype.equipDropLv1 = function () {
        var ran = Math.random() * 100;
        // lv2掉率45% lv1掉率55%
        if (ran >= 45) {
            return lv2Set.buildEquip();
        }
        else {
            return lv1Set.buildEquip();
        }
    };
    Monster.prototype.equipDropLv2 = function () {
        var ran = Math.random() * 100;
        // lv3掉率30% lv2掉率70% 
        if (ran >= 70) {
            return lv3Set.buildEquip();
        }
        else {
            return lv2Set.buildEquip();
        }
    };
    Monster.prototype.equipDropLv3 = function () {
        var ran = Math.random() * 100;
        // lv4掉率20% lv3掉率80% 
        if (ran >= 80) {
            return lv4Set.buildEquip();
        }
        else {
            return lv3Set.buildEquip();
        }
    };
    Monster.prototype.equipDropLv4 = function () {
        var ran = Math.random() * 100;
        // lv5掉率5% lv4掉率95% 
        if (ran >= 95) {
            return lv5Set.buildEquip();
        }
        else {
            return lv4Set.buildEquip();
        }
    };
    Monster.prototype.makeDrop = function () {
        var equipBox = [];
        switch (this.dropType) {
            case 0:
                for (var i = 0; i < this.dropTime; i++) {
                    equipBox.push(this.equipDrop());
                }
                return equipBox;
            case 1:
                equipBox.push(0); //掉犬牙
                return equipBox;
            case 2:
                for (var i = 0; i < this.dropTime; i++) {
                    equipBox.push(this.equipDropLv1());
                }
                return equipBox;
            case 3:
                equipBox.push(13); //掉丑男的T恤
                return equipBox;
            case 4:
                equipBox.push(3); //肥宅的游戏机
                return equipBox;
            case 5:
                for (var i = 0; i < this.dropTime; i++) {
                    equipBox.push(this.equipDropLv2());
                }
                return equipBox;
            case 6:
                equipBox.push(4); //真·肉包子
                return equipBox;
            case 7:
                for (var i = 0; i < this.dropTime; i++) {
                    equipBox.push(this.equipDropLv3());
                }
                return equipBox;
            case 8:
                equipBox.push(26); //朋克上衣
                return equipBox;
            case 9:
                equipBox.push(27); //最强跑鞋
                return equipBox;
            case 10:
                for (var i = 0; i < this.dropTime; i++) {
                    equipBox.push(this.equipDropLv4());
                }
                return equipBox;
        }
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
    function Skill(id, name, mp) {
        this.name = '[空]';
        this.id = id;
        this.name = name;
        this.mp = mp;
    }
    Skill.prototype.searchSkillByID = function (id) {
        for (var i = 0; i < skillArray.length; i++) {
            if (id == skillArray[i].id) {
                return skillArray[i];
            }
        }
    };
    return Skill;
}());
/**
 * 废话窗口
 */
var UselessTalkWindow = /** @class */ (function (_super) {
    __extends(UselessTalkWindow, _super);
    function UselessTalkWindow(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.count = 0;
        _this.isNpc = true;
        _this.view = new Bitmap(0, 0, talk_window);
        _this.text = new TextField("", 190, 100, 24);
        _this.addChild(_this.view);
        _this.addChild(_this.text);
        _this.addEventListener("onClick", function (eventData) {
            switch (_this.count % 2) {
                case 0:
                    _this.text.y = 220;
                    break;
                case 1:
                    _this.text.y = 100;
                    break;
            }
            _this.count++;
            _this.update();
        });
        return _this;
    }
    UselessTalkWindow.prototype.update = function () {
        var contents = [];
        if (this.isNpc) {
            contents = this.npc.uselessTalks;
        }
        else {
            contents = this.monster.uselessTalks;
        }
        if (this.count >= contents.length) {
            this.dispatchEvent("uselessTalkWiondowClose", null);
        }
        else {
            this.text.text = contents[this.count];
        }
    };
    UselessTalkWindow.prototype.initNpcInfo = function () {
        if (this.isNpc) {
            this.head = this.npc.head;
        }
        else {
            this.head = this.monster.head;
        }
        this.head.x = 400;
        this.head.y = 60;
        if (this.isNpc) {
            this.name = new TextField(this.npc.name, 445, 35, 20);
        }
        else {
            this.name = new TextField(this.monster.name, 445, 35, 20);
        }
        this.playerView = player.head;
        this.playerView.x = 50;
        this.playerView.y = 170;
        this.playerNameText = new TextField(player.name, 90, 140, 24);
        this.addChild(this.head);
        this.addChild(this.name);
        this.addChild(this.playerView);
        this.addChild(this.playerNameText);
    };
    UselessTalkWindow.prototype.setNpc = function (npc) {
        this.npc = npc;
        this.isNpc = true;
        this.initNpcInfo();
    };
    UselessTalkWindow.prototype.setMonster = function (monster) {
        this.monster = monster;
        this.isNpc = false;
        this.initNpcInfo();
    };
    return UselessTalkWindow;
}(DisplayObjectContainer));
