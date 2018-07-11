/**
 * 
 */
class PlayerAnimTest extends Behaviour {

    anim: Animator

    onStart(): void {
        this.anim = new Animator(0, 0, Resource.get('dust') as HTMLImageElement, 128, 5, 0.2);
        (this.gameObject as DisplayObjectContainer).addChild(this.anim)
        this.anim.isLooping = true
    }
    onUpdate(delta: number): void {
        this.anim.update(delta);
    }
    onDestory(): void {

    }

    play() {
        this.anim.play()
    }
}


/**
 * 创建角色时的按钮
 */
class CreatePlayerButtonScript extends Behaviour {

    canAssignPoint: number = 5

    bigTag = true;

    onStart(): void {

    }

    onUpdate(delta: number): void {
        if (this.canAssignPoint == 0) {
            this.heartBeatEffect(delta);
        } else {
            const startButton = this.gameObject as Bitmap
            startButton.scaleX = 1;
            startButton.scaleY = 1;
            startButton.x = 350;
            startButton.y = 430;
        }
    }

    onDestory(): void {

    }

    heartBeatEffect(delta: number) {
        const bmp = this.gameObject as Bitmap
        if (this.bigTag) {
            bmp.scaleX += delta * 4;
            bmp.scaleY += delta * 4;
            bmp.x -= 5;
            bmp.y -= 3;
        } else {
            bmp.scaleX -= delta * 4;
            bmp.scaleY -= delta * 4;
            bmp.x += 5;
            bmp.y += 3;
        }
        if (bmp.scaleX > 1.5 || bmp.scaleY > 1.5) {
            this.bigTag = false;
        }
        if (bmp.scaleX < 1 || bmp.scaleY < 1) {
            this.bigTag = true;
        }

    }
}