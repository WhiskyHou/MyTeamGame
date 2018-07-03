class Equipment {
    
    public id:number;
    public name:string;
    public quality:number;//品质ID：12345
    public posID:number;//部位ID：0武器、1头、2肩膀、3衣服、4腰带、5护腿
    public health:number;
    public attack:number;
    public criticalPer:number;

    public suitID:number;
    public suitDefensePer:number;
    public suitAttackPer:number;
    public suitCriticalPer:number;

    constructor(id:number,name:string,quality:number,posID:number,health:number,attack:number,criticalPer:number){
        this.id=id;
        this.name=name;
        this.quality=quality;
        this.posID=posID;
        this.health=health;
        this.attack=attack;
        this.criticalPer=criticalPer;
    }
}