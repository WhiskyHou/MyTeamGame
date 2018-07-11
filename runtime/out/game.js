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
 * 资源载入
 *
 * TODO: 资源载入需要整理
 */
var van_pick_knife = document.getElementById('van_pick_knife');
var loadingImg = new Image();
loadingImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/载入界面.png';
Resource.load('./assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/载入界面.png', 'loging');
var loadingBmp = new Bitmap(0, 0, Resource.get('loging'));
var titleBGImg = new Image();
titleBGImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/开始游戏主界面 底.png';
var titleStartImg = new Image();
titleStartImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/开始游戏界面 新游戏.png';
var titleLoadImg = new Image();
titleLoadImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/开始游戏界面 载入游戏.png';
var titleWorkerImg = new Image();
titleWorkerImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/开始游戏界面 制作团队.png';
var createBGImg = new Image();
createBGImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/UI 创建角色界面背景 .png';
var createOkButtonImg = new Image();
createOkButtonImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/开始游戏.png';
var createAddButtonImg = new Image();
createAddButtonImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/加号.png';
var createMinusButtonImg = new Image();
createMinusButtonImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/减号.png';
var createStartButtonImg = new Image();
createStartButtonImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/开始游戏.png';
var bg = new Image();
bg.src = './assets/bg.png';
var van1 = new Image();
van1.src = './assets/van_stand.png';
var van2 = new Image();
van2.src = './assets/van_stand_2.png';
var knife = new Image();
knife.src = './assets/kill_dargon_knife.png';
var hp_bottle = new Image();
hp_bottle.src = './assets/hp_bottle.png';
var grassLight = new Image();
grassLight.src = './assets/grass_light.jpg';
var grassDark = new Image();
grassDark.src = './assets/grass_dark.jpg';
var tree = new Image();
tree.src = './assets/tree.png';
var wall_left = new Image();
wall_left.src = './assets/wall_left.png';
var wall_middle = new Image();
wall_middle.src = './assets/wall_middle.png';
var wall_right = new Image();
wall_right.src = './assets/wall_right.png';
var gaojianli = new Image();
gaojianli.src = './assets/gaojianli.png';
var gaojianli_head = new Image();
gaojianli_head.src = './assets/gaojianli_head.png';
var yingzheng = new Image();
yingzheng.src = './assets/yingzheng.png';
var yingzheng_head = new Image();
yingzheng_head.src = './assets/yingzheng_head.png';
var captain = new Image();
captain.src = './assets/monster.png';
var talk_window = new Image();
talk_window.src = './assets/美术素材/UI/3 对话框/UI 对话框界面 PNG/ui对话框.png  ';
var battlePanelBgImg = new Image();
battlePanelBgImg.src = './assets/美术素材/UI/战斗界面/UI 战斗界面 PNG/战斗界面模版1.png';
var battlePanelBlackMask = new Image();
battlePanelBlackMask.src = './assets/battlePanel/blackMask.png';
var battlePanelInfo = new Image();
battlePanelInfo.src = './assets/美术素材/UI/战斗界面/UI 战斗界面 PNG/战斗界面模版2.png';
var battleAttackButton1 = new Image();
battleAttackButton1.src = './assets/美术素材/UI/战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 普通攻击.png';
var battleEndBGImg = new Image();
battleEndBGImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗结算ui 成功.png';
var backButtonImg = new Image();
backButtonImg.src = './assets/美术素材/UI/战斗界面/UI 战斗界面 PNG/UI 战斗界面 返回.png';
var battleEndLoseBGImg = new Image();
battleEndLoseBGImg.src = './assets/battlePanel/战斗结算ui 失败.png';
var skillEmptyImg = new Image();
skillEmptyImg.src = './assets/美术素材/UI/战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 空.png';
Resource.load('./assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗 物品栏 底.png', 'battleItemBgImg');
Resource.load('./assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 物品栏 返回.png', 'battleItemBackImg');
Resource.load('./assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 物品栏 使用.png', 'battleItemUseImg');
var skillSabiImg = new Image();
skillSabiImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 撒币.png';
var skillCaihuaImg = new Image();
skillCaihuaImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 菜花.png';
var skillBusiImg = new Image();
skillBusiImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 不死.png';
var skillGuolaiImg = new Image();
skillGuolaiImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 过来.png';
var skillQishangImg = new Image();
skillQishangImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 七伤.png';
var skillXixingImg = new Image();
skillXixingImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 吸星.png';
var battleEscapeImg = new Image();
battleEscapeImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 逃跑.png';
var battleItemImg = new Image();
battleItemImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 物品.png';
var playerIdleImg = new Image();
playerIdleImg.src = './assets/美术素材/角色/主角/128x128 主角.png';
var bagButton = new Image();
bagButton.src = './assets/1 60x80 物品ui.png';
var EscButton = new Image();
EscButton.src = './assets/1 60x80 设置ui.png';
var SkillButton = new Image();
SkillButton.src = './assets/1 60x80 技能ui.png';
var MissionButton = new Image();
MissionButton.src = './assets/1 60x80 任务ui.png';
var bloodUI = new Image();
bloodUI.src = './assets/ui血条1.png';
var bloodUI2 = new Image();
bloodUI2.src = './assets/ui血条2.png';
var bagWindowsUI = new Image();
bagWindowsUI.src = './assets/美术素材/UI/背包界面/UI 背包 PNG/ui背包界面背景2.png';
var bagOnUI = new Image();
bagOnUI.src = './assets/美术素材/UI/背包界面/UI 背包 PNG/背包UI 装备.png';
var bagOffUI = new Image();
bagOffUI.src = './assets/美术素材/UI/背包界面/UI 背包 PNG/背包UI 卸下.png';
var bagDownUI = new Image();
bagDownUI.src = './assets/美术素材/UI/背包界面/UI 背包 PNG/UI 取消按钮.png';
var bagRightUI = new Image();
bagRightUI.src = './assets/美术素材/UI/背包界面/UI 背包 PNG/UI 翻页按钮右.png';
var bagLeftUI = new Image();
bagLeftUI.src = './assets/美术素材/UI/背包界面/UI 背包 PNG/UI 翻页按钮左.png';
var bagOtherUI = new Image();
bagOtherUI.src = './assets/美术素材/UI/背包界面/UI 背包 PNG/背包 其他.png';
var bagWeaponUI = new Image();
bagWeaponUI.src = './assets/美术素材/UI/背包界面/UI 背包 PNG/背包 武器.png';
var bagArmorUI = new Image();
bagArmorUI.src = './assets/美术素材/UI/背包界面/UI 背包 PNG/背包 防具.png';
var bagConsumableUI = new Image();
bagConsumableUI.src = './assets/美术素材/UI/背包界面/UI 背包 PNG/背包 消耗品.png';
var skillBoxBGImg = new Image();
skillBoxBGImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能界面底.png';
var skillBoxCloseImg = new Image();
skillBoxCloseImg.src = './assets/美术素材/UI/技能界面/UI 技能 PNG/UI 取消按钮.png';
var skillSabiDesImg = new Image();
skillSabiDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能介绍 撒币大法.png';
var skillCaihuaDesImg = new Image();
skillCaihuaDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能介绍 菜花宝典.png';
var skillBusiDesImg = new Image();
skillBusiDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能介绍 英雄不死.png';
var skillGuolaiDesImg = new Image();
skillGuolaiDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能介绍 你过来啊.png';
var skillQishangDesImg = new Image();
skillQishangDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能介绍 七伤拳.png';
var skillXixingDesImg = new Image();
skillXixingDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能介绍 吸星大法.png';
var skillEmptyDesImg = new Image();
skillEmptyDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能空白.png';
var Shop = new Image();
Shop.src = './assets/美术素材/场景/边缘/商店.png';
var bloodBar = new Image();
bloodBar.src = './assets/血条.png';
var playerHeadImg = new Image();
playerHeadImg.src = './assets/美术素材/角色/主角/128x128 主角.png';
var missionImg = new Image();
missionImg.src = './assets/UI 任务界面底.png';
var missionCloseImg = new Image();
missionCloseImg.src = './assets//UI 取消按钮.png';
Resource.load('./assets/美术素材/UI/10 商店界面/商店界面 PNG/商店UI界面 底.png', 'shopUI');
Resource.load('./assets/美术素材/UI/10 商店界面/商店界面 PNG/UI 取消按钮.png', 'shopcloseUI');
Resource.load('./assets/美术素材/UI/10 商店界面/商店界面 PNG/商店界面 分类选项 武器.png', 'shopUIwq');
Resource.load('./assets/美术素材/UI/10 商店界面/商店界面 PNG/商店界面 分类选项 防具.png', 'shopUIfj');
Resource.load('./assets/美术素材/UI/10 商店界面/商店界面 PNG/商店界面 分类选项 消耗品.png', 'shopUIxhp');
Resource.load('./assets/美术素材/UI/10 商店界面/商店界面 PNG/商店界面 分类选项 技能.png', 'shopUIjn');
Resource.load('./assets/美术素材/UI/10 商店界面/商店界面 PNG/UI 翻页按钮右.png', 'shopUIR');
Resource.load('./assets/美术素材/UI/10 商店界面/商店界面 PNG/UI 翻页按钮左.png', 'shopUIL');
Resource.load('./assets/美术素材/UI/10 商店界面/商店界面 PNG/商店界面 购买.png', 'shopUIbuy');
var MainAudio = new Audio();
MainAudio.src = "assets/音效/常规/欢快bgm.mp3";
var ClickAudio = new Audio();
ClickAudio.src = "assets/音效/常规/单击.mp3";
var StartAudio = new Audio();
StartAudio.src = "assets/音效/常规/创建角色.mp3";
var CreateAudio = new Audio();
CreateAudio.src = "assets/音效/常规/点一下玩一年.mp3";
var mainaudio = new AudioPlay(MainAudio);
var clickaudio = new AudioPlay(ClickAudio);
mainaudio.playOnlyOnce = false;
clickaudio.playOnlyOnce = true;
//mainaudio.playOnlyOnce = true
//mainaudioo.play()
//mainaudio.end();
/**
 * 常量
 *
 * 全局变量
 *
 * TODO: 部分需要删除整合
 */
var TILE_SIZE = 128; //TODO:还原为128
var ASSETS_PATH = "./assets/";
var ROW_NUM = 15;
var COL_NUM = 21;
var GRASS_L = 0;
var GRASS_D = 1;
var TREE = 2;
var WALL_LEFT = 3;
var WALL_MIDDLE = 4;
var WALL_RIGHT = 5;
var KILL_DARGON_KNIFE = 1;
var HP_BOTTLE = 2;
var SHOP = 3;
var NPC1 = 1;
var NPC2 = 2;
var NPC3 = 3;
var NPC4 = 4;
var NPC5 = 5;
var MONSTER = 1;
var PLAYER_INDEX_X = 0;
var PLAYER_INDEX_Y = 0;
var PLAYER_WALK_SPEED = 500;
var staticStage = stages[1];
var dynamicStage = stages[0];
var player = new User();
var map;
var missionManager = new MissionManager();
var npcManager = new NpcManager();
var monsManager = new monsterManager();
var equipManager = new EquipmentManager();
var batManager = new battleManager();
var baManager = new bagManager();
var shpManager = new shopManager();
var skillArray = [];
npcManager.init(function () {
    monsManager.init(function () {
        equipManager.init(function () {
            equipSetInit(equipManager);
            shpManager.init(function () {
            });
            missionManager.init();
        });
    });
});
batManager.addEventListener("enemyDrop", function (dropBox) {
    batEndUI.dropTextGroup.deleteAll();
    for (var i = 0; i < dropBox.length; i++) {
        var equip = void 0;
        equip = equipManager.getEquipByID(dropBox[i]);
        var textField = new TextField(equip.name, 0, 30 * i, 20);
        player.packageEquipment.push(equip);
        batEndUI.dropTextGroup.addChild(textField);
    }
    batEndUI.expText;
});
batManager.addEventListener("enemyBattleStart", function (enemy) {
    batEndUI.expText.text = '' + enemy.exp;
    batEndUI.coinText.text = '' + enemy.coin;
});
/**
 * 技能初始化(把这里当技能配置文件)
 */
var skillAttack = new Skill(0, '攻击', 0); //攻击预留
skillAttack.description = new Bitmap(0, 0, skillEmptyDesImg);
skillArray.push(skillAttack);
var skillEmpty = new Skill(1, '空', 0); //空
skillEmpty.description = new Bitmap(0, 0, skillEmptyDesImg);
skillArray.push(skillEmpty);
var skillCaihua = new Skill(2, '菜花宝典', 30);
skillCaihua.description = new Bitmap(0, 0, skillCaihuaDesImg);
skillArray.push(skillCaihua);
var skillSabi = new Skill(3, '撒币大法', 20);
skillSabi.description = new Bitmap(0, 0, skillSabiDesImg);
skillArray.push(skillSabi);
var skillBusi = new Skill(4, '英雄不死', 40);
skillBusi.description = new Bitmap(0, 0, skillBusiDesImg);
skillArray.push(skillBusi);
var skillGuolai = new Skill(5, '你过来啊', 65);
skillGuolai.description = new Bitmap(0, 0, skillGuolaiDesImg);
skillArray.push(skillGuolai);
var skillQishang = new Skill(6, '七伤拳', 50);
skillQishang.description = new Bitmap(0, 0, skillQishangDesImg);
skillArray.push(skillQishang);
var skillXixing = new Skill(7, '吸星大法', 45);
skillXixing.description = new Bitmap(0, 0, skillXixingDesImg);
;
skillArray.push(skillXixing);
/**
 * 载入状态
 */
var LoadingState = /** @class */ (function (_super) {
    __extends(LoadingState, _super);
    //loadingaudio = new AudioPlay(MainAudio);
    function LoadingState() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.waitTime = 0;
        _this.loadBG = new Bitmap(0, 0, Resource.get('loging'));
        _this.loadPercent = new TextField(_this.count + " %", 420, 463, 30);
        return _this;
    }
    Object.defineProperty(LoadingState, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new LoadingState();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    LoadingState.prototype.onEnter = function () {
        staticStage.addChild(this.loadBG);
        staticStage.addChild(this.loadPercent);
        mainaudio.play();
    };
    LoadingState.prototype.onUpdate = function () {
        if (this.count < 100 && this.waitTime == 0) {
            this.count++;
            this.loadPercent.text = this.count + " %";
        }
        if (this.count >= 100) {
            this.waitTime++;
        }
        if (this.waitTime > 120 && this.count < 200) {
            this.count++;
            this.loadPercent.text = this.count + " %";
        }
        if (this.waitTime >= 280) {
            fsm.replaceState(MenuState.instance);
        }
    };
    LoadingState.prototype.onExit = function () {
        console.log('Loading State onExit');
        staticStage.deleteAllEventListener();
        staticStage.deleteAll();
    };
    return LoadingState;
}(State));
/**
 * 菜单状态
 */
var MenuState = /** @class */ (function (_super) {
    __extends(MenuState, _super);
    function MenuState() {
        var _this = _super.call(this) || this;
        _this.startaudio = new AudioPlay(StartAudio);
        _this.onClick = function (eventData) {
            // 这里不调用onExit的话，状态机里面调用onExit还没反应，就提示游戏状态的角色名字未定义
            // 如果这里就调用onExit的话，那么状态机里的onExit也会调用成功
            // this.onExit();
            _this.startaudio.playOnlyOnce = true;
            _this.startaudio.play();
            missionManager.init();
            // npcManager.init();
            fsm.replaceState(CreateState.instance);
        };
        _this.backGround = new Bitmap(0, 0, titleBGImg);
        _this.startButton = new Bitmap(350, 370, titleStartImg);
        _this.title = new TextField('', 100, 300, 20);
        _this.loadButton = new Bitmap(350, 440, titleLoadImg);
        _this.workerButton = new Bitmap(80, 440, titleWorkerImg);
        return _this;
    }
    Object.defineProperty(MenuState, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new MenuState();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    MenuState.prototype.onEnter = function () {
        staticStage.addChild(this.backGround);
        staticStage.addChild(this.startButton);
        staticStage.addChild(this.title);
        staticStage.addChild(this.loadButton);
        staticStage.addChild(this.workerButton);
        this.startButton.addEventListener("onClick", this.onClick);
    };
    MenuState.prototype.onUpdate = function () {
    };
    MenuState.prototype.onExit = function () {
        console.log('Menu State onExit');
        staticStage.deleteAllEventListener();
        staticStage.deleteAll();
    };
    return MenuState;
}(State));
/**
 * 角色创建状态
 */
var CreateState = /** @class */ (function (_super) {
    __extends(CreateState, _super);
    function CreateState() {
        var _this = _super.call(this) || this;
        _this.createaudio = new AudioPlay(CreateAudio);
        _this.canAssignPoint = 5;
        _this.onStartClick = function (eventData) {
            if (_this.canAssignPoint == 0) {
                fsm.replaceState(PlayingState.instance);
                _this.createaudio.playOnlyOnce = true;
                _this.createaudio.play();
            }
            else {
                _this.tipsText.text = " ← 加完点才能学习！";
            }
        };
        _this.backGround = new Bitmap(0, 0, createBGImg);
        _this.startButton = new Bitmap(350, 430, createStartButtonImg);
        _this.onCreatePlayer();
        _this.playerNameText = new TextField(player.name, 565, 160, 30);
        _this.playerHpText = new TextField("" + player._hp, 545, 350, 30);
        _this.playerAttackText = new TextField("" + player._attack, 545, 305, 30);
        _this.canAssignPointText = new TextField("" + _this.canAssignPoint, 573, 255, 30);
        _this.tipsText = new TextField("", 620, 260, 20);
        _this.hpAddButton = new Bitmap(630, 350, createAddButtonImg);
        _this.hpMinusButton = new Bitmap(460, 350, createMinusButtonImg);
        _this.attackAddButton = new Bitmap(630, 305, createAddButtonImg);
        _this.attackMinusButton = new Bitmap(460, 305, createMinusButtonImg);
        _this.createPlayerButtonScript = _this.startButton.addComponent(new CreatePlayerButtonScript());
        _this.startButton.addEventListener("onClick", _this.onStartClick);
        _this.hpAddButton.addEventListener("onClick", function () {
            if (_this.canAssignPoint > 0) {
                player._originHealth += 5;
                _this.canAssignPoint--;
                _this.createPlayerButtonScript.canAssignPoint--;
                _this.canAssignPointText.text = "" + _this.canAssignPoint;
                clickaudio.play();
            }
            _this.playerHpText.text = "" + player._originHealth;
        });
        _this.hpMinusButton.addEventListener("onClick", function () {
            if (_this.canAssignPoint < 5 && player._originHealth > 60) {
                player._originHealth -= 5;
                _this.canAssignPoint++;
                _this.createPlayerButtonScript.canAssignPoint++;
                _this.canAssignPointText.text = "" + _this.canAssignPoint;
                clickaudio.play();
            }
            _this.playerHpText.text = "" + player._originHealth;
        });
        _this.attackAddButton.addEventListener("onClick", function () {
            if (_this.canAssignPoint > 0) {
                player._originAttack += 1;
                _this.canAssignPoint--;
                _this.createPlayerButtonScript.canAssignPoint--;
                _this.canAssignPointText.text = "" + _this.canAssignPoint;
                clickaudio.play();
            }
            _this.playerAttackText.text = "" + player._originAttack;
        });
        _this.attackMinusButton.addEventListener("onClick", function () {
            if (_this.canAssignPoint < 5 && player._originAttack > 10) {
                player._originAttack -= 1;
                _this.canAssignPoint++;
                _this.createPlayerButtonScript.canAssignPoint++;
                _this.canAssignPointText.text = "" + _this.canAssignPoint;
                clickaudio.play();
            }
            _this.playerAttackText.text = "" + player._originAttack;
        });
        return _this;
    }
    Object.defineProperty(CreateState, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new CreateState();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    CreateState.prototype.onEnter = function () {
        staticStage.addChild(this.backGround);
        staticStage.addChild(this.startButton);
        staticStage.addChild(this.playerHpText);
        staticStage.addChild(this.playerNameText);
        staticStage.addChild(this.playerAttackText);
        staticStage.addChild(this.canAssignPointText);
        staticStage.addChild(this.tipsText);
        staticStage.addChild(this.hpAddButton);
        staticStage.addChild(this.hpMinusButton);
        staticStage.addChild(this.attackAddButton);
        staticStage.addChild(this.attackMinusButton);
        // stage.addEventListener("onClick", this.onClick);
    };
    CreateState.prototype.onUpdate = function () {
    };
    CreateState.prototype.onExit = function () {
        console.log('Create State onExit');
        staticStage.deleteAllEventListener();
        staticStage.deleteAll();
        // this.onCreatePlayer();
    };
    CreateState.prototype.onCreatePlayer = function () {
        player = new User(); //初始hp 60，攻击10，初始化于类中。
        player.level = 1;
        player.needEXP = 20;
        player.currentEXP = 0;
        player.coin = 0;
        player.name = 'Van';
        player.x = PLAYER_INDEX_X;
        player.y = PLAYER_INDEX_Y;
        // player.view = new Bitmap(PLAYER_INDEX_X, PLAYER_INDEX_Y, van1);//TODO 检测
        player.view = new Bitmap(PLAYER_INDEX_X, PLAYER_INDEX_Y, playerIdleImg);
        player.coin = 1000000; //测试用
    };
    return CreateState;
}(State));
var talkUIContainer;
var batteUIContainer;
var batEndUI = new battleEndWinUI(0, 0);
var bagUIContainer;
var skillBoxContainer;
var missionBoxContainer;
var shopUIContainer;
/**
 * 游戏状态
 */
var PlayingState = /** @class */ (function (_super) {
    __extends(PlayingState, _super);
    function PlayingState() {
        var _this = _super.call(this) || this;
        map = new GameMap();
        talkUIContainer = new DisplayObjectContainer(0, 0);
        _this.mapContainer = new DisplayObjectContainer(0, 0);
        _this.userUIContainer = new DisplayObjectContainer(0, 0);
        _this.missionUIContainer = new DisplayObjectContainer(0, 0);
        _this.bg = new Bitmap(0, 0, bg);
        _this.userInfoUI = new UserInfoUI(0, 0);
        _this.missionInfoUI = new MissionInfoUI(TILE_SIZE * COL_NUM, TILE_SIZE * 2);
        batteUIContainer = new DisplayObjectContainer(0, 0);
        _this.battleUI = new battleUI(0, 0);
        bagUIContainer = new DisplayObjectContainer(120, -50);
        _this.baggUI = new bagUI(0, 0);
        shopUIContainer = new DisplayObjectContainer(120, -50);
        _this.shpUI = new shopUI(0, 0);
        skillBoxContainer = new DisplayObjectContainer(0, 0);
        missionBoxContainer = new DisplayObjectContainer(0, 0);
        return _this;
    }
    Object.defineProperty(PlayingState, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new PlayingState();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    PlayingState.prototype.onEnter = function () {
        var _this = this;
        this.camera = new EmptyObject(0, 0);
        var camera = this.camera.addComponent(new Camera());
        camera.layer = 0;
        dynamicStage.addChild(this.mapContainer);
        // staticStage.addChild(this.bg);
        staticStage.addChild(this.userUIContainer);
        staticStage.addChild(this.missionUIContainer);
        staticStage.addChild(talkUIContainer);
        staticStage.addChild(skillBoxContainer);
        staticStage.addChild(missionBoxContainer);
        this.mapContainer.addChild(map);
        this.mapContainer.addChild(player.view);
        this.userUIContainer.addChild(this.userInfoUI);
        this.missionUIContainer.addChild(this.missionInfoUI);
        staticStage.addChild(batteUIContainer);
        // batteUIContainer.addChild(this.battleUI);
        staticStage.addChild(bagUIContainer);
        //bagUIContainer.addChild(this.baggUI);
        staticStage.addChild(shopUIContainer);
        baManager.addEventListener('openBag', function (eventData) {
            batteUIContainer.deleteChild(_this.battleUI);
            shopUIContainer.deleteChild(_this.shpUI);
            // missionBoxContainer.deleteChild(this.missionUI);
            bagUIContainer.addChild(_this.baggUI);
        });
        baManager.addEventListener('bagDown', function (eventData) {
            bagUIContainer.deleteChild(_this.baggUI);
        });
        shpManager.addEventListener('openShop', function (eventData) {
            batteUIContainer.deleteChild(_this.battleUI);
            bagUIContainer.deleteChild(_this.baggUI);
            // missionBoxContainer.deleteChild(this.missionUI);
            shopUIContainer.addChild(_this.shpUI);
        });
        shpManager.addEventListener('shopDown', function (eventData) {
            shopUIContainer.deleteChild(_this.shpUI);
        });
        baManager.addEventListener('updateBag', function (eventData) {
            bagUIContainer.deleteChild(_this.baggUI);
            _this.baggUI = new bagUI(0, 0);
            bagUIContainer.addChild(_this.baggUI);
        });
        baManager.addEventListener('updateShop', function (eventData) {
            shopUIContainer.deleteChild(_this.shpUI);
            _this.shpUI = new shopUI(0, 0);
            shopUIContainer.addChild(_this.shpUI);
        });
        // 给map添加监听器 鼠标点击到map容器上了，监听器就执行到目标点的走路命令
        map.addEventListener('onClick', function (eventData) {
            if (player.moveStatus) {
                clickaudio.play();
                var globalX = eventData.globalX;
                var globalY = eventData.globalY;
                var localPos = map.getLocalPos(new math.Point(globalX, globalY));
                // 确定被点击的格子位置
                var row = Math.floor(localPos.x / TILE_SIZE);
                var col = Math.floor(localPos.y / TILE_SIZE);
                // 添加行走命令
                var walk = new WalkCommand(player.x, player.y, row, col);
                commandPool.addCommand(walk);
                // 获取被点击格子的装备信息 如果有东西的话 就添加一个拾取命令
                var equipmentInfo = map.getEquipmentInfo(row, col);
                if (equipmentInfo) {
                    var pick = new PickCommand(equipmentInfo);
                    commandPool.addCommand(pick);
                }
                var npcInfo = map.getNpcInfo(row, col);
                if (npcInfo) {
                    if (npcInfo.id == 6) {
                        shpManager.openShop();
                    }
                    else {
                        var talk = new TalkCommand(npcInfo);
                        commandPool.addCommand(talk);
                    }
                }
                var monsterInfo = map.getMonsterInfo(row, col);
                if (monsterInfo) {
                    // console.log('monster Info');
                    var fight = new FightCommand(monsterInfo);
                    commandPool.addCommand(fight);
                }
                player.moveStatus = false;
                // 执行命令池的命令
                commandPool.execute();
            }
        });
        this.changePlayerViewPosture();
    };
    PlayingState.prototype.onUpdate = function () {
        // this.playerViewMove();
        player.update();
        missionManager.update();
    };
    PlayingState.prototype.onExit = function () {
        staticStage.deleteAll();
        dynamicStage.deleteAll();
        this.mapContainer.deleteAll();
    };
    // 角色原地动画
    PlayingState.prototype.changePlayerViewPosture = function () {
        var _this = this;
        setTimeout(function () {
            // player.view.img = (player.view.img == van1) ? van2 : van1; //TODO 动画
            _this.changePlayerViewPosture();
        }, 600);
    };
    return PlayingState;
}(State));
// 鼠标点击事件，捕获所有被点击到的 DisplayObject，并从叶子节点依次向上通知监听器，监听器执行
canvas.onclick = function (event) {
    //clickaudio.play();
    var globalX = event.offsetX;
    var globalY = event.offsetY;
    //以下调UI位置用
    var dingWeix = event.offsetX - 0;
    var dingWeiy = event.offsetY - 0;
    console.log(dingWeix + " , " + dingWeiy);
    var hitResult = Stage.instance.mainStage.hitTest(new math.Point(globalX, globalY));
    if (hitResult) {
        hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        while (hitResult.parent) {
            // console.log(hitResult);
            hitResult = hitResult.parent;
            hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        }
    }
};
window.onkeydown = function (event) {
    var keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode === 87) {
        PlayingState.instance.camera.dispatchEvent("cameraMove", { dir: "UP" });
    }
    else if (keyCode === 83) {
        PlayingState.instance.camera.dispatchEvent("cameraMove", { dir: "DOWN" });
    }
    else if (keyCode === 65) {
        PlayingState.instance.camera.dispatchEvent("cameraMove", { dir: "LEFT" });
    }
    else if (keyCode === 68) {
        PlayingState.instance.camera.dispatchEvent("cameraMove", { dir: "RIGHT" });
    }
};
window.onkeyup = function (event) {
    var keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode === 87) {
        PlayingState.instance.camera.dispatchEvent("cameraStop", { dir: "UP" });
    }
    else if (keyCode === 83) {
        PlayingState.instance.camera.dispatchEvent("cameraStop", { dir: "DOWN" });
    }
    else if (keyCode === 65) {
        PlayingState.instance.camera.dispatchEvent("cameraStop", { dir: "LEFT" });
    }
    else if (keyCode === 68) {
        PlayingState.instance.camera.dispatchEvent("cameraStop", { dir: "RIGHT" });
    }
};
// 初始状态设置
//fsm.replaceState(CreateState.instance);
fsm.replaceState(new LoadingState());
