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
var CreatePlayerButton = /** @class */ (function (_super) {
    __extends(CreatePlayerButton, _super);
    function CreatePlayerButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canAssignPoint = 5;
        _this.bigTag = true;
        return _this;
    }
    CreatePlayerButton.prototype.onStart = function () {
    };
    CreatePlayerButton.prototype.onUpdate = function (delta) {
        if (this.canAssignPoint == 0) {
            this.heartBeatEffect(delta);
        }
        else {
            var startButton = this.gameObject;
            startButton.scaleX = 1;
            startButton.scaleY = 1;
            startButton.x = 350;
            startButton.y = 430;
        }
    };
    CreatePlayerButton.prototype.onDestory = function () {
    };
    CreatePlayerButton.prototype.heartBeatEffect = function (delta) {
        var bmp = this.gameObject;
        if (this.bigTag) {
            bmp.scaleX += delta * 4;
            bmp.scaleY += delta * 4;
            bmp.x -= 5;
            bmp.y -= 3;
        }
        else {
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
    };
    return CreatePlayerButton;
}(Behaviour));