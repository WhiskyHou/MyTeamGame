class User {

    public name: string;
    private _originDamage = 20;
    private _originHealth = 100;

    private equipments: Equipment[] = [];
    private _attack = 0;
    private hp = 0;
    private _criticalPer = 0;

    private _suitDefensePer = 0;
    private suitAttackPer = 0;
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
        let suitIDSearchArray: Array<Array<any>> = new Array<Array<any>>();
        //检索是否有套装属性加成
        //遍历装备整理成一个二维数组
        let nowSuitIDNum = 1;//当前存了几个suitID,上来先把武器给存了
        suitIDSearchArray[0][nowSuitIDNum - 1] = 0;
        suitIDSearchArray[1][nowSuitIDNum - 1] = 1;
        for (var i = 1; i < this.equipments.length; i++) {
            let isStored: boolean = false;
            for (var j = 0; j < nowSuitIDNum; j++) {
                if (this.equipments[i].suitID == suitIDSearchArray[0][j]) {
                    suitIDSearchArray[1][j]++;
                    isStored = true;
                }
            }
            if (!isStored) {
                nowSuitIDNum++;
                suitIDSearchArray[0][nowSuitIDNum - 1] = this.equipments[i].suitID;
                suitIDSearchArray[1][nowSuitIDNum - 1] = 1;
            }
        }
        //判断是否有叠加属性
        for (var i = 0; i < nowSuitIDNum; i++) {
            if (suitIDSearchArray[1][i] > 2) {
                this.addSuitProperty(i);
            }
        }
    }

    private addSuitProperty(suitIDNum: number) {
        for (var i = 0; i < this.equipments.length; i++) {
            if (this.equipments[i].suitID == suitIDNum) {
                this._suitDefensePer += this.equipments[i].suitDefensePer;
                this.suitAttackPer += this.equipments[i].suitAttackPer;
                this._suitCriticalPer += this.equipments[i].suitCriticalPer;
            }
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
        this.suitAttackPer = 0;
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
        return this._attack * (1 + this.suitAttackPer) * this.damageFlow();
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