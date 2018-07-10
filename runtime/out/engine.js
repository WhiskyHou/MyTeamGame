"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 状态
 *
 * 具体状态派生类需要实现 onEnter() onUpdate() onExit()
 */
var State = /** @class */ (function () {
    function State() {
    }
    return State;
}());
/**
 * 状态机
 *
 * replaceState(state: State)   切换当前状态为state，原状态退出
 * update()                     让当前状态执行onUpdate操作
 */
var StateMachine = /** @class */ (function () {
    function StateMachine() {
        this.currentState = null;
    }
    StateMachine.prototype.replaceState = function (state) {
        if (this.currentState) {
            this.currentState.onExit();
        }
        this.currentState = state;
        this.currentState.onEnter();
    };
    StateMachine.prototype.update = function () {
        if (this.currentState) {
            this.currentState.onUpdate();
        }
    };
    StateMachine.prototype.getCurrentState = function () {
        return this.currentState;
    };
    return StateMachine;
}());
/**
 * 资源管理
 */
var Resource = /** @class */ (function () {
    function Resource() {
    }
    Resource.load = function (path, key) {
        var obj = new Image();
        obj.src = path;
        this.resource[key] = obj;
    };
    Resource.get = function (key) {
        return this.resource[key];
    };
    Resource.resource = {};
    return Resource;
}());
/**
 * 事件处理
 *
 * listeners: Function[]                    函数数组，储存事件触发后的回调函数
 *
 * dispatchEvent()                          执行每个回调函数
 * addEventListener(callback: Function)   接受一个回调函数，并添加到函数数组
 */
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
        this.listeners = [];
    }
    EventDispatcher.prototype.dispatchEvent = function (type, eventData) {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            if (listener.type == type) {
                listener.callback(eventData);
            }
        }
    };
    EventDispatcher.prototype.addEventListener = function (type, callback) {
        this.listeners.push({ type: type, callback: callback });
    };
    EventDispatcher.prototype.deleteEventListener = function (type, callback) {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            if (listener.type == type && listener.callback == callback) {
                var index = this.listeners.indexOf(listener);
                this.listeners.splice(index, 1);
                break;
            }
        }
    };
    EventDispatcher.prototype.deleteAllEventListener = function () {
        if (this.listeners.length > 0) {
            this.listeners.splice(0);
        }
    };
    return EventDispatcher;
}());
/**
 * 命令
 */
var Command = /** @class */ (function () {
    function Command() {
    }
    return Command;
}());
/**
 * 命令池
 */
var CommandPool = /** @class */ (function () {
    function CommandPool() {
        this.list = [];
    }
    CommandPool.prototype.addCommand = function (command) {
        this.list.push(command);
    };
    CommandPool.prototype.execute = function () {
        // 取出第一个命令，执行，并且给一个回调函数onFinish，这个函数的内容是让命令池等1ms后去执行下一个命令
        var self = this;
        var command = this.list.shift();
        if (command) {
            command.execute(onFinish);
        }
        function onFinish() {
            setTimeout(function () {
                self.execute();
            }, 1);
        }
    };
    return CommandPool;
}());
var Behaviour = /** @class */ (function () {
    function Behaviour() {
    }
    return Behaviour;
}());
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
var DisplayObject = /** @class */ (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.scaleX = _this.scaleY = 1;
        _this.rotation = 0;
        _this.localMatrix = new math.Matrix();
        _this.globalMatrix = new math.Matrix();
        _this.parent = null;
        _this.visible = true;
        return _this;
    }
    DisplayObject.prototype.addComponent = function (instance) {
        return instance;
    };
    DisplayObject.prototype.removeComponent = function () {
    };
    DisplayObject.prototype.draw = function (context) {
        if (!this.visible)
            return;
        // 根据 local属性 算出 localMatirx
        this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        // 获得父容器的 globalMatrix，如果父容器是浏览器窗口，也就是树的根，赋值为单位矩阵
        var parentGlobalMatrix = this.parent ? this.parent.globalMatrix : new math.Matrix();
        // localMatrix x乘 父容器的globalMatrix，获得本对象的 globalMatrix
        var globalMatrix = math.matrixAppendMatrix(this.localMatrix, parentGlobalMatrix);
        this.globalMatrix = globalMatrix;
        // 将上下文关系进行 该对象的 globalMatrix 矩阵变换，就是从大窗口原点移动画笔 到绘制该对象的地方
        context.setTransform(globalMatrix.a, globalMatrix.b, globalMatrix.c, globalMatrix.d, globalMatrix.tx, globalMatrix.ty);
        this.render(context);
    };
    DisplayObject.prototype.hitTest = function (point) {
        return null;
    };
    return DisplayObject;
}(EventDispatcher));
/**
 * 节点容器
 *
 * 继承 DisplayObject，专门用来作为渲染树的根节点，下挂其他节点
 */
var DisplayObjectContainer = /** @class */ (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = [];
        return _this;
    }
    DisplayObjectContainer.prototype.addChild = function (child) {
        this.children.push(child);
        child.parent = this;
    };
    DisplayObjectContainer.prototype.deleteChild = function (child) {
        var index = this.children.indexOf(child);
        if (index != -1)
            this.children.splice(index, 1);
    };
    DisplayObjectContainer.prototype.deleteAll = function () {
        while (true) {
            if (0 == this.children.length) {
                break;
            }
            this.children.splice(0);
        }
    };
    // 接收一个全局的点坐标，返回这个点相对于此容器的点坐标
    DisplayObjectContainer.prototype.getLocalPos = function (point) {
        if (!this.parent) {
            return point;
        }
        var fatherPos = this.parent.getLocalPos(point);
        var invertLocalMatrix = math.invertMatrix(this.localMatrix);
        var pointRelativeMe = math.pointAppendMatrix(fatherPos, invertLocalMatrix);
        return pointRelativeMe;
    };
    DisplayObjectContainer.prototype.render = function (context) {
        var renderList = this.children;
        for (var _i = 0, renderList_1 = renderList; _i < renderList_1.length; _i++) {
            var renderObj = renderList_1[_i];
            renderObj.draw(context);
        }
    };
    DisplayObjectContainer.prototype.hitTest = function (point) {
        var displayObjectList = this.children;
        var hitTestResult = null;
        // 反向遍历，先从后绘制的(在上层显示的)开始判断
        for (var i = displayObjectList.length - 1; i >= 0; --i) {
            // 获取 当前子节点
            var currentChild = displayObjectList[i];
            // 获取 当前子节点的 localMatrix
            var currentChildLocalMatrix = currentChild.localMatrix;
            // 获取 当前子节点的 localMatrix 的转置矩阵
            var currentChildInvertLocalMatrix = math.invertMatrix(currentChildLocalMatrix);
            // point 的坐标是相对于此节点的
            // 算完之后的 currentChildRelativePoint 的坐标是相对于 currentChild 的
            var currentChildRelativePoint = math.pointAppendMatrix(point, currentChildInvertLocalMatrix);
            // 子节点计算碰撞
            var result = currentChild.hitTest(currentChildRelativePoint);
            if (result != null) {
                hitTestResult = result;
                break;
            }
        }
        return hitTestResult;
    };
    return DisplayObjectContainer;
}(DisplayObject));
/**
 * 图片
 *
 * 继承 DisplayObject
 */
var Bitmap = /** @class */ (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap(x, y, img) {
        var _this = _super.call(this, x, y) || this;
        _this.img = img;
        return _this;
    }
    Bitmap.prototype.render = function (context) {
        // 绘制的时候 context 已经通过矩阵运算变换到绘制坐标系了，所以给的位置信息都是0
        context.drawImage(this.img, 0, 0);
    };
    Bitmap.prototype.hitTest = function (point) {
        var width = this.img.width;
        var height = this.img.height;
        var x = point.x;
        var y = point.y;
        if (x > 0 && x < width &&
            y > 0 && y < height) {
            return this;
        }
        else {
            return null;
        }
    };
    return Bitmap;
}(DisplayObject));
/**
 * 按钮
 *
 */
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.addChild(_this.image);
        _this.addChild(_this.text);
        return _this;
    }
    Button.prototype.update = function () {
    };
    Button.prototype.reset = function () {
    };
    return Button;
}(DisplayObjectContainer));
/**
 * 弹窗
 */
var MultiWindow = /** @class */ (function (_super) {
    __extends(MultiWindow, _super);
    function MultiWindow(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.images = [];
        _this.buttons = [];
        _this.titleTexts = [];
        _this.mainTexts = [];
        _this.background = new Bitmap(x, y, new HTMLImageElement());
        return _this;
    }
    MultiWindow.prototype.update = function () {
    };
    MultiWindow.prototype.reset = function () {
    };
    return MultiWindow;
}(DisplayObjectContainer));
/**
 * 动画
 */
var Animator = /** @class */ (function (_super) {
    __extends(Animator, _super);
    function Animator(x, y, image, size, count, delta) {
        var _this = _super.call(this, x, y) || this;
        _this.index = 0;
        _this.duringTiem = delta;
        _this.image = image;
        _this.size = size;
        _this.count = count;
        _this.delta = delta;
        _this.visible = false;
        _this.isPlaying = false;
        return _this;
    }
    Animator.prototype.onStart = function () {
    };
    Animator.prototype.onUpdate = function (delta) {
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
    };
    Animator.prototype.play = function () {
        this.isPlaying = true;
        this.visible = true;
    };
    Animator.prototype.reset = function () {
        this.isPlaying = false;
        this.visible = false;
        this.index = 0;
        this.duringTiem = this.delta;
    };
    Animator.prototype.render = function (context) {
        context.drawImage(this.image, this.index * this.size, 0, this.size, this.size, 0, 0, this.size, this.size);
    };
    return Animator;
}(DisplayObject));
/**
 * 文本
 *
 * 继承 DisplayObject
 */
var TextField = /** @class */ (function (_super) {
    __extends(TextField, _super);
    function TextField(text, x, y, size, style, color) {
        if (style === void 0) { style = 'fantasy'; }
        if (color === void 0) { color = 'black'; }
        var _this = _super.call(this, x, y) || this;
        _this.renderX = x;
        _this.renderY = y;
        _this.size = size;
        _this.text = text;
        _this.style = style;
        _this.color = color;
        _this.isCenter = false;
        return _this;
    }
    TextField.prototype.hitTest = function (point) {
        var x = point.x;
        var y = point.y;
        var width = this.width;
        var height = this.size;
        if (x > 0 && x < width && y > 0 && y < height) {
            return this;
        }
        else {
            return null;
        }
    };
    TextField.prototype.render = function (context) {
        this.width = context.measureText(this.text).width;
        context.fillStyle = 'black';
        context.font = this.size.toString() + 'px ' + this.style;
        context.fillText(this.text, 0, this.size);
    };
    TextField.prototype.centered = function () {
        this.isCenter = true;
    };
    TextField.prototype.setStyle = function (style) {
        this.style = style;
    };
    TextField.prototype.setSize = function (size) {
        this.size = size;
    };
    TextField.prototype.setColor = function (color) {
        this.color = color;
    };
    return TextField;
}(DisplayObject));
/**
 * 文本
 *
 * 继承 DisplayObject
 */
var MultiTextField = /** @class */ (function (_super) {
    __extends(MultiTextField, _super);
    function MultiTextField(text, x, y, size, space) {
        var _this = _super.call(this, x, y) || this;
        _this.size = size;
        _this.text = text;
        _this.space = space;
        return _this;
    }
    MultiTextField.prototype.hitTest = function (point) {
        var x = point.x;
        var y = point.y;
        var width = this.width;
        var height = this.size * this.text.length;
        if (x > 0 && x < width && y > 0 && y < height) {
            return this;
        }
        else {
            return null;
        }
    };
    MultiTextField.prototype.render = function (context) {
        // 获取文本渲染的宽度,取所有宽度中最大值
        this.width = 0;
        for (var i = 0; i < this.text.length; i++) {
            if (this.width < context.measureText(this.text[i]).width) {
                this.width = context.measureText(this.text[i]).width;
            }
        }
        for (var i = 0; i < this.text.length; i++) {
            var width = context.measureText(this.text[i]).width;
            context.fillStyle = 'black';
            // context.font = this.size.toString() + 'px Arial';
            context.font = this.size.toString() + 'px lisu';
            context.fillText(this.text[i], 0, i * (this.size + this.space), width);
        }
    };
    MultiTextField.prototype.setStringByNumber = function (con, num) {
        for (var i = 0; i < con.length; i += num) {
            this.text.push(con.slice(i, i + num - 1));
        }
    };
    MultiTextField.prototype.setStringByStr = function (con, str) {
        this.text = con.split(str);
    };
    MultiTextField.prototype.centered = function () {
        this.x -= this.width / 2;
    };
    return MultiTextField;
}(DisplayObject));
/**
 * 矩形
 *
 * 继承 DisplayObject
 */
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(x, y, width, height, color) {
        var _this = _super.call(this, x, y) || this;
        _this.width = width;
        _this.height = height;
        _this.color = color;
        return _this;
    }
    Rectangle.prototype.render = function (context) {
        context.beginPath();
        context.fillStyle = this.color;
        // 这里绘制图形的位置一定是 0,0 因为画笔已经移动到了要绘制的地方
        context.fillRect(0, 0, this.width, this.height);
        context.fill();
        context.closePath();
    };
    return Rectangle;
}(DisplayObject));
/**
 * 音频
 */
var AudioPlay = /** @class */ (function () {
    function AudioPlay(audio) {
        this.audio = audio;
        this.audio.hidden = true;
        this.audio.controls = true;
        this.audio.loop = false;
    }
    Object.defineProperty(AudioPlay.prototype, "playOnlyOnce", {
        set: function (v) {
            this.audio.loop = !v;
        },
        enumerable: true,
        configurable: true
    });
    AudioPlay.prototype.play = function () {
        this.audio.play();
    };
    return AudioPlay;
}());
/**
 * 舞台
 *
 * 继承 DisplayObjectContainer，初始化坐标为0，作为渲染树的根
 */
var Stage = /** @class */ (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        return _super.call(this, 0, 0) || this;
    }
    return Stage;
}(DisplayObjectContainer));
/**
 * 存取
 *
 * TODO
 */
var SaveAndLoad = /** @class */ (function () {
    function SaveAndLoad() {
    }
    return SaveAndLoad;
}());
/**
 * 心跳控制器
 */
function onTicker(context) {
    fsm.update();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    stage.draw(context);
    context.restore();
}
/**
 * 主循环
 */
var start = null;
var lastTimestamp = 0;
var INTERVAL = 0;
function enterFrame(timestamp) {
    if (!context) {
        return;
    }
    // 获取每帧间隔时间
    if (start === null) {
        start = timestamp;
        lastTimestamp = timestamp;
    }
    INTERVAL = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    onTicker(context);
    requestAnimationFrame(enterFrame);
}
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var stage = new Stage();
var fsm = new StateMachine();
var commandPool = new CommandPool();
requestAnimationFrame(enterFrame);
