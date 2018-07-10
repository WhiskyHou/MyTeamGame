class Demo extends State {

    private static _instance: Demo
    public static get instance() {
        if (!this._instance) {
            this._instance = new Demo();
        }
        return this._instance;
    }

    text: TextField
    text2: TextField

    onEnter() {
        this.text = new TextField("TextField", 200, 100, 30);
        this.text.centered();
        Stage.instance.mainStage.addChild(this.text)

        this.text2 = new TextField("TextField", 200, 130, 30);
        Stage.instance.mainStage.addChild(this.text2)

        this.text.addEventListener("onClick", () => {
            console.log(this.text.x, this.text.y)
        })

        this.text.addEventListener("keyDown", () => {
            console.log(this.text.x, this.text.y, this.text.width);
        })
    }

    onUpdate() {

    }

    onExit() {

    }
}


fsm.replaceState(Demo.instance);


// 鼠标点击事件，捕获所有被点击到的 DisplayObject，并从叶子节点依次向上通知监听器，监听器执行
canvas.onclick = function (event) {
    const globalX = event.offsetX;
    const globalY = event.offsetY;

    let hitResult = Stage.instance.mainStage.hitTest(new math.Point(globalX, globalY));
    if (hitResult) {
        hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        while (hitResult.parent) {
            // console.log(hitResult);
            hitResult = hitResult.parent;
            hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        }
    }
}

window.onkeydown = function (ev) {
    Demo.instance.text.dispatchEvent('keyDown', {});
}