class battleManager extends EventDispatcher {

    originHp: number;

    attack1audio: AudioPlay;
    attack2audio: AudioPlay;

    constructor() {
        super();
        this.originHp = player._hp;
        player.addEventListener("changeEquips", () => {
            this.originHp = player._hp;
        });

        this.attack1audio = new AudioPlay(Attack1Audio)
        this.attack2audio = new AudioPlay(Attack2Audio)
    }


    damageFlow(damage: number): number {
        let ran = Math.random();
        let val = 1;
        if (ran <= 50) {
            val = -1;
        }

        let flowNum = Math.floor(damage * (1 + 2 * val * Math.random() / 10))
        return flowNum; //伤害浮动幅度为0.8~1.2，向下取整
    }

    fightOneTime(player: User, enemy: Monster, skillType: number) {
        this.dispatchEvent('playerBattleStart', player);
        // this.dispatchEvent('enemyBattleStart', enemy);
        console.log(enemy.hp + "  " + enemy.attack);

        let damage = this.playerDealDamage();
        if (skillType == 0) {//普通攻击
            enemy.hp -= damage;
            this.dispatchEvent('playerDealDamage', damage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy);//通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy);//敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());
                this.expGetter(enemy);
            }
        }
        if (skillType == 1) {//空
            return;
        }
        if (skillType == 2) {//菜花宝典
            let skillDamage = Math.floor(damage * 1.2);//菜花宝典技能伤害系数为1.2
            enemy.hp -= skillDamage;
            this.dispatchEvent('playerDealDamage', skillDamage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy);//通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy);//敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());

                this.expGetter(enemy);
            }
        }
        if (skillType == 3) {//撒币大法
            let ran = Math.random() * 100;
            let skillDamage = Math.floor(this.damageFlow(player._coin * 0.3));
            player._coin -= Math.floor(0.1 * player._coin);
            if (ran <= player._criticalPer) {
                this.dispatchEvent('criticalHit', null);
                enemy.hp -= skillDamage * 2;
            } else {
                enemy.hp -= skillDamage;
            }

            this.dispatchEvent('playerDealDamage', skillDamage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy);//通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy);//敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());

                this.expGetter(enemy);
            }
        }
        if (skillType == 4) {//英雄不死
            let skillDamage = -Math.floor(damage * 1.2);//英雄不死技能伤害系数为1.2，为恢复技能
            player._hp -= skillDamage;
            if (player._hp > player.maxHP) {
                player._hp = player.maxHP;
                // batManager.dispatchEvent('playerHpUpdate', null);
            }
            // enemy.hp -= skillDamage;
            this.dispatchEvent('enemyDealDamage', skillDamage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy);//通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy);//敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());

                this.expGetter(enemy);
            }
        }
        if (skillType == 5) {//你过来啊
            let skillDamage = Math.floor(damage * 2);//你过来啊技能伤害系数为2
            enemy.hp -= skillDamage;
            this.dispatchEvent('playerDealDamage', skillDamage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy);//通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy);//敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());

                this.expGetter(enemy);
            }
        }
        if (skillType == 6) {//七伤拳
            let skillDamage = Math.floor(damage * 1.8);//七伤拳技能伤害系数为1.8
            enemy.hp -= skillDamage;

            player._hp -= Math.floor(damage * 0.6);
            this.dispatchEvent('enemyDealDamage', Math.floor(damage * 0.6));
            if (player._hp <= 0) {
                this.dispatchEvent('playerDie', null);
                player._hp = 1;
            }

            this.dispatchEvent('playerDealDamage', skillDamage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy);//通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy);//敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());

                this.expGetter(enemy);
            }
        }
        if (skillType == 7) {//吸星大法
            let restore = -Math.floor(damage * 0.25);
            player._hp -= restore;
            if (player._hp > player.maxHP) {
                player._hp = player.maxHP;
                batManager.dispatchEvent('playerHpUpdate', null);
            }
            let skillDamage = Math.floor(damage * 1.2);//吸星大法技能伤害系数为1.2，为恢复技能
            enemy.hp -= skillDamage;
            this.dispatchEvent('playerDealDamage', skillDamage);
            this.dispatchEvent('enemyDealDamage', restore);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.id + 'enemyDie', enemy);//通过敌人精确判断收到事件的对象是否死亡

                this.dispatchEvent('thisEnemyDie', enemy);//敌人死亡播报
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
    }

    playerDealDamage(): number {
        let ran = Math.random() * 100;
        if (ran <= player._criticalPer) {
            this.attack2audio.play();/////////////
            console.log("普通攻击出来的暴击！！");
            this.dispatchEvent('criticalHit', null);
            return this.damageFlow(player._attack * (1 + player.suitAttackPer)) * 2;
        }
        else {
            return this.playerNormalDamage();
        }
    }

    playerNormalDamage(): number {
        this.attack1audio.play();/////////////
        return this.damageFlow(player._attack * (1 + player.suitAttackPer));
    }

    expGetter(enemy: Monster) {
        player._currentEXP += enemy.exp;
        console.log(player._currentEXP);
        player._coin += enemy.coin;
        player.dispatchEvent('updateUserInfo', null);
    }

}

function fmoney(s: string, n: number) {
    /*
     * 参数说明：
     * s：要格式化的数字
     * n：保留几位小数
     * */
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}