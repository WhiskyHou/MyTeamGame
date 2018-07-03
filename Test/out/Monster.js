"use strict";
var Monster = /** @class */ (function () {
    function Monster() {
    }
    Monster.prototype.damageFlow = function () {
        var ran = Math.random();
        var val = 1;
        if (ran <= 50) {
            val = -1;
        }
        return (1 + 2 * val * Math.random() / 10); //伤害浮动幅度为0.8~1.2
    };
    Monster.prototype.dealDamage = function () {
        return this.damage * this.damageFlow();
    };
    Monster.prototype.beDamaged = function (dmg) {
        this.hp -= dmg;
        if (this.hp <= 0) {
            this.die();
        }
    };
    Monster.prototype.die = function () {
    };
    Monster.prototype.equipDrop = function () {
        var ran = Math.random() * 100;
        // lv5掉率2% lv4掉率10% lv3掉率20% lv2掉率28% lv1掉率40%
        if (ran >= 98) {
            // this.curEquipSet.idSet=lv5Set.idSet;
            // return this.curEquipSet.buildEquip();
            return lv5Set.buildEquip();
        }
        else if (ran < 98 && ran >= 88) {
            // this.curEquipSet.idSet=lv4Set.idSet;
            // return this.curEquipSet.buildEquip();
            return lv4Set.buildEquip();
        }
        else if (ran < 88 && ran >= 68) {
            // this.curEquipSet.idSet=lv3Set.idSet;
            // return this.curEquipSet.buildEquip();
            return lv3Set.buildEquip();
        }
        else if (ran < 68 && ran >= 40) {
            // this.curEquipSet.idSet=lv2Set.idSet;
            // return this.curEquipSet.buildEquip();
            return lv2Set.buildEquip();
        }
        else {
            // this.curEquipSet.idSet=lv1Set.idSet;
            // return this.curEquipSet.buildEquip();
            return lv1Set.buildEquip();
        }
    };
    Monster.prototype.makeDrop = function () {
        console.log(this.equipDrop());
        console.log(this.equipDrop());
        console.log(this.equipDrop());
    };
    return Monster;
}());
