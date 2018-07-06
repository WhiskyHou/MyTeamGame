class bagManager extends EventDispatcher {
    nowGroup : number = 0;//0:武器，1：防具，2：消耗品，3：其他
    nowGroupEquipment : Equipment[] = [];//当前组的装备数组
    constructor() {
        super();

    }
    openBag(){
        console.log('你打开背包');
        this.dispatchEvent('openBag', player);
    }
    bagOn(){
        console.log('你穿上了装备');
    }
    bagOff(){
        console.log('你脱下了装备');
    }
    bagDown(){
        this.dispatchEvent('bagDown', player);
        console.log('你关闭了窗口');
    }
    bagRight(){
        console.log('你点击了右键');
    }
    bagLeft(){
        console.log('你点击了左键');
    }
    bagOther(){
        console.log('你点击了其他');
    }
    bagWeapon(){
        console.log('你点击了武器');
    }
    bagArmor(){
        console.log('你点击了防具');
    }
    bagConsumable(){
        console.log('你点击了消耗品');
    }
    exportCheckedEquipment(nowGroup : number) : Equipment[] {
        this.nowGroupEquipment = []
        this.nowGroup = nowGroup;
        for(var i=0;i<player.packageEquipment.length;i++){
            if(player.packageEquipment[i].posID == this.nowGroup){
                this.nowGroupEquipment.push(player.packageEquipment[i]) 
            }
        }
        return this.nowGroupEquipment

    }
}