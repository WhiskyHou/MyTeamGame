class EquipmentSet{
    
    public idSet:number[]=[];

    buildEquip(){
        let count=this.idSet.length-1;
        let ran=this.getRandom(0,count);
        let equipID=this.idSet[ran];
        return equipID;
    }

    getRandom(n:number,m:number){
        return Math.round(Math.random()*(m-n)+n);
      }

    addEquipID(id:number){
        this.idSet.push(id);
    }
}



class lv1EquipSet extends EquipmentSet{
    constructor(){
        super();
    }
}

class lv2EquipSet extends EquipmentSet{
    constructor(){
        super();
    }
}

class lv3EquipSet extends EquipmentSet{
    constructor(){
        super();
    }
}

class lv4EquipSet extends EquipmentSet{
    constructor(){
        super();
    }
}

class lv5EquipSet extends EquipmentSet{
    constructor(){
        super();
    }
}

let lv1Set=new lv1EquipSet();
let lv2Set=new lv2EquipSet();
let lv3Set=new lv3EquipSet();
let lv4Set=new lv4EquipSet();
let lv5Set=new lv5EquipSet();

