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
var Demo = /** @class */ (function (_super) {
    __extends(Demo, _super);
    function Demo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Demo, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new Demo();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Demo.prototype.onEnter = function () {
        var _this = this;
        this.text = new TextField("TextField", 200, 100, 30);
        this.text.centered();
        stage.addChild(this.text);
        this.text2 = new TextField("TextField", 200, 130, 30);
        stage.addChild(this.text2);
        this.text.addEventListener("onClick", function () {
            console.log(_this.text.x, _this.text.y);
        });
        this.text.addEventListener("keyDown", function () {
            console.log(_this.text.x, _this.text.y, _this.text.width);
        });
    };
    Demo.prototype.onUpdate = function () {
    };
    Demo.prototype.onExit = function () {
    };
    return Demo;
}(State));
fsm.replaceState(Demo.instance);
// 鼠标点击事件，捕获所有被点击到的 DisplayObject，并从叶子节点依次向上通知监听器，监听器执行
canvas.onclick = function (event) {
    var globalX = event.offsetX;
    var globalY = event.offsetY;
    var hitResult = stage.hitTest(new math.Point(globalX, globalY));
    if (hitResult) {
        hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        while (hitResult.parent) {
            // console.log(hitResult);
            hitResult = hitResult.parent;
            hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        }
    }
};
window.onkeydown = function (ev) {
    Demo.instance.text.dispatchEvent('keyDown', {});
};
