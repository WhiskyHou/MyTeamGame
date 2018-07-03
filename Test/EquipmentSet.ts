class EquipmentSet{
    
    idSet:number[];

    buildEquip():number{
        let count=this.idSet.length;
        let ran=getRandom(0,count);
        let equipID=this.idSet[ran];
        return equipID;
    }
}

function getRandom(n,m){
    return Math.round(Math.random()*(m-n)+n);
  }

class lv1EquipSet extends EquipmentSet{
    
}

class lv2EquipSet extends EquipmentSet{
    
}

class lv3EquipSet extends EquipmentSet{
    
}

class lv4EquipSet extends EquipmentSet{
    
}

class lv5EquipSet extends EquipmentSet{
    
}

let lv1Set=new lv1EquipSet();
let lv2Set=new lv2EquipSet();
let lv3Set=new lv3EquipSet();
let lv4Set=new lv4EquipSet();
let lv5Set=new lv5EquipSet();