class battleManager extends EventDispatcher {

    originHp: number;

    constructor() {
        super();

    }

    damageFlow(damage: number): number {
        let ran = Math.random();
        let val = 1;
        if (ran <= 50) {
            val = -1;
        }

        return Math.floor(damage * (1 + 2 * val * Math.random() / 10)); //伤害浮动幅度为0.8~1.2，向下取整
    }

    fightOneTime(player: User, enemy: Monster) {
        this.dispatchEvent('playerBattleStart', player);
        this.dispatchEvent('enemyBattleStart', enemy);
        this.originHp = player.hp;

        let damage = this.playerDealDamage();
        enemy.hp -= damage;
        this.dispatchEvent('playerDealDamage', damage);
        if (enemy.hp <= 0) {
            this.dispatchEvent('enemyDie', null);
            this.dispatchEvent('enemyDrop', enemy.makeDrop());
            player.hp = this.originHp;
        }

        damage = this.damageFlow(enemy.attack);
        player.hp -= damage;
        this.dispatchEvent('enemyDealDamage', damage);
        if (player.hp <= 0) {
            this.dispatchEvent('playerDie', null);
            player.hp = this.originHp;
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