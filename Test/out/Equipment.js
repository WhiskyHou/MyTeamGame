"use strict";
var Equipment = /** @class */ (function () {
    function Equipment(id, name, quality, posID, health, attack, criticalPer) {
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
    return Equipment;
}());
