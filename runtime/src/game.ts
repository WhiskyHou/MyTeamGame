/**
 * 资源载入
 * 
 * TODO: 资源载入需要整理
 */
var van_pick_knife = document.getElementById('van_pick_knife') as HTMLAudioElement;

var loadingImg = new Image();
loadingImg.src = './assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/载入界面.png';

Resource.load('./assets/美术素材/UI/开始游戏界面/开始游戏界面 PNG/载入界面.png', 'loging');


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
talk_window.src = './assets/talkWindow.png';

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
let skillSabiImg = new Image();
skillSabiImg.src = './assets/美术素材/UI/战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 撒币.png';
let skillCaihuaImg = new Image();
skillCaihuaImg.src = './assets/美术素材/UI/战斗界面/UI 战斗界面 PNG/战斗界面 技能栏 菜花.png';
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

let skillBoxBGImg = new Image();
skillBoxBGImg.src = './assets/美术素材/UI/6 技能界面/UI 技能 PNG/UI 技能界面底.png';
let skillBoxCloseImg = new Image();
skillBoxCloseImg.src = './assets/美术素材/UI/技能界面/UI 技能 PNG/UI 取消按钮.png';

let missionImg = new Image();
missionImg.src = './assets/UI 任务界面底.png';
let missionCloseImg = new Image();
missionCloseImg.src = './assets//UI 取消按钮.png';

/**
 * 常量
 * 
 * 全局变量
 * 
 * TODO: 部分需要删除整合
 */
const TILE_SIZE = 64;//TODO:还原为128
const ASSETS_PATH = "./assets/";

const ROW_NUM = 8;
const COL_NUM = 8;

const GRASS_L = 0;
const GRASS_D = 1;
const TREE = 2;
const WALL_LEFT = 3;
const WALL_MIDDLE = 4;
const WALL_RIGHT = 5;

const KILL_DARGON_KNIFE = 1;
const HP_BOTTLE = 2;

const NPC1 = 1;
const NPC2 = 2;
const NPC3 = 3;
const NPC4 = 4;
const NPC5 = 5;

const MONSTER = 1;

const PLAYER_INDEX_X = 0;
const PLAYER_INDEX_Y = 0;
const PLAYER_WALK_SPEED = 200;


var player: User = new User();
var map: GameMap;
var missionManager = new MissionManager();
var npcManager = new NpcManager();
let monsManager = new monsterManager();
let equipManager = new EquipmentManager();
let batManager = new battleManager();
let baManager = new bagManager();
let skillArray: Skill[] = []

npcManager.init(() => {
    monsManager.init(() => {
        equipManager.init(() => {
            equipSetInit(equipManager);
        });
    })
});

/**
 * 技能初始化(把这里当技能配置文件)
 */
let skillAttack = new Skill(0, '攻击');//攻击预留
skillAttack.description = '没有技能';
skillArray.push(skillAttack);
let skillEmpty = new Skill(1, '空');//空
skillEmpty.description = '没有技能';
skillArray.push(skillEmpty);
let skillSabi = new Skill(2, '撒币');
skillSabi.description = '撒币150%伤害';
skillArray.push(skillSabi);
let skillCaihua = new Skill(3, '菜花');
skillCaihua.description = '菜花80%伤害吸血';
skillArray.push(skillCaihua);

/**
 * 载入状态
 */
class LoadingState extends State {
    loadBG: Bitmap;
    loadPercent: TextField;
    count = 0;
    waitTime = 0;

    constructor() {
        super();
        this.loadBG = new Bitmap(0, 0, Resource.get('loging') as HTMLImageElement);
        this.loadPercent = new TextField(this.count + " %", 420, 463, 30);
    }

    onEnter(): void {
        stage.addChild(this.loadBG);
        stage.addChild(this.loadPercent);

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
            fsm.replaceState(new MenuState());
        }
    }
    onExit(): void {
        console.log('Loading State onExit');
        stage.deleteAllEventListener();
        stage.deleteAll();

    }
}

/**
 * 菜单状态
 */
class MenuState extends State {
    title: TextField;
    backGround: Bitmap;

    startButton: Bitmap;
    loadButton: Bitmap;
    workerButton: Bitmap;

    constructor() {
        super();
        this.backGround = new Bitmap(0, 0, titleBGImg);
        this.startButton = new Bitmap(350, 370, titleStartImg);
        this.title = new TextField('', 100, 300, 20);
        this.loadButton = new Bitmap(350, 440, titleLoadImg);
        this.workerButton = new Bitmap(80, 440, titleWorkerImg);
    }

    onEnter(): void {
        stage.addChild(this.backGround);
        stage.addChild(this.startButton);
        stage.addChild(this.title);
        stage.addChild(this.loadButton);
        stage.addChild(this.workerButton);

        this.startButton.addEventListener("onClick", this.onClick);

        const temp = new Audio()
        temp.src = "assets/van_pick_knife.mp3"
        const audio = new AudioPlay(temp);
        audio.playOnlyOnce = true
        audio.play()
    }
    onUpdate(): void {

    }
    onExit(): void {
        console.log('Menu State onExit');
        stage.deleteAllEventListener();
        stage.deleteAll();


    }


    onClick = (eventData: any) => {
        // 这里不调用onExit的话，状态机里面调用onExit还没反应，就提示游戏状态的角色名字未定义
        // 如果这里就调用onExit的话，那么状态机里的onExit也会调用成功
        // this.onExit();

        missionManager.init();
        // npcManager.init();
        fsm.replaceState(new CreateState());
    }
}


/**
 * 角色创建状态
 */
class CreateState extends State {

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

    canAssignPoint = 5;
    bigTag = true;

    constructor() {
        super();
        this.backGround = new Bitmap(0, 0, createBGImg);
        this.startButton = new Bitmap(350, 430, createStartButtonImg);
        this.onCreatePlayer();
        this.playerNameText = new TextField(player.name, 565, 160, 30);
        this.playerHpText = new TextField("" + player._hp, 545, 350, 30);
        this.playerAttackText = new TextField("" + player._attack, 545, 305, 30);
        this.canAssignPointText = new TextField("" + this.canAssignPoint, 573, 255, 30);
        this.tipsText = new TextField("", 620, 260, 20);

        this.hpAddButton = new Bitmap(630, 350, createAddButtonImg);
        this.hpMinusButton = new Bitmap(460, 350, createMinusButtonImg);

        this.attackAddButton = new Bitmap(630, 305, createAddButtonImg);
        this.attackMinusButton = new Bitmap(460, 305, createMinusButtonImg);

        this.startButton.addEventListener("onClick", this.onStartClick);

        this.hpAddButton.addEventListener("onClick", () => {
            if (this.canAssignPoint > 0) {
                player._hp += 5;
                this.canAssignPoint--;
                this.canAssignPointText.text = "" + this.canAssignPoint;
            }
            this.playerHpText.text = "" + player._hp;
        });
        this.hpMinusButton.addEventListener("onClick", () => {
            if (this.canAssignPoint < 5 && player._hp > 60) {
                player._hp -= 5;
                this.canAssignPoint++;
                this.canAssignPointText.text = "" + this.canAssignPoint;
            }
            this.playerHpText.text = "" + player._hp;
        });
        this.attackAddButton.addEventListener("onClick", () => {
            if (this.canAssignPoint > 0) {
                player._attack += 1;
                this.canAssignPoint--;
                this.canAssignPointText.text = "" + this.canAssignPoint;
            }
            this.playerAttackText.text = "" + player._attack;
        });
        this.attackMinusButton.addEventListener("onClick", () => {
            if (this.canAssignPoint < 5 && player._attack > 10) {
                player._attack -= 1;
                this.canAssignPoint++;
                this.canAssignPointText.text = "" + this.canAssignPoint;
            }
            this.playerAttackText.text = "" + player._attack;
        });
    }

    onEnter(): void {
        stage.addChild(this.backGround);
        stage.addChild(this.startButton);
        stage.addChild(this.playerHpText);
        stage.addChild(this.playerNameText);
        stage.addChild(this.playerAttackText);
        stage.addChild(this.canAssignPointText);
        stage.addChild(this.tipsText);

        stage.addChild(this.hpAddButton);
        stage.addChild(this.hpMinusButton);
        stage.addChild(this.attackAddButton);
        stage.addChild(this.attackMinusButton);


        // stage.addEventListener("onClick", this.onClick);


    }
    onUpdate(): void {
        if (this.canAssignPoint == 0) {
            this.heartBeatEffect(this.startButton);
        } else {
            this.startButton.scaleX = 1;
            this.startButton.scaleY = 1;
            this.startButton.x = 350;
            this.startButton.y = 430;
        }

    }
    onExit(): void {
        console.log('Create State onExit');
        stage.deleteAllEventListener();
        stage.deleteAll();
        // this.onCreatePlayer();
    }

    onCreatePlayer() {
        player = new User();//初始hp 60，攻击10，初始化于类中。
        player.level = 1;
        player.needEXP = 20;
        player.currentEXP = 0;
        player.coin = 0;
        player.name = 'Van';
        player.x = PLAYER_INDEX_X;
        player.y = PLAYER_INDEX_Y;
        // player.view = new Bitmap(PLAYER_INDEX_X, PLAYER_INDEX_Y, van1);//TODO 检测
        player.view = new Bitmap(PLAYER_INDEX_X, PLAYER_INDEX_Y, playerIdleImg);
    }

    onStartClick = (eventData: any) => {

        if (this.canAssignPoint == 0) {
            fsm.replaceState(new PlayingState());
        } else {
            this.tipsText.text = " ← 加完点才能学习！"
        }
    }

    heartBeatEffect(bmp: Bitmap) {
        if (this.bigTag) {
            bmp.scaleX += 0.08;
            bmp.scaleY += 0.08;
            bmp.x -= 5;
            bmp.y -= 3;
        } else {
            bmp.scaleX -= 0.08;
            bmp.scaleY -= 0.08;
            bmp.x += 5;
            bmp.y += 3;
        }
        if (bmp.scaleX > 1.5 || bmp.scaleY > 1.5) {
            this.bigTag = false;
        }
        if (bmp.scaleX < 1 || bmp.scaleY < 1) {
            this.bigTag = true;
        }

    }
}


var talkUIContainer: DisplayObjectContainer;
let batteUIContainer: DisplayObjectContainer;
let bagUIContainer: DisplayObjectContainer;
let skillBoxContainer: DisplayObjectContainer;
let missionBoxContainer: DisplayObjectContainer;

/**
 * 游戏状态
 */
class PlayingState extends State {
    bg: Bitmap;
    userInfoUI: UserInfoUI;
    missionInfoUI: MissionInfoUI;

    mapContainer: DisplayObjectContainer;
    userUIContainer: DisplayObjectContainer;
    missionUIContainer: DisplayObjectContainer;

    battleUI: battleUI;
    baggUI: bagUI;

    constructor() {
        super();

        map = new GameMap();
        talkUIContainer = new DisplayObjectContainer(16, 16);

        this.mapContainer = new DisplayObjectContainer(16, 16);
        this.userUIContainer = new DisplayObjectContainer(16, 16);
        this.missionUIContainer = new DisplayObjectContainer(16, 16);

        this.bg = new Bitmap(0, 0, bg);
        this.userInfoUI = new UserInfoUI(0, 0);
        this.missionInfoUI = new MissionInfoUI(TILE_SIZE * COL_NUM, TILE_SIZE * 2);

        batteUIContainer = new DisplayObjectContainer(16, 16);
        this.battleUI = new battleUI(0, 0);
        bagUIContainer = new DisplayObjectContainer(120, -50);
        this.baggUI = new bagUI(0, 0);

        skillBoxContainer = new DisplayObjectContainer(16, 16);
        missionBoxContainer = new DisplayObjectContainer(16, 16);

    }

    onEnter(): void {
        stage.addChild(this.bg);
        stage.addChild(this.mapContainer);
        stage.addChild(this.userUIContainer);
        stage.addChild(this.missionUIContainer);
        stage.addChild(talkUIContainer);
        stage.addChild(skillBoxContainer);
        stage.addChild(missionBoxContainer);

        this.mapContainer.addChild(map);
        this.mapContainer.addChild(player.view);
        this.userUIContainer.addChild(this.userInfoUI);
        this.missionUIContainer.addChild(this.missionInfoUI);


        stage.addChild(batteUIContainer);
        // batteUIContainer.addChild(this.battleUI);
        stage.addChild(bagUIContainer);
        //bagUIContainer.addChild(this.baggUI);
        baManager.addEventListener('openBag', (eventData: any) => {
            bagUIContainer.addChild(this.baggUI);
        });
        baManager.addEventListener('bagDown', (eventData: any) => {
            bagUIContainer.deleteChild(this.baggUI);
        });
        baManager.addEventListener('updateBag', (eventData: any) => {
            bagUIContainer.deleteChild(this.baggUI);
            this.baggUI = new bagUI(0, 0);
            bagUIContainer.addChild(this.baggUI);
        });
        // 给map添加监听器 鼠标点击到map容器上了，监听器就执行到目标点的走路命令
        map.addEventListener('onClick', (eventData: any) => {
            if (player.moveStatus) {
                const globalX = eventData.globalX;
                const globalY = eventData.globalY;
                const localPos = map.getLocalPos(new math.Point(globalX, globalY));

                // 确定被点击的格子位置
                const row = Math.floor(localPos.x / TILE_SIZE);
                const col = Math.floor(localPos.y / TILE_SIZE);

                // 添加行走命令
                const walk = new WalkCommand(player.x, player.y, row, col);
                commandPool.addCommand(walk);

                // 获取被点击格子的装备信息 如果有东西的话 就添加一个拾取命令
                const equipmentInfo = map.getEquipmentInfo(row, col);
                if (equipmentInfo) {
                    const pick = new PickCommand(equipmentInfo);
                    commandPool.addCommand(pick);
                }

                const npcInfo = map.getNpcInfo(row, col);
                if (npcInfo) {
                    const talk = new TalkCommand(npcInfo);
                    commandPool.addCommand(talk)
                }

                const monsterInfo = map.getMonsterInfo(row, col);
                if (monsterInfo) {
                    const fight = new FightCommand(monsterInfo);
                    commandPool.addCommand(fight);
                }

                player.moveStatus = false;

                // 执行命令池的命令
                commandPool.execute();
            }
        });



        this.changePlayerViewPosture();
    }
    onUpdate(): void {
        // this.playerViewMove();
        player.update();
        missionManager.update();
    }
    onExit(): void {
        stage.deleteAll();
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
    const globalX = event.offsetX;
    const globalY = event.offsetY;

    //以下调UI位置用
    const dingWeix = event.offsetX - 16;
    const dingWeiy = event.offsetY - 16;
    console.log(dingWeix + " , " + dingWeiy);


    let hitResult = stage.hitTest(new math.Point(globalX, globalY));
    if (hitResult) {
        hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        while (hitResult.parent) {
            // console.log(hitResult);
            hitResult = hitResult.parent;
            hitResult.dispatchEvent('onClick', { target: hitResult, globalX: globalX, globalY: globalY });
        }
    }
}



// 初始状态设置
fsm.replaceState(new CreateState());
// fsm.replaceState(new LoadingState());
