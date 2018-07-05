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
 * 用户信息UI
 */
var UserInfoUI = /** @class */ (function (_super) {
    __extends(UserInfoUI, _super);
    function UserInfoUI(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.userName = new TextField(player.name, 10, 0, 20);
        _this.userLevel = new TextField('Lv:' + player.level, 120, 0, 20);
        _this.userAttack = new TextField('Attck:' + player.attack, 240, 0, 20);
        _this.userEquipment = new TextField('装备: ', 400, 0, 20);
        _this.bagButton = new Bitmap(750, 465, bagButton);
        _this.EscButton = new Bitmap(820, 465, EscButton);
        _this.SkillButton = new Bitmap(680, 465, SkillButton);
        _this.bloodUI = new Bitmap(0, 0, bloodUI);
        // this.addChild(this.userName);
        // this.addChild(this.userLevel);
        // this.addChild(this.userAttack);
        // this.addChild(this.userEquipment);
        _this.addChild(_this.bagButton);
        _this.addChild(_this.SkillButton);
        _this.addChild(_this.EscButton);
        _this.addChild(_this.bloodUI);
        _this.bagButton.addEventListener('onClick', function (eventData) {
            baManager.openBag();
        });
        player.addEventListener('updateUserInfo', function (eventData) {
            _this.userLevel.text = 'Lv:' + player.level;
            _this.userAttack.text = 'Attck:' + player.attack;
            var equipments = '';
            for (var _i = 0, _a = player.mounthedEquipment; _i < _a.length; _i++) {
                var item = _a[_i];
                equipments += item.name.toString();
            }
            _this.userEquipment.text = '装备: ' + equipments;
        });
        return _this;
        // console.log(player);
    }
    return UserInfoUI;
}(DisplayObjectContainer));
/**
 * 任务栏UI
 */
var MissionInfoUI = /** @class */ (function (_super) {
    __extends(MissionInfoUI, _super);
    function MissionInfoUI(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.update();
        missionManager.addEventListener('missionUpdate', function (eventDate) {
            _this.update();
        });
        return _this;
    }
    MissionInfoUI.prototype.update = function () {
        this.deleteAll();
        var index = 0;
        for (var _i = 0, _a = missionManager.missions; _i < _a.length; _i++) {
            var mission = _a[_i];
            if (mission.status == MissionStatus.DURRING) {
                var missionLabel = new TextField("", 0, 0, 24);
                this.addChild(missionLabel);
                missionLabel.text = mission.name;
                missionLabel.y = index * 24;
                index++;
            }
            else if (mission.status == MissionStatus.CAN_SUBMIT) {
                var missionLabel = new TextField("", 0, 0, 24);
                this.addChild(missionLabel);
                missionLabel.text = "请提交任务！";
                missionLabel.y = index * 24;
                index++;
            }
        }
    };
    return MissionInfoUI;
}(DisplayObjectContainer));
/**
 * 背包UI
 */
var bagUI = /** @class */ (function (_super) {
    __extends(bagUI, _super);
    function bagUI(x, y) {
        var _this = 
        //super(x, y);
        _super.call(this, 58, 64) || this;
        _this.player = player;
        _this.infoPanel = new Bitmap(42, 48, bagWindowsUI);
        _this.addChild(_this.infoPanel);
        return _this;
    }
    return bagUI;
}(DisplayObjectContainer));
/**
 * 战斗UI
 */
var battleUI = /** @class */ (function (_super) {
    __extends(battleUI, _super);
    function battleUI(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.player = player;
        _this.textGroup = new DisplayObjectContainer(590, 115);
        _this.playerNameText = new TextField(_this.player.name, 170, 80, 15);
        _this.enemyNameText = new TextField('this.enemy.name', 300, 80, 15);
        _this.index = 0;
        // super(58, 64);
        _this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        _this.infoPanel = new Bitmap(42, 48, battlePanelInfo);
        _this.backGround = new Bitmap(42, 48, battlePanelBgImg);
        _this.attackButton = new Bitmap(400, 400, battleAttackButton1);
        _this.addChild(_this.blackMask);
        _this.addChild(_this.infoPanel);
        _this.addChild(_this.backGround);
        _this.addChild(_this.textGroup);
        _this.addChild(_this.attackButton);
        _this.addChild(_this.playerNameText);
        _this.addChild(_this.enemyNameText);
        _this.attackButton.addEventListener("onClick", function (eventData) {
            batManager.fightOneTime(player, _this.enemy);
        });
        batManager.addEventListener('playerBattleStart', function (player) {
            _this.player = player;
        });
        batManager.addEventListener('enemyBattleStart', function (enemy) {
            _this.enemy = enemy;
            _this.enemyNameText.text = enemy.name;
        });
        batManager.addEventListener('playerDealDamage', function (damage) {
            var textField = new TextField(_this.player.name + " 对 " + _this.enemy.name + " 造成 " + damage + " 点伤害！", 0, _this.index * 20, 15);
            console.log(_this.enemy.hp);
            _this.textGroup.addChild(textField);
            _this.index++;
        });
        batManager.addEventListener('enemyDealDamage', function (damage) {
            var textField = new TextField(_this.enemy.name + " 对 " + _this.player.name + " 造成 " + damage + " 点伤害！", 0, _this.index * 20, 15);
            console.log(_this.player.hp);
            _this.textGroup.addChild(textField);
            _this.index++;
            _this.indexJudge();
        });
        batManager.addEventListener('criticalHit', function (eventData) {
            var textField = new TextField(_this.player.name + " 暴击辣！", 0, _this.index * 20, 15);
            _this.textGroup.addChild(textField);
            _this.index++;
        });
        batManager.addEventListener('enemyDie', function (eventData) {
            var textField = new TextField(_this.enemy.name + " 被 " + _this.player.name + " 打飞辣！", 0, _this.index * 20, 15);
            _this.textGroup.addChild(textField);
            _this.index++;
            _this.indexJudge();
            _this.attackButton.deleteAllEventListener();
        });
        batManager.addEventListener('playerDie', function (eventData) {
            var textField = new TextField(_this.player.name + " 被 " + _this.enemy.name + " 打飞辣！", 0, _this.index * 20, 15);
            _this.textGroup.addChild(textField);
            _this.index++;
            _this.indexJudge();
            _this.attackButton.deleteAllEventListener();
        });
        return _this;
    }
    battleUI.prototype.indexJudge = function () {
        if (this.index >= 17) {
            this.textGroup.deleteAll();
            this.index = 0;
        }
    };
    return battleUI;
}(DisplayObjectContainer));
/**
 * 战斗胜利结算UI
 */
var battleEndWinUI = /** @class */ (function (_super) {
    __extends(battleEndWinUI, _super);
    function battleEndWinUI(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.dropTextGroup = new DisplayObjectContainer(400, 240);
        _this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        _this.backGround = new Bitmap(254, 104, battleEndBGImg);
        _this.backButton = new Bitmap(500, 353, backButtonImg);
        _this.expText = new TextField('2333', 400, 207, 20);
        // this.addChild(this.blackMask);
        _this.addChild(_this.backGround);
        _this.addChild(_this.backButton);
        _this.addChild(_this.expText);
        _this.addChild(_this.dropTextGroup);
        batManager.addEventListener("enemyDrop", function (dropBox) {
            for (var i = 0; i < dropBox.length; i++) {
                var equip = void 0;
                equip = equipManager.getEquipByID(dropBox[i]);
                var textField = new TextField(equip.name, 0, 30 * i, 20);
                player.packageEquipment.push(equip);
                _this.dropTextGroup.addChild(textField);
            }
        });
        _this.backButton.addEventListener("onClick", function (eventData) {
            batManager.dispatchEvent("backSceneWin", null);
        });
        return _this;
    }
    return battleEndWinUI;
}(DisplayObjectContainer));
/**
 * 战斗失败结算UI
 */
var battleEndLoseUI = /** @class */ (function (_super) {
    __extends(battleEndLoseUI, _super);
    // expText: TextField;
    // dropTextGroup: DisplayObjectContainer = new DisplayObjectContainer(400, 240);
    function battleEndLoseUI(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        _this.backGround = new Bitmap(254, 104, battleEndLoseBGImg);
        _this.backButton = new Bitmap(500, 325, backButtonImg);
        // this.expText = new TextField('2333', 400, 207, 20);
        // this.addChild(this.blackMask);
        _this.addChild(_this.backGround);
        _this.addChild(_this.backButton);
        // this.addChild(this.expText);
        // this.addChild(this.dropTextGroup);
        // batManager.addEventListener("enemyDrop", (dropBox: number[]) => {
        //     for (let i = 0; i < dropBox.length; i++) {
        //         let equip: Equipment;
        //         equip = equipManager.getEquipByID(dropBox[i]) as Equipment;
        //         let textField = new TextField(equip.name, 0, 30 * i, 20);
        //         player.packageEquipment.push(equip);
        //         this.dropTextGroup.addChild(textField);
        //     }
        // })
        _this.backButton.addEventListener("onClick", function (eventData) {
            batManager.dispatchEvent("backSceneLose", null);
        });
        return _this;
    }
    return battleEndLoseUI;
}(DisplayObjectContainer));
/**
 * 对话窗口UI
 */
// class TalkWindow extends DisplayObjectContainer {
//     view: Bitmap;
//     text: TextField;
//     count: number = 1;
//     _config = [
//         "欢迎来到新日暮里",
//         "你的等级还很低",
//         "攻击力也相当低",
//         "所以我不能给你任何击杀任务",
//         "你先找到屠龙刀再回来找我"
//     ]
//     constructor(x: number, y: number) {
//         super(x, y);
//         this.init();
//         missionManager.addEventListener("onkeydown_32", (eventData: any) => {
//             if (this.count <= this._config.length - 1) {
//                 this.text.text = this._config[this.count];
//                 this.count++;
//             } else {
//                 map.deleteChild(this);
//             }
//         })
//     }
//     init() {
//         this.view = new Bitmap(0, 0, talk_window);
//         this.text = new TextField('', 300, 200, 40);
//         this.addChild(this.view);
//         this.addChild(this.text);
//     }
//     set config(config: string[]) {
//         this._config = config;
//         this.text.text = this._config[0];
//     }
//     get config() {
//         return this._config;
//     }
// }
