"use strict";
var User = /** @class */ (function () {
    function User() {
        this._originDamage = 20;
        this._originHealth = 100;
        this.equipments = [];
        this._attack = 0;
        this.hp = 0;
        this._criticalPer = 0;
        this._suitDefensePer = 0;
        this.suitAttackPer = 0;
        this._suitCriticalPer = 0;
    }
    User.prototype.changeEquipments = function () {
        this.initProperty();
        for (var i = 0; i < this.equipments.length; i++) {
            this._attack += this.equipments[i].attack;
            this.hp += this.equipments[i].health;
            this._criticalPer += this.equipments[i].criticalPer;
        }
        this.checkSuit();
    };
    //TODO:套装属性检测
    User.prototype.checkSuit = function () {
        var suitIDSearchArray = new Array();
        //检索是否有套装属性加成
        //遍历装备整理成一个二维数组
        var nowSuitIDNum = 1; //当前存了几个suitID,上来先把武器给存了
        suitIDSearchArray[0][nowSuitIDNum - 1] = 0;
        suitIDSearchArray[1][nowSuitIDNum - 1] = 1;
        for (var i = 1; i < this.equipments.length; i++) {
            var isStored = false;
            for (var j = 0; j < nowSuitIDNum; j++) {
                if (this.equipments[i].suitID == suitIDSearchArray[0][j]) {
                    suitIDSearchArray[1][j]++;
                    isStored = true;
                }
            }
            if (!isStored) {
                nowSuitIDNum++;
                suitIDSearchArray[0][nowSuitIDNum - 1] = this.equipments[i].suitID;
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
        for (var i = 0; i < this.equipments.length; i++) {
            if (this.equipments[i].suitID == suitIDNum) {
                this._suitDefensePer += this.equipments[i].suitDefensePer;
                this.suitAttackPer += this.equipments[i].suitAttackPer;
                this._suitCriticalPer += this.equipments[i].suitCriticalPer;
            }
        }
    };
    User.prototype.dressEquip = function (equip) {
        this.equipments[equip.posID] = equip;
        this.changeEquipments();
    };
    User.prototype.initProperty = function () {
        this._attack = this._originDamage;
        this.hp = this._originHealth;
        this._criticalPer = 0;
        this._suitDefensePer = 0;
        this.suitAttackPer = 0;
        this._suitCriticalPer = 0;
    };
    User.prototype.dealDamage = function () {
        var ran = Math.random() * 100;
        if (ran <= this._criticalPer) {
            return this.normalDamage() * 2;
        }
        return this.normalDamage();
    };
    User.prototype.normalDamage = function () {
        return this._attack * (1 + this.suitAttackPer) * this.damageFlow();
    };
    User.prototype.damageFlow = function () {
        var ran = Math.random();
        var val = 1;
        if (ran <= 50) {
            val = -1;
        }
        return (1 + 2 * val * Math.random() / 10); //伤害浮动幅度为0.8~1.2
    };
    User.prototype.beDamaged = function (dmg) {
        this.hp -= dmg * (1 - this._suitDefensePer);
        if (this.hp <= 0) {
            this.die();
        }
    };
    User.prototype.die = function () {
    };
    return User;
}());
