class User {

    public name: string;
    private _originDamage = 20;
    private _originHealth = 100;

    private equipments: Equipment[] = [];
    private _attack = 0;
    private hp = 0;
    private _criticalPer = 0;

    private _suitDefensePer = 0;
    private _suitDamagePer = 0;
    private _suitCriticalPer = 0;

    public changeEquipments() {
        this.initProperty();
        for (var i = 0; i < this.equipments.length; i++) {
            this._attack += this.equipments[i].attack;
            this.hp += this.equipments[i].health;
            this._criticalPer += this.equipments[i].criticalPer;
        }
        this.checkSuit();
    }

    //TODO:套装属性检测
    private checkSuit() {
        let suitNum: number[];
        for (var i = 0; i < this.equipments.length; i++) {

        }
    }

    public dressEquip(equip: Equipment) {
        this.equipments[equip.posID] = equip;
        this.changeEquipments();
    }

    private initProperty() {
        this._attack = this._originDamage;
        this.hp = this._originHealth;
        this._criticalPer = 0;

        this._suitDefensePer = 0;
        this._suitDamagePer = 0;
        this._suitCriticalPer = 0;
    }

    public dealDamage(): number {
        let ran = Math.random() * 100;
        if (ran <= this._criticalPer) {
            return this.normalDamage() * 2;
        }
        return this.normalDamage();
    }

    private normalDamage(): number {
        return this._attack * (1 + this._suitDamagePer) * this.damageFlow();
    }

    private damageFlow(): number {
        let ran = Math.random();
        let val = 1;
        if (ran <= 50) {
            val = -1;
        }
        return (1 + 2 * val * Math.random() / 10); //伤害浮动幅度为0.8~1.2
    }

    public beDamaged(dmg: number) {
        this.hp -= dmg * (1 - this._suitDefensePer);
        if (this.hp <= 0) {
            this.die();
        }
    }

    private die() {

    }
}