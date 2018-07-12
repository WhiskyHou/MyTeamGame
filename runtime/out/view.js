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
    //
    function UserInfoUI(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.bloodUI = new Bitmap(0, 0, bloodUI);
        _this.userCoinUI = new Bitmap(350, 20, userCoinUI);
        _this.userDiamondUI = new Bitmap(500, 20, userDiamondUI);
        _this.userName = new TextField(player.name, 130, 12, 20);
        _this.userLevel = new TextField('' + player.level, 54, 91, 20);
        _this.userCoin = new TextField('' + player.coin, 390, 20, 25);
        _this.userDiamond = new TextField('' + player.diamond, 545, 20, 25);
        _this.currentEXP = new TextField('' + player.currentEXP, 150, 90, 20);
        _this.needEXP = new TextField('/    ' + player.needEXP, 190, 90, 20);
        _this.HP = new TextField("" + player._hp + " / " + player.maxHP, 160, 42, 20);
        _this.MP = new TextField("" + player._mp + " / " + player.maxMp, 150, 67, 20);
        //
        _this.bagButton = new Bitmap(750, 475, bagButton);
        _this.EscButton = new Bitmap(820, 475, EscButton);
        _this.SkillButton = new Bitmap(680, 475, SkillButton);
        _this.missionButton = new Bitmap(610, 475, MissionButton);
        //
        _this.addChild(_this.bloodUI);
        _this.addChild(_this.userCoinUI);
        _this.addChild(_this.userDiamondUI);
        _this.addChild(_this.userName);
        _this.addChild(_this.userLevel);
        _this.addChild(_this.userCoin);
        _this.addChild(_this.userDiamond);
        _this.addChild(_this.currentEXP);
        _this.addChild(_this.needEXP);
        _this.addChild(_this.HP);
        _this.addChild(_this.MP);
        //
        _this.addChild(_this.bagButton);
        _this.addChild(_this.SkillButton);
        _this.addChild(_this.EscButton);
        _this.addChild(_this.missionButton);
        //16558
        _this.bagButton.addEventListener('onClick', function (eventData) {
            baManager.openBag();
            clickaudio.play();
        });
        _this.SkillButton.addEventListener('onClick', function (eventData) {
            _this.skillUI = new skillBoxUI(0, 0);
            skillBoxContainer.addChild(_this.skillUI);
            clickaudio.play();
            _this.skillUI.hasOn = true;
        });
        _this.missionButton.addEventListener('onClick', function (eventData) {
            _this.missionUI = new MissionUI(0, 0);
            missionBoxContainer.addChild(_this.missionUI);
            clickaudio.play();
            missionHasOn = true;
        });
        _this.EscButton.addEventListener('onClick', function (eventData) {
            _this.settingUI = new SettingUI(0, 0);
            settingBoxContainer.addChild(_this.settingUI);
            setHasOn = true;
            clickaudio.play();
        });
        var missionHasOn = false;
        var setHasOn = false;
        var skillHasOn = false;
        //26558
        inputManager.addEventListener('L', function () {
            if (!_this.missionUI) {
                _this.missionUI = new MissionUI(0, 0);
                missionBoxContainer.addChild(_this.missionUI);
                clickaudio.play();
            }
            else {
                if (!_this.missionUI.hasOn) {
                    _this.missionUI = new MissionUI(0, 0);
                    missionBoxContainer.addChild(_this.missionUI);
                    clickaudio.play();
                    _this.missionUI.hasOn = true;
                }
                else {
                    missionBoxContainer.deleteAll();
                    _this.missionUI.hasOn = false;
                }
            }
        });
        inputManager.addEventListener('O', function () {
            if (!_this.settingUI) {
                _this.settingUI = new SettingUI(0, 0);
                settingBoxContainer.addChild(_this.settingUI);
                clickaudio.play();
            }
            else {
                if (!_this.settingUI.hasOn) {
                    _this.settingUI = new SettingUI(0, 0);
                    settingBoxContainer.addChild(_this.settingUI);
                    clickaudio.play();
                    _this.settingUI.hasOn = true;
                }
                else {
                    settingBoxContainer.deleteAll();
                    _this.settingUI.hasOn = false;
                }
            }
        });
        inputManager.addEventListener('K', function () {
            if (!_this.skillUI) {
                _this.skillUI = new skillBoxUI(0, 0);
                skillBoxContainer.addChild(_this.skillUI);
                clickaudio.play();
            }
            else {
                if (!_this.skillUI.hasOn) {
                    _this.skillUI = new skillBoxUI(0, 0);
                    skillBoxContainer.addChild(_this.skillUI);
                    clickaudio.play();
                    _this.skillUI.hasOn = true;
                }
                else {
                    skillBoxContainer.deleteAll();
                    _this.skillUI.hasOn = false;
                }
            }
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
            _this.needEXP.text = '/   ' + player.needEXP;
            _this.userCoin.text = '' + player.coin;
            // this.userAttack.text = 'Attck:' + player._attack;
            // let equipments: string = '';
            // for (let item of player.mounthedEquipment) {
            //     equipments += item.name.toString();
            // }
            // this.userEquipment.text = '装备: ' + equipments;
            _this.deleteChild(_this.HP);
            _this.deleteChild(_this.MP);
            _this.HP = new TextField("" + player._hp + " / " + player.maxHP, 160, 42, 20);
            _this.MP = new TextField("" + player._mp + " / " + player.maxMp, 150, 67, 20);
            _this.addChild(_this.HP);
            _this.addChild(_this.MP);
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
 * 任务界面UI
 */
var MissionUI = /** @class */ (function (_super) {
    __extends(MissionUI, _super);
    function MissionUI(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        _this.missionTextGroup = new DisplayObjectContainer(0, 0);
        _this.hasOn = false;
        _this.hasOn = true;
        _this.MissionBackGround = new Bitmap(225, 65, missionImg);
        _this.closeButton = new Bitmap(215, 55, missionCloseImg);
        _this.addChild(_this.blackMask);
        _this.addChild(_this.MissionBackGround);
        _this.addChild(_this.closeButton);
        _this.addChild(_this.missionTextGroup);
        _this.closeButton.addEventListener('onClick', function () {
            _this.deleteAll();
            clickaudio.play();
        });
        _this.updateMissionText();
        inputManager.addEventListener("Esc", function (eventData) {
            _this.deleteAll();
        });
        return _this;
    }
    MissionUI.prototype.updateMissionText = function () {
        this.missionTextGroup.deleteAll();
        for (var i = 0; i < missionManager.missions.length; i++) {
            if (missionManager.missions[i].status == MissionStatus.DURRING) {
                var missionText = new TextField(missionManager.missions[i].name, 375, 100, 40);
                for (var b = 0; b < missionManager.missions[i].canAcceptContent.length; b++) {
                    var missionAcceptText = new TextField(missionManager.missions[i].canAcceptContent[b], 390, 180 + 25 * b, 20);
                    this.missionTextGroup.addChild(missionAcceptText);
                }
                this.missionTextGroup.addChild(missionText);
                return;
            }
        }
    };
    return MissionUI;
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
        _this.blackMask = new Bitmap(-178, -14, battlePanelBlackMask);
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
        var str = ['名称：', '品质:', '部位：', '血量：', '攻击力：', '暴击：'];
        _this.equipmentMultiInfoText = new MultiTextField(str, 327, 125, 12, 5);
        //人物属性显示
        player.changeEquipments();
        _this.attackText = new TextField(player._attack.toString(), 102, 453, 15);
        _this.criticalPerText = new TextField(player._criticalPer.toString(), 183, 453, 15);
        _this.charmText = new TextField(player._charm.toString(), 262, 453, 15);
        _this.hpText = new TextField(player.maxHP.toString(), 336, 453, 15);
        _this.mpText = new TextField(player.maxMp.toString(), 420, 453, 15);
        _this.addChild(_this.blackMask);
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
            clickaudio.play();
        });
        _this.bagOffButton.addEventListener("onClick", function (eventData) {
            baManager.bagOff();
            clickaudio.play();
        });
        _this.bagDownButton.addEventListener("onClick", function (eventData) {
            baManager.bagDown();
            clickaudio.play();
        });
        _this.bagRightButton.addEventListener("onClick", function (eventData) {
            baManager.bagRight();
        });
        _this.bagLeftButton.addEventListener("onClick", function (eventData) {
            baManager.bagLeft();
        });
        _this.bagOtherButton.addEventListener("onClick", function (eventData) {
            baManager.bagOther();
            clickaudio.play();
        });
        _this.bagWeaponButton.addEventListener("onClick", function (eventData) {
            baManager.bagWeapon();
            clickaudio.play();
        });
        _this.bagArmorButton.addEventListener("onClick", function (eventData) {
            baManager.bagArmor();
            clickaudio.play();
        });
        _this.bagConsumableButton.addEventListener("onClick", function (eventData) {
            baManager.bagConsumable();
            clickaudio.play();
        });
        _this.equipment1Text.addEventListener("onClick", function (eventData) {
            baManager.changeNowEquipment(0);
            _this.changeEquipmentInfo(baManager.nowEquipment);
            clickaudio.play();
        });
        _this.equipment2Text.addEventListener("onClick", function (eventData) {
            baManager.changeNowEquipment(1);
            _this.changeEquipmentInfo(baManager.nowEquipment);
            clickaudio.play();
        });
        _this.equipment3Text.addEventListener("onClick", function (eventData) {
            baManager.changeNowEquipment(2);
            _this.changeEquipmentInfo(baManager.nowEquipment);
            clickaudio.play();
        });
        _this.equipment4Text.addEventListener("onClick", function (eventData) {
            baManager.changeNowEquipment(3);
            _this.changeEquipmentInfo(baManager.nowEquipment);
            clickaudio.play();
        });
        _this.equipment5Text.addEventListener("onClick", function (eventData) {
            baManager.changeNowEquipment(4);
            _this.changeEquipmentInfo(baManager.nowEquipment);
            clickaudio.play();
        });
        _this.weaponText.addEventListener("onClick", function (ecentData) {
            baManager.changeNowMounthedEquipment(0);
            _this.changeEquipmentInfo(baManager.nowMounthedEquipment);
            clickaudio.play();
        });
        _this.clothText.addEventListener("onClick", function (ecentData) {
            baManager.changeNowMounthedEquipment(1);
            _this.changeEquipmentInfo(baManager.nowMounthedEquipment);
            clickaudio.play();
        });
        _this.watchText.addEventListener("onClick", function (ecentData) {
            baManager.changeNowMounthedEquipment(2);
            _this.changeEquipmentInfo(baManager.nowMounthedEquipment);
            clickaudio.play();
        });
        _this.trousersText.addEventListener("onClick", function (ecentData) {
            baManager.changeNowMounthedEquipment(3);
            _this.changeEquipmentInfo(baManager.nowMounthedEquipment);
            clickaudio.play();
        });
        _this.phoneText.addEventListener("onClick", function (ecentData) {
            baManager.changeNowMounthedEquipment(4);
            _this.changeEquipmentInfo(baManager.nowMounthedEquipment);
            clickaudio.play();
        });
        _this.shoesText.addEventListener("onClick", function (ecentData) {
            baManager.changeNowMounthedEquipment(5);
            _this.changeEquipmentInfo(baManager.nowMounthedEquipment);
            clickaudio.play();
        });
        return _this;
    }
    bagUI.prototype.changeEquipmentInfo = function (equip) {
        this.deleteChild(this.equipmentMultiInfoText);
        var equipmentIfo = ['名称：' + equip.name, '品质：' + equip.quality,
            '部位：' + equip.posID, '血量：+' + equip.health,
            '攻击力：+' + equip.attack, '暴击：+' + equip.criticalPer + '%'];
        this.equipmentMultiInfoText = new MultiTextField(equipmentIfo, 327, 125, 12, 5);
        this.addChild(this.equipmentMultiInfoText);
        this.dispatchEvent('updateBag', player);
    };
    return bagUI;
}(DisplayObjectContainer));
/**
 * 商店UI
 */
var shopUI = /** @class */ (function (_super) {
    __extends(shopUI, _super);
    function shopUI(x, y) {
        var _this = 
        //super(x, y);
        _super.call(this, 58, 64) || this;
        _this.player = player;
        _this.infoPanel = new Bitmap(73, 65, Resource.get('shopUI'));
        _this.shopDownButton = new Bitmap(65, 50, Resource.get('shopcloseUI'));
        _this.shopWQ = new Bitmap(195, 100, Resource.get('shopUIwq'));
        _this.shopFJ = new Bitmap(195, 170, Resource.get('shopUIfj'));
        _this.shopXHP = new Bitmap(195, 240, Resource.get('shopUIxhp'));
        _this.shopJN = new Bitmap(195, 310, Resource.get('shopUIjn'));
        _this.shopR = new Bitmap(435, 260, Resource.get('shopUIR'));
        _this.shopL = new Bitmap(350, 260, Resource.get('shopUIL'));
        _this.shopBuy = new Bitmap(338, 300, Resource.get('shopUIbuy'));
        _this.ShopText1 = new TextField(shpManager.getNowProduct(0), 352, 88, 20).centered();
        _this.ShopText2 = new TextField(shpManager.getNowProduct(1), 352, 120, 20).centered();
        _this.ShopText3 = new TextField(shpManager.getNowProduct(2), 352, 154, 20).centered();
        _this.ShopText4 = new TextField(shpManager.getNowProduct(3), 352, 187, 20).centered();
        _this.ShopText5 = new TextField(shpManager.getNowProduct(4), 352, 220, 20).centered();
        _this.ShopPage = new TextField((shpManager.nowPage + 1).toString(), 380, 250, 30);
        _this.productMultiInfoText = new MultiTextField(shpManager.getNowProductInfo(shpManager.nowNumber), 200, 430, 15, 5);
        _this.ShopCoin = new TextField('100', 438, 453, 20);
        var blackMask = new Bitmap(-178, -14, battlePanelBlackMask);
        _this.addChild(blackMask);
        _this.addChild(_this.infoPanel);
        _this.addChild(_this.shopDownButton);
        _this.addChild(_this.shopWQ);
        _this.addChild(_this.shopFJ);
        _this.addChild(_this.shopXHP);
        _this.addChild(_this.shopJN);
        _this.addChild(_this.shopR);
        _this.addChild(_this.shopL);
        _this.addChild(_this.shopBuy);
        _this.addChild(_this.ShopText1);
        _this.addChild(_this.ShopText2);
        _this.addChild(_this.ShopText3);
        _this.addChild(_this.ShopText4);
        _this.addChild(_this.ShopText5);
        _this.addChild(_this.ShopPage);
        _this.addChild(_this.productMultiInfoText);
        _this.addChild(_this.ShopCoin);
        _this.shopDownButton.addEventListener("onClick", function (eventData) {
            shpManager.shopDown();
            clickaudio.play();
        });
        _this.shopWQ.addEventListener("onClick", function (eventData) {
            shpManager.changeNowGroup(0);
            clickaudio.play();
        });
        _this.shopFJ.addEventListener("onClick", function (eventData) {
            shpManager.changeNowGroup(1);
            clickaudio.play();
        });
        _this.shopXHP.addEventListener("onClick", function (eventData) {
            shpManager.changeNowGroup(2);
            clickaudio.play();
        });
        _this.shopJN.addEventListener("onClick", function (eventData) {
            shpManager.changeNowGroup(3);
            clickaudio.play();
        });
        _this.shopL.addEventListener("onClick", function (eventData) {
            shpManager.shopLeft();
        });
        _this.shopR.addEventListener("onClick", function (eventData) {
            shpManager.shopRight();
        });
        _this.shopBuy.addEventListener("onClick", function (eventData) {
            shpManager.shopBuy();
        });
        _this.ShopText1.addEventListener("onClick", function (eventData) {
            shpManager.changeNowProduct(0);
            clickaudio.play();
        });
        _this.ShopText2.addEventListener("onClick", function (eventData) {
            shpManager.changeNowProduct(1);
            clickaudio.play();
        });
        _this.ShopText3.addEventListener("onClick", function (eventData) {
            shpManager.changeNowProduct(2);
            clickaudio.play();
        });
        _this.ShopText4.addEventListener("onClick", function (eventData) {
            shpManager.changeNowProduct(3);
            clickaudio.play();
        });
        return _this;
    }
    shopUI.prototype.changeEquipmentInfo = function (equip) {
        // this.deleteChild(this.productMultiInfoText)
        // let equipmentIfo: Array<string> = ['名称：' + equip.name, '品质：' + equip.quality,
        // '部位：' + equip.posID, '血量：+' + equip.health,
        // '攻击力：+' + equip.attack, '暴击：+' + equip.criticalPer + '%'];
        // this.productMultiInfoText = new MultiTextField(equipmentIfo, 327, 125, 12, 5)
        // this.addChild(this.productMultiInfoText)
        // this.dispatchEvent('updateBag', player)
    };
    return shopUI;
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
        _this.enemyImg = new Bitmap(355, 120, player.view.img);
        //战斗人物属性
        _this.playerAtkText = new TextField("" + player._attack, 150, 375, 30);
        _this.playerCriText = new TextField("" + player._criticalPer, 150, 420, 30);
        _this.playerHpText = new TextField("" + player._hp + " / " + _this.player.maxHP, 175, 273, 20);
        _this.playerMpText = new TextField("" + _this.player._mp + " / " + _this.player.maxMp, 173, 314, 20);
        _this.enemyHpText = new TextField("", 390, 273, 20);
        _this.enemyMpText = new TextField("0 / 0", 390, 314, 20);
        _this.enemyMaxHP = 0;
        _this.skillButtonGroup = [];
        _this.skillIDGroup = [];
        //以下消耗品界面
        _this.itemContainer = new DisplayObjectContainer(0, 0);
        _this.itemTextGroup = new DisplayObjectContainer(0, 0);
        _this.index = 0;
        _this.consumChoiceID = 0;
        _this.index = 0;
        // super(58, 64);
        _this.hpmpaudio = new AudioPlay(HPMPAudio);
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
                    _this.skillButtonGroup[i].img = skillCaihuaImg;
                    _this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 3:
                    _this.skillButtonGroup[i].img = skillSabiImg;
                    _this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 4:
                    _this.skillButtonGroup[i].img = skillBusiImg;
                    _this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 5:
                    _this.skillButtonGroup[i].img = skillGuolaiImg;
                    _this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 6:
                    _this.skillButtonGroup[i].img = skillQishangImg;
                    _this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 7:
                    _this.skillButtonGroup[i].img = skillXixingImg;
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
        _this.addChild(_this.playerMpText);
        _this.addChild(_this.playerImg);
        _this.addChild(_this.enemyMpText);
        _this.addChild(_this.enemyImg);
        _this.addChild(_this.skillButton1);
        _this.addChild(_this.skillButton2);
        _this.addChild(_this.skillButton3);
        _this.addChild(_this.escapeButton);
        _this.addChild(_this.itemButton);
        _this.addChild(_this.itemContainer);
        _this.attackButton.addEventListener("onClick", function (eventData) {
            batManager.fightOneTime(player, _this.enemy, 0); //普通攻击ID为0
            clickaudio.play();
        });
        _this.skillButton1.addEventListener("onClick", function (eventData) {
            console.log(_this.skillIDGroup[0]);
            clickaudio.play();
            if (player.skill[0].id == 6) { //七伤拳判断血量
                if (player._hp < _this.player._attack * 0.3) {
                    var textField = new TextField("当前HP值不足以施放 " + player.skill[0].name, 0, _this.index * 20, 15);
                    _this.textGroup.addChild(textField);
                    _this.index++;
                    return;
                }
            }
            if (player._mp >= player.skill[0].mp) {
                player._mp -= player.skill[0].mp;
                _this.playerMpText.text = "" + _this.player._mp + " / " + _this.player.maxMp;
                batManager.fightOneTime(player, _this.enemy, _this.skillIDGroup[0]);
            }
            else {
                var textField = new TextField("当前MP值不足以施放 " + player.skill[0].name, 0, _this.index * 20, 15);
                _this.textGroup.addChild(textField);
                _this.index++;
            }
        });
        _this.skillButton2.addEventListener("onClick", function (eventData) {
            clickaudio.play();
            if (player.skill[1].id == 6) { //七伤拳判断血量
                if (player._hp < _this.player._attack * 0.3) {
                    var textField = new TextField("当前HP值不足以施放 " + player.skill[1].name, 0, _this.index * 20, 15);
                    _this.textGroup.addChild(textField);
                    _this.index++;
                    return;
                }
            }
            console.log(_this.skillIDGroup[1]);
            if (player._mp >= player.skill[1].mp) {
                player._mp -= player.skill[1].mp;
                _this.playerMpText.text = "" + _this.player._mp + " / " + _this.player.maxMp;
                batManager.fightOneTime(player, _this.enemy, _this.skillIDGroup[1]);
            }
            else {
                var textField = new TextField("当前MP值不足以施放 " + player.skill[1].name, 0, _this.index * 20, 15);
                _this.textGroup.addChild(textField);
                _this.index++;
            }
        });
        _this.skillButton3.addEventListener("onClick", function (eventData) {
            clickaudio.play();
            if (player.skill[2].id == 6) { //七伤拳判断血量
                if (player._hp < _this.player._attack * 0.3) {
                    var textField = new TextField("当前HP值不足以施放 " + player.skill[2].name, 0, _this.index * 20, 15);
                    _this.textGroup.addChild(textField);
                    _this.index++;
                    return;
                }
            }
            console.log(_this.skillIDGroup[2]);
            if (player._mp >= player.skill[2].mp) {
                player._mp -= player.skill[2].mp;
                _this.playerMpText.text = "" + _this.player._mp + " / " + _this.player.maxMp;
                batManager.fightOneTime(player, _this.enemy, _this.skillIDGroup[2]);
            }
            else {
                var textField = new TextField("当前MP值不足以施放 " + player.skill[2].name, 0, _this.index * 20, 15);
                _this.textGroup.addChild(textField);
                _this.index++;
            }
        });
        _this.escapeButton.addEventListener('onClick', function (eventData) {
            clickaudio.play();
            var ran = Math.random() * 100;
            console.log(ran);
            if (ran <= 50 + player._level - _this.enemy.level) { //逃跑几率为50% + 人物等级 - 怪物等级
                batManager.dispatchEvent("backSceneLose", null);
            }
            else {
                batManager.dispatchEvent('playerDealDamage', 0);
                batManager.fightOneTime(player, _this.enemy, 100); //此处逃跑逻辑实现为不提供对应技能类型，因此不造成伤害。
            }
        });
        _this.itemButton.addEventListener('onClick', function (eventData) {
            clickaudio.play();
            _this.itemBg = new Bitmap(270, 70, Resource.get('battleItemBgImg'));
            _this.itemContainer.addChild(_this.itemBg);
            _this.itemUseButton = new Bitmap(470, 165, Resource.get('battleItemUseImg'));
            _this.itemContainer.addChild(_this.itemUseButton);
            _this.itemBackButton = new Bitmap(470, 285, Resource.get('battleItemBackImg'));
            _this.itemContainer.addChild(_this.itemBackButton);
            _this.itemContainer.addChild(_this.itemTextGroup);
            _this.itemUseButton.addEventListener('onClick', function () {
                _this.hpmpaudio.play();
                _this.updateConsumCount();
                if (_this.consumChoiceID != 0) {
                    for (var i = 0; i < player.packageEquipment.length; i++) {
                        if (_this.consumChoiceID == player.packageEquipment[i].id) {
                            var con = player.packageEquipment[i];
                            con.use(function () {
                                return;
                            });
                            if (con.id == 1000) {
                                var textField = new TextField(_this.player.name + " 使用 " + player.packageEquipment[i].name + " 回复了 " + Math.floor(_this.player.maxHP * con.addHP / 100) + " 点HP！", 0, _this.index * 20, 15);
                                _this.playerHpText.text = "" + _this.player._hp + " / " + _this.player.maxHP;
                                _this.textGroup.addChild(textField);
                                _this.index++;
                            }
                            if (con.id == 1001) {
                                var textField = new TextField(_this.player.name + " 使用 " + player.packageEquipment[i].name + " 回复了 " + Math.floor(_this.player.maxMp * con.addMP / 100) + " 点MP！", 0, _this.index * 20, 15);
                                _this.textGroup.addChild(textField);
                                _this.playerMpText.text = "" + _this.player._mp + " / " + _this.player.maxMp;
                                _this.index++;
                            }
                            player.packageEquipment.splice(i, 1);
                            _this.updateConsumCount();
                            return;
                        }
                    }
                }
            });
            _this.itemBackButton.addEventListener('onClick', function () {
                clickaudio.play();
                _this.itemContainer.deleteAll();
            });
            console.log('弹出消耗品界面！');
            _this.updateConsumCount();
            //以下获取角色消耗品
        });
        batManager.addEventListener('playerBattleStart', function (player) {
            _this.player = player;
        });
        batManager.addEventListener('enemyBattleStart', function (enemy) {
            _this.enemy = enemy;
            _this.enemyMaxHP = enemy.hp;
            _this.enemyNameText.text = enemy.name;
            _this.enemyImg.img = _this.enemy.view.img;
            _this.enemyHpText.text = '' + enemy.hp + ' / ' + _this.enemyMaxHP;
            // this.addChild(this.enemyImg);
        });
        // batManager.addEventListener('playerHpUpdate', () => {
        //     this.playerHpText.text = "" + player._hp + " / " + this.player.maxHP;
        // })
        batManager.addEventListener('playerDealDamage', function (damage) {
            var textField = new TextField(_this.player.name + " 对 " + _this.enemy.name + " 造成 " + damage + " 点伤害！", 0, _this.index * 20, 15);
            if (damage == 0) {
                textField = new TextField(_this.player.name + " 逃跑失败辣！", 0, _this.index * 20, 15);
            }
            else {
                textField = new TextField(_this.player.name + " 对 " + _this.enemy.name + " 造成 " + damage + " 点伤害！", 0, _this.index * 20, 15);
            }
            _this.enemyHpText.text = '' + _this.enemy.hp + ' / ' + _this.enemyMaxHP;
            _this.textGroup.addChild(textField);
            _this.index++;
        });
        batManager.addEventListener('enemyDealDamage', function (damage) {
            var textField = new TextField("", 0, _this.index * 20, 15);
            if (damage > 0) {
                textField = new TextField(_this.enemy.name + " 对 " + _this.player.name + " 造成 " + damage + " 点伤害！", 0, _this.index * 20, 15);
            }
            else if (damage < 0) {
                textField.text = _this.player.name + " 吸了 " + -damage + " 点血！";
            }
            if (player._hp <= 0) {
                _this.playerHpText.text = "0" + " / " + _this.player.maxHP;
            }
            else {
                _this.playerHpText.text = "" + player._hp + " / " + _this.player.maxHP;
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
    battleUI.prototype.updateConsumCount = function () {
        var _this = this;
        this.itemTextGroup.deleteAll();
        var redCount = 0;
        var blueCount = 0;
        var lineCount = 0;
        for (var i = 0; i < player.packageEquipment.length; i++) {
            if (player.packageEquipment[i].id == 1000) {
                redCount++;
            }
            if (player.packageEquipment[i].id == 1001) {
                blueCount++;
            }
        }
        var red = equipManager.getEquipByID(1000);
        var blue = equipManager.getEquipByID(1001);
        if (redCount > 0) {
            var redText = new TextField(red.name + " X " + redCount, 315, 165 + 32 * lineCount, 20);
            redText.addEventListener("onClick", function () {
                clickaudio.play();
                _this.consumChoiceID = red.id;
            });
            this.itemTextGroup.addChild(redText);
            lineCount++;
        }
        if (blueCount > 0) {
            var blueText = new TextField(blue.name + " X " + blueCount, 315, 165 + 32 * lineCount, 20);
            this.itemTextGroup.addChild(blueText);
            blueText.addEventListener("onClick", function () {
                clickaudio.play();
                _this.consumChoiceID = blue.id;
            });
            lineCount++;
        }
        if (blueCount == 0 && redCount == 0) {
            this.consumChoiceID = 0;
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
        _this.hasListener = false;
        _this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        _this.backGround = new Bitmap(254, 104, battleEndBGImg);
        _this.backButton = new Bitmap(500, 353, backButtonImg);
        _this.expText = new TextField('2333', 400, 207, 20);
        _this.coinText = new TextField('111', 520, 207, 20);
        // this.addChild(this.blackMask);
        _this.addChild(_this.backGround);
        _this.addChild(_this.backButton);
        _this.addChild(_this.expText);
        _this.addChild(_this.coinText);
        _this.addChild(_this.dropTextGroup);
        // this.backButton.deleteAllEventListener();
        _this.backButton.addEventListener("onClick", function (eventData) {
            batManager.dispatchEvent("backSceneWin", null);
            clickaudio.play();
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
            clickaudio.play();
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
        _this.choosingSkillArrayNo = 0;
        _this.choosingMountedSkillArrayNo = 0;
        _this.nowChoice = 0; //1为技能栏中技能被选中，2为已装备技能被选中。
        _this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        _this.hasOn = false;
        _this.hasOn = true;
        _this.backGround = new Bitmap(225, 25, skillBoxBGImg);
        _this.closeButton = new Bitmap(225, 25, skillBoxCloseImg);
        _this.skillTextGroup = new DisplayObjectContainer(375, 20);
        // this.backButton = new Bitmap(500, 325, backButtonImg);
        _this.descriptionText = new Bitmap(508, 100, skillEmptyDesImg);
        _this.mountedSkillGroup = new DisplayObjectContainer(485, 350);
        _this.skillOnButton = new Bitmap(510, 290, bagOnUI);
        _this.skillOffButton = new Bitmap(582, 290, bagOffUI);
        _this.addChild(_this.blackMask);
        _this.addChild(_this.backGround);
        _this.addChild(_this.closeButton);
        _this.addChild(_this.skillTextGroup);
        _this.addChild(_this.descriptionText);
        _this.addChild(_this.mountedSkillGroup);
        _this.addChild(_this.skillOnButton);
        _this.addChild(_this.skillOffButton);
        _this.closeButton.addEventListener('onClick', function () {
            _this.deleteAll();
            clickaudio.play();
        });
        inputManager.addEventListener("Esc", function (eventData) {
            _this.deleteAll();
        });
        _this.skillOnButton.addEventListener('onClick', function () {
            if (_this.nowChoice == 1) {
                clickaudio.play();
                for (var i = 0; i < skillArray.length; i++) {
                    if (_this.choosingSkillArrayNo == skillArray[i].id) {
                        for (var b = 0; b < player.skill.length; b++) {
                            if (player.skill[b].id == 1) {
                                player.skill.splice(b, 1, skillArray[i]);
                                skillArray.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
                _this.skillButtonUpdate();
                _this.mountedSkillUpdate();
            }
        });
        _this.skillOffButton.addEventListener('onClick', function () {
            if (_this.nowChoice == 2) {
                clickaudio.play();
                for (var i = 0; i < player.skill.length; i++) {
                    if (_this.choosingMountedSkillArrayNo == player.skill[i].id) {
                        if (player.skill[i].id != 1) {
                            skillArray.push(player.skill[i]);
                            player.skill.splice(i, 1);
                            if (player.skill.length < 3) {
                                player.skill.push(skillEmpty);
                            }
                        }
                    }
                }
                _this.skillButtonUpdate();
                _this.mountedSkillUpdate();
            }
        });
        _this.skillButtonUpdate();
        _this.mountedSkillUpdate();
        return _this;
    }
    skillBoxUI.prototype.skillButtonUpdate = function () {
        var _this = this;
        this.skillTextGroup.deleteAll();
        var _loop_1 = function (i) {
            this_1.skillText = new TextField(skillArray[i].name, 0, (i - 1) * 33, 25);
            this_1.skillText.addEventListener('onClick', function () {
                clickaudio.play();
                _this.nowChoice = 1;
                _this.descriptionText.img = skillArray[i].description.img;
                _this.choosingSkillArrayNo = skillArray[i].id;
                console.log(_this.choosingSkillArrayNo);
            });
            this_1.skillTextGroup.addChild(this_1.skillText);
        };
        var this_1 = this;
        for (var i = 2; i < skillArray.length; i++) {
            _loop_1(i);
        }
    };
    skillBoxUI.prototype.mountedSkillUpdate = function () {
        var _this = this;
        this.mountedSkillGroup.deleteAll();
        var _loop_2 = function (i) {
            this_2.mountedSkillText = new TextField(player.skill[i].name, 0, i * 33, 25);
            this_2.mountedSkillText.addEventListener('onClick', function () {
                clickaudio.play();
                _this.nowChoice = 2;
                _this.descriptionText.img = player.skill[i].description.img;
                _this.choosingMountedSkillArrayNo = player.skill[i].id;
                console.log(_this.choosingMountedSkillArrayNo);
            });
            this_2.mountedSkillGroup.addChild(this_2.mountedSkillText);
        };
        var this_2 = this;
        for (var i = 0; i < player.skill.length; i++) {
            _loop_2(i);
        }
    };
    return skillBoxUI;
}(DisplayObjectContainer));
/**
 * 设置UI
 */
var SettingUI = /** @class */ (function (_super) {
    __extends(SettingUI, _super);
    function SettingUI(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.hasOn = false;
        _this.hasOn = true;
        _this.backGround = new Bitmap(290, 120, Resource.get('SettingUI1'));
        _this.on = new Bitmap(440, 195, Resource.get('SettingUI2'));
        _this.off = new Bitmap(500, 195, Resource.get('SettingUI3'));
        _this.backButton = new Bitmap(400, 320, Resource.get('SettingUI4'));
        _this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        _this.recharge = new Bitmap(500, 446, bagOnUI);
        _this.addChild(_this.blackMask);
        _this.addChild(_this.backGround);
        _this.addChild(_this.on);
        _this.addChild(_this.off);
        _this.addChild(_this.backButton);
        _this.addChild(_this.recharge);
        inputManager.addEventListener("Esc", function (eventData) {
            _this.deleteAll();
        });
        _this.recharge.addEventListener("rechargeInput", function (eventData) {
            _this.deleteChild(_this.recharge);
            _this.rechargeInput = new MultiTextField([], 500, 450, 20, 10).setStringByNumber("123456", 3);
            _this.addChild(_this.rechargeInput);
            clickaudio.play();
        });
        _this.backButton.addEventListener("onClick", function (eventData) {
            _this.deleteAll();
            clickaudio.play();
        });
        _this.on.addEventListener("onClick", function (eventData) {
            StartAudio.src = "assets/音效/常规/创建角色.mp3";
            CreateAudio.src = "assets/音效/常规/点一下玩一年.mp3";
            BattleAudio.src = "assets/音效/常规/战斗背景音乐.mp3";
            SucceedAudio.src = "assets/音效/常规/战斗胜利.mp3";
            FailAudio.src = "assets/音效/常规/战斗失败.mp3";
            Attack1Audio.src = "assets/音效/dnf/暴击1.mp3";
            Attack2Audio.src = "assets/音效/dnf/暴击2.mp3";
            BuyAudio.src = "assets/音效/常规/金币.mp3";
            HPMPAudio.src = "assets/音效/dnf/药水.mp3";
            MainAudio.src = "assets/音效/常规/欢快bgm.mp3";
            ClickAudio.src = "assets/音效/常规/单击.mp3";
            clickaudio.play();
            mainaudio.play();
        });
        _this.off.addEventListener("onClick", function (eventData) {
            clickaudio.play();
            StartAudio.src = "assets/音效/dnf/静音.mp3";
            CreateAudio.src = "assets/音效/dnf/静音.mp3";
            BattleAudio.src = "assets/音效/dnf/静音.mp3";
            SucceedAudio.src = "assets/音效/dnf/静音.mp3";
            FailAudio.src = "assets/音效/dnf/静音.mp3";
            Attack1Audio.src = "assets/音效/dnf/静音.mp3";
            Attack2Audio.src = "assets/音效/dnf/静音.mp3";
            BuyAudio.src = "assets/音效/dnf/静音.mp3";
            HPMPAudio.src = "assets/音效/dnf/静音.mp3";
            MainAudio.src = "assets/音效/dnf/静音.mp3";
            ClickAudio.src = "assets/音效/dnf/静音.mp3";
        });
        return _this;
    }
    return SettingUI;
}(DisplayObjectContainer));
/**
 * 制作团队UI
 */
var WorkerUI = /** @class */ (function (_super) {
    __extends(WorkerUI, _super);
    function WorkerUI(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.backGround = new Bitmap(0, 0, Resource.get('WorkerUI1'));
        _this.backButton = new Bitmap(800, 490, Resource.get('WorkerUI2'));
        _this.addChild(_this.backGround);
        _this.addChild(_this.backButton);
        _this.backButton.addEventListener("onClick", function (eventData) {
            _this.deleteAll();
            clickaudio.play();
        });
        return _this;
    }
    return WorkerUI;
}(DisplayObjectContainer));
