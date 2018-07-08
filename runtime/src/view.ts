/**
 * 用户信息UI
 */
class UserInfoUI extends DisplayObjectContainer {
    userName: TextField;
    userLevel: TextField;
    userAttack: TextField;
    userEquipment: TextField;
    userCoin: TextField;
    userDiamond: TextField;
    currentEXP: TextField;
    needEXP: TextField;

    bagButton: Bitmap;
    EscButton: Bitmap;
    SkillButton: Bitmap;
    bloodUI: Bitmap;
    bloodUI2: Bitmap;

    skillUI: skillBoxUI;



    constructor(x: number, y: number) {
        super(x, y);

        this.userName = new TextField(player.name, 130, 5, 20);
        this.userLevel = new TextField('' + player.level, 52, 85, 20);
        this.userAttack = new TextField('Attck:' + player._attack, 240, 0, 20);
        this.userEquipment = new TextField('装备: ', 400, 0, 20);
        this.bagButton = new Bitmap(750, 465, bagButton);
        this.EscButton = new Bitmap(820, 465, EscButton);
        this.SkillButton = new Bitmap(680, 465, SkillButton);
        this.bloodUI = new Bitmap(0, 0, bloodUI);
        this.bloodUI2 = new Bitmap(95, 3, bloodUI2);
        this.userCoin = new TextField('' + player.coin, 245, 9, 20);
        this.userDiamond = new TextField('' + player.diamond, 350, 9, 20);
        this.currentEXP = new TextField('' + player.currentEXP, 380, 9, 20);
        this.needEXP = new TextField('' + player.needEXP, 420, 9, 20);

        this.addChild(this.userName);
        this.addChild(this.userLevel);
        // this.addChild(this.userAttack);
        // this.addChild(this.userEquipment);
        this.addChild(this.bagButton);
        this.addChild(this.SkillButton);
        this.addChild(this.EscButton);
        this.addChild(this.bloodUI);
        this.addChild(this.bloodUI2);
        this.addChild(this.userCoin);
        this.addChild(this.userDiamond);
        this.addChild(this.currentEXP);
        this.addChild(this.needEXP);

        this.bagButton.addEventListener('onClick', (eventData: any) => {
            baManager.openBag();
        });
        player.addEventListener('updateUserInfo', (eventData: any) => {
            // if (player.currentEXP >= player.needEXP) {
            //     player.level++;
            //     //TODO升级提升血量 攻击力
            //     player.currentEXP -= player.needEXP;
            //     player.needEXP *= 1.2
            // }
            this.userLevel.text = '' + player.level;
            this.currentEXP.text = '' + player.currentEXP;
            this.needEXP.text = '' + player.needEXP;
            this.userCoin.text = '' + player.coin;
            // this.userAttack.text = 'Attck:' + player._attack;
            // let equipments: string = '';
            // for (let item of player.mounthedEquipment) {
            //     equipments += item.name.toString();
            // }
            // this.userEquipment.text = '装备: ' + equipments;
        });
        this.SkillButton.addEventListener('onClick', (eventData: any) => {
            this.skillUI = new skillBoxUI(0, 0);
            skillBoxContainer.addChild(this.skillUI);
        })
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
    bagOnButton: Bitmap;
    bagOffButton: Bitmap;
    bagDownButton: Bitmap;
    bagRightButton: Bitmap;
    bagLeftButton: Bitmap;
    bagOtherButton: Bitmap;
    bagWeaponButton: Bitmap;
    bagArmorButton: Bitmap;
    bagConsumableButton: Bitmap;

    weaponText: TextField;
    clothText: TextField;
    watchText: TextField;
    trousersText: TextField;
    phoneText: TextField;
    shoesText: TextField;

    equipment1Text: TextField;
    equipment2Text: TextField;
    equipment3Text: TextField;
    equipment4Text: TextField;
    equipment5Text: TextField;
    pageText: TextField;
    equipmentMultiInfoText: MultiTextField;

    attackText : TextField;
    criticalPerText : TextField;
    charmText : TextField;
    hpText : TextField;
    mpText : TextField;
    constructor(x: number, y: number) {
        //super(x, y);
        super(58, 64);

        this.infoPanel = new Bitmap(42, 48, bagWindowsUI);
        this.bagOnButton = new Bitmap(327,246,bagOnUI)
        this.bagOffButton = new Bitmap(398,246,bagOffUI)
        this.bagDownButton = new Bitmap(45,50,bagDownUI)
        this.bagRightButton = new Bitmap(278,253,bagRightUI)
        this.bagLeftButton = new Bitmap(183,253,bagLeftUI)
        this.bagOtherButton = new Bitmap(73,252,bagOtherUI)
        this.bagWeaponButton = new Bitmap(73,87,bagWeaponUI)
        this.bagArmorButton = new Bitmap(73,142,bagArmorUI)
        this.bagConsumableButton = new Bitmap(75,197,bagConsumableUI)
        //装备栏
        this.weaponText = new TextField(player.mounthedEquipment[0].name, 128, 330, 15);
        this.clothText = new TextField(player.mounthedEquipment[1].name, 128, 358, 15);
        this.watchText = new TextField(player.mounthedEquipment[2].name, 128, 388, 15);
        this.trousersText = new TextField(player.mounthedEquipment[3].name, 332, 331, 15);
        this.phoneText = new TextField(player.mounthedEquipment[4].name, 332, 359, 15);
        this.shoesText = new TextField(player.mounthedEquipment[5].name, 332, 388, 15);
        //背包栏
        this.equipment1Text = new TextField(baManager.getNowEquipment(0),174,84,15)
        this.equipment2Text = new TextField(baManager.getNowEquipment(1),174,116,15)
        this.equipment3Text = new TextField(baManager.getNowEquipment(2),174,149,15)
        this.equipment4Text = new TextField(baManager.getNowEquipment(3),174,182,15)
        this.equipment5Text = new TextField(baManager.getNowEquipment(4),174,215,15)
        this.pageText = new TextField((baManager.nowPage+1).toString(),220,243,30)
        //装备信息栏
        let str :Array<string> = ['名称：','品质:','部位：','加血：','攻击力：','暴击：'];
        this.equipmentMultiInfoText =  new MultiTextField(str,327,125,12,5)

        //人物属性显示
        player.changeEquipments()
        this.attackText = new TextField(player._attack.toString(),90,453,15)
        this.criticalPerText = new TextField(player._criticalPer.toString(),183,453,15)
        this.charmText = new TextField(player._charm.toString(),262,453,15)
        this.hpText = new TextField(player._hp.toString(),336,453,15)
        this.mpText = new TextField(player._mp.toString(),420,453,15)

        this.addChild(this.infoPanel);
        this.addChild(this.bagOnButton);
        this.addChild(this.bagOffButton);
        this.addChild(this.bagDownButton);
        this.addChild(this.bagRightButton);
        this.addChild(this.bagLeftButton);
        this.addChild(this.bagOtherButton);
        this.addChild(this.bagWeaponButton);
        this.addChild(this.bagArmorButton);
        this.addChild(this.bagConsumableButton);
        this.addChild(this.weaponText);
        this.addChild(this.clothText);
        this.addChild(this.watchText);
        this.addChild(this.trousersText);
        this.addChild(this.phoneText);
        this.addChild(this.shoesText);
        this.addChild(this.equipment1Text);
        this.addChild(this.equipment2Text);
        this.addChild(this.equipment3Text);
        this.addChild(this.equipment4Text);
        this.addChild(this.equipment5Text);
        this.addChild(this.pageText);
        this.addChild(this.equipmentMultiInfoText);
        this.addChild(this.attackText);
        this.addChild(this.criticalPerText);
        this.addChild(this.charmText);
        this.addChild(this.hpText);
        this.addChild(this.mpText);
        this.bagOnButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagOn();
            baManager.getNowEquipment(0)
        })
        this.bagOffButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagOff();
        })
        this.bagDownButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagDown();
        })
        this.bagRightButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagRight();
        })
        this.bagLeftButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagLeft();
        })
        this.bagOtherButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagOther();
        })
        this.bagWeaponButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagWeapon();
        })
        this.bagArmorButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagArmor();
        })
        this.bagConsumableButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagConsumable();
        })
        this.equipment1Text.addEventListener("onClick", (eventData: any) => {
            this.changeEquipmentInfo(0)
        })
        this.equipment2Text.addEventListener("onClick", (eventData: any) => {
            this.changeEquipmentInfo(1)
        })
        this.equipment3Text.addEventListener("onClick", (eventData: any) => {
            this.changeEquipmentInfo(2)
        })
        this.equipment4Text.addEventListener("onClick", (eventData: any) => {
            this.changeEquipmentInfo(3)
        })
        this.equipment5Text.addEventListener("onClick", (eventData: any) => {
            this.changeEquipmentInfo(4)
        })
        this.weaponText.addEventListener("onClick",(ecentData: any) => {
            baManager.changeNowMounthedEquipment(0)
        })
        this.clothText.addEventListener("onClick",(ecentData: any) => {
            baManager.changeNowMounthedEquipment(1)
        })
        this.watchText.addEventListener("onClick",(ecentData: any) => {
            baManager.changeNowMounthedEquipment(2)
        })
        this.trousersText.addEventListener("onClick",(ecentData: any) => {
            baManager.changeNowMounthedEquipment(3)
        })
        this.phoneText.addEventListener("onClick",(ecentData: any) => {
            baManager.changeNowMounthedEquipment(4)
        })
        this.shoesText.addEventListener("onClick",(ecentData: any) => {
            baManager.changeNowMounthedEquipment(5)
        })
    }
    changeEquipmentInfo(num: number) {
        if (baManager.nowEquipment) {
            baManager.changeNowEquipment(num)
            this.deleteChild(this.equipmentMultiInfoText)
            let equipmentIfo :Array<string> = ['名称：'+baManager.nowEquipment.name,'品质：'+baManager.nowEquipment.quality,
            '部位：'+baManager.nowEquipment.posID,'血量：+'+baManager.nowEquipment.health,
            '攻击力：+'+baManager.nowEquipment.attack,'暴击：+'+baManager.nowEquipment.criticalPer+'%'];
            this.equipmentMultiInfoText =  new MultiTextField(equipmentIfo,327,125,12,5)
            this.addChild(this.equipmentMultiInfoText)
            this.dispatchEvent('updateBag',player)
        }
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
    playerImg = new Bitmap(120, 120, player.view.img);
    enemyImg: Bitmap;

    //战斗人物属性
    playerAtkText = new TextField("" + player._attack, 150, 375, 30);
    playerCriText = new TextField("" + player._criticalPer, 150, 420, 30);
    playerHpText = new TextField("" + player._hp, 175, 250, 20);
    enemyHpText = new TextField("", 410, 250, 20);

    //技能按钮
    skillButton1: Bitmap;
    skillButton2: Bitmap;
    skillButton3: Bitmap;
    skillButtonGroup: Bitmap[] = [];
    skillIDGroup: number[] = [];

    index = 0;

    constructor(x: number, y: number) {
        super(x, y);
        this.index = 0;
        // super(58, 64);

        this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        this.infoPanel = new Bitmap(42, 48, battlePanelInfo);
        this.backGround = new Bitmap(42, 48, battlePanelBgImg);

        //TODO 技能初始化
        this.attackButton = new Bitmap(220, 375, battleAttackButton1);
        this.skillButton1 = new Bitmap(220, 425, battleAttackButton1);
        this.skillButton2 = new Bitmap(345, 375, battleAttackButton1);
        this.skillButton3 = new Bitmap(345, 425, battleAttackButton1);
        this.skillButtonGroup.push(this.skillButton1);
        this.skillButtonGroup.push(this.skillButton2);
        this.skillButtonGroup.push(this.skillButton3);
        for (let i = 0; i < this.player.skill.length; i++) {
            switch (player.skill[i].id) {
                case 1:
                    this.skillButtonGroup[i].img = skillEmptyImg;
                    this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 2:
                    this.skillButtonGroup[i].img = skillSabiImg;
                    this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 3:
                    this.skillButtonGroup[i].img = skillCaihuaImg;
                    this.skillIDGroup[i] = player.skill[i].id;
                    break;
            }
        }


        this.addChild(this.blackMask);
        this.addChild(this.infoPanel);
        this.addChild(this.backGround);
        this.addChild(this.textGroup);
        this.addChild(this.attackButton);
        this.addChild(this.playerNameText);
        this.addChild(this.enemyNameText);
        this.addChild(this.playerAtkText);
        this.addChild(this.playerCriText);
        this.addChild(this.playerHpText);
        this.addChild(this.enemyHpText);
        this.addChild(this.playerImg);

        this.addChild(this.skillButton1);
        this.addChild(this.skillButton2);
        this.addChild(this.skillButton3);


        this.attackButton.addEventListener("onClick", (eventData: any) => {
            batManager.fightOneTime(player, this.enemy, 0);//普通攻击ID为0
        })
        this.skillButton1.addEventListener("onClick", (eventData: any) => {
            console.log(this.skillIDGroup[0]);
            batManager.fightOneTime(player, this.enemy, this.skillIDGroup[0]);
        })
        this.skillButton2.addEventListener("onClick", (eventData: any) => {
            console.log(this.skillIDGroup[1]);
            batManager.fightOneTime(player, this.enemy, this.skillIDGroup[1]);
        })
        this.skillButton3.addEventListener("onClick", (eventData: any) => {
            console.log(this.skillIDGroup[2]);
            batManager.fightOneTime(player, this.enemy, this.skillIDGroup[2]);
        })

        batManager.addEventListener('playerBattleStart', (player: User) => {
            this.player = player;

        })

        batManager.addEventListener('enemyBattleStart', (enemy: Monster) => {
            this.enemy = enemy;
            this.enemyNameText.text = enemy.name;
            this.enemyImg = new Bitmap(355, 120, this.enemy.view.img);
            this.enemyHpText.text = '' + enemy.hp;
            this.addChild(this.enemyImg);
        })

        batManager.addEventListener('playerDealDamage', (damage: number) => {
            let textField = new TextField(this.player.name + " 对 " + this.enemy.name + " 造成 " + damage + " 点伤害！", 0, this.index * 20, 15);
            this.enemyHpText.text = '' + this.enemy.hp;
            this.textGroup.addChild(textField);
            this.index++;

        })
        batManager.addEventListener('enemyDealDamage', (damage: number) => {
            let textField = new TextField("", 0, this.index * 20, 15);
            if (damage > 0) {
                textField = new TextField(this.enemy.name + " 对 " + this.player.name + " 造成 " + damage + " 点伤害！", 0, this.index * 20, 15);
            } else {
                textField.text = this.player.name + " 吸了 " + -damage + " 点血！";
            }

            if (player._hp <= 0) {
                this.playerHpText.text = "0";
            } else {
                this.playerHpText.text = "" + player._hp;
            }

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

    constructor(x: number, y: number) {
        super(x, y);

        this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        this.backGround = new Bitmap(254, 104, battleEndLoseBGImg);
        this.backButton = new Bitmap(500, 325, backButtonImg);

        this.addChild(this.backGround);
        this.addChild(this.backButton);

        this.backButton.addEventListener("onClick", (eventData: any) => {
            batManager.dispatchEvent("backSceneLose", null);
        })
    }
}

/**
 * 技能栏UI
 */
class skillBoxUI extends DisplayObjectContainer {

    backGround: Bitmap;

    closeButton: Bitmap;
    // backButton: Bitmap;

    skillText: TextField;
    skillTextGroup: DisplayObjectContainer;

    descriptionText: TextField;



    constructor(x: number, y: number) {
        super(x, y);

        this.backGround = new Bitmap(225, 25, skillBoxBGImg);
        this.closeButton = new Bitmap(225, 25, skillBoxCloseImg);
        this.skillTextGroup = new DisplayObjectContainer(395, 20);
        // this.backButton = new Bitmap(500, 325, backButtonImg);
        this.descriptionText = new TextField("", 525, 100, 20);//TODO 描述换行

        this.addChild(this.backGround);
        this.addChild(this.closeButton);
        this.addChild(this.skillTextGroup);
        this.addChild(this.descriptionText);

        this.closeButton.addEventListener('onClick', () => {
            this.deleteAll();
        })

        for (let i = 2; i < skillArray.length; i++) {//0为普通攻击 1为空
            this.skillText = new TextField(skillArray[i].name, 0, (i - 1) * 33, 25);
            this.skillText.addEventListener('onClick', () => {
                this.descriptionText.text = skillArray[i].description;
            })
            this.skillTextGroup.addChild(this.skillText);
        }
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
