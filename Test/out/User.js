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
        this._suitDamagePer = 0;
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
        var suitNum;
        for (var i = 0; i < this.equipments.length; i++) {
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
        this._suitDamagePer = 0;
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
        return this._attack * (1 + this._suitDamagePer) * this.damageFlow();
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
