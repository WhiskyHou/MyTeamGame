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
 */
var van_pick_knife = document.getElementById('van_pick_knife');
var loadingImg = new Image();
loadingImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/载入界面.png';
var titleBGImg = new Image();
titleBGImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/开始界面.png';
var titleStartImg = new Image();
titleStartImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/开始游戏.png';
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
talk_window.src = './assets/talkWindow.png';
var battlePanelBgImg = new Image();
battlePanelBgImg.src = './assets/battlePanel/战斗界面模版1.png';
var battlePanelBlackMask = new Image();
battlePanelBlackMask.src = './assets/battlePanel/blackMask.png';
var battlePanelInfo = new Image();
battlePanelInfo.src = './assets/battlePanel/战斗界面模版2.png';
var battleAttackButton1 = new Image();
battleAttackButton1.src = './assets/battlePanel/ui button确定.png';
var battleEndBGImg = new Image();
battleEndBGImg.src = './assets/battlePanel/战斗结算ui.png';
var backButtonImg = new Image();
backButtonImg.src = './assets/美术素材/UI/战斗界面/UI 战斗界面 PNG/UI 战斗界面 返回.png';
var battleEndLoseBGImg = new Image();
battleEndLoseBGImg.src = './assets/battlePanel/战斗结算ui 失败.png';
var playerIdleImg = new Image();
playerIdleImg.src = './assets/美术素材/角色/主角/128x128 主角.png';
var bagButton = new Image();
bagButton.src = './assets/1 60x80 物品ui.png';
var EscButton = new Image();
EscButton.src = './assets/1 60x80 设置ui.png';
var SkillButton = new Image();
SkillButton.src = './assets/1 60x80 技能ui.png';
var bloodUI = new Image();
bloodUI.src = './assets/ui血条.png';
var bagWindowsUI = new Image();
bagWindowsUI.src = './assets/ui背包界面参考.png';
/**
 * 常量
 *
 * 全局变量
 */
var TILE_SIZE = 64; //TODO:还原为128
var ASSETS_PATH = "./assets/";
var ROW_NUM = 8;
var COL_NUM = 8;
var GRASS_L = 0;
var GRASS_D = 1;
var TREE = 2;
var WALL_LEFT = 3;
var WALL_MIDDLE = 4;
var WALL_RIGHT = 5;
var KILL_DARGON_KNIFE = 1;
var HP_BOTTLE = 2;
var NPC1 = 1;
var NPC2 = 2;
var NPC3 = 3;
var NPC4 = 4;
var NPC5 = 5;
var MONSTER = 1;
var PLAYER_INDEX_X = 0;
var PLAYER_INDEX_Y = 0;
var PLAYER_WALK_SPEED = 200;
var player = new User();
var map;
var missionManager = new MissionManager();
var npcManager = new NpcManager();
var monsManager = new monsterManager();
var equipManager = new EquipmentManager();
var batManager = new battleManager();
var baManager = new bagManager();
npcManager.init(function () {
    monsManager.init(function () {
        equipManager.init(function () {
            equipSetInit(equipManager);
        });
    });
});
/**
 * 载入状态
 */
var LoadingState = /** @class */ (function (_super) {
    __extends(LoadingState, _super);
    function LoadingState() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.onClick = function (eventData) {
            // 这里不调用onExit的话，状态机里面调用onExit还没反应，就提示游戏状态的角色名字未定义
            // 如果这里就调用onExit的话，那么状态机里的onExit也会调用成功
            // this.onExit();
            _this.onCreatePlayer();
            missionManager.init();
            // npcManager.init();
            fsm.replaceState(new MenuState());
        };
        _this.loadBG = new Bitmap(0, 0, loadingImg);
        _this.loadPercent = new TextField(_this.count + " %", 420, 463, 30);
        return _this;
    }
    LoadingState.prototype.onEnter = function () {
        stage.addChild(this.loadBG);
        stage.addChild(this.loadPercent);
        // stage.addEventListener("onClick", this.onClick);
        // setTimeout(
        //     this.onExit()
        //     , 1000);
    };
    LoadingState.prototype.onUpdate = function () {
        this.count++;
        this.loadPercent.text = this.count + " %";
        if (this.count > 200) {
            fsm.replaceState(new MenuState());
        }
    };
    LoadingState.prototype.onExit = function () {
        console.log('Loading State onExit');
        stage.deleteAllEventListener();
        stage.deleteAll();
        // fsm.replaceState(new MenuState());
        // this.onCreatePlayer();
    };
    LoadingState.prototype.onCreatePlayer = function () {
        player = new User();
        player.level = 1;
        player.name = 'Van';
        player.x = PLAYER_INDEX_X;
        player.y = PLAYER_INDEX_Y;
        // player.view = new Bitmap(PLAYER_INDEX_X, PLAYER_INDEX_Y, van1);//TODO 检测
        player.view = new Bitmap(PLAYER_INDEX_X, PLAYER_INDEX_Y, playerIdleImg);
    };
    return LoadingState;
}(State));
/**
 * 开始状态
 */
var MenuState = /** @class */ (function (_super) {
    __extends(MenuState, _super);
    function MenuState() {
        var _this = _super.call(this) || this;
        _this.onClick = function (eventData) {
            // 这里不调用onExit的话，状态机里面调用onExit还没反应，就提示游戏状态的角色名字未定义
            // 如果这里就调用onExit的话，那么状态机里的onExit也会调用成功
            // this.onExit();
            _this.onCreatePlayer();
            missionManager.init();
            // npcManager.init();
            fsm.replaceState(new PlayingState());
        };
        _this.backGround = new Bitmap(0, 0, titleBGImg);
        _this.startButton = new Bitmap(87, 430, titleStartImg);
        _this.title = new TextField('', 100, 300, 20);
        return _this;
    }
    MenuState.prototype.onEnter = function () {
        stage.addChild(this.backGround);
        stage.addChild(this.startButton);
        stage.addChild(this.title);
        this.startButton.addEventListener("onClick", this.onClick);
        // stage.addEventListener("onClick", this.onClick);
    };
    MenuState.prototype.onUpdate = function () {
    };
    MenuState.prototype.onExit = function () {
        console.log('Login State onExit');
        stage.deleteAllEventListener();
        stage.deleteAll();
        // this.onCreatePlayer();
    };
    MenuState.prototype.onCreatePlayer = function () {
        player = new User();
        player.level = 1;
        player.name = 'Van';
        player.x = PLAYER_INDEX_X;
        player.y = PLAYER_INDEX_Y;
        // player.view = new Bitmap(PLAYER_INDEX_X, PLAYER_INDEX_Y, van1);//TODO 检测
        player.view = new Bitmap(PLAYER_INDEX_X, PLAYER_INDEX_Y, playerIdleImg);
    };
    return MenuState;
}(State));
var talkUIContainer;
var batteUIContainer;
var bagUIContainer;
/**
 * 游戏状态
 */
var PlayingState = /** @class */ (function (_super) {
    __extends(PlayingState, _super);
    function PlayingState() {
        var _this = _super.call(this) || this;
        map = new GameMap();
        talkUIContainer = new DisplayObjectContainer(16, 16);
        _this.mapContainer = new DisplayObjectContainer(16, 16);
        _this.userUIContainer = new DisplayObjectContainer(16, 16);
        _this.missionUIContainer = new DisplayObjectContainer(16, 16);
        _this.bg = new Bitmap(0, 0, bg);
        _this.userInfoUI = new UserInfoUI(0, 0);
        _this.missionInfoUI = new MissionInfoUI(TILE_SIZE * COL_NUM, TILE_SIZE * 2);
        batteUIContainer = new DisplayObjectContainer(16, 16);
        _this.battleUI = new battleUI(0, 0); //居中显示
        bagUIContainer = new DisplayObjectContainer(120, -50);
        _this.baggUI = new bagUI(0, 0); //居中显示
        return _this;
    }
    PlayingState.prototype.onEnter = function () {
        var _this = this;
        stage.addChild(this.bg);
        stage.addChild(this.mapContainer);
        stage.addChild(this.userUIContainer);
        stage.addChild(this.missionUIContainer);
        stage.addChild(talkUIContainer);
        this.mapContainer.addChild(map);
        this.mapContainer.addChild(player.view);
        this.userUIContainer.addChild(this.userInfoUI);
        this.missionUIContainer.addChild(this.missionInfoUI);
        stage.addChild(batteUIContainer);
        // batteUIContainer.addChild(this.battleUI);
        stage.addChild(bagUIContainer);
        //bagUIContainer.addChild(this.baggUI);
        baManager.addEventListener('openBag', function (eventData) {
            bagUIContainer.addChild(_this.baggUI);
        });
        // 给map添加监听器 鼠标点击到map容器上了，监听器就执行到目标点的走路命令
        map.addEventListener('onClick', function (eventData) {
            if (player.moveStatus) {
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
                    var talk = new TalkCommand(npcInfo);
                    commandPool.addCommand(talk);
                }
                var monsterInfo = map.getMonsterInfo(row, col);
                if (monsterInfo) {
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
        stage.deleteAll();
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
    var globalX = event.offsetX;
    var globalY = event.offsetY;
    //以下调UI位置用
    var dingWeix = event.offsetX - 16;
    var dingWeiy = event.offsetY - 16;
    console.log(dingWeix + " , " + dingWeiy);
    var hitResult = stage.hitTest(new math.Point(globalX, globalY));
    if (hitResult) {
        hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        while (hitResult.parent) {
            // console.log(hitResult);
            hitResult = hitResult.parent;
            hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        }
    }
};
// 初始状态设置
// fsm.replaceState(new MenuState());
fsm.replaceState(new LoadingState());
