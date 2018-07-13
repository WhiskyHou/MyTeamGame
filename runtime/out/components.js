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
 *
 */
var PlayerAnimTest = /** @class */ (function (_super) {
    __extends(PlayerAnimTest, _super);
    function PlayerAnimTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerAnimTest.prototype.onStart = function () {
        this.anim = new Animator(this.gameObject.x, this.gameObject.y, Resource.get('dust'), 128, 4, 0.2);
        this.gameObject.addChild(this.anim);
        this.gameObject.img.src = "";
        this.anim.isLooping = true;
        this.anim.visible = true;
    };
    PlayerAnimTest.prototype.onUpdate = function (delta) {
        this.anim.update(delta);
        this.anim.x = this.gameObject.x;
        this.anim.y = this.gameObject.y;
    };
    PlayerAnimTest.prototype.onDestory = function () {
    };
    PlayerAnimTest.prototype.play = function () {
        this.anim.play();
    };
    PlayerAnimTest.prototype.end = function () {
        this.anim.end();
    };
    return PlayerAnimTest;
}(Behaviour));
/**
 * 创建角色时的按钮
 */
var CreatePlayerButtonScript = /** @class */ (function (_super) {
    __extends(CreatePlayerButtonScript, _super);
    function CreatePlayerButtonScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canAssignPoint = 10;
        _this.hasName = false;
        _this.bigTag = true;
        return _this;
    }
    CreatePlayerButtonScript.prototype.onStart = function () {
    };
    CreatePlayerButtonScript.prototype.onUpdate = function (delta) {
        if (this.canAssignPoint == 0 && this.hasName) {
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
    CreatePlayerButtonScript.prototype.onDestory = function () {
    };
    CreatePlayerButtonScript.prototype.heartBeatEffect = function (delta) {
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
    return CreatePlayerButtonScript;
}(Behaviour));
