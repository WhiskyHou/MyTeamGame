class shopManager extends EventDispatcher {

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
    
    shopUpdate(){
        this.dispatchEvent('updateShop',player)
    }
}