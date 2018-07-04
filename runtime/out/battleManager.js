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
        return Math.floor(damage * (1 + 2 * val * Math.random() / 10)); //伤害浮动幅度为0.8~1.2，向下取整
    };
    battleManager.prototype.fightOneTime = function (player, enemy) {
        this.dispatchEvent('playerBattleStart', player);
        this.dispatchEvent('enemyBattleStart', enemy);
        this.originHp = player.hp;
        var damage = this.playerDealDamage();
        enemy.hp -= damage;
        this.dispatchEvent('playerDealDamage', damage);
        if (enemy.hp <= 0) {
            this.dispatchEvent('enemyDie', null);
            enemy.makeDrop();
            player.hp = this.originHp;
        }
        damage = this.damageFlow(enemy.attack);
        player.hp -= damage;
        this.dispatchEvent('enemyDealDamage', damage);
        if (player.hp <= 0) {
            this.dispatchEvent('playerDie', null);
            player.hp = this.originHp;
        }
    };
    battleManager.prototype.playerDealDamage = function () {
        var ran = Math.random() * 100;
        if (ran <= player._criticalPer) {
            this.dispatchEvent('criticalHit', null);
            return this.playerNormalDamage() * 2;
        }
        return this.playerNormalDamage();
    };
    battleManager.prototype.playerNormalDamage = function () {
        return this.damageFlow(player._attack * (1 + player.suitAttackPer));
    };
    return battleManager;
}(EventDispatcher));
