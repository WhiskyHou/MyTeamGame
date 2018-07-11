class shopManager extends EventDispatcher {
    nowGroup : number = 0;
    nowPage : number = 0;
    nowNumber : number = 0;
    nowEquipment : Equipment;//背包里的选中装备
    storeEquipment : Array<Array<any>> = [[],[],[],[]];//储存装备的
    constructor() {
        super();
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
        this.shopUpdate()
    }
    changeNowProduct(num : number){
        this.nowNumber = num;
        if(this.storeEquipment[this.nowGroup][5*this.nowPage+this.nowNumber]){
            this.nowEquipment = this.storeEquipment[this.nowGroup][5*this.nowPage+this.nowNumber]
        }
    }
    changeNowGroup(num : number){
        this.nowGroup = num;
        console.log('当前组',this.nowGroup);
        this.nowNumber = -1
        this.nowPage = 0
        this.shopUpdate()
    }
    shopRight(){
        console.log('你点击了右键');
        let MaxPage=(this.storeEquipment[this.nowGroup].length/5)-1;
        console.log(MaxPage);
        if(this.nowPage< MaxPage){
           this.nowPage++; 
        }
        this.shopUpdate()
    }
    shopLeft(){
        console.log('你点击了左键');
        if(this.nowPage > 0){
            this.nowPage--; 
         }
        this.shopUpdate()
    }
    shopUpdate(){
        this.dispatchEvent('updateShop',this.storeEquipment)
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
            const equipment = equipManager.equipList[equipmentID]
            const descriptionPath = item.description;
            let descriptionImg = new Image();
            descriptionImg.src = descriptionPath;
            const description = new Bitmap(0, 0, descriptionImg);
            let product = new Product(productID, equipment,price,description);
            productList.push(product);
            console.log(product.toString())
        }
        this.Equipment1TO2(productList)
    }
    Equipment1TO2(productList : Array<any>) {//[I][J] I表示第几组，J表示第几个
        //准备好当前选中类别的装备
        for(let item of productList){
            let Group = this.posTOgroup(item.equipment.posID)
            this.storeEquipment[Group].push(item)
        }
        // this.nowPage = 0;
        // this.nowNumber = 0;
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
        if(shpManager.storeEquipment[shpManager.nowGroup][5*shpManager.nowPage+num]){
            return shpManager.storeEquipment[shpManager.nowGroup][5*shpManager.nowPage+num].equipment.name
        }else{
            return ''
        }   
    }
    getNowProductInfo(num : number) : Array<string>{
        if(shpManager.storeEquipment[shpManager.nowGroup][5*shpManager.nowPage+num]){
            let nowProductInfo : string [] =
            ["商品名称："+shpManager.storeEquipment[shpManager.nowGroup][5*shpManager.nowPage+num].equipment.name,
             "商品价格："+shpManager.storeEquipment[shpManager.nowGroup][5*shpManager.nowPage+num].price.toString()+'金币'
            ]
            return nowProductInfo
        }else{
            return []
        }   
    }
}