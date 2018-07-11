class shopManager extends EventDispatcher {
    nowGroup : number = 0;
    nowPage : number = 0;
    nowNumber : number = 0;
    nowEquipment : Equipment;//背包里的选中装备
    storeEquipment : Array<Array<any>> = [];//产品二维数组
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
        // this.storeEquipment = [
        //     [   new Equipment(0,"",0,0,0,0,0),
        //         new Equipment(0,"",0,0,0,0,0),
        //     ],
        //     []
        // ]
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
    }
}