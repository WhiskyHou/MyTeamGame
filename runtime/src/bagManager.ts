class bagManager extends EventDispatcher {
    //nowGroup : number = 0;//0:武器，1：防具，2：消耗品，3：其他
    //nowGroupEquipment : Equipment[] = [];//当前组的装备数组
    nowGroupEquipmentArray: Array<Array<any>> = new Array<Array<any>>();
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
        this.exportCheckedEquipment(3);
    }
    bagWeapon(){
        console.log('你点击了武器');
        this.exportCheckedEquipment(0);
    }
    bagArmor(){
        console.log('你点击了防具');
        this.exportCheckedEquipment(1);
    }
    bagConsumable(){
        console.log('你点击了消耗品');
        this.exportCheckedEquipment(2);
    }
    exportCheckedEquipment(nowGroup : number) {
        var nowGroupEquipment : Equipment[] = [];//当前组的装备数组
        // this.nowGroupEquipment = []
        //准备好当前选中类别的装备
        for(var i=0;i<player.packageEquipment.length;i++){
            if(player.packageEquipment[i].posID == nowGroup){
                nowGroupEquipment.push(player.packageEquipment[i]) 
            }
        }
        //把当前选中类别的装备分页打包
        this.nowGroupEquipmentArray = []
        var page :number = Math.ceil(nowGroupEquipment.length/5)
        for(var i=0;i<page;i++){
            for(var j=0;j<5;j++){
                if(nowGroupEquipment[j]){
                    this.nowGroupEquipmentArray[i][j] = nowGroupEquipment[j];
                }
            }
        }
    }
}