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
var battleManager = /** @class */ (function (_super) {
    __extends(battleManager, _super);
    function battleManager() {
        return _super.call(this) || this;
    }
    battleManager.prototype.damageFlow = function (damage) {
        var ran = Math.random();
        var val = 1;
        if (ran <= 50) {
            val = -1;
        }
        return (1 + 2 * val * Math.random() / 10); //伤害浮动幅度为0.8~1.2
    };
    battleManager.prototype.fightOneTime = function (player, enemy) {
        var damage = this.playerDealDamage();
        this.dispatchEvent('playerDealDamage', damage);
        enemy.hp -= damage;
        if (enemy.hp <= 0) {
            this.dispatchEvent('enemyDie', null);
        }
        damage = this.damageFlow(enemy.attack);
        this.dispatchEvent('enemyDealDamage', damage);
        player.hp -= damage;
        if (player.hp <= 0) {
            this.dispatchEvent('playerDie', null);
        }
    };
    battleManager.prototype.playerDealDamage = function () {
        var ran = Math.random() * 100;
        if (ran <= player._criticalPer) {
            return this.playerNormalDamage() * 2;
        }
        return this.playerNormalDamage();
    };
    battleManager.prototype.playerNormalDamage = function () {
        return this.damageFlow(player.attack * (1 + player.suitAttackPer));
    };
    return battleManager;
}(EventDispatcher));
