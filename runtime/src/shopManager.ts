class shopManager extends EventDispatcher {
    nowGroup : number = 0;
    nowPage : number = 0;
    nowNumber : number = 0;
    nowEquipment : Equipment;//背包里的选中装备
    storeEquipment : Array<Array<any>> = [];//产品二维数组
    constructor() {
        super();
        this.getProductList()
    }
    openShop(){
        console.log('你打开商店');
        this.dispatchEvent('openShop', player);
    }
    shopDown(){
        this.dispatchEvent('shopDown', player);
        console.log('你关闭了窗口');
    }
    shopBuy(){
        this.dispatchEvent('shopDown', player);
        console.log('你关闭了窗口');
    }
    changeNowProduct(num : number){
        // this.nowNumber = num;
        // if(this.nowGroupEquipment[5*this.nowPage+this.nowNumber]){
        //     this.nowEquipment = this.nowGroupEquipment[this.nowPage*5+this.nowNumber]
    }
    shopRight(){
        console.log('你点击了右键');
    }
    shopLeft(){
        console.log('你点击了左键');
    }
    getProductList(){
        //id,name,quality,posID,hp,attack,critical,
        this.storeEquipment = [
            [   new Equipment(0,"",0,0,0,0,0),
                new Equipment(0,"",0,0,0,0,0),
            ],
            []
        ]
    }
}