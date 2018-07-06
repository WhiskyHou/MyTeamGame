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
        var _this = _super.call(this) || this;
        _this.originHp = player.hp;
        player.addEventListener("changeEquips", function () {
            _this.originHp = player.hp;
        });
        return _this;
    }
    battleManager.prototype.damageFlow = function (damage) {
        var ran = Math.random();
        var val = 1;
        if (ran <= 50) {
            val = -1;
        }
        return Math.floor(damage * (1 + 2 * val * Math.random() / 10)); //伤害浮动幅度为0.8~1.2，向下取整
    };
    battleManager.prototype.fightOneTime = function (player, enemy, skillType) {
        this.dispatchEvent('playerBattleStart', player);
        this.dispatchEvent('enemyBattleStart', enemy);
        console.log(enemy.hp + "  " + enemy.attack);
        var damage = this.playerDealDamage();
        if (skillType == 0) {
            enemy.hp -= damage;
            this.dispatchEvent('playerDealDamage', damage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.name + 'enemyDie', enemy); //通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy); //敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());
            }
        }
        if (skillType == 1) {
            return;
        }
        if (skillType == 2) {
            enemy.hp -= Math.floor(damage * 1.5); //撒币技能伤害系数为1.5
            this.dispatchEvent('playerDealDamage', Math.floor(damage * 1.5));
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.name + 'enemyDie', enemy); //通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy); //敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());
                player.currentEXP += enemy.exp;
                console.log(player.currentEXP);
            }
        }
        if (skillType == 3) {
            enemy.hp -= Math.floor(damage * 0.8); //菜花技能伤害系数为0.8
            player.hp += Math.floor(damage * 0.8);
            this.dispatchEvent('playerDealDamage', Math.floor(damage * 0.8));
            this.dispatchEvent('enemyDealDamage', -Math.floor(damage * 0.8)); //吸血
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.name + 'enemyDie', enemy); //通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy); //敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());
            }
        }
        if (enemy.hp > 0) {
            damage = this.damageFlow(enemy.attack);
            player.hp -= damage;
            this.dispatchEvent('enemyDealDamage', damage);
            if (player.hp <= 0) {
                this.dispatchEvent('playerDie', null);
                player.hp = this.originHp;
            }
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
