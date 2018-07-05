class bagManager extends EventDispatcher {

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
}