class bagManager extends EventDispatcher {
    //nowGroup : number = 0;//0:武器，1：防具，2：消耗品，3：其他
    // nowGroupEquipmentArray: Array<Array<any>>= new Array();
    nowGroupEquipment : Equipment[] = [];//当前组的装备数组
    nowPage : number = 0;
    nowEquipment : Equipment;
    constructor() {
        super();

    }
    openBag(){
        console.log('你打开背包');
        this.dispatchEvent('openBag', player);
        this.bagWeapon()
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
        this.nowPage++;
        this.bagUpdate()
    }
    bagLeft(){
        console.log('你点击了左键');
        this.nowPage--;
        this.bagUpdate()
    }
    bagOther(){
        console.log('你点击了其他');
        this.exportCheckedEquipment(3);
        this.bagUpdate()
    }
    bagWeapon(){
        console.log('你点击了武器');
        this.exportCheckedEquipment(0);
        this.bagUpdate()
    }
    bagArmor(){
        console.log('你点击了防具');
        this.exportCheckedEquipment(1);
        this.bagUpdate()
    }
    bagConsumable(){
        console.log('你点击了消耗品');
        this.exportCheckedEquipment(2);
        this.bagUpdate()
    }
    exportCheckedEquipment(nowGroup : number) {
        //准备好当前选中类别的装备
        this.nowGroupEquipment = []
        for(var i=0;i<player.packageEquipment.length;i++){
            if(player.packageEquipment[i].posID == nowGroup){
                this.nowGroupEquipment.push(player.packageEquipment[i]) 
            }
        }
        for(var i=0;i<this.nowGroupEquipment.length;i++){
            console.log(this.nowGroupEquipment[i].name)
        }
        
        // //把当前选中类别的装备分页打包
        // var page :number = Math.ceil(this.nowGroupEquipment.length/5)
        // for(var i=0;i<page;i++){
        //     this.nowGroupEquipmentArray[i] = new Array()
        //     for(var j=0;j<5;j++){
        //         if(nowGroupEquipment[j]){
        //             console.log('第',i,'页',this.nowGroupEquipment[5*i+j])
        //             this.nowGroupEquipmentArray[i][j] = nowGroupEquipment[5*i+j];
        //         }
        //     }
            
        // }
        this.nowPage = 0;
        this.nowEquipment = this.nowGroupEquipment[this.nowPage*5]
    }
    getNowEquipment(num : number) : string{
        if(this.nowGroupEquipment[5*this.nowPage+num]){
            return this.nowGroupEquipment[5*this.nowPage+num].name
        }else{
            return ''
        }   
    }
    changeNowEquipment(num : number){
        if(this.nowGroupEquipment[5*this.nowPage+num]){
            this.nowEquipment = this.nowGroupEquipment[5*this.nowPage+num]
        }
    }
    bagUpdate(){
        this.dispatchEvent('updateBag',player)
    }
}