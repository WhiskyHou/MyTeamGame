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
 * 对话窗口
 */
var TalkWindow = /** @class */ (function (_super) {
    __extends(TalkWindow, _super);
    function TalkWindow(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.count = 0;
        _this.view = new Bitmap(0, 0, talk_window);
        _this.text = new TextField("", 100, 200, 24);
        _this.addChild(_this.view);
        _this.addChild(_this.text);
        _this.addEventListener("onClick", function (eventData) {
            _this.count++;
            _this.update();
        });
        return _this;
    }
    TalkWindow.prototype.update = function () {
        var contents = [];
        if (this.mission.status == MissionStatus.CAN_ACCEPT) {
            contents = this.mission.canAcceptContent;
        }
        else if (this.mission.status == MissionStatus.CAN_SUBMIT) {
            contents = this.mission.canSubmitContent;
        }
        if (this.count >= contents.length) {
            this.dispatchEvent("talkWiondowClose", null);
        }
        else {
            this.text.text = contents[this.count];
        }
    };
    TalkWindow.prototype.initNpcInfo = function () {
        this.head = this.npc.head;
        this.head.x = 60;
        this.head.y = 60;
        this.name = new TextField(this.npc.name, 180, 100, 20);
        this.addChild(this.head);
        this.addChild(this.name);
    };
    TalkWindow.prototype.setNpc = function (npc) {
        this.npc = npc;
        this.initNpcInfo();
    };
    TalkWindow.prototype.setMission = function (mission) {
        this.mission = mission;
        this.update();
    };
    return TalkWindow;
}(DisplayObjectContainer));
