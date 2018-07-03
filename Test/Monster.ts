class Monster{

    hp:number;
    damage:number;
    curEquipSet:EquipmentSet;

    private damageFlow():number{
        let ran=Math.random();
        let val=1;
        if(ran<=50){
            val=-1;
        }
        return (1+ 2 * val * Math.random()/1000 ); //伤害浮动幅度为0.8~1.2
    }

    public dealDamage():number{
        return this.damage*this.damageFlow();
    }

    public beDamaged(dmg:number){
        this.hp-= dmg;
        if(this.hp<=0){
            this.die();
        }
    }

    private die(){

    }

    private equipDrop():number{
        let ran=Math.random();

        // lv5掉率5% lv4掉率10% lv3掉率20% lv2掉率25% lv1掉率40%
        if(ran>=95){
            this.curEquipSet.idSet=lv5Set.idSet;
            return this.curEquipSet.buildEquip();
        }else if(ran<95&&ran>=85){
            this.curEquipSet.idSet=lv4Set.idSet;
            return this.curEquipSet.buildEquip();
        }else if(ran<85&&ran>=65){
            this.curEquipSet.idSet=lv3Set.idSet;
            return this.curEquipSet.buildEquip();
        }else if(ran<65&&ran>=40){
            this.curEquipSet.idSet=lv2Set.idSet;
            return this.curEquipSet.buildEquip();
        }else{
            this.curEquipSet.idSet=lv1Set.idSet;
            return this.curEquipSet.buildEquip();
        }
    }

}