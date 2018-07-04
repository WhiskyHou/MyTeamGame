class battleManager extends EventDispatcher {

    constructor() {
        super();

    }

    damageFlow(damage: number): number {
        let ran = Math.random();
        let val = 1;
        if (ran <= 50) {
            val = -1;
        }
        return (1 + 2 * val * Math.random() / 10); //伤害浮动幅度为0.8~1.2
    }

    fightOneTime(player: User, enemy: Npc) {


        let damage = this.playerDealDamage();
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
    }

    playerDealDamage(): number {
        let ran = Math.random() * 100;
        if (ran <= player._criticalPer) {
            return this.playerNormalDamage() * 2;
        }
        return this.playerNormalDamage();
    }

    playerNormalDamage(): number {
        return this.damageFlow(player.attack * (1 + player.suitAttackPer));
    }

}