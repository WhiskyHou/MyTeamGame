/**
 * 资源载入
 * 
 * TODO: 资源载入需要整理
 */
var van_pick_knife = document.getElementById('van_pick_knife') as HTMLAudioElement;


Resource.load('./assets/正面动画.png', "dust");
Resource.load('./assets/Test动画.png', 'TestAnim');
Resource.load('./assets/美术素材/动画/烟花爆炸2.png', "Anim");

var loadingImg = new Image();
loadingImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/载入界面.png';

Resource.load('./assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/载入界面.png', 'loging');
let loadingBmp = new Bitmap(0, 0, Resource.get('loging') as HTMLImageElement);

var titleBGImg = new Image();
titleBGImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/开始游戏主界面 底.png';
let titleStartImg = new Image();
titleStartImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/开始游戏界面 新游戏.png';
let titleLoadImg = new Image();
titleLoadImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/开始游戏界面 载入游戏.png';
let titleWorkerImg = new Image();
titleWorkerImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/开始游戏界面 制作团队.png';

let createBGImg = new Image();
createBGImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/UI 创建角色界面背景 .png';
let createOkButtonImg = new Image();
createOkButtonImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/开始游戏.png';
let createAddButtonImg = new Image();
createAddButtonImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/加号.png';
let createMinusButtonImg = new Image();
createMinusButtonImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/减号.png';
let createStartButtonImg = new Image();
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

let battlePanelBgImg = new Image();
battlePanelBgImg.src = './assets/美术素材/UI/战斗界面/UI 战斗界面 PNG/战斗界面模版1.png';
let battlePanelBlackMask = new Image();
battlePanelBlackMask.src = './assets/battlePanel/blackMask.png';
let battlePanelInfo = new Image();
battlePanelInfo.src = './assets/美术素材/UI/战斗界面/UI 战斗界面 PNG/战斗界面模版2.png';
let battleAttackButton1 = new Image();
battleAttackButton1.src = './assets/美术素材/UI/战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 普通攻击.png';
let battleEndBGImg = new Image();
battleEndBGImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗结算ui 成功.png';
let backButtonImg = new Image();
backButtonImg.src = './assets/美术素材/UI/战斗界面/UI 战斗界面 PNG/UI 战斗界面 返回.png';
let battleEndLoseBGImg = new Image();
battleEndLoseBGImg.src = './assets/battlePanel/战斗结算ui 失败.png';
let skillEmptyImg = new Image();
skillEmptyImg.src = './assets/美术素材/UI/战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 空.png';
Resource.load('./assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗 物品栏 底.png', 'battleItemBgImg');
Resource.load('./assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 物品栏 返回.png', 'battleItemBackImg');
Resource.load('./assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 物品栏 使用.png', 'battleItemUseImg');


let skillSabiImg = new Image();
skillSabiImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 撒币.png';
let skillCaihuaImg = new Image();
skillCaihuaImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 菜花.png';
let skillBusiImg = new Image();
skillBusiImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 不死.png';
let skillGuolaiImg = new Image();
skillGuolaiImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 过来.png';
let skillQishangImg = new Image();
skillQishangImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 七伤.png';
let skillXixingImg = new Image();
skillXixingImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 吸星.png';

let battleEscapeImg = new Image();
battleEscapeImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 逃跑.png';
let battleItemImg = new Image();
battleItemImg.src = './assets/美术素材/UI/4 战斗界面/UI 战斗界面 PNG/战斗界面 物品.png';

let playerIdleImg = new Image();
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
bloodUI.src = './assets/美术素材/UI/2 主界面/UI 主界面 PNG/ui血条 改.png';
var userCoinUI  = new Image();
userCoinUI.src='./assets/美术素材/UI/2 主界面/UI 主界面 PNG/UI 主界面 金币 改.png';
var userDiamondUI = new Image();
userDiamondUI.src='./assets/美术素材/UI/2 主界面/UI 主界面 PNG/UI 主界面 钻石 改.png';


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

let skillBoxBGImg = new Image();
skillBoxBGImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能界面底.png';
let skillBoxCloseImg = new Image();
skillBoxCloseImg.src = './assets/美术素材/UI/技能界面/UI 技能 PNG/UI 取消按钮.png';

let skillSabiDesImg = new Image();
skillSabiDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能介绍 撒币大法.png';
let skillCaihuaDesImg = new Image();
skillCaihuaDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能介绍 菜花宝典.png';
let skillBusiDesImg = new Image();
skillBusiDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能介绍 英雄不死.png';
let skillGuolaiDesImg = new Image();
skillGuolaiDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能介绍 你过来啊.png';
let skillQishangDesImg = new Image();
skillQishangDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能介绍 七伤拳.png';
let skillXixingDesImg = new Image();
skillXixingDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能介绍 吸星大法.png';
let skillEmptyDesImg = new Image();
skillEmptyDesImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能空白.png';

let Shop = new Image();
Shop.src = './assets/美术素材/场景/边缘/商店.png';

let bloodBar = new Image();
bloodBar.src = './assets/血条.png';
let playerHeadImg = new Image();
playerHeadImg.src = './assets/美术素材/角色/主角/128x128 主角.png';

let missionImg = new Image();
missionImg.src = './assets/UI 任务界面底.png';
let missionCloseImg = new Image();
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

//设置
Resource.load('./assets/美术素材/UI/8 设置界面/设置界面 PNG/设置界面底.png', 'SettingUI1');
Resource.load('./assets/美术素材/UI/8 设置界面/设置界面 PNG/开.png', 'SettingUI2');
Resource.load('./assets/美术素材/UI/8 设置界面/设置界面 PNG/关.png', 'SettingUI3');
Resource.load('./assets/美术素材/UI/8 设置界面/设置界面 PNG/返回游戏.png', 'SettingUI4');
Resource.load('./assets/美术素材/UI/8 设置界面/设置界面 PNG/保存游戏.png', 'SettingUI5');
Resource.load('./assets/美术素材/UI/8 设置界面/设置界面 PNG/载入游戏.png', 'SettingUI6');

//制作团队
Resource.load('./assets/美术素材/UI/12 制作团队/制作团队.png', 'WorkerUI1');
Resource.load('./assets/美术素材/UI/12 制作团队/制作团队 返回.png', 'WorkerUI2');

//局部音乐
const StartAudio = new Audio()
StartAudio.src = "assets/音效/常规/创建角色.mp3"
const CreateAudio = new Audio()
CreateAudio.src = "assets/音效/常规/点一下玩一年.mp3"

const BattleAudio = new Audio()
BattleAudio.src = "assets/音效/常规/战斗背景音乐.mp3"
const SucceedAudio = new Audio()
SucceedAudio.src = "assets/音效/常规/战斗胜利.mp3"
const FailAudio = new Audio()
FailAudio.src = "assets/音效/常规/战斗失败.mp3"

const Attack1Audio = new Audio()
Attack1Audio.src = "assets/音效/dnf/暴击1.mp3"
const Attack2Audio = new Audio()
Attack2Audio.src = "assets/音效/dnf/暴击2.mp3"

const BuyAudio = new Audio()
BuyAudio.src = "assets/音效/常规/金币.mp3"

const HPMPAudio = new Audio()
HPMPAudio.src = "assets/音效/dnf/药水.mp3"

//全局音乐控制
const MainAudio = new Audio()
MainAudio.src = "assets/音效/常规/欢快bgm.mp3"
const ClickAudio = new Audio()
ClickAudio.src = "assets/音效/常规/单击.mp3"

const mainaudio = new AudioPlay(MainAudio);
const clickaudio = new AudioPlay(ClickAudio);

mainaudio.playOnlyOnce = false;
clickaudio.playOnlyOnce = true;

//装备道具图片
let caihuaBookImg = new Image()
caihuaBookImg.src = "./assets/美术素材/道具/道具（书本）.png"
let xiXingBookImg = new Image();
xiXingBookImg.src = './assets/美术素材/场景/细节/纸团03.png'


/**
 * 常量
 * 
 * 全局变量
 * 
 * TODO: 部分需要删除整合
 */
const TILE_SIZE = 128;//TODO:还原为128
const ASSETS_PATH = "./assets/";

const ROW_NUM = 15;
const COL_NUM = 21;

const GRASS_L = 0;
const GRASS_D = 1;
const TREE = 2;
const WALL_LEFT = 3;
const WALL_MIDDLE = 4;
const WALL_RIGHT = 5;

const KILL_DARGON_KNIFE = 1;
const HP_BOTTLE = 2;
const SHOP = 3;

const NPC1 = 1;
const NPC2 = 2;
const NPC3 = 3;
const NPC4 = 4;
const NPC5 = 5;

const MONSTER = 1;

const PLAYER_INDEX_X = 8;
const PLAYER_INDEX_Y = 5;
const PLAYER_WALK_SPEED = 200;

const staticStage = stages[2];
const dynamicStage = stages[0];


var player: User = new User();
var map: GameMap;
let mapManager = new MapManager()
var missionManager = new MissionManager();
var npcManager = new NpcManager();
let monsManager = new monsterManager();
let equipManager = new EquipmentManager();
let portalManager = new PortalManager();
let batManager = new battleManager();
let baManager = new bagManager();
let shpManager = new shopManager();
let inputManager = new InputManager();

// 这回调看着也太丑了啊
npcManager.init(() => {
    monsManager.init(() => {
        equipManager.init(() => {
            equipSetInit(equipManager);
            dungeonEquipSetInitequip(equipManager);
            shpManager.init(() => {
                missionManager.init();
                portalManager.init(() => {
                    mapManager.init(() => {

                    });
                });
            });
        });
    });
});

batManager.addEventListener("enemyDrop", (dropBox: number[]) => {
    batEndUI.dropTextGroup.deleteAll();
    for (let i = 0; i < dropBox.length; i++) {
        let equip: Equipment;
        equip = equipManager.getEquipByID(dropBox[i]) as Equipment;
        let textField = new TextField(equip.name, 0, 30 * i, 20);
        player.packageEquipment.push(equip);
        batEndUI.dropTextGroup.addChild(textField);
    }
    batEndUI.expText
})

batManager.addEventListener("enemyBattleStart", (enemy: Monster) => {
    batEndUI.expText.text = '' + enemy.exp;
    batEndUI.coinText.text = '' + enemy.coin;
})

/**
 * 技能初始化(把这里当技能配置文件)
 */
let skillArray: Skill[] = []//人物已有技能库
let skillBase: Skill[] = []//全技能库

let skillAttack = new Skill(0, '攻击', 0);//攻击预留
skillAttack.description = new Bitmap(0, 0, skillEmptyDesImg);
skillArray.push(skillAttack);
skillBase.push(skillAttack);
let skillEmpty = new Skill(1, '空', 0);//空
skillEmpty.description = new Bitmap(0, 0, skillEmptyDesImg);
skillArray.push(skillEmpty);
skillBase.push(skillEmpty);
let skillCaihua = new Skill(2, '菜花宝典', 30);
skillCaihua.description = new Bitmap(0, 0, skillCaihuaDesImg);
// skillArray.push(skillCaihua);
skillBase.push(skillCaihua);
let skillSabi = new Skill(3, '撒币大法', 20);
skillSabi.description = new Bitmap(0, 0, skillSabiDesImg);
// skillArray.push(skillSabi);
skillBase.push(skillSabi);
let skillBusi = new Skill(4, '英雄不死', 40);
skillBusi.description = new Bitmap(0, 0, skillBusiDesImg);
skillArray.push(skillBusi);
skillBase.push(skillBusi);
let skillGuolai = new Skill(5, '你过来啊', 65);
skillGuolai.description = new Bitmap(0, 0, skillGuolaiDesImg);
skillArray.push(skillGuolai);
skillBase.push(skillGuolai);
let skillQishang = new Skill(6, '七伤拳', 50);
skillQishang.description = new Bitmap(0, 0, skillQishangDesImg);
skillArray.push(skillQishang);
skillBase.push(skillQishang);
let skillXixing = new Skill(7, '吸星大法', 45);
skillXixing.description = new Bitmap(0, 0, skillXixingDesImg);;
// skillArray.push(skillXixing);
skillBase.push(skillXixing);

/**
 * 载入状态
 */
class LoadingState extends State {

    private static _instance: LoadingState
    public static get instance() {
        if (!this._instance) {
            this._instance = new LoadingState()
        }
        return this._instance
    }

    loadBG: Bitmap;
    loadPercent: TextField;
    count = 0;
    waitTime = 0;

    //loadingaudio = new AudioPlay(MainAudio);

    constructor() {
        super();
        this.loadBG = new Bitmap(0, 0, Resource.get('loging') as HTMLImageElement);
        this.loadPercent = new TextField(this.count + " %", 420, 463, 30);
    }

    onEnter(): void {
        staticStage.addChild(this.loadBG);
        staticStage.addChild(this.loadPercent);

        mainaudio.play()

    }
    onUpdate(): void {

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
    }
    onExit(): void {
        console.log('Loading State onExit');
        staticStage.deleteAllEventListener();
        staticStage.deleteAll();




    }
}


let workerContainer: DisplayObjectContainer
let workerUI: WorkerUI;

/**
 * 菜单状态
 */
class MenuState extends State {

    private static _instance: MenuState
    public static get instance() {
        if (!this._instance) {
            this._instance = new MenuState()
        }
        return this._instance
    }


    title: TextField;
    backGround: Bitmap;

    startButton: Bitmap;
    loadButton: Bitmap;
    workerButton: Bitmap;

    startaudio: AudioPlay;
    anim: Animator;///
    anim1: Animator;///
    anim2: Animator;///


    constructor() {
        super();
        this.backGround = new Bitmap(0, 0, titleBGImg);
        this.startButton = new Bitmap(350, 370, titleStartImg);
        this.title = new TextField('', 100, 300, 20);
        this.loadButton = new Bitmap(350, 440, titleLoadImg);
        this.workerButton = new Bitmap(600, 440, titleWorkerImg);
        this.startaudio = new AudioPlay(StartAudio);
        this.anim = new Animator(120, 370, Resource.get('TestAnim') as HTMLImageElement, 128, 16, 0.1);
        this.anim1 = new Animator(200, -50, Resource.get('Anim') as HTMLImageElement, 256, 15, 0.1);
        this.anim2 = new Animator(400, -50, Resource.get('Anim') as HTMLImageElement, 256, 15, 0.1);


        workerContainer = new DisplayObjectContainer(0, 0);

        this.workerButton.addEventListener("onClick", () => {
            workerUI = new WorkerUI(0, 0);
            workerContainer.addChild(workerUI);
            clickaudio.play();
        });


    }

    onEnter(): void {
        staticStage.addChild(this.backGround);
        staticStage.addChild(this.startButton);
        staticStage.addChild(this.title);
        staticStage.addChild(this.loadButton);
        staticStage.addChild(this.workerButton);
        staticStage.addChild(this.anim);
        //staticStage.addChild(this.anim1);
        //staticStage.addChild(this.anim2);
        staticStage.addChild(workerContainer);

        this.startButton.addEventListener("onClick", this.onClick)
        this.anim.play();
        this.anim.isLooping = true;
        this.anim1.play();
        this.anim1.isLooping = true;
        this.anim2.play();
        this.anim2.isLooping = true;

    }
    onUpdate(): void {
        this.anim.update(DELTA_TIME);
        this.anim1.update(DELTA_TIME);
        this.anim2.update(DELTA_TIME);
    }
    onExit(): void {
        console.log('Menu State onExit');
        staticStage.deleteAllEventListener();
        staticStage.deleteAll();
    }



    onClick = (eventData: any) => {
        // 这里不调用onExit的话，状态机里面调用onExit还没反应，就提示游戏状态的角色名字未定义
        // 如果这里就调用onExit的话，那么状态机里的onExit也会调用成功
        // this.onExit();


        this.startaudio.playOnlyOnce = true;
        this.startaudio.play();

        missionManager.init();

        // npcManager.init();
        fsm.replaceState(CreateState.instance);
    }
}


/**
 * 角色创建状态
 */
class CreateState extends State {

    private static _instance: CreateState
    public static get instance() {
        if (!this._instance) {
            this._instance = new CreateState()
        }
        return this._instance
    }

    //TODO: 角色名输入
    backGround: Bitmap;
    startButton: Bitmap;
    hpAddButton: Bitmap;
    hpMinusButton: Bitmap;
    attackAddButton: Bitmap;
    attackMinusButton: Bitmap;

    playerNameText: TextField;
    playerAttackText: TextField;
    playerHpText: TextField;
    canAssignPointText: TextField;
    tipsText: TextField;
    tips2Text: TextField;
    createaudio: AudioPlay;

    canAssignPoint = 5;
    hasName = false;
    createPlayerButtonScript: CreatePlayerButtonScript;

    constructor() {
        super();
        this.backGround = new Bitmap(0, 0, createBGImg);
        this.startButton = new Bitmap(350, 430, createStartButtonImg);
        this.onCreatePlayer();
        this.playerNameText = new TextField(' ? ? ? ', 552, 155, 30).centered();
        this.playerHpText = new TextField("" + player._hp, 545, 350, 30);
        this.playerAttackText = new TextField("" + player._attack, 545, 305, 30);
        this.canAssignPointText = new TextField("" + this.canAssignPoint, 573, 255, 30);
        this.tipsText = new TextField("", 620, 260, 20);
        this.tips2Text = new TextField("", 350, 220, 20);
        this.hpAddButton = new Bitmap(630, 350, createAddButtonImg);
        this.hpMinusButton = new Bitmap(460, 350, createMinusButtonImg);

        this.attackAddButton = new Bitmap(630, 305, createAddButtonImg);
        this.attackMinusButton = new Bitmap(460, 305, createMinusButtonImg);

        this.createaudio = new AudioPlay(CreateAudio);

        this.createPlayerButtonScript = this.startButton.addComponent(new CreatePlayerButtonScript()) as CreatePlayerButtonScript;

        this.startButton.addEventListener("onClick", this.onStartClick);
        
        this.hpAddButton.addEventListener("onClick", () => {
            if (this.canAssignPoint > 0) {
                player._originHealth += 5;
                this.canAssignPoint--;
                this.createPlayerButtonScript.canAssignPoint--;
                this.canAssignPointText.text = "" + this.canAssignPoint;

                clickaudio.play();
            }
            this.playerHpText.text = "" + player._originHealth;
        });
        this.hpMinusButton.addEventListener("onClick", () => {
            if (this.canAssignPoint < 5 && player._originHealth > 60) {
                player._originHealth -= 5;
                this.canAssignPoint++;
                this.createPlayerButtonScript.canAssignPoint++;
                this.canAssignPointText.text = "" + this.canAssignPoint;

                clickaudio.play();
            }
            this.playerHpText.text = "" + player._originHealth;
        });
        this.attackAddButton.addEventListener("onClick", () => {
            if (this.canAssignPoint > 0) {
                player._originAttack += 1;
                this.canAssignPoint--;
                this.createPlayerButtonScript.canAssignPoint--;
                this.canAssignPointText.text = "" + this.canAssignPoint;

                clickaudio.play();
            }
            this.playerAttackText.text = "" + player._originAttack;
        });
        this.attackMinusButton.addEventListener("onClick", () => {
            if (this.canAssignPoint < 5 && player._originAttack > 10) {
                player._originAttack -= 1;
                this.canAssignPoint++;
                this.createPlayerButtonScript.canAssignPoint++;
                this.canAssignPointText.text = "" + this.canAssignPoint;

                clickaudio.play();
            }
            this.playerAttackText.text = "" + player._originAttack;
        });

    }

    onEnter(): void {
        staticStage.addChild(this.backGround);
        staticStage.addChild(this.startButton);
        staticStage.addChild(this.playerHpText);
        staticStage.addChild(this.playerNameText);
        staticStage.addChild(this.playerAttackText);
        staticStage.addChild(this.canAssignPointText);
        staticStage.addChild(this.tipsText);
        staticStage.addChild(this.tips2Text);
        staticStage.addChild(this.hpAddButton);
        staticStage.addChild(this.hpMinusButton);
        staticStage.addChild(this.attackAddButton);
        staticStage.addChild(this.attackMinusButton);

        inputManager.addEventListener("inputChanged", (eventData: any) => {
            if(!this.hasName){
                staticStage.deleteChild(this.playerNameText);
                player.name = eventData
                console.log("mingzi:",eventData)
                this.playerNameText = new TextField(player.name, 552, 155, 30).centered();
                staticStage.addChild(this.playerNameText);
            }   
        });
        inputManager.addEventListener("inputOver", () => {
            this.hasName =true
        });
        // stage.addEventListener("onClick", this.onClick);

    }
    onUpdate(): void {

    }
    onExit(): void {
        console.log('Create State onExit');
        staticStage.deleteAllEventListener();
        staticStage.deleteAll();
        // this.onCreatePlayer();
    }

    onCreatePlayer() {
        player = new User();//初始hp 60，攻击10，初始化于类中。
        player.level = 1;
        player.needEXP = 20;
        player.currentEXP = 0;
        player.coin = 0;
        player.name = ' ? ? ?';
        player.x = PLAYER_INDEX_X;
        player.y = PLAYER_INDEX_Y;
        // player.view = new Bitmap(PLAYER_INDEX_X, PLAYER_INDEX_Y, van1);//TODO 检测
        player.view = new Bitmap(PLAYER_INDEX_X * TILE_SIZE, PLAYER_INDEX_Y * TILE_SIZE, playerIdleImg);

        player.coin = 1000000;//测试用
    }

    onStartClick = (eventData: any) => {

        if (this.canAssignPoint == 0 && this.hasName) {
            fsm.replaceState(PlayingState.instance);
            this.createaudio.playOnlyOnce = true;
            this.createaudio.play();
        } 
        if(this.canAssignPoint > 0) {
            this.tipsText.text = " ← 加完点才能学习！"
        }
        if(!this.hasName) {
            this.tips2Text.text = "请输入名字，按ENTER结束！ ↑"
        }
    }
}


var talkUIContainer: DisplayObjectContainer;
let batteUIContainer: DisplayObjectContainer;
const batEndUI = new battleEndWinUI(0, 0);
let bagUIContainer: DisplayObjectContainer;
let skillBoxContainer: DisplayObjectContainer;
let missionBoxContainer: DisplayObjectContainer;
let shopUIContainer: DisplayObjectContainer;
let settingBoxContainer: DisplayObjectContainer;

// anim测试角色
let animTemp: DisplayObjectContainer;
// anim测试角色
animTemp = new DisplayObjectContainer(PLAYER_INDEX_X,PLAYER_INDEX_Y);
const anim = animTemp.addComponent(new PlayerAnimTest()) as PlayerAnimTest

//animTemp.x = PLAYER_INDEX_X*TILE_SIZE;
//animTemp.y = PLAYER_INDEX_Y*TILE_SIZE;

anim.play();

/**
 * 游戏状态
 */
class PlayingState extends State {

    private static _instance: PlayingState
    public static get instance() {
        if (!this._instance) {
            this._instance = new PlayingState()
        }
        return this._instance
    }

    bg: Bitmap;
    userInfoUI: UserInfoUI;
    missionInfoUI: MissionInfoUI;

    mapContainer: DisplayObjectContainer;
    userUIContainer: DisplayObjectContainer;
    missionUIContainer: DisplayObjectContainer;


    battleUI: battleUI;
    baggUI: bagUI;
    shpUI: shopUI;

    camera: EmptyObject



    constructor() {
        super();

        map = mapManager.getMap(1) as GameMap;
        talkUIContainer = new DisplayObjectContainer(0, 0);

        this.mapContainer = new DisplayObjectContainer(0, 0);
        this.userUIContainer = new DisplayObjectContainer(0, 0);
        this.missionUIContainer = new DisplayObjectContainer(0, 0);

        this.bg = new Bitmap(0, 0, bg);
        this.userInfoUI = new UserInfoUI(0, 0);
        this.missionInfoUI = new MissionInfoUI(TILE_SIZE * COL_NUM, TILE_SIZE * 2);

        batteUIContainer = new DisplayObjectContainer(0, 0);
        this.battleUI = new battleUI(0, 0);
        bagUIContainer = new DisplayObjectContainer(120, -50);
        this.baggUI = new bagUI(0, 0);
        shopUIContainer = new DisplayObjectContainer(120, -50);
        this.shpUI = new shopUI(0, 0);
        skillBoxContainer = new DisplayObjectContainer(0, 0);
        missionBoxContainer = new DisplayObjectContainer(0, 0);
        settingBoxContainer = new DisplayObjectContainer(0, 0);

    }

    onEnter(): void {
        this.camera = new EmptyObject(0, 0);

        let camera = this.camera.addComponent(new Camera()) as Camera;

        camera.layer = 0;


        dynamicStage.addChild(this.mapContainer);
        // staticStage.addChild(this.bg);
        staticStage.addChild(this.userUIContainer);
        staticStage.addChild(this.missionUIContainer);
        staticStage.addChild(talkUIContainer);
        staticStage.addChild(skillBoxContainer);
        staticStage.addChild(missionBoxContainer);
        staticStage.addChild(settingBoxContainer);

        this.mapContainer.addChild(map);
        this.mapContainer.addChild(player.view);
        //this.mapContainer.addChild(animTemp);

        this.userUIContainer.addChild(this.userInfoUI);
        this.missionUIContainer.addChild(this.missionInfoUI);


        staticStage.addChild(batteUIContainer);
        // batteUIContainer.addChild(this.battleUI);
        staticStage.addChild(bagUIContainer);
        //bagUIContainer.addChild(this.baggUI);
        staticStage.addChild(shopUIContainer)
        baManager.addEventListener('openBag', (eventData: any) => {
            batteUIContainer.deleteChild(this.battleUI);
            shopUIContainer.deleteChild(this.shpUI);
            // missionBoxContainer.deleteChild(this.missionUI);
            bagUIContainer.addChild(this.baggUI);
        });
        baManager.addEventListener('bagDown', (eventData: any) => {
            bagUIContainer.deleteChild(this.baggUI);
        });
        shpManager.addEventListener('openShop', (eventData: any) => {
            batteUIContainer.deleteChild(this.battleUI);
            bagUIContainer.deleteChild(this.baggUI);
            // missionBoxContainer.deleteChild(this.missionUI);
            shopUIContainer.addChild(this.shpUI);
        });
        shpManager.addEventListener('shopDown', (eventData: any) => {
            shopUIContainer.deleteChild(this.shpUI);
            shopUIContainer.deleteAll()
            console.log("真关闭", shopUIContainer.toString())
        });
        baManager.addEventListener('updateBag', (eventData: any) => {
            bagUIContainer.deleteChild(this.baggUI);
            this.baggUI = new bagUI(0, 0);
            bagUIContainer.addChild(this.baggUI);
        });
        shpManager.addEventListener('updateShop', (eventData: any) => {
            shopUIContainer.deleteChild(this.shpUI);
            this.shpUI = new shopUI(0, 0);
            shopUIContainer.addChild(this.shpUI);
        });


        this.changePlayerViewPosture();
    }
    onUpdate(): void {
        // this.playerViewMove();
        player.update();
        missionManager.update();
    }
    onExit(): void {
        staticStage.deleteAll();
        dynamicStage.deleteAll();
        this.mapContainer.deleteAll();
    }

    // 角色原地动画
    changePlayerViewPosture() {
        setTimeout(() => {
            // player.view.img = (player.view.img == van1) ? van2 : van1; //TODO 动画
            this.changePlayerViewPosture();
        }, 600);
    }

}

// 鼠标点击事件，捕获所有被点击到的 DisplayObject，并从叶子节点依次向上通知监听器，监听器执行
canvas.onclick = function (event) {

    //clickaudio.play();

    const globalX = event.offsetX;
    const globalY = event.offsetY;

    //以下调UI位置用
    const dingWeix = event.offsetX - 0;
    const dingWeiy = event.offsetY - 0;
    console.log(dingWeix + " , " + dingWeiy);


    let hitResult = Stage.instance.mainStage.hitTest(new math.Point(globalX, globalY));
    if (hitResult) {
        hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        while (hitResult.parent) {
            // console.log(hitResult);
            hitResult = hitResult.parent;
            hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        }
    }
}
window.onkeydown = (event: any) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    inputManager.dispatchEvent("inputStart", keyCode);
}





// 初始状态设置
fsm.replaceState(CreateState.instance);
// fsm.replaceState(new LoadingState());
