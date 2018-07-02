/**
 * 资源载入
 */
var van_pick_knife = document.getElementById('van_pick_knife') as HTMLAudioElement;
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



/**
 * 常量
 * 
 * 全局变量
 */
const TILE_SIZE = 64;
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


var player: User;
var map: GameMap;
var missionManager = new MissionManager();
var npcManager = new NpcManager();
npcManager.init();



/**
 * 开始状态
 */
class MenuState extends State {
    title: TextField;

    constructor() {
        super();
        this.title = new TextField('点击开始游戏', 200, 300, 60);
    }

    onEnter(): void {
        stage.addChild(this.title);
        stage.addEventListener("onClick", this.onClick);
    }
    onUpdate(): void {

    }
    onExit(): void {
        console.log('Login State onExit');
        stage.deleteAllEventListener();
        stage.deleteAll();
        // this.onCreatePlayer();
    }

    onCreatePlayer() {
        player = new User();
        player.level = 1;
        player.name = 'Van';
        player.x = PLAYER_INDEX_X;
        player.y = PLAYER_INDEX_Y;
        player.view = new Bitmap(PLAYER_INDEX_X, PLAYER_INDEX_Y, van1);
    }

    onClick = (eventData: any) => {
        // 这里不调用onExit的话，状态机里面调用onExit还没反应，就提示游戏状态的角色名字未定义
        // 如果这里就调用onExit的话，那么状态机里的onExit也会调用成功
        // this.onExit();

        this.onCreatePlayer();
        missionManager.init();
        // npcManager.init();
        fsm.replaceState(new PlayingState());
    }
}


var talkUIContainer: DisplayObjectContainer;

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


    constructor() {
        super();

        map = new GameMap();
        talkUIContainer = new DisplayObjectContainer(16, 16);

        this.mapContainer = new DisplayObjectContainer(16, 16);
        this.userUIContainer = new DisplayObjectContainer(16, 16);
        this.missionUIContainer = new DisplayObjectContainer(16, 16);

        this.bg = new Bitmap(0, 0, bg);
        this.userInfoUI = new UserInfoUI(0, TILE_SIZE * ROW_NUM);
        this.missionInfoUI = new MissionInfoUI(TILE_SIZE * COL_NUM, TILE_SIZE * 2);
    }

    onEnter(): void {
        stage.addChild(this.bg);
        stage.addChild(this.mapContainer);
        stage.addChild(this.userUIContainer);
        stage.addChild(this.missionUIContainer);
        stage.addChild(talkUIContainer);

        this.mapContainer.addChild(map);
        this.mapContainer.addChild(player.view);
        this.userUIContainer.addChild(this.userInfoUI);
        this.missionUIContainer.addChild(this.missionInfoUI);



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
            player.view.img = (player.view.img == van1) ? van2 : van1;
            this.changePlayerViewPosture();
        }, 600);
    }

}




// 鼠标点击事件，捕获所有被点击到的 DisplayObject，并从叶子节点依次向上通知监听器，监听器执行
canvas.onclick = function (event) {
    const globalX = event.offsetX;
    const globalY = event.offsetY;

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
fsm.replaceState(new MenuState());
