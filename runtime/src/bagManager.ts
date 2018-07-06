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
    bagDown(){
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
}