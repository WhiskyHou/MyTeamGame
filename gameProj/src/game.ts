class Demo extends State {

    private static _instance: Demo
    public static get instance() {
        if (!this._instance) {
            this._instance = new Demo()
        }
        return this._instance;
    }

    img: Bitmap

    camera: EmptyObject

    onEnter(): void {
        Resource.load("assets/van_stand.png", "van")
        this.img = new Bitmap(0, 0, Resource.get('van') as HTMLImageElement);
        this.camera = new EmptyObject(0, 0);

        stages[0].addChild(this.img);

        let camera = this.camera.addComponent(new Camera()) as Camera;

        camera.layer = 0

        this.img.addEventListener("onClick", () => {
            console.log(111)
        })
    }

    onUpdate(): void {

    }

    onExit(): void {

    }
}


fsm.replaceState(Demo.instance);





canvas.onclick = (event: any) => {
    const globalX = event.offsetX;
    const globalY = event.offsetY;

    let hitResult = Stage.instance.mainStage.hitTest(new math.Point(globalX, globalY));
    if (hitResult) {
        hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        while (hitResult.parent) {
            hitResult = hitResult.parent;
            hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        }
    }
}

window.onkeydown = (event: any) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;

    if (keyCode === 87) {
        Demo.instance.camera.dispatchEvent("cameraMove", { dir: "UP" });
    } else if (keyCode === 83) {
        Demo.instance.camera.dispatchEvent("cameraMove", { dir: "DOWN" });
    } else if (keyCode === 65) {
        Demo.instance.camera.dispatchEvent("cameraMove", { dir: "LEFT" });
    } else if (keyCode === 68) {
        Demo.instance.camera.dispatchEvent("cameraMove", { dir: "RIGHT" });
    }
}

window.onkeyup = (event: any) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;

    if (keyCode === 87) {
        Demo.instance.camera.dispatchEvent("cameraStop", { dir: "UP" });
    } else if (keyCode === 83) {
        Demo.instance.camera.dispatchEvent("cameraStop", { dir: "DOWN" });
    } else if (keyCode === 65) {
        Demo.instance.camera.dispatchEvent("cameraStop", { dir: "LEFT" });
    } else if (keyCode === 68) {
        Demo.instance.camera.dispatchEvent("cameraStop", { dir: "RIGHT" });
    }
}