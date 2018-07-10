
/**
 * 状态
 * 
 * 具体状态派生类需要实现 onEnter() onUpdate() onExit()
 */
abstract class State {
    abstract onEnter(): void;
    abstract onUpdate(): void;
    abstract onExit(): void;
}


/**
 * 状态机
 * 
 * replaceState(state: State)   切换当前状态为state，原状态退出
 * update()                     让当前状态执行onUpdate操作
 */
class StateMachine {
    private currentState: State | null = null;

    replaceState(state: State) {
        if (this.currentState) {
            this.currentState.onExit();
        }

        this.currentState = state;
        this.currentState.onEnter();

    }

    update() {
        if (this.currentState) {
            this.currentState.onUpdate();
        }
    }

    getCurrentState() {
        return this.currentState;
    }
}


/**
 * 资源管理
 */
class Resource {

    static resource: { [index: string]: HTMLElement } = {}

    static load(path: string, key: string) {
        const obj = new Image();
        obj.src = path;
        this.resource[key] = obj;
    }

    static get(key: string) {
        return this.resource[key];
    }
}


/**
 * 事件处理
 * 
 * listeners: Function[]                    函数数组，储存事件触发后的回调函数
 * 
 * dispatchEvent()                          执行每个回调函数
 * addEventListener(callback: Function)   接受一个回调函数，并添加到函数数组
 */
class EventDispatcher {
    private listeners: { type: string, callback: Function }[] = [];

    dispatchEvent(type: string, eventData: any) {
        for (let listener of this.listeners) {
            if (listener.type == type) {
                listener.callback(eventData);
            }
        }
    }

    addEventListener(type: string, callback: Function) {
        this.listeners.push({ type, callback });
    }

    deleteEventListener(type: string, callback: Function) {
        for (let listener of this.listeners) {
            if (listener.type == type && listener.callback == callback) {
                const index = this.listeners.indexOf(listener)
                this.listeners.splice(index, 1)
                break;
            }
        }
    }

    deleteAllEventListener() {
        if (this.listeners.length > 0) {
            this.listeners.splice(0);
        }
    }
}


/**
 * 命令
 */
abstract class Command {
    abstract execute(callback: Function): void;
}



/**
 * 命令池
 */
class CommandPool {
    list: Command[] = [];

    addCommand(command: Command) {
        this.list.push(command);
    }

    execute() {
        // 取出第一个命令，执行，并且给一个回调函数onFinish，这个函数的内容是让命令池等1ms后去执行下一个命令
        const self = this;

        let command = this.list.shift();
        if (command) {
            command.execute(onFinish);
        }

        function onFinish() {
            setTimeout(function () {
                self.execute();
            }, 1);
        }
    }
}

abstract class Behaviour {

    abstract onStart(): void;

    abstract onUpdate(delta: number): void;

    abstract onDestory(): void;

}

interface ComponentSystem {

    addComponent(instance: Behaviour): Behaviour;
    removeComponent(): void;
}

/**
 * 组件池
 */
class ComponentPool {

    private static _instance: ComponentPool
    public static get instance() {
        if (!this._instance) {
            this._instance = new ComponentPool();
        }
        return this._instance;
    }

    private components: Behaviour[] = []

    addComponent(value: Behaviour) {
        this.components.push(value)
    }

    update() {
        for (let component of this.components) {
            component.onUpdate(DELTA_TIME)
        }
    }
}



/**
 * 相机
 */
class Camera extends Behaviour {

    moveSpeed: number = 150

    onStart(): void {

    }

    onUpdate(): void {

    }

    onDestory(): void {

    }
}


/**
 * 显示对象
 * —— 所有可以渲染的对象的基类
 * 
 * 继承 EventDispatcher，可以给每个渲染对象添加事件处理
 * 
 * localInfo
 *      x, y                 锚点相对 父容器锚点 的位置
 *      scaleX, scaleY       xy上的缩放比例
 *      rotation             以锚点为中心旋转的角度
 * 
 * 根据上面信息构建局部矩阵
 *      localMatrix          相对于 父容器锚点 的变换矩阵，
 * 
 * 
 */
abstract class DisplayObject extends EventDispatcher implements ComponentSystem {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotation: number;

    localMatrix: math.Matrix;
    globalMatrix: math.Matrix;

    parent: DisplayObjectContainer | null;

    visible: boolean;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.scaleX = this.scaleY = 1;
        this.rotation = 0;
        this.localMatrix = new math.Matrix();
        this.globalMatrix = new math.Matrix();
        this.parent = null;
        this.visible = true;
    }

    addComponent(instance: Behaviour) {
        ComponentPool.instance.addComponent(instance)
        return instance;
    }

    removeComponent() {

    }

    draw(context: CanvasRenderingContext2D) {
        if (!this.visible)
            return;

        // 根据 local属性 算出 localMatirx
        this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        // 获得父容器的 globalMatrix，如果父容器是浏览器窗口，也就是树的根，赋值为单位矩阵
        const parentGlobalMatrix = this.parent ? this.parent.globalMatrix : new math.Matrix();
        // localMatrix x乘 父容器的globalMatrix，获得本对象的 globalMatrix
        const globalMatrix = math.matrixAppendMatrix(this.localMatrix, parentGlobalMatrix);
        this.globalMatrix = globalMatrix;
        // 将上下文关系进行 该对象的 globalMatrix 矩阵变换，就是从大窗口原点移动画笔 到绘制该对象的地方
        context.setTransform(globalMatrix.a, globalMatrix.b, globalMatrix.c, globalMatrix.d, globalMatrix.tx, globalMatrix.ty);


        this.render(context);
    }

    hitTest(point: math.Point): DisplayObject | null {
        return null;
    }

    abstract render(context: CanvasRenderingContext2D): void;
}


/**
 * 节点容器
 * 
 * 继承 DisplayObject，专门用来作为渲染树的根节点，下挂其他节点
 */
class DisplayObjectContainer extends DisplayObject {
    children: DisplayObject[] = [];

    addChild(child: DisplayObject) {
        this.children.push(child);
        child.parent = this;
    }

    deleteChild(child: DisplayObject) {
        const index = this.children.indexOf(child);
        if (index != -1)
            this.children.splice(index, 1);
    }

    deleteAll() {
        while (true) {
            if (0 == this.children.length) {
                break;
            }
            this.children.splice(0);
        }
    }

    // 接收一个全局的点坐标，返回这个点相对于此容器的点坐标
    getLocalPos(point: math.Point): math.Point {
        if (!this.parent) {
            return point;
        }
        var fatherPos: math.Point = this.parent.getLocalPos(point);
        var invertLocalMatrix = math.invertMatrix(this.localMatrix);
        var pointRelativeMe = math.pointAppendMatrix(fatherPos, invertLocalMatrix);

        return pointRelativeMe;
    }

    render(context: CanvasRenderingContext2D) {
        const renderList = this.children;
        for (let renderObj of renderList)
            renderObj.draw(context);
    }

    hitTest(point: math.Point) {

        const displayObjectList = this.children;
        let hitTestResult: DisplayObject | null = null;

        // 反向遍历，先从后绘制的(在上层显示的)开始判断
        for (var i = displayObjectList.length - 1; i >= 0; --i) {
            // 获取 当前子节点
            const currentChild = displayObjectList[i];
            // 获取 当前子节点的 localMatrix
            const currentChildLocalMatrix = currentChild.localMatrix;
            // 获取 当前子节点的 localMatrix 的转置矩阵
            const currentChildInvertLocalMatrix = math.invertMatrix(currentChildLocalMatrix);
            // point 的坐标是相对于此节点的
            // 算完之后的 currentChildRelativePoint 的坐标是相对于 currentChild 的
            const currentChildRelativePoint = math.pointAppendMatrix(point, currentChildInvertLocalMatrix);

            // 子节点计算碰撞
            const result = currentChild.hitTest(currentChildRelativePoint);
            if (result != null) {
                hitTestResult = result;
                break;
            }
        }
        return hitTestResult;
    }
}


/**
 * 图片
 * 
 * 继承 DisplayObject
 */
class Bitmap extends DisplayObject {
    img: HTMLImageElement;

    constructor(x: number, y: number, img: HTMLImageElement) {
        super(x, y);
        this.img = img;
    }

    render(context: CanvasRenderingContext2D) {
        // 绘制的时候 context 已经通过矩阵运算变换到绘制坐标系了，所以给的位置信息都是0
        context.drawImage(this.img, 0, 0);
    }

    hitTest(point: math.Point) {
        const width = this.img.width;
        const height = this.img.height;
        const x = point.x;
        const y = point.y;

        if (x > 0 && x < width &&
            y > 0 && y < height) {
            return this;
        } else {
            return null;
        }
    }
}


/**
 * 按钮
 *
 */
class Button extends DisplayObjectContainer {

    image: Bitmap

    text: TextField

    constructor(x: number, y: number) {
        super(x, y);

        this.addChild(this.image)
        this.addChild(this.text)
    }

    update() {

    }

    reset() {

    }
}


/**
 * 弹窗
 */
class MultiWindow extends DisplayObjectContainer {

    background: Bitmap

    images: Bitmap[] = []

    buttons: Button[] = []

    titleTexts: TextField[] = []

    mainTexts: TextField[] = []


    constructor(x: number, y: number) {
        super(x, y);

        this.background = new Bitmap(x, y, new HTMLImageElement());
    }

    update() {

    }

    reset() {

    }
}


/**
 * 动画
 */
class Animator extends DisplayObject {

    isPlaying: boolean

    duringTiem: number

    delta: number

    index: number

    count: number

    image: HTMLImageElement

    size: number

    constructor(x: number, y: number, image: HTMLImageElement, size: number, count: number, delta: number) {
        super(x, y);
        this.index = 0
        this.duringTiem = delta
        this.image = image
        this.size = size
        this.count = count
        this.delta = delta

        this.visible = false
        this.isPlaying = false
    }

    onStart() {

    }

    onUpdate(delta: number) {
        if (this.isPlaying) {
            if (this.index == this.count) {
                this.reset();
            }
            if (this.duringTiem >= this.delta) {
                this.index++;
                this.duringTiem = 0;
            }
            this.duringTiem += delta;
        }
    }

    play() {
        this.isPlaying = true
        this.visible = true
    }

    reset() {
        this.isPlaying = false
        this.visible = false
        this.index = 0
        this.duringTiem = this.delta
    }

    render(context: CanvasRenderingContext2D): void {
        context.drawImage(this.image, this.index * this.size, 0, this.size, this.size, 0, 0, this.size, this.size);
    }
}


/**
 * 文本
 * 
 * 继承 DisplayObject
 */
class TextField extends DisplayObject {
    text: string;
    size: number;
    width: number;
    style: string;
    color: string;
    isCenter: boolean;
    renderX: number;
    renderY: number;

    constructor(text: string, x: number, y: number, size: number, style: string = 'fantasy', color: string = 'black') {
        super(x, y);
        this.renderX = x;
        this.renderY = y;

        this.size = size;
        this.text = text;
        this.style = style;
        this.color = color;

        this.isCenter = false;
    }

    hitTest(point: math.Point) {
        const x = point.x;
        const y = point.y;

        const width = this.width;
        const height = this.size;

        if (x > 0 && x < width && y > 0 && y < height) {
            return this;
        } else {
            return null;
        }
    }

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.font = this.size.toString() + 'px ' + this.style;
        context.fillText(this.text, 0, this.size);
        // 获取文本渲染的宽度
        this.width = context.measureText(this.text).width;

        if (this.isCenter) {
            this.x = this.renderX - this.width / 2
        }
    }

    centered() {
        this.isCenter = true
    }

    setStyle(style: string) {
        this.style = style
    }

    setSize(size: number) {
        this.size = size;
    }

    setColor(color: string) {
        this.color = color;
    }
}

/**
 * 文本
 * 
 * 继承 DisplayObject
 */
class MultiTextField extends DisplayObject {
    text: Array<string>;
    size: number;
    space: number;//行间距
    width: number;

    constructor(text: Array<string>, x: number, y: number, size: number, space: number) {
        super(x, y);
        this.size = size;
        this.text = text;
        this.space = space;
    }

    hitTest(point: math.Point) {
        const x = point.x;
        const y = point.y;

        const width = this.width;
        const height = this.size * this.text.length;

        if (x > 0 && x < width && y > 0 && y < height) {
            return this;
        } else {
            return null;
        }
    }

    render(context: CanvasRenderingContext2D) {

        // 获取文本渲染的宽度,取所有宽度中最大值
        this.width = 0;
        for (var i = 0; i < this.text.length; i++) {
            if (this.width < context.measureText(this.text[i]).width) {
                this.width = context.measureText(this.text[i]).width
            }
        }
        for (var i = 0; i < this.text.length; i++) {
            let width = context.measureText(this.text[i]).width
            context.fillStyle = 'black';
            // context.font = this.size.toString() + 'px Arial';
            context.font = this.size.toString() + 'px lisu';
            context.fillText(this.text[i], 0, i * (this.size + this.space), width);
        }
    }
    setStringByNumber(con: string, num: number) {//按照一行显示文字数换行
        for (var i = 0; i < con.length; i += num) {
            this.text.push(con.slice(i, i + num - 1))
        }

    }
    setStringByStr(con: string, str: string) {//按照str的标记字符分割文本
        this.text = con.split(str)
    }
    centered() {
        this.x -= this.width / 2;
    }
}

/**
 * 矩形
 * 
 * 继承 DisplayObject
 */
class Rectangle extends DisplayObject {
    color: string;
    width: number;
    height: number;


    constructor(x: number, y: number, width: number, height: number, color: string) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    render(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.fillStyle = this.color;
        // 这里绘制图形的位置一定是 0,0 因为画笔已经移动到了要绘制的地方
        context.fillRect(0, 0, this.width, this.height);
        context.fill();
        context.closePath();
    }
}


/**
 * 音频
 */
class AudioPlay {
    audio: HTMLAudioElement

    constructor(audio: HTMLAudioElement) {
        this.audio = audio
        this.audio.hidden = true;
        this.audio.controls = true;
        this.audio.loop = false;
    }

    set playOnlyOnce(v: boolean) {
        this.audio.loop = !v;
    }

    play() {
        this.audio.play()
    }
}


/**
 * 舞台
 * 
 * 继承 DisplayObjectContainer，初始化坐标为0，作为渲染树的根
 */
class Stage extends DisplayObjectContainer {
    constructor() {
        super(0, 0);
    }
}


/**
 * 存取
 * 
 * TODO
 */
class SaveAndLoad {

}


/**
 * 心跳控制器
 */
function onTicker(context: CanvasRenderingContext2D) {
    // fsm.update();
    ComponentPool.instance.update();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    stage.draw(context);
    context.restore();
}


/**
 * 主循环
 */
let start: number | null = null;
let lastTimestamp = 0;
let DELTA_TIME = 0;
function enterFrame(timestamp: number) {
    if (!context) {
        return;
    }

    // 获取每帧间隔时间
    if (start === null) {
        start = timestamp;
        lastTimestamp = timestamp;
    }
    DELTA_TIME = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    onTicker(context);
    requestAnimationFrame(enterFrame);
}



var canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
var context = canvas.getContext("2d");

const stage = new Stage();
var fsm = new StateMachine();
var commandPool = new CommandPool();

requestAnimationFrame(enterFrame);
