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
        _this.text = new MultiTextField([], 190, 100, 24, 20);
        _this.blackMask = new Bitmap(-100, -150, battlePanelBlackMask);
        _this.addChild(_this.blackMask);
        _this.addChild(_this.view);
        _this.addChild(_this.text);
        // this.addChild(this.playerView);
        // this.addChild(this.playerNameText);
        _this.addEventListener("onClick", function (eventData) {
            clickaudio.play();
            switch (_this.count % 2) {
                case 0:
                    _this.text.y = 220;
                    break;
                case 1:
                    _this.text.y = 100;
                    break;
            }
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
            this.text.setStringByNumber(contents[this.count], 8);
        }
    };
    TalkWindow.prototype.initNpcInfo = function () {
        this.head = this.npc.head;
        this.head.x = 400;
        this.head.y = 60;
        this.name = new TextField(this.npc.name, 445, 35, 20);
        this.playerView = player.head;
        this.playerView.x = 50;
        this.playerView.y = 170;
        this.playerNameText = new TextField(player.name, 90, 140, 20);
        this.addChild(this.head);
        this.addChild(this.name);
        this.addChild(this.playerView);
        this.addChild(this.playerNameText);
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
