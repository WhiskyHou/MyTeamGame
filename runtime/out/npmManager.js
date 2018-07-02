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
 * Npc管理器
 */
var NpcManager = /** @class */ (function (_super) {
    __extends(NpcManager, _super);
    function NpcManager() {
        var _this = _super.call(this) || this;
        _this.npcList = [];
        return _this;
    }
    NpcManager.prototype.init = function () {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'config/npc.json');
        xhr.send();
        xhr.onload = function () {
            var obj = JSON.parse(xhr.response);
            // console.log(xhr.response)
            _this.parseFromConfig(obj);
        };
    };
    NpcManager.prototype.parseFromConfig = function (config) {
        for (var _i = 0, _a = config.npc; _i < _a.length; _i++) {
            var item = _a[_i];
            var id = parseInt(item.id);
            var name_1 = item.name;
            var viewPath = item.view;
            var headPath = item.head;
            var viewImg = new Image();
            viewImg.src = viewPath;
            var headImg = new Image();
            headImg.src = headPath;
            var view = new Bitmap(0, 0, viewImg);
            var head = new Bitmap(0, 0, headImg);
            var npc = new Npc(id, name_1);
            npc.view = view;
            npc.head = head;
            this.npcList.push(npc);
        }
    };
    return NpcManager;
}(EventDispatcher));
