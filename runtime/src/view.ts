/**
 * 用户信息UI
 */
class UserInfoUI extends DisplayObjectContainer {
    userName: TextField;
    userLevel: TextField;
    userAttack: TextField;
    userEquipment: TextField;

    bagButton: Bitmap;
    EscButton: Bitmap;
    SkillButton: Bitmap;
    bloodUI: Bitmap;

    constructor(x: number, y: number) {
        super(x, y);

        this.userName = new TextField(player.name, 10, 0, 20);
        this.userLevel = new TextField('Lv:' + player.level, 120, 0, 20);
        this.userAttack = new TextField('Attck:' + player._attack, 240, 0, 20);
        this.userEquipment = new TextField('装备: ', 400, 0, 20);
        this.bagButton = new Bitmap(750, 465, bagButton);
        this.EscButton = new Bitmap(820, 465, EscButton);
        this.SkillButton = new Bitmap(680, 465, SkillButton);
        this.bloodUI = new Bitmap(0, 0, bloodUI);
    

        // this.addChild(this.userName);
        // this.addChild(this.userLevel);
        // this.addChild(this.userAttack);
        // this.addChild(this.userEquipment);
        this.addChild(this.bagButton);
        this.addChild(this.SkillButton);
        this.addChild(this.EscButton);
        this.addChild(this.bloodUI);
        this.bagButton.addEventListener('onClick', (eventData: any) => {
            baManager.openBag();
        });
        player.addEventListener('updateUserInfo', (eventData: any) => {
            this.userLevel.text = 'Lv:' + player.level;
            this.userAttack.text = 'Attck:' + player._attack;
            let equipments: string = '';
            for (let item of player.mounthedEquipment) {
                equipments += item.name.toString();
            }
            this.userEquipment.text = '装备: ' + equipments;
        });
        // console.log(player);
    }
}


/**
 * 任务栏UI
 */
class MissionInfoUI extends DisplayObjectContainer {

    constructor(x: number, y: number) {
        super(x, y);

        this.update();
        missionManager.addEventListener('missionUpdate', (eventDate: any) => {
            this.update();
        })
    }

    update() {
        this.deleteAll();
        let index = 0;
        for (let mission of missionManager.missions) {
            if (mission.status == MissionStatus.DURRING) {
                const missionLabel = new TextField("", 0, 0, 24);
                this.addChild(missionLabel);
                missionLabel.text = mission.name;
                missionLabel.y = index * 24;
                index++;
            } else if (mission.status == MissionStatus.CAN_SUBMIT) {
                const missionLabel = new TextField("", 0, 0, 24);
                this.addChild(missionLabel);
                missionLabel.text = "请提交任务！";
                missionLabel.y = index * 24;
                index++;
            }
        }
    }
}

/**
 * 背包UI
 */
class bagUI extends DisplayObjectContainer {

    player: User = player;

    infoPanel: Bitmap;
    bagOnButton : Bitmap;
    bagOffButton : Bitmap;
    constructor(x: number, y: number) {
        //super(x, y);
        super(58, 64);

        this.infoPanel = new Bitmap(42, 48, bagWindowsUI);
        this.bagOnButton = new Bitmap(327,246,bagOnUI)
        this.bagOffButton = new Bitmap(398,246,bagOffUI)
        this.addChild(this.infoPanel);
        this.addChild(this.bagOnButton);
        this.addChild(this.bagOffButton);

        this.bagOnButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagOn();
        })
        this.bagOffButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagOff();
        })
    }


}
/**
 * 战斗UI
 */
class battleUI extends DisplayObjectContainer {

    player: User = player;

    enemy: Monster;

    infoPanel: Bitmap;
    blackMask: Bitmap;
    backGround: Bitmap;
    attackButton: Bitmap;
    textGroup: DisplayObjectContainer = new DisplayObjectContainer(590, 115);

    //战斗名字表现
    playerNameText = new TextField("" + this.player.name, 160, 80, 30);
    enemyNameText = new TextField('this.enemy.name', 380, 80, 30);

    //战斗角色表现
    playerImg = new Bitmap(120, 130, player.view.img);
    enemyImg: Bitmap;

    index = 0;

    constructor(x: number, y: number) {
        super(x, y);
        // super(58, 64);

        this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        this.infoPanel = new Bitmap(42, 48, battlePanelInfo);
        this.backGround = new Bitmap(42, 48, battlePanelBgImg);
        this.attackButton = new Bitmap(400, 400, battleAttackButton1);

        this.addChild(this.blackMask);
        this.addChild(this.infoPanel);
        this.addChild(this.backGround);
        this.addChild(this.textGroup);
        this.addChild(this.attackButton);
        this.addChild(this.playerNameText);
        this.addChild(this.enemyNameText);

        this.addChild(this.playerImg);


        this.attackButton.addEventListener("onClick", (eventData: any) => {
            batManager.fightOneTime(player, this.enemy);
        })

        batManager.addEventListener('playerBattleStart', (player: User) => {
            this.player = player;

        })

        batManager.addEventListener('enemyBattleStart', (enemy: Monster) => {
            this.enemy = enemy;
            this.enemyNameText.text = enemy.name;
            this.enemyImg = new Bitmap(355, 130, this.enemy.view.img);
            this.addChild(this.enemyImg);
        })

        batManager.addEventListener('playerDealDamage', (damage: number) => {
            let textField = new TextField(this.player.name + " 对 " + this.enemy.name + " 造成 " + damage + " 点伤害！", 0, this.index * 20, 15);
            console.log(this.enemy.hp);
            this.textGroup.addChild(textField);
            this.index++;

        })
        batManager.addEventListener('enemyDealDamage', (damage: number) => {
            let textField = new TextField(this.enemy.name + " 对 " + this.player.name + " 造成 " + damage + " 点伤害！", 0, this.index * 20, 15);
            console.log(this.player.hp);

            this.textGroup.addChild(textField);
            this.index++;
            this.indexJudge();
        })
        batManager.addEventListener('criticalHit', (eventData: any) => {
            let textField = new TextField(this.player.name + " 暴击辣！", 0, this.index * 20, 15);
            this.textGroup.addChild(textField);
            this.index++;
        })

        batManager.addEventListener('thisEnemyDie', (eventData: any) => {
            let textField = new TextField(this.enemy.name + " 被 " + this.player.name + " 打飞辣！", 0, this.index * 20, 15);
            this.textGroup.addChild(textField);
            this.index++;
            this.indexJudge();

            this.attackButton.deleteAllEventListener();
        })


        batManager.addEventListener('playerDie', (eventData: any) => {
            let textField = new TextField(this.player.name + " 被 " + this.enemy.name + " 打飞辣！", 0, this.index * 20, 15);
            this.textGroup.addChild(textField);
            this.index++;
            this.indexJudge();

            this.attackButton.deleteAllEventListener();
        })
    }

    indexJudge() {
        if (this.index >= 17) {
            this.textGroup.deleteAll();
            this.index = 0;
        }
    }

}

/**
 * 战斗胜利结算UI
 */
class battleEndWinUI extends DisplayObjectContainer {

    backGround: Bitmap;
    blackMask: Bitmap;
    backButton: Bitmap;

    expText: TextField;

    dropTextGroup: DisplayObjectContainer = new DisplayObjectContainer(400, 240);

    constructor(x: number, y: number) {
        super(x, y);

        this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);

        this.backGround = new Bitmap(254, 104, battleEndBGImg);
        this.backButton = new Bitmap(500, 353, backButtonImg);
        this.expText = new TextField('2333', 400, 207, 20);

        // this.addChild(this.blackMask);
        this.addChild(this.backGround);
        this.addChild(this.backButton);
        this.addChild(this.expText);
        this.addChild(this.dropTextGroup);

        batManager.addEventListener("enemyDrop", (dropBox: number[]) => {
            for (let i = 0; i < dropBox.length; i++) {
                let equip: Equipment;
                equip = equipManager.getEquipByID(dropBox[i]) as Equipment;
                let textField = new TextField(equip.name, 0, 30 * i, 20);
                player.packageEquipment.push(equip);
                this.dropTextGroup.addChild(textField);
            }
        })

        // this.backButton.deleteAllEventListener();
        this.backButton.addEventListener("onClick", (eventData: any) => {
            batManager.dispatchEvent("backSceneWin", null);
        })
    }
}

/**
 * 战斗失败结算UI
 */
class battleEndLoseUI extends DisplayObjectContainer {

    backGround: Bitmap;
    blackMask: Bitmap;
    backButton: Bitmap;

    // expText: TextField;

    // dropTextGroup: DisplayObjectContainer = new DisplayObjectContainer(400, 240);

    constructor(x: number, y: number) {
        super(x, y);

        this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        this.backGround = new Bitmap(254, 104, battleEndLoseBGImg);
        this.backButton = new Bitmap(500, 325, backButtonImg);
        // this.expText = new TextField('2333', 400, 207, 20);

        // this.addChild(this.blackMask);
        this.addChild(this.backGround);
        this.addChild(this.backButton);
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

        // this.backButton.deleteAllEventListener();
        this.backButton.addEventListener("onClick", (eventData: any) => {
            batManager.dispatchEvent("backSceneLose", null);
        })
    }
}

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
