class Monster {

    id: number;
    name: string;
    hp: number;
    damage: number;
    curEquipSet: EquipmentSet;

    constructor(id: number, name: string, hp: number, damage: number) {
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.damage = damage;

    }

    private damageFlow(): number {
        let ran = Math.random();
        let val = 1;
        if (ran <= 50) {
            val = -1;
        }
        return (1 + 2 * val * Math.random() / 10); //伤害浮动幅度为0.8~1.2
    }

    public dealDamage(): number {
        return this.damage * this.damageFlow();
    }

    public beDamaged(dmg: number) {
        this.hp -= dmg;
        if (this.hp <= 0) {
            this.die();
        }
    }

    private die() {

    }

    private equipDrop(): number {
        let ran = Math.random() * 100;

        // lv5掉率2% lv4掉率10% lv3掉率20% lv2掉率28% lv1掉率40%
        if (ran >= 98) {
            return lv5Set.buildEquip();
        } else if (ran < 98 && ran >= 88) {
            return lv4Set.buildEquip();
        } else if (ran < 88 && ran >= 68) {
            return lv3Set.buildEquip();
        } else if (ran < 68 && ran >= 40) {
            return lv2Set.buildEquip();
        } else {
            return lv1Set.buildEquip();
        }
    }

    public makeDrop() {
        console.log(this.equipDrop());
        console.log(this.equipDrop());
        console.log(this.equipDrop());
    }
}