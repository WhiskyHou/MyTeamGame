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
        Resource.load("assets/van_stand.png", "van");
        this.img = new Bitmap(0, 0, Resource.get('van'));
        this.camera = new EmptyObject(0, 0);
        stages[0].addChild(this.img);
        var camera = this.camera.addComponent(new Camera());
        camera.layer = 0;
        this.img.addEventListener("onClick", function () {
            console.log(111);
        });
    };
    Demo.prototype.onUpdate = function () {
    };
    Demo.prototype.onExit = function () {
    };
    return Demo;
}(State));
fsm.replaceState(Demo.instance);
canvas.onclick = function (event) {
    var globalX = event.offsetX;
    var globalY = event.offsetY;
    var hitResult = Stage.instance.mainStage.hitTest(new math.Point(globalX, globalY));
    if (hitResult) {
        hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        while (hitResult.parent) {
            hitResult = hitResult.parent;
            hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        }
    }
};
window.onkeydown = function (event) {
    var keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode === 87) {
        Demo.instance.camera.dispatchEvent("cameraMove", { dir: "UP" });
    }
    else if (keyCode === 83) {
        Demo.instance.camera.dispatchEvent("cameraMove", { dir: "DOWN" });
    }
    else if (keyCode === 65) {
        Demo.instance.camera.dispatchEvent("cameraMove", { dir: "LEFT" });
    }
    else if (keyCode === 68) {
        Demo.instance.camera.dispatchEvent("cameraMove", { dir: "RIGHT" });
    }
};
window.onkeyup = function (event) {
    var keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode === 87) {
        Demo.instance.camera.dispatchEvent("cameraStop", { dir: "UP" });
    }
    else if (keyCode === 83) {
        Demo.instance.camera.dispatchEvent("cameraStop", { dir: "DOWN" });
    }
    else if (keyCode === 65) {
        Demo.instance.camera.dispatchEvent("cameraStop", { dir: "LEFT" });
    }
    else if (keyCode === 68) {
        Demo.instance.camera.dispatchEvent("cameraStop", { dir: "RIGHT" });
    }
};
