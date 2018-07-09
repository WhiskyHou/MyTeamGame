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
        _this.userName = new TextField(player.name, 130, 5, 20);
        _this.userLevel = new TextField('' + player.level, 52, 85, 20);
        _this.userAttack = new TextField('Attck:' + player._attack, 240, 0, 20);
        _this.userEquipment = new TextField('装备: ', 400, 0, 20);
        _this.bagButton = new Bitmap(750, 465, bagButton);
        _this.EscButton = new Bitmap(820, 465, EscButton);
        _this.SkillButton = new Bitmap(680, 465, SkillButton);
        _this.bloodUI = new Bitmap(0, 0, bloodUI);
        _this.bloodUI2 = new Bitmap(95, 3, bloodUI2);
        _this.userCoin = new TextField('' + player.coin, 245, 9, 20);
        _this.userDiamond = new TextField('' + player.diamond, 350, 9, 20);
        _this.currentEXP = new TextField('' + player.currentEXP, 380, 9, 20);
        _this.needEXP = new TextField('' + player.needEXP, 420, 9, 20);
        _this.addChild(_this.userName);
        _this.addChild(_this.userLevel);
        // this.addChild(this.userAttack);
        // this.addChild(this.userEquipment);
        _this.addChild(_this.bagButton);
        _this.addChild(_this.SkillButton);
        _this.addChild(_this.EscButton);
        _this.addChild(_this.bloodUI);
        _this.addChild(_this.bloodUI2);
        _this.addChild(_this.userCoin);
        _this.addChild(_this.userDiamond);
        _this.addChild(_this.currentEXP);
        _this.addChild(_this.needEXP);
        _this.bagButton.addEventListener('onClick', function (eventData) {
            baManager.openBag();
        });
        player.addEventListener('updateUserInfo', function (eventData) {
            // if (player.currentEXP >= player.needEXP) {
            //     player.level++;
            //     //TODO升级提升血量 攻击力
            //     player.currentEXP -= player.needEXP;
            //     player.needEXP *= 1.2
            // }
            _this.userLevel.text = '' + player.level;
            _this.currentEXP.text = '' + player.currentEXP;
            _this.needEXP.text = '' + player.needEXP;
            _this.userCoin.text = '' + player.coin;
            // this.userAttack.text = 'Attck:' + player._attack;
            // let equipments: string = '';
            // for (let item of player.mounthedEquipment) {
            //     equipments += item.name.toString();
            // }
            // this.userEquipment.text = '装备: ' + equipments;
        });
        _this.SkillButton.addEventListener('onClick', function (eventData) {
            _this.skillUI = new skillBoxUI(0, 0);
            skillBoxContainer.addChild(_this.skillUI);
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
        _this.bagOnButton = new Bitmap(327, 246, bagOnUI);
        _this.bagOffButton = new Bitmap(398, 246, bagOffUI);
        _this.bagDownButton = new Bitmap(45, 50, bagDownUI);
        _this.bagRightButton = new Bitmap(278, 253, bagRightUI);
        _this.bagLeftButton = new Bitmap(183, 253, bagLeftUI);
        _this.bagOtherButton = new Bitmap(73, 252, bagOtherUI);
        _this.bagWeaponButton = new Bitmap(73, 87, bagWeaponUI);
        _this.bagArmorButton = new Bitmap(73, 142, bagArmorUI);
        _this.bagConsumableButton = new Bitmap(75, 197, bagConsumableUI);
        //装备栏
        _this.weaponText = new TextField(player.mounthedEquipment[0].name, 128, 330, 15);
        _this.clothText = new TextField(player.mounthedEquipment[1].name, 128, 358, 15);
        _this.watchText = new TextField(player.mounthedEquipment[2].name, 128, 388, 15);
        _this.trousersText = new TextField(player.mounthedEquipment[3].name, 332, 331, 15);
        _this.phoneText = new TextField(player.mounthedEquipment[4].name, 332, 359, 15);
        _this.shoesText = new TextField(player.mounthedEquipment[5].name, 332, 388, 15);
        //背包栏
        _this.equipment1Text = new TextField(baManager.getNowEquipment(0), 174, 84, 15);
        _this.equipment2Text = new TextField(baManager.getNowEquipment(1), 174, 116, 15);
        _this.equipment3Text = new TextField(baManager.getNowEquipment(2), 174, 149, 15);
        _this.equipment4Text = new TextField(baManager.getNowEquipment(3), 174, 182, 15);
        _this.equipment5Text = new TextField(baManager.getNowEquipment(4), 174, 215, 15);
        _this.pageText = new TextField((baManager.nowPage + 1).toString(), 220, 246, 26);
        //装备信息栏
        var str = ['名称：', '品质:', '部位：', '加血：', '攻击力：', '暴击：'];
        _this.equipmentMultiInfoText = new MultiTextField(str, 327, 125, 12, 5);
        //人物属性显示
        player.changeEquipments();
        _this.attackText = new TextField(player._attack.toString(), 102, 453, 15);
        _this.criticalPerText = new TextField(player._criticalPer.toString(), 183, 453, 15);
        _this.charmText = new TextField(player._charm.toString(), 262, 453, 15);
        _this.hpText = new TextField(player._hp.toString(), 336, 453, 15);
        _this.mpText = new TextField(player._mp.toString(), 420, 453, 15);
        _this.addChild(_this.infoPanel);
        _this.addChild(_this.bagOnButton);
        _this.addChild(_this.bagOffButton);
        _this.addChild(_this.bagDownButton);
        _this.addChild(_this.bagRightButton);
        _this.addChild(_this.bagLeftButton);
        _this.addChild(_this.bagOtherButton);
        _this.addChild(_this.bagWeaponButton);
        _this.addChild(_this.bagArmorButton);
        _this.addChild(_this.bagConsumableButton);
        _this.addChild(_this.weaponText);
        _this.addChild(_this.clothText);
        _this.addChild(_this.watchText);
        _this.addChild(_this.trousersText);
        _this.addChild(_this.phoneText);
        _this.addChild(_this.shoesText);
        _this.addChild(_this.equipment1Text);
        _this.addChild(_this.equipment2Text);
        _this.addChild(_this.equipment3Text);
        _this.addChild(_this.equipment4Text);
        _this.addChild(_this.equipment5Text);
        _this.addChild(_this.pageText);
        _this.addChild(_this.equipmentMultiInfoText);
        _this.addChild(_this.attackText);
        _this.addChild(_this.criticalPerText);
        _this.addChild(_this.charmText);
        _this.addChild(_this.hpText);
        _this.addChild(_this.mpText);
        _this.bagOnButton.addEventListener("onClick", function (eventData) {
            baManager.bagOn();
            baManager.getNowEquipment(0);
        });
        _this.bagOffButton.addEventListener("onClick", function (eventData) {
            baManager.bagOff();
        });
        _this.bagDownButton.addEventListener("onClick", function (eventData) {
            baManager.bagDown();
        });
        _this.bagRightButton.addEventListener("onClick", function (eventData) {
            baManager.bagRight();
        });
        _this.bagLeftButton.addEventListener("onClick", function (eventData) {
            baManager.bagLeft();
        });
        _this.bagOtherButton.addEventListener("onClick", function (eventData) {
            baManager.bagOther();
        });
        _this.bagWeaponButton.addEventListener("onClick", function (eventData) {
            baManager.bagWeapon();
        });
        _this.bagArmorButton.addEventListener("onClick", function (eventData) {
            baManager.bagArmor();
        });
        _this.bagConsumableButton.addEventListener("onClick", function (eventData) {
            baManager.bagConsumable();
        });
        _this.equipment1Text.addEventListener("onClick", function (eventData) {
            _this.changeEquipmentInfo(0);
        });
        _this.equipment2Text.addEventListener("onClick", function (eventData) {
            _this.changeEquipmentInfo(1);
        });
        _this.equipment3Text.addEventListener("onClick", function (eventData) {
            _this.changeEquipmentInfo(2);
        });
        _this.equipment4Text.addEventListener("onClick", function (eventData) {
            _this.changeEquipmentInfo(3);
        });
        _this.equipment5Text.addEventListener("onClick", function (eventData) {
            _this.changeEquipmentInfo(4);
        });
        _this.weaponText.addEventListener("onClick", function (ecentData) {
            baManager.changeNowMounthedEquipment(0);
        });
        _this.clothText.addEventListener("onClick", function (ecentData) {
            baManager.changeNowMounthedEquipment(1);
        });
        _this.watchText.addEventListener("onClick", function (ecentData) {
            baManager.changeNowMounthedEquipment(2);
        });
        _this.trousersText.addEventListener("onClick", function (ecentData) {
            baManager.changeNowMounthedEquipment(3);
        });
        _this.phoneText.addEventListener("onClick", function (ecentData) {
            baManager.changeNowMounthedEquipment(4);
        });
        _this.shoesText.addEventListener("onClick", function (ecentData) {
            baManager.changeNowMounthedEquipment(5);
        });
        return _this;
    }
    bagUI.prototype.changeEquipmentInfo = function (num) {
        if (baManager.nowEquipment) {
            baManager.changeNowEquipment(num);
            this.deleteChild(this.equipmentMultiInfoText);
            var equipmentIfo = ['名称：' + baManager.nowEquipment.name, '品质：' + baManager.nowEquipment.quality,
                '部位：' + baManager.nowEquipment.posID, '血量：+' + baManager.nowEquipment.health,
                '攻击力：+' + baManager.nowEquipment.attack, '暴击：+' + baManager.nowEquipment.criticalPer + '%'];
            this.equipmentMultiInfoText = new MultiTextField(equipmentIfo, 327, 125, 12, 5);
            this.addChild(this.equipmentMultiInfoText);
            this.dispatchEvent('updateBag', player);
        }
    };
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
        //战斗名字表现
        _this.playerNameText = new TextField("" + _this.player.name, 160, 80, 30);
        _this.enemyNameText = new TextField('this.enemy.name', 380, 80, 30);
        //战斗角色表现
        _this.playerImg = new Bitmap(120, 120, player.view.img);
        //战斗人物属性
        _this.playerAtkText = new TextField("" + player._attack, 150, 375, 30);
        _this.playerCriText = new TextField("" + player._criticalPer, 150, 420, 30);
        _this.playerHpText = new TextField("" + player._hp, 175, 250, 20);
        _this.enemyHpText = new TextField("", 410, 250, 20);
        _this.skillButtonGroup = [];
        _this.skillIDGroup = [];
        _this.index = 0;
        _this.index = 0;
        // super(58, 64);
        _this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        _this.infoPanel = new Bitmap(42, 48, battlePanelInfo);
        _this.backGround = new Bitmap(42, 48, battlePanelBgImg);
        //TODO 技能初始化
        _this.attackButton = new Bitmap(220, 375, battleAttackButton1);
        _this.skillButton1 = new Bitmap(220, 425, battleAttackButton1);
        _this.skillButton2 = new Bitmap(345, 375, battleAttackButton1);
        _this.skillButton3 = new Bitmap(345, 425, battleAttackButton1);
        _this.skillButtonGroup.push(_this.skillButton1);
        _this.skillButtonGroup.push(_this.skillButton2);
        _this.skillButtonGroup.push(_this.skillButton3);
        _this.escapeButton = new Bitmap(475, 370, battleEscapeImg);
        _this.itemButton = new Bitmap(475, 420, battleItemImg);
        for (var i = 0; i < _this.player.skill.length; i++) {
            switch (player.skill[i].id) {
                case 1:
                    _this.skillButtonGroup[i].img = skillEmptyImg;
                    _this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 2:
                    _this.skillButtonGroup[i].img = skillSabiImg;
                    _this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 3:
                    _this.skillButtonGroup[i].img = skillCaihuaImg;
                    _this.skillIDGroup[i] = player.skill[i].id;
                    break;
            }
        }
        _this.addChild(_this.blackMask);
        _this.addChild(_this.infoPanel);
        _this.addChild(_this.backGround);
        _this.addChild(_this.textGroup);
        _this.addChild(_this.attackButton);
        _this.addChild(_this.playerNameText);
        _this.addChild(_this.enemyNameText);
        _this.addChild(_this.playerAtkText);
        _this.addChild(_this.playerCriText);
        _this.addChild(_this.playerHpText);
        _this.addChild(_this.enemyHpText);
        _this.addChild(_this.playerImg);
        _this.addChild(_this.skillButton1);
        _this.addChild(_this.skillButton2);
        _this.addChild(_this.skillButton3);
        _this.addChild(_this.escapeButton);
        _this.addChild(_this.itemButton);
        _this.attackButton.addEventListener("onClick", function (eventData) {
            batManager.fightOneTime(player, _this.enemy, 0); //普通攻击ID为0
        });
        _this.skillButton1.addEventListener("onClick", function (eventData) {
            console.log(_this.skillIDGroup[0]);
            batManager.fightOneTime(player, _this.enemy, _this.skillIDGroup[0]);
        });
        _this.skillButton2.addEventListener("onClick", function (eventData) {
            console.log(_this.skillIDGroup[1]);
            batManager.fightOneTime(player, _this.enemy, _this.skillIDGroup[1]);
        });
        _this.skillButton3.addEventListener("onClick", function (eventData) {
            console.log(_this.skillIDGroup[2]);
            batManager.fightOneTime(player, _this.enemy, _this.skillIDGroup[2]);
        });
        _this.escapeButton.addEventListener('onClick', function (eventData) {
            var ran = Math.random() * 100;
            if (ran <= 50 + player._level - _this.enemy.level) { //逃跑几率为50% + 人物等级 - 怪物等级
                batManager.dispatchEvent("backSceneLose", null);
            }
            else {
                batManager.dispatchEvent('playerDealDamage', 0);
                batManager.fightOneTime(player, _this.enemy, 100); //此处逃跑逻辑实现为不提供对应技能类型，因此不造成伤害。
            }
        });
        _this.itemButton.addEventListener('onClick', function (eventData) {
        });
        batManager.addEventListener('playerBattleStart', function (player) {
            _this.player = player;
        });
        batManager.addEventListener('enemyBattleStart', function (enemy) {
            _this.enemy = enemy;
            _this.enemyNameText.text = enemy.name;
            _this.enemyImg = new Bitmap(355, 120, _this.enemy.view.img);
            _this.enemyHpText.text = '' + enemy.hp;
            _this.addChild(_this.enemyImg);
        });
        batManager.addEventListener('playerDealDamage', function (damage) {
            var textField = new TextField(_this.player.name + " 对 " + _this.enemy.name + " 造成 " + damage + " 点伤害！", 0, _this.index * 20, 15);
            if (damage == 0) {
                textField = new TextField(_this.player.name + " 逃跑失败辣！", 0, _this.index * 20, 15);
            }
            else {
                textField = new TextField(_this.player.name + " 对 " + _this.enemy.name + " 造成 " + damage + " 点伤害！", 0, _this.index * 20, 15);
            }
            _this.enemyHpText.text = '' + _this.enemy.hp;
            _this.textGroup.addChild(textField);
            _this.index++;
        });
        batManager.addEventListener('enemyDealDamage', function (damage) {
            var textField = new TextField("", 0, _this.index * 20, 15);
            if (damage > 0) {
                textField = new TextField(_this.enemy.name + " 对 " + _this.player.name + " 造成 " + damage + " 点伤害！", 0, _this.index * 20, 15);
            }
            else {
                textField.text = _this.player.name + " 吸了 " + -damage + " 点血！";
            }
            if (player._hp <= 0) {
                _this.playerHpText.text = "0";
            }
            else {
                _this.playerHpText.text = "" + player._hp;
            }
            _this.textGroup.addChild(textField);
            _this.index++;
            _this.indexJudge();
        });
        batManager.addEventListener('criticalHit', function (eventData) {
            var textField = new TextField(_this.player.name + " 暴击辣！", 0, _this.index * 20, 15);
            _this.textGroup.addChild(textField);
            _this.index++;
        });
        batManager.addEventListener('thisEnemyDie', function (eventData) {
            var textField = new TextField(_this.enemy.name + " 被 " + _this.player.name + " 打飞辣！", 0, _this.index * 20, 15);
            _this.textGroup.addChild(textField);
            _this.index++;
            _this.indexJudge();
            _this.attackButton.deleteAllEventListener();
            for (var i = 0; i < _this.skillButtonGroup.length; i++) {
                _this.skillButtonGroup[i].deleteAllEventListener();
            }
        });
        batManager.addEventListener('playerDie', function (eventData) {
            var textField = new TextField(_this.player.name + " 被 " + _this.enemy.name + " 打飞辣！", 0, _this.index * 20, 15);
            _this.textGroup.addChild(textField);
            _this.index++;
            _this.indexJudge();
            _this.attackButton.deleteAllEventListener();
            for (var i = 0; i < _this.skillButtonGroup.length; i++) {
                _this.skillButtonGroup[i].deleteAllEventListener();
            }
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
        _this.dropTextGroup = new DisplayObjectContainer(310, 270);
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
        // this.backButton.deleteAllEventListener();
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
    function battleEndLoseUI(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        _this.backGround = new Bitmap(254, 104, battleEndLoseBGImg);
        _this.backButton = new Bitmap(500, 325, backButtonImg);
        _this.addChild(_this.backGround);
        _this.addChild(_this.backButton);
        _this.backButton.addEventListener("onClick", function (eventData) {
            batManager.dispatchEvent("backSceneLose", null);
        });
        return _this;
    }
    return battleEndLoseUI;
}(DisplayObjectContainer));
/**
 * 技能栏UI
 */
var skillBoxUI = /** @class */ (function (_super) {
    __extends(skillBoxUI, _super);
    function skillBoxUI(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.backGround = new Bitmap(225, 25, skillBoxBGImg);
        _this.closeButton = new Bitmap(225, 25, skillBoxCloseImg);
        _this.skillTextGroup = new DisplayObjectContainer(395, 20);
        // this.backButton = new Bitmap(500, 325, backButtonImg);
        _this.descriptionText = new TextField("", 525, 100, 20); //TODO 描述换行
        _this.addChild(_this.backGround);
        _this.addChild(_this.closeButton);
        _this.addChild(_this.skillTextGroup);
        _this.addChild(_this.descriptionText);
        _this.closeButton.addEventListener('onClick', function () {
            _this.deleteAll();
        });
        var _loop_1 = function (i) {
            this_1.skillText = new TextField(skillArray[i].name, 0, (i - 1) * 33, 25);
            this_1.skillText.addEventListener('onClick', function () {
                _this.descriptionText.text = skillArray[i].description;
            });
            this_1.skillTextGroup.addChild(this_1.skillText);
        };
        var this_1 = this;
        for (var i = 2; i < skillArray.length; i++) {
            _loop_1(i);
        }
        return _this;
    }
    return skillBoxUI;
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
