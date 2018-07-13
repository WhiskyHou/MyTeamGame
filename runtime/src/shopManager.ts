class shopManager extends EventDispatcher {
    nowGroup : number = 0;
    nowPage : number = 0;
    nowNumber : number = -1;
    storeProduct : Array<Array<any>> = [[],[],[],[]];//储存装备的

    buyaudio:AudioPlay

    constructor() {
        super();
        this.buyaudio=new AudioPlay(BuyAudio);
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
        if(this.nowNumber>-1 && this.nowNumber < 100){

            this.buyaudio.play();

            let product = this.storeProduct[this.nowGroup][5*this.nowPage+this.nowNumber]
            let price = product.price
            let equipment = product.equipment
            player.coin -= price
            player.packageEquipment.push(equipment)
            console.log('你购买了商品');
            // this.nowNumber = -1
            this.shopUpdate()
        }
        
    }
    changeNowProduct(num : number){
        this.nowNumber = num;
        this.shopUpdate()
    }
    changeNowGroup(num : number){
        this.nowGroup = num;
        console.log('当前组',this.nowGroup);
        this.nowNumber = 100
        this.nowPage = 0
        this.shopUpdate()
    }
    shopRight(){
        console.log('你点击了右键');
        let MaxPage=(this.storeProduct[this.nowGroup].length/5)-1;
        console.log(MaxPage);
        if(this.nowPage< MaxPage){
            clickaudio.play();
            this.nowNumber = 100
            this.nowPage++; 
        }
        this.shopUpdate()
    }
    shopLeft(){
        console.log('你点击了左键');
        if(this.nowPage > 0){
            clickaudio.play();
            this.nowNumber = -1
            this.nowPage--; 
         }
        this.shopUpdate()
    }
    shopUpdate(){
        this.dispatchEvent('updateShop',this.storeProduct)
    }
    init(callback: Function) {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'config/product.json');
        xhr.send();
        xhr.onload = () => {
            const obj = JSON.parse(xhr.response)
            this.parseFromConfig(obj);
            callback();
        }
    }
    parseFromConfig(config: any) {
        let productList : Array<any> = []
        for (let item of config.product) {
            const price = parseInt(item.price);
            const productID = parseInt(item.productID);
            const equipmentID = parseInt(item.equipmentID);
            // if(this.getEquipment(equipmentID).posID<10){ }
            const equipment = this.getEquipment(equipmentID)
            const description = item.description;
            let product = new Product(productID, equipment,price,description);
            productList.push(product);
        }
        this.Equipment1TO2(productList)
    }
    Equipment1TO2(productList : Array<any>) {//[I][J] I表示第几组，J表示第几个
        //准备好当前选中类别的装备
        for(let item of productList){
            let Group = this.posTOgroup(item.equipment.posID)
            this.storeProduct[Group].push(item)
        }
        this.shopUpdate()
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
    getNowProduct(num : number) : string{
        if(shpManager.storeProduct[shpManager.nowGroup][5*shpManager.nowPage+num]){
            return shpManager.storeProduct[shpManager.nowGroup][5*shpManager.nowPage+num].equipment.name
        }else{
            return ''
        }   
    }
    getNowProductPrice() : number{
        let price = 0
        if(shpManager.storeProduct[shpManager.nowGroup][5*shpManager.nowPage+this.nowNumber]){
            price = shpManager.storeProduct[shpManager.nowGroup][5*shpManager.nowPage+this.nowNumber].price
            return price
        }else{
            return 0
        }   
        this.dispatchEvent("shopCoin",price)
    }
    getNowProductInfo(num : number) : string{
        if(shpManager.storeProduct[shpManager.nowGroup][5*shpManager.nowPage+num]){
            let product : Product;
            product = shpManager.storeProduct[shpManager.nowGroup][5*shpManager.nowPage+num]
            let nowProductInfo : string = product.description
            return nowProductInfo
        }else{
            return ""
        }   
    }
    getEquipment(equipID : number) : Equipment {
        for(let item of equipManager.equipList){
            if(equipID == item.id)
            return item
        }
        return new Equipment(0,'',0,10,0,0,0)
    }
}