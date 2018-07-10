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
    Demo.prototype.onEnter = function () {
        Resource.load("assets/van_stand.png", "van");
        var img = new Bitmap(0, 0, Resource.get('van'));
        stage.addChild(img);
    };
    Demo.prototype.onUpdate = function () {
    };
    Demo.prototype.onExit = function () {
    };
    return Demo;
}(State));
fsm.replaceState(new Demo());
canvas.onclick = function (event) {
    var globalX = event.offsetX;
    var globalY = event.offsetY;
    var hitResult = stage.hitTest(new math.Point(globalX, globalY));
    if (hitResult) {
        hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        while (hitResult.parent) {
            hitResult = hitResult.parent;
            hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        }
    }
};
window.onkeypress = function (event) {
    var keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode === 87) {
    }
    else if (keyCode === 83) {
    }
    else if (keyCode === 65) {
    }
    else if (keyCode === 68) {
    }
};
