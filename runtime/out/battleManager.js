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
        _this.originHp = player._hp;
        player.addEventListener("changeEquips", function () {
            _this.originHp = player._hp;
        });
        _this.attack1audio = new AudioPlay(Attack1Audio);
        _this.attack2audio = new AudioPlay(Attack2Audio);
        return _this;
    }
    battleManager.prototype.damageFlow = function (damage) {
        var ran = Math.random();
        var val = 1;
        if (ran <= 50) {
            val = -1;
        }
        var flowNum = Math.floor(damage * (1 + 2 * val * Math.random() / 10));
        return flowNum; //伤害浮动幅度为0.8~1.2，向下取整
    };
    battleManager.prototype.fightOneTime = function (player, enemy, skillType) {
        this.dispatchEvent('playerBattleStart', player);
        // this.dispatchEvent('enemyBattleStart', enemy);
        console.log(enemy.hp + "  " + enemy.attack);
        var damage = this.playerDealDamage();
        if (skillType == 0) { //普通攻击
            enemy.hp -= damage;
            this.dispatchEvent('playerDealDamage', damage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy); //通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy); //敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());
                this.expGetter(enemy);
            }
        }
        if (skillType == 1) { //空
            return;
        }
        if (skillType == 2) { //菜花宝典
            var skillDamage = Math.floor(damage * 1.2); //菜花宝典技能伤害系数为1.2
            enemy.hp -= skillDamage;
            this.dispatchEvent('playerDealDamage', skillDamage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy); //通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy); //敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());
                this.expGetter(enemy);
            }
        }
        if (skillType == 3) { //撒币大法
            var ran = Math.random() * 100;
            var skillDamage = Math.floor(this.damageFlow(player._coin * 0.3));
            player._coin -= Math.floor(0.1 * player._coin);
            if (ran <= player._criticalPer) {
                this.dispatchEvent('criticalHit', null);
                enemy.hp -= skillDamage * 2;
            }
            else {
                enemy.hp -= skillDamage;
            }
            this.dispatchEvent('playerDealDamage', skillDamage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy); //通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy); //敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());
                this.expGetter(enemy);
            }
        }
        if (skillType == 4) { //英雄不死
            var skillDamage = -Math.floor(damage * 1.2); //英雄不死技能伤害系数为1.2，为恢复技能
            player._hp -= skillDamage;
            if (player._hp > player.maxHP) {
                player._hp = player.maxHP;
                // batManager.dispatchEvent('playerHpUpdate', null);
            }
            // enemy.hp -= skillDamage;
            this.dispatchEvent('enemyDealDamage', skillDamage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy); //通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy); //敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());
                this.expGetter(enemy);
            }
        }
        if (skillType == 5) { //你过来啊
            var skillDamage = Math.floor(damage * 2); //你过来啊技能伤害系数为2
            enemy.hp -= skillDamage;
            this.dispatchEvent('playerDealDamage', skillDamage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy); //通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy); //敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());
                this.expGetter(enemy);
            }
        }
        if (skillType == 6) { //七伤拳
            var skillDamage = Math.floor(damage * 1.8); //七伤拳技能伤害系数为1.8
            enemy.hp -= skillDamage;
            player._hp -= Math.floor(damage * 0.6);
            this.dispatchEvent('enemyDealDamage', Math.floor(damage * 0.6));
            if (player._hp <= 0) {
                this.dispatchEvent('playerDie', null);
                player._hp = 1;
            }
            this.dispatchEvent('playerDealDamage', skillDamage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy); //通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy); //敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());
                this.expGetter(enemy);
            }
        }
        if (skillType == 7) { //吸星大法
            var restore = -Math.floor(damage * 0.25);
            player._hp -= restore;
            if (player._hp > player.maxHP) {
                player._hp = player.maxHP;
                batManager.dispatchEvent('playerHpUpdate', null);
            }
            var skillDamage = Math.floor(damage * 1.2); //吸星大法技能伤害系数为1.2，为恢复技能
            enemy.hp -= skillDamage;
            this.dispatchEvent('playerDealDamage', skillDamage);
            this.dispatchEvent('enemyDealDamage', restore);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy); //通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy); //敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());
                this.expGetter(enemy);
            }
        }
        if (enemy.hp > 0) {
            damage = this.damageFlow(enemy.attack);
            player._hp -= damage;
            this.dispatchEvent('enemyDealDamage', damage);
            if (player._hp <= 0) {
                this.dispatchEvent('playerDie', null);
                player._hp = 1;
            }
        }
    };
    battleManager.prototype.playerDealDamage = function () {
        var ran = Math.random() * 100;
        if (ran <= player._criticalPer) {
            this.attack2audio.play(); /////////////
            console.log("普通攻击出来的暴击！！");
            this.dispatchEvent('criticalHit', null);
            return this.damageFlow(player._attack * (1 + player.suitAttackPer)) * 2;
        }
        else {
            return this.playerNormalDamage();
        }
    };
    battleManager.prototype.playerNormalDamage = function () {
        this.attack1audio.play(); /////////////
        return this.damageFlow(player._attack * (1 + player.suitAttackPer));
    };
    battleManager.prototype.expGetter = function (enemy) {
        player._currentEXP += enemy.exp;
        console.log(player._currentEXP);
        player._coin += enemy.coin;
        player.dispatchEvent('updateUserInfo', null);
    };
    return battleManager;
}(EventDispatcher));
function fmoney(s, n) {
    /*
     * 参数说明：
     * s：要格式化的数字
     * n：保留几位小数
     * */
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}
