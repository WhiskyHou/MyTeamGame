class Demo extends State {
    onEnter(): void {
        Resource.load("assets/van_stand.png", "van")
        const img = new Bitmap(0, 0, Resource.get('van') as HTMLImageElement);

        stage.addChild(img);

    }

    onUpdate(): void {

    }

    onExit(): void {

    }
}


fsm.replaceState(new Demo());





canvas.onclick = (event: any) => {
    const globalX = event.offsetX;
    const globalY = event.offsetY;

    let hitResult = stage.hitTest(new math.Point(globalX, globalY));
    if (hitResult) {
        hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        while (hitResult.parent) {
            hitResult = hitResult.parent;
            hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        }
    }
}

window.onkeypress = (event: any) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;

    if (keyCode === 87) {

    } else if (keyCode === 83) {

    } else if (keyCode === 65) {

    } else if (keyCode === 68) {

    }
}