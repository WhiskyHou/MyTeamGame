class bagManager extends EventDispatcher {
    //nowGroup : number = 0;//0:武器，1：防具，2：消耗品，3：其他
    // nowGroupEquipmentArray: Array<Array<any>>= new Array();
    nowGroupEquipment : Equipment[] = [];//当前组的装备数组
    nowPage : number = 0;
    nowGroup : number = 0;
    nowNumber : number = -1;
    nowEquipment : Equipment;//背包里的选中装备
    nowMounthedEquipment : Equipment;//身上的选中装备

    hpmpaudio:AudioPlay;

    constructor() {
        super();
        this.hpmpaudio=new AudioPlay(HPMPAudio);
    }
    openBag(){
        console.log('你打开背包');
        this.dispatchEvent('openBag', player);
        this.bagWeapon()
    }
    bagOn(){
        console.log('你穿上了装备');
        if(this.nowNumber >-1){
            let pos = this.nowEquipment.posID
            if(pos<7){
                if(player.mounthedEquipment[pos].id != 0){//如果当前位置有装备，就先把他卸下来
                    this.nowMounthedEquipment = player.mounthedEquipment[pos]
                    this.bagOff()
                }
                player.mounthedEquipment[pos] = this.nowEquipment
                this.deletePackageEquipment(this.nowGroup,this.nowPage,this.nowNumber)
                this.changeNowEquipment(this.nowNumber)
                this.exportCheckedEquipment(false);
                this.nowNumber = -1
            }else if (pos < 8){
                let con = this.nowEquipment as Consumable
                con.use( () => {
                    console.log('zhixinglehuidiaohanshu')
                    this.hpmpaudio.play();
                    this.deletePackageEquipment(this.nowGroup,this.nowPage,this.nowNumber)
                    this.changeNowEquipment(this.nowNumber)
                    this.exportCheckedEquipment(false);
                    this.nowNumber = -1
                })
            }
            else{
                let con = this.nowEquipment as Consumable
                con.use( () => {
                    this.deletePackageEquipment(this.nowGroup,this.nowPage,this.nowNumber)
                    this.changeNowEquipment(this.nowNumber)
                    this.exportCheckedEquipment(false);
                    this.nowNumber = -1
                })
            }
            this.bagUpdate()
        }
    }
    bagOff(){
        console.log('你脱下了装备');
        if(this.nowMounthedEquipment.id != 0){
            player.packageEquipment.push(this.nowMounthedEquipment)
            this.nowMounthedEquipment = new Equipment(0, '', 0, this.nowMounthedEquipment.posID, 0, 0, 0);
            player.mounthedEquipment[this.nowMounthedEquipment.posID] = this.nowMounthedEquipment
            this.exportCheckedEquipment(false);
            this.bagUpdate()
        } 
    }
    bagDown(){
        this.dispatchEvent('bagDown', player);
        console.log('你关闭了窗口');
    }
    bagRight(){
        console.log('你点击了右键');
        this.nowGroupEquipment = []
        for(var i=0;i<player.packageEquipment.length;i++){
            if(this.posTOgroup(player.packageEquipment[i].posID) == this.nowGroup){
                this.nowGroupEquipment.push(player.packageEquipment[i]) 
            }
        }
        let MaxPage=(this.nowGroupEquipment.length/5)-1;
        console.log(MaxPage);
        if(this.nowPage< MaxPage){
            clickaudio.play();
            this.nowPage++; 
        }
        this.bagUpdate()
    }
    bagLeft(){
        console.log('你点击了左键');
        if(this.nowPage > 0){
            clickaudio.play();
            this.nowPage--; 
         }
        this.bagUpdate()
    }
    bagOther(){
        console.log('你点击了其他');
        this.nowGroup = 3;
        this.exportCheckedEquipment(true);
        this.bagUpdate()
    }
    bagWeapon(){
        console.log('你点击了武器');
        this.nowGroup = 0;
        this.exportCheckedEquipment(true);
        this.bagUpdate()
    }
    bagArmor(){
        console.log('你点击了防具');
        this.nowGroup = 1;
        this.exportCheckedEquipment(true);
        this.bagUpdate()
    }
    bagConsumable(){
        console.log('你点击了消耗品');
        this.nowGroup = 2;
        this.exportCheckedEquipment(true);
        this.bagUpdate()
    }
    exportCheckedEquipment(isUpdate : boolean) {//如果是通过点击分栏就是true，nowPage更新到1
        //准备好当前选中类别的装备
        this.nowGroupEquipment = []
        for(var i=0;i<player.packageEquipment.length;i++){
            if(this.posTOgroup(player.packageEquipment[i].posID) == this.nowGroup){
                this.nowGroupEquipment.push(player.packageEquipment[i]) 
            }
        }
        if(isUpdate){
            this.nowPage = 0;
        }
        this.nowEquipment = this.nowGroupEquipment[this.nowPage*5+this.nowNumber]
    }
    posTOgroup(pos : number): number {//posID转分栏信息
        if(pos == 0){//武器
            return 0
        }else if(pos > 0 && pos < 7){//防具
            return 1
        }else if(pos == 7){//消耗品
            return 2
        }else if(pos == 8){//其他
            return 3
        }else{
            return 4
        }
    }
    deletePackageEquipment(nowG : number,nowP : number,nowN : number){//把不是当前栏的导出，删除当前栏再导回来
        let newPackageEquipment : Array<Equipment> = []
            for(var i=0;i<player.packageEquipment.length;i++){
                if(this.posTOgroup(player.packageEquipment[i].posID) != nowG){
                    newPackageEquipment.push(player.packageEquipment[i]) 
                }
            }
            this.nowGroup = nowG
            this.exportCheckedEquipment(false)
            this.nowGroupEquipment.splice(5*nowP+nowN,1)
            for(var i=0;i<this.nowGroupEquipment.length;i++){
                newPackageEquipment.push(this.nowGroupEquipment[i]) 
            }
            player.packageEquipment = newPackageEquipment
    }
    getNowEquipment(num : number) : string{
        if(this.nowGroupEquipment[5*this.nowPage+num]){
            return this.nowGroupEquipment[5*this.nowPage+num].name
        }else{
            return ''
        }   
    }
    changeNowEquipment(num : number){
        this.nowNumber = num;
        if(this.nowGroupEquipment[5*this.nowPage+this.nowNumber]){
            this.nowEquipment = this.nowGroupEquipment[this.nowPage*5+this.nowNumber]
        }
    }
    changeNowMounthedEquipment(num : number){
        if(player.mounthedEquipment[num]){
            this.nowMounthedEquipment = player.mounthedEquipment[num]
        }
    }
    bagUpdate(){
        this.dispatchEvent('updateBag',player)
    }
}