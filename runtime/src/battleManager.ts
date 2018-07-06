class battleManager extends EventDispatcher {

    originHp: number;

    constructor() {
        super();
        this.originHp = player.hp;
        player.addEventListener("changeEquips", () => {
            this.originHp = player.hp;
        });

    }


    damageFlow(damage: number): number {
        let ran = Math.random();
        let val = 1;
        if (ran <= 50) {
            val = -1;
        }

        return Math.floor(damage * (1 + 2 * val * Math.random() / 10)); //伤害浮动幅度为0.8~1.2，向下取整
    }

    fightOneTime(player: User, enemy: Monster, skillType: number) {
        this.dispatchEvent('playerBattleStart', player);
        this.dispatchEvent('enemyBattleStart', enemy);
        console.log(enemy.hp + "  " + enemy.attack);

        let damage = this.playerDealDamage();
        if (skillType == 0) {
            enemy.hp -= damage;
            this.dispatchEvent('playerDealDamage', damage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.name + 'enemyDie', enemy);//通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy);//敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());
            }
        }
        if (skillType == 1) {
            return;
        }
        if (skillType == 2) {
            enemy.hp -= Math.floor(damage * 1.5);//撒币技能伤害系数为1.5
            this.dispatchEvent('playerDealDamage', damage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.name + 'enemyDie', enemy);//通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy);//敌人死亡播报
                this.dispatchEvent('enemyDrop', enemy.makeDrop());
            }
        }
        if (skillType == 3) {
            enemy.hp -= Math.floor(damage * 1.2);//菜花技能伤害系数为1.2
            this.dispatchEvent('playerDealDamage', damage);
            if (enemy.hp <= 0 && enemy != null) {
                this.dispatchEvent(enemy.name + 'enemyDie', enemy);//通过敌人精确判断收到事件的对象是否死亡
                this.dispatchEvent('thisEnemyDie', enemy);//敌人死亡播报
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


    }

    playerDealDamage(): number {
        let ran = Math.random() * 100;
        if (ran <= player._criticalPer) {
            this.dispatchEvent('criticalHit', null);
            return this.playerNormalDamage() * 2;
        }
        return this.playerNormalDamage();
    }

    playerNormalDamage(): number {

        return this.damageFlow(player._attack * (1 + player.suitAttackPer));
    }

}