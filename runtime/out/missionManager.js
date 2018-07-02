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
 * 任务管理器
 */
var MissionManager = /** @class */ (function (_super) {
    __extends(MissionManager, _super);
    function MissionManager() {
        var _this = _super.call(this) || this;
        _this.missions = [];
        return _this;
    }
    MissionManager.prototype.init = function () {
        var _this = this;
        player.addEventListener('userChange', function (eventData) {
            _this.update();
        });
        var xhr = new XMLHttpRequest();
        xhr.open("get", "config/mission.json");
        xhr.send();
        xhr.onload = function () {
            var obj = JSON.parse(xhr.response);
            // console.log(xhr.response)
            _this.parseFromConfig(obj);
        };
        this.update();
    };
    MissionManager.prototype.update = function () {
        for (var _i = 0, _a = this.missions; _i < _a.length; _i++) {
            var mission = _a[_i];
            mission.update();
        }
        this.dispatchEvent('missionUpdate', {});
    };
    MissionManager.prototype.parseFromConfig = function (config) {
        var _loop_1 = function (item) {
            var going = item.going;
            var goingFunc = function (eventData) {
                if (mission.status == MissionStatus.DURRING
                    && eventData.name === item.goingFunc) {
                    mission.current++;
                }
            };
            var rewardFunc = void 0;
            if (item.reward == 'levelUp') {
                rewardFunc = function () {
                    player.levelUp();
                };
            }
            else if (item.reward == 'levelDown') {
                rewardFunc = function () {
                    player.levelDown();
                };
            }
            else {
                rewardFunc = function () { };
            }
            var mission = new Mission(going, goingFunc, rewardFunc);
            mission.id = item.id;
            mission.name = item.name;
            mission.needLevel = item.needLevel;
            mission.fromNpcId = item.fromNpcId;
            mission.toNpcId = item.toNpcId;
            mission.canAcceptContent = item.canAcceptConfig;
            mission.canSubmitContent = item.canSubmitConfig;
            mission.status = MissionStatus.UNACCEPT;
            this_1.missions.push(mission);
        };
        var this_1 = this;
        for (var _i = 0, _a = config.mission; _i < _a.length; _i++) {
            var item = _a[_i];
            _loop_1(item);
        }
    };
    MissionManager.prototype.accept = function (mission) {
        mission.isAccepted = true;
        this.update();
    };
    MissionManager.prototype.submit = function (mission) {
        mission.isSubmit = true;
        this.update();
    };
    return MissionManager;
}(EventDispatcher));
