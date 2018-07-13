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
 * 加载进度条
 */
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 0;
        _this.waitTime = 0;
        _this.waitwait = 0;
        return _this;
    }
    Loading.prototype.onStart = function () {
        this.loadPercent = this.gameObject;
    };
    Loading.prototype.onUpdate = function (delta) {
        if (this.count < 100 && this.waitTime == 0) {
            this.waitwait++;
            if (this.waitwait >= 2) {
                this.count++;
                this.waitwait = 0;
            }
            this.loadPercent.text = this.count + " %";
        }
        if (this.count >= 100) {
            this.waitTime++;
        }
        if (this.waitTime > 120 && this.count < 200) {
            this.waitwait++;
            if (this.waitwait >= 2) {
                this.count++;
                this.waitwait = 0;
            }
            this.loadPercent.text = this.count + " %";
        }
        if (this.waitTime >= 480) {
            fsm.replaceState(MenuState.instance);
        }
    };
    Loading.prototype.onDestory = function () {
    };
    return Loading;
}(Behaviour));
/**
 * 主角动画
 */
var PlayerAnim = /** @class */ (function (_super) {
    __extends(PlayerAnim, _super);
    function PlayerAnim() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerAnim.prototype.onStart = function () {
        this.anim = new Animator(this.gameObject.x, this.gameObject.y, Resource.get('dust'), 128, 4, 0.2);
        this.gameObject.addChild(this.anim);
        this.anim.isLooping = true;
        this.anim.visible = true;
    };
    PlayerAnim.prototype.onUpdate = function (delta) {
        this.anim.update(delta);
        this.anim.x = this.gameObject.x;
        this.anim.y = this.gameObject.y;
    };
    PlayerAnim.prototype.onDestory = function () {
    };
    PlayerAnim.prototype.play = function () {
        this.anim.play();
    };
    PlayerAnim.prototype.end = function () {
        this.anim.end();
    };
    return PlayerAnim;
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
