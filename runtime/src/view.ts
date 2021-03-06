/**
 * 用户信息UI
 */
class UserInfoUI extends DisplayObjectContainer {

    //主界面UI
    userName: TextField;
    userLevel: TextField;
    userCoin: TextField;
    userDiamond: TextField;
    currentEXP: TextField;
    needEXP: TextField;
    HP: TextField;
    MP: TextField;

    bloodUI: Bitmap;
    bloodUI1: Bitmap;
    bloodUI2: Bitmap;
    userCoinUI: Bitmap;
    userDiamondUI: Bitmap;

    //按钮UI
    EscButton: Bitmap;
    bagButton: Bitmap;
    SkillButton: Bitmap;
    missionButton: Bitmap;

    skillUI: skillBoxUI;
    missionUI: MissionUI;
    settingUI: SettingUI;



    //

    constructor(x: number, y: number) {

        super(x, y);


        this.bloodUI = new Bitmap(0, 0, bloodUI);
        this.bloodUI1 = new Bitmap(90, 32, bloodUI1);
        this.bloodUI2 = new Bitmap(90, 38, bloodUI2);
        this.userCoinUI = new Bitmap(350, 20, userCoinUI);
        this.userDiamondUI = new Bitmap(500, 20, userDiamondUI);

        this.userName = new TextField(player.name, 130, 12, 20);
        this.userLevel = new TextField('' + player.level, 54, 91, 20);
        this.userCoin = new TextField('' + player.coin, 390, 20, 25);
        this.userDiamond = new TextField('' + player.diamond, 545, 20, 25);
        this.currentEXP = new TextField('' + player.currentEXP, 150, 90, 20);
        this.needEXP = new TextField('/    ' + player.needEXP, 190, 90, 20);

        this.HP = new TextField("" + player._hp + " / " + player.maxHP, 150, 42, 20);
        this.MP = new TextField("" + player._mp + " / " + player.maxMp, 150, 67, 20);

        //

        this.bagButton = new Bitmap(750, 475, bagButton);
        this.EscButton = new Bitmap(820, 475, EscButton);
        this.SkillButton = new Bitmap(680, 475, SkillButton);
        this.missionButton = new Bitmap(610, 475, MissionButton);

        //


        this.addChild(this.bloodUI);
        this.addChild(this.bloodUI1);
        this.addChild(this.bloodUI2);
        this.addChild(this.userCoinUI);
        this.addChild(this.userDiamondUI);

        this.addChild(this.userName);
        this.addChild(this.userLevel);
        this.addChild(this.userCoin);
        this.addChild(this.userDiamond);
        this.addChild(this.currentEXP);
        this.addChild(this.needEXP);

        this.addChild(this.HP);
        this.addChild(this.MP);

        //

        this.addChild(this.bagButton);
        this.addChild(this.SkillButton);
        this.addChild(this.EscButton);
        this.addChild(this.missionButton);

        //16558
        this.bagButton.addEventListener('onClick', (eventData: any) => {
            baManager.openBag();
            clickaudio.play();
        });

        this.SkillButton.addEventListener('onClick', (eventData: any) => {
            this.skillUI = new skillBoxUI(0, 0);
            skillBoxContainer.addChild(this.skillUI);
            clickaudio.play();
            this.skillUI.hasOn = true;
        });

        this.missionButton.addEventListener('onClick', (eventData: any) => {
            this.missionUI = new MissionUI(0, 0);
            missionBoxContainer.addChild(this.missionUI);
            clickaudio.play();
            missionHasOn = true;
        });

        this.EscButton.addEventListener('onClick', (eventData: any) => {
            this.settingUI = new SettingUI(0, 0);
            settingBoxContainer.addChild(this.settingUI);
            setHasOn = true;
            clickaudio.play();
        });


        let missionHasOn = false;
        let setHasOn = false;
        let skillHasOn = false;

        //26558
        inputManager.addEventListener('L', () => {
            if (!this.missionUI) {
                this.missionUI = new MissionUI(0, 0);
                missionBoxContainer.addChild(this.missionUI);
                clickaudio.play();
            } else {

                if (!this.missionUI.hasOn) {
                    this.missionUI = new MissionUI(0, 0);
                    missionBoxContainer.addChild(this.missionUI);
                    clickaudio.play();
                    this.missionUI.hasOn = true;
                } else {
                    missionBoxContainer.deleteAll();
                    this.missionUI.hasOn = false;
                }
            }
        })

        inputManager.addEventListener('O', () => {
            if (!this.settingUI) {
                this.settingUI = new SettingUI(0, 0);
                settingBoxContainer.addChild(this.settingUI);
                clickaudio.play();
            } else {
                if (!this.settingUI.hasOn) {
                    this.settingUI = new SettingUI(0, 0);
                    settingBoxContainer.addChild(this.settingUI);
                    clickaudio.play();
                    this.settingUI.hasOn = true;
                } else {
                    settingBoxContainer.deleteAll();
                    this.settingUI.hasOn = false;
                }
            }
        })

        inputManager.addEventListener('K', () => {
            if (!this.skillUI) {
                this.skillUI = new skillBoxUI(0, 0);
                skillBoxContainer.addChild(this.skillUI);
                clickaudio.play();
            } else {
                if (!this.skillUI.hasOn) {
                    this.skillUI = new skillBoxUI(0, 0);
                    skillBoxContainer.addChild(this.skillUI);
                    clickaudio.play();
                    this.skillUI.hasOn = true;
                } else {
                    skillBoxContainer.deleteAll();
                    this.skillUI.hasOn = false;
                }
            }


        })

        player.addEventListener('updateUserInfo', (eventData: any) => {
            // if (player.currentEXP >= player.needEXP) {
            //     player.level++;
            //     //TODO升级提升血量 攻击力
            //     player.currentEXP -= player.needEXP;
            //     player.needEXP *= 1.2
            // }
            this.userLevel.text = '' + player.level;
            this.currentEXP.text = '' + player.currentEXP;
            this.needEXP.text = '/   ' + player.needEXP;
            this.userCoin.text = '' + player.coin;
            // this.userAttack.text = 'Attck:' + player._attack;
            // let equipments: string = '';
            // for (let item of player.mounthedEquipment) {
            //     equipments += item.name.toString();
            // }
            // this.userEquipment.text = '装备: ' + equipments;
            this.deleteChild(this.HP);
            this.deleteChild(this.MP);
            this.HP = new TextField("" + player._hp + " / " + player.maxHP, 150, 42, 20);
            this.MP = new TextField("" + player._mp + " / " + player.maxMp, 150, 67, 20);
            this.addChild(this.HP);
            this.addChild(this.MP);
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
 * 任务界面UI
 */

class MissionUI extends DisplayObjectContainer {

    MissionBackGround: Bitmap;
    closeButton: Bitmap;

    blackMask = new Bitmap(0, 0, battlePanelBlackMask);

    missionTextGroup = new DisplayObjectContainer(0, 0);
    hasOn = false;

    constructor(x: number, y: number) {
        super(x, y);

        this.hasOn = true;
        this.MissionBackGround = new Bitmap(225, 65, missionImg);
        this.closeButton = new Bitmap(215, 55, missionCloseImg);

        this.addChild(this.blackMask);
        this.addChild(this.MissionBackGround);
        this.addChild(this.closeButton);
        this.addChild(this.missionTextGroup);

        this.closeButton.addEventListener('onClick', () => {
            this.deleteAll();
            clickaudio.play();
        })
        this.updateMissionText();

        inputManager.addEventListener("Esc", (eventData: any) => {
            this.deleteAll();
        });
    }



    updateMissionText() {
        this.missionTextGroup.deleteAll();

        for (let i = 0; i < missionManager.missions.length; i++) {
            if (missionManager.missions[i].status == MissionStatus.DURRING || missionManager.missions[i].status == MissionStatus.CAN_SUBMIT) {
                let missionText = new TextField(missionManager.missions[i].name, 360, 80, 40);

                for (let b = 0; b < missionManager.missions[i].canAcceptContent.length; b++) {
                    let missionAcceptText = new TextField(missionManager.missions[i].canAcceptContent[b], 340, 150 + 20 * b, 10);
                    this.missionTextGroup.addChild(missionAcceptText);
                }
                this.missionTextGroup.addChild(missionText);
                let skill = new TextField("", 425, 412, 20);
                let EXP = new TextField(missionManager.missions[i].addEXP.toString(), 425, 385, 20);
                let coin = new TextField(missionManager.missions[i].addCoin.toString(), 566, 384, 20);
                if (missionManager.missions[i].equipment) {
                    skill = new TextField(missionManager.missions[i].equipment.name, 425, 412, 20);
                }
                this.missionTextGroup.addChild(EXP);
                this.missionTextGroup.addChild(coin);
                this.missionTextGroup.addChild(skill);
                return;
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

    attackText: TextField;
    criticalPerText: TextField;
    charmText: TextField;
    hpText: TextField;
    mpText: TextField;

    blackMask = new Bitmap(-178, -14, battlePanelBlackMask);

    constructor(x: number, y: number) {
        //super(x, y);
        super(58, 64);

        this.infoPanel = new Bitmap(42, 48, bagWindowsUI);
        this.bagOnButton = new Bitmap(327, 246, bagOnUI)
        this.bagOffButton = new Bitmap(398, 246, bagOffUI)
        this.bagDownButton = new Bitmap(45, 50, bagDownUI)
        this.bagRightButton = new Bitmap(278, 253, bagRightUI)
        this.bagLeftButton = new Bitmap(183, 253, bagLeftUI)
        this.bagOtherButton = new Bitmap(73, 252, bagOtherUI)
        this.bagWeaponButton = new Bitmap(73, 87, bagWeaponUI)
        this.bagArmorButton = new Bitmap(73, 142, bagArmorUI)
        this.bagConsumableButton = new Bitmap(75, 197, bagConsumableUI)
        //装备栏
        this.weaponText = new TextField(player.mounthedEquipment[0].name, 128, 330, 15);
        this.clothText = new TextField(player.mounthedEquipment[1].name, 128, 358, 15);
        this.watchText = new TextField(player.mounthedEquipment[2].name, 128, 388, 15);
        this.trousersText = new TextField(player.mounthedEquipment[3].name, 332, 331, 15);
        this.phoneText = new TextField(player.mounthedEquipment[4].name, 332, 359, 15);
        this.shoesText = new TextField(player.mounthedEquipment[5].name, 332, 388, 15);
        //背包栏
        this.equipment1Text = new TextField(baManager.getNowEquipment(0), 174, 84, 15)
        this.equipment2Text = new TextField(baManager.getNowEquipment(1), 174, 116, 15)
        this.equipment3Text = new TextField(baManager.getNowEquipment(2), 174, 149, 15)
        this.equipment4Text = new TextField(baManager.getNowEquipment(3), 174, 182, 15)
        this.equipment5Text = new TextField(baManager.getNowEquipment(4), 174, 215, 15)
        this.pageText = new TextField((baManager.nowPage + 1).toString(), 220, 246, 26)
        //装备信息栏
        let str: Array<string> = ['名称：', '品质:', '部位：', '血量：', '攻击力：', '暴击：'];
        this.equipmentMultiInfoText = new MultiTextField(str, 327, 125, 12, 5)

        //人物属性显示
        player.changeEquipments()
        this.attackText = new TextField(player._attack.toString(), 102, 453, 15)
        this.criticalPerText = new TextField(player._criticalPer.toString(), 183, 453, 15)
        this.charmText = new TextField(player._charm.toString(), 262, 453, 15)
        this.hpText = new TextField(player.maxHP.toString(), 336, 453, 15)
        this.mpText = new TextField(player.maxMp.toString(), 420, 453, 15)

        this.addChild(this.blackMask);
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
            // baManager.getNowEquipment(0)
            clickaudio.play();
        })
        this.bagOffButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagOff();
            clickaudio.play();
        })
        this.bagDownButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagDown();
            clickaudio.play();
        })
        this.bagRightButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagRight();
        })
        this.bagLeftButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagLeft();

        })
        this.bagOtherButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagOther();
            clickaudio.play();
        })
        this.bagWeaponButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagWeapon();
            clickaudio.play();
        })
        this.bagArmorButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagArmor();
            clickaudio.play();
        })
        this.bagConsumableButton.addEventListener("onClick", (eventData: any) => {
            baManager.bagConsumable();
            clickaudio.play();
        })
        this.equipment1Text.addEventListener("onClick", (eventData: any) => {
            baManager.changeNowEquipment(0)
            this.changeEquipmentInfo(baManager.nowEquipment)
            clickaudio.play();
        })
        this.equipment2Text.addEventListener("onClick", (eventData: any) => {
            baManager.changeNowEquipment(1)
            this.changeEquipmentInfo(baManager.nowEquipment)
            clickaudio.play();
        })
        this.equipment3Text.addEventListener("onClick", (eventData: any) => {
            baManager.changeNowEquipment(2)
            this.changeEquipmentInfo(baManager.nowEquipment)
            clickaudio.play();
        })
        this.equipment4Text.addEventListener("onClick", (eventData: any) => {
            baManager.changeNowEquipment(3)
            this.changeEquipmentInfo(baManager.nowEquipment)
            clickaudio.play();
        })
        this.equipment5Text.addEventListener("onClick", (eventData: any) => {
            baManager.changeNowEquipment(4)
            this.changeEquipmentInfo(baManager.nowEquipment)
            clickaudio.play();
        })
        this.weaponText.addEventListener("onClick", (ecentData: any) => {
            baManager.changeNowMounthedEquipment(0)
            this.changeEquipmentInfo(baManager.nowMounthedEquipment)
            clickaudio.play();
        })
        this.clothText.addEventListener("onClick", (ecentData: any) => {
            baManager.changeNowMounthedEquipment(1)
            this.changeEquipmentInfo(baManager.nowMounthedEquipment)
            clickaudio.play();
        })
        this.watchText.addEventListener("onClick", (ecentData: any) => {
            baManager.changeNowMounthedEquipment(2)
            this.changeEquipmentInfo(baManager.nowMounthedEquipment)
            clickaudio.play();
        })
        this.trousersText.addEventListener("onClick", (ecentData: any) => {
            baManager.changeNowMounthedEquipment(3)
            this.changeEquipmentInfo(baManager.nowMounthedEquipment)
            clickaudio.play();
        })
        this.phoneText.addEventListener("onClick", (ecentData: any) => {
            baManager.changeNowMounthedEquipment(4)
            this.changeEquipmentInfo(baManager.nowMounthedEquipment)
            clickaudio.play();
        })
        this.shoesText.addEventListener("onClick", (ecentData: any) => {
            baManager.changeNowMounthedEquipment(5)
            this.changeEquipmentInfo(baManager.nowMounthedEquipment)
            clickaudio.play();
        })
    }
    changeEquipmentInfo(equip: Equipment) {
        this.deleteChild(this.equipmentMultiInfoText)
        let equipmentIfo: Array<string> = ['名称：' + equip.name, '品质：' + equip.quality,
        '部位：' + equip.posID, '血量：+' + equip.health,
        '攻击力：+' + equip.attack, '暴击：+' + equip.criticalPer + '%'];
        this.equipmentMultiInfoText = new MultiTextField(equipmentIfo, 327, 125, 12, 5)
        this.addChild(this.equipmentMultiInfoText)
        this.dispatchEvent('updateBag', player)
    }

}
/**
 * 商店UI
 */
class shopUI extends DisplayObjectContainer {

    player: User = player;

    infoPanel: Bitmap;
    shopDownButton: Bitmap;

    shopWQ: Bitmap;
    shopFJ: Bitmap;
    shopXHP: Bitmap;
    shopJN: Bitmap;


    shopR: Bitmap;
    shopL: Bitmap;
    shopBuy: Bitmap;


    ShopText1: TextField;
    ShopText2: TextField;
    ShopText3: TextField;
    ShopText4: TextField;
    ShopText5: TextField;
    ShopPage: TextField;
    productMultiInfoText: MultiTextField;
    ShopCoin: TextField;


    constructor(x: number, y: number) {
        //super(x, y);
        super(58, 64);

        this.infoPanel = new Bitmap(73, 65, Resource.get('shopUI') as HTMLImageElement)
        this.shopDownButton = new Bitmap(65, 50, Resource.get('shopcloseUI') as HTMLImageElement)

        this.shopWQ = new Bitmap(195, 100, Resource.get('shopUIwq') as HTMLImageElement)
        this.shopFJ = new Bitmap(195, 170, Resource.get('shopUIfj') as HTMLImageElement)
        this.shopXHP = new Bitmap(195, 240, Resource.get('shopUIxhp') as HTMLImageElement)
        this.shopJN = new Bitmap(195, 310, Resource.get('shopUIjn') as HTMLImageElement)

        this.shopR = new Bitmap(435, 260, Resource.get('shopUIR') as HTMLImageElement)
        this.shopL = new Bitmap(350, 260, Resource.get('shopUIL') as HTMLImageElement)
        this.shopBuy = new Bitmap(338, 300, Resource.get('shopUIbuy') as HTMLImageElement)
        this.ShopText1 = new TextField(shpManager.getNowProduct(0), 352, 88, 20).centered();
        this.ShopText2 = new TextField(shpManager.getNowProduct(1), 352, 120, 20).centered();
        this.ShopText3 = new TextField(shpManager.getNowProduct(2), 352, 154, 20).centered();
        this.ShopText4 = new TextField(shpManager.getNowProduct(3), 352, 187, 20).centered();
        this.ShopText5 = new TextField(shpManager.getNowProduct(4), 352, 220, 20).centered();

        this.ShopPage = new TextField((shpManager.nowPage + 1).toString(), 380, 250, 30);
        this.productMultiInfoText = new MultiTextField([], 200, 400, 20, 5).setStringByNumber(shpManager.getNowProductInfo(shpManager.nowNumber), 12)
        this.ShopCoin = new TextField(shpManager.getNowProductPrice().toString(), 438, 453, 20);

        let blackMask = new Bitmap(-178, -14, battlePanelBlackMask);

        this.addChild(blackMask);
        this.addChild(this.infoPanel);
        this.addChild(this.shopDownButton);
        this.addChild(this.shopWQ);
        this.addChild(this.shopFJ);
        this.addChild(this.shopXHP);
        this.addChild(this.shopJN);
        this.addChild(this.shopR);
        this.addChild(this.shopL);
        this.addChild(this.shopBuy);

        this.addChild(this.ShopText1);
        this.addChild(this.ShopText2);
        this.addChild(this.ShopText3);
        this.addChild(this.ShopText4);
        this.addChild(this.ShopText5);
        this.addChild(this.ShopPage);
        this.addChild(this.productMultiInfoText);
        this.addChild(this.ShopCoin);
        this.shopDownButton.addEventListener("onClick", (eventData: any) => {
            shpManager.shopDown();
            clickaudio.play();
        })
        this.shopWQ.addEventListener("onClick", (eventData: any) => {
            shpManager.changeNowGroup(0)
            clickaudio.play();
        })
        this.shopFJ.addEventListener("onClick", (eventData: any) => {
            shpManager.changeNowGroup(1)
            clickaudio.play();
        })
        this.shopXHP.addEventListener("onClick", (eventData: any) => {
            shpManager.changeNowGroup(2)
            clickaudio.play();
        })
        this.shopJN.addEventListener("onClick", (eventData: any) => {
            shpManager.changeNowGroup(3)
            clickaudio.play();
        })
        this.shopL.addEventListener("onClick", (eventData: any) => {
            shpManager.shopLeft()
        })
        this.shopR.addEventListener("onClick", (eventData: any) => {
            shpManager.shopRight()
        })
        this.shopBuy.addEventListener("onClick", (eventData: any) => {
            shpManager.shopBuy()

        })
        this.ShopText1.addEventListener("onClick", (eventData: any) => {
            shpManager.changeNowProduct(0)
            clickaudio.play();
        })
        this.ShopText2.addEventListener("onClick", (eventData: any) => {
            shpManager.changeNowProduct(1)
            clickaudio.play();
        })
        this.ShopText3.addEventListener("onClick", (eventData: any) => {
            shpManager.changeNowProduct(2)
            clickaudio.play();
        })
        this.ShopText4.addEventListener("onClick", (eventData: any) => {
            shpManager.changeNowProduct(3)
            clickaudio.play();
        })
        this.ShopText5.addEventListener("onClick", (eventData: any) => {
            shpManager.changeNowProduct(4)
            clickaudio.play();
        })
    }
    changeEquipmentInfo(equip: Equipment) {
        // this.deleteChild(this.productMultiInfoText)
        // let equipmentIfo: Array<string> = ['名称：' + equip.name, '品质：' + equip.quality,
        // '部位：' + equip.posID, '血量：+' + equip.health,
        // '攻击力：+' + equip.attack, '暴击：+' + equip.criticalPer + '%'];
        // this.productMultiInfoText = new MultiTextField(equipmentIfo, 327, 125, 12, 5)
        // this.addChild(this.productMultiInfoText)
        // this.dispatchEvent('updateBag', player)
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
    playerImg = new Bitmap(120, 120, playerIdleImg1);
    enemyImg = new Bitmap(355, 120, playerIdleImg1);

    //战斗人物属性
    playerAtkText = new TextField("" + player._attack, 150, 375, 30);
    playerCriText = new TextField("" + player._criticalPer, 150, 420, 30);
    playerHpText = new TextField("" + player._hp + " / " + this.player.maxHP, 175, 273, 20);
    playerMpText = new TextField("" + this.player._mp + " / " + this.player.maxMp, 173, 314, 20);
    enemyHpText = new TextField("", 390, 273, 20);
    enemyMpText = new TextField("0 / 0", 390, 314, 20);
    enemyMaxHP = 0;

    //技能按钮
    skillButton1: Bitmap;
    skillButton2: Bitmap;
    skillButton3: Bitmap;
    skillButtonGroup: Bitmap[] = [];
    skillIDGroup: number[] = [];

    escapeButton: Bitmap;
    itemButton: Bitmap;

    //以下消耗品界面
    itemContainer = new DisplayObjectContainer(0, 0);
    itemBg: Bitmap;
    itemUseButton: Bitmap;
    itemBackButton: Bitmap;
    itemTextGroup = new DisplayObjectContainer(0, 0);
    itemText: TextField;
    hpmpaudio: AudioPlay;


    index = 0;



    constructor(x: number, y: number) {
        super(x, y);
        this.index = 0;
        // super(58, 64);

        this.hpmpaudio = new AudioPlay(HPMPAudio);

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

        this.escapeButton = new Bitmap(475, 370, battleEscapeImg);
        this.itemButton = new Bitmap(475, 420, battleItemImg);

        for (let i = 0; i < this.player.skill.length; i++) {
            switch (player.skill[i].id) {
                case 1:
                    this.skillButtonGroup[i].img = skillEmptyImg;
                    this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 2:
                    this.skillButtonGroup[i].img = skillCaihuaImg;
                    this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 3:
                    this.skillButtonGroup[i].img = skillSabiImg;
                    this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 4:
                    this.skillButtonGroup[i].img = skillBusiImg;
                    this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 5:
                    this.skillButtonGroup[i].img = skillGuolaiImg;
                    this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 6:
                    this.skillButtonGroup[i].img = skillQishangImg;
                    this.skillIDGroup[i] = player.skill[i].id;
                    break;
                case 7:
                    this.skillButtonGroup[i].img = skillXixingImg;
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
        this.addChild(this.playerMpText);
        this.addChild(this.playerImg);
        this.addChild(this.enemyMpText);
        this.addChild(this.enemyImg);

        this.addChild(this.skillButton1);
        this.addChild(this.skillButton2);
        this.addChild(this.skillButton3);

        this.addChild(this.escapeButton);
        this.addChild(this.itemButton);

        this.addChild(this.itemContainer);

        this.attackButton.addEventListener("onClick", (eventData: any) => {
            batManager.fightOneTime(player, this.enemy, 0);//普通攻击ID为0
            clickaudio.play();
        })
        this.skillButton1.addEventListener("onClick", (eventData: any) => {
            console.log(this.skillIDGroup[0]);
            clickaudio.play();
            if (player.skill[0].id == 6) {//七伤拳判断血量
                if (player._hp < this.player._attack * 0.3) {
                    let textField = new TextField("当前HP值不足以施放 " + player.skill[0].name, 0, this.index * 20, 15);
                    this.textGroup.addChild(textField);
                    this.index++;
                    return;
                }
            }
            if (player._mp >= player.skill[0].mp) {
                player._mp -= player.skill[0].mp;
                this.playerMpText.text = "" + this.player._mp + " / " + this.player.maxMp;
                batManager.fightOneTime(player, this.enemy, this.skillIDGroup[0]);
            } else {
                let textField = new TextField("当前MP值不足以施放 " + player.skill[0].name, 0, this.index * 20, 15);
                this.textGroup.addChild(textField);
                this.index++;
            }
        })

        this.skillButton2.addEventListener("onClick", (eventData: any) => {
            clickaudio.play();
            if (player.skill[1].id == 6) {//七伤拳判断血量
                if (player._hp < this.player._attack * 0.3) {
                    let textField = new TextField("当前HP值不足以施放 " + player.skill[1].name, 0, this.index * 20, 15);
                    this.textGroup.addChild(textField);
                    this.index++;
                    return;
                }
            }
            console.log(this.skillIDGroup[1]);
            if (player._mp >= player.skill[1].mp) {
                player._mp -= player.skill[1].mp;
                this.playerMpText.text = "" + this.player._mp + " / " + this.player.maxMp;
                batManager.fightOneTime(player, this.enemy, this.skillIDGroup[1]);
            } else {
                let textField = new TextField("当前MP值不足以施放 " + player.skill[1].name, 0, this.index * 20, 15);
                this.textGroup.addChild(textField);
                this.index++;
            }
        })

        this.skillButton3.addEventListener("onClick", (eventData: any) => {
            clickaudio.play();
            if (player.skill[2].id == 6) {//七伤拳判断血量
                if (player._hp < this.player._attack * 0.3) {
                    let textField = new TextField("当前HP值不足以施放 " + player.skill[2].name, 0, this.index * 20, 15);
                    this.textGroup.addChild(textField);
                    this.index++;
                    return;
                }
            }
            console.log(this.skillIDGroup[2]);
            if (player._mp >= player.skill[2].mp) {
                player._mp -= player.skill[2].mp;
                this.playerMpText.text = "" + this.player._mp + " / " + this.player.maxMp;
                batManager.fightOneTime(player, this.enemy, this.skillIDGroup[2]);
            } else {
                let textField = new TextField("当前MP值不足以施放 " + player.skill[2].name, 0, this.index * 20, 15);
                this.textGroup.addChild(textField);
                this.index++;
            }
        })

        this.escapeButton.addEventListener('onClick', (eventData: any) => {

            clickaudio.play();

            let ran = Math.random() * 100;
            console.log(ran);

            if (ran <= 50 + player._level - this.enemy.level) {//逃跑几率为50% + 人物等级 - 怪物等级
                batManager.dispatchEvent("backSceneLose", null);
            } else {
                batManager.dispatchEvent('playerDealDamage', 0);
                batManager.fightOneTime(player, this.enemy, 100);//此处逃跑逻辑实现为不提供对应技能类型，因此不造成伤害。
            }
        })

        this.itemButton.addEventListener('onClick', (eventData: any) => {
            clickaudio.play();
            this.itemBg = new Bitmap(270, 70, Resource.get('battleItemBgImg') as HTMLImageElement);
            this.itemContainer.addChild(this.itemBg);
            this.itemUseButton = new Bitmap(470, 165, Resource.get('battleItemUseImg') as HTMLImageElement);
            this.itemContainer.addChild(this.itemUseButton);
            this.itemBackButton = new Bitmap(470, 285, Resource.get('battleItemBackImg') as HTMLImageElement);
            this.itemContainer.addChild(this.itemBackButton);
            this.itemContainer.addChild(this.itemTextGroup);

            this.itemUseButton.addEventListener('onClick', () => {
                this.hpmpaudio.play();
                this.updateConsumCount();


                if (this.consumChoiceID != 0) {
                    for (let i = 0; i < player.packageEquipment.length; i++) {
                        if (this.consumChoiceID == player.packageEquipment[i].id) {
                            let con = player.packageEquipment[i] as Consumable;
                            con.use(() => {
                                return;
                            });
                            if (con.id == 1000) {
                                let textField = new TextField(this.player.name + " 使用 " + player.packageEquipment[i].name + " 回复了 " + Math.floor(this.player.maxHP * con.addHP / 100) + " 点HP！", 0, this.index * 20, 15);
                                this.playerHpText.text = "" + this.player._hp + " / " + this.player.maxHP
                                this.textGroup.addChild(textField);
                                this.index++;
                                this.indexJudge();
                            }

                            if (con.id == 1001) {
                                let textField = new TextField(this.player.name + " 使用 " + player.packageEquipment[i].name + " 回复了 " + Math.floor(this.player.maxMp * con.addMP / 100) + " 点MP！", 0, this.index * 20, 15);
                                this.textGroup.addChild(textField);
                                this.playerMpText.text = "" + this.player._mp + " / " + this.player.maxMp;
                                this.index++;
                                this.indexJudge();
                            }
                            player.packageEquipment.splice(i, 1);
                            this.updateConsumCount();
                            return;
                        }
                    }
                }

            })

            this.itemBackButton.addEventListener('onClick', () => {
                clickaudio.play();
                this.itemContainer.deleteAll();
            })

            console.log('弹出消耗品界面！');

            this.updateConsumCount();
            //以下获取角色消耗品



        })



        batManager.addEventListener('playerBattleStart', (player: User) => {
            this.player = player;
        })

        batManager.addEventListener('enemyBattleStart', (enemy: Monster) => {
            this.enemy = enemy;
            this.enemyMaxHP = enemy.hp;
            this.enemyNameText.text = enemy.name;
            this.enemyImg.img = this.enemy.view.img;
            this.enemyHpText.text = '' + enemy.hp + ' / ' + this.enemyMaxHP;
            // this.addChild(this.enemyImg);

        })

        // batManager.addEventListener('playerHpUpdate', () => {
        //     this.playerHpText.text = "" + player._hp + " / " + this.player.maxHP;
        // })

        batManager.addEventListener('playerDealDamage', (damage: number) => {
            let textField = new TextField(this.player.name + " 对 " + this.enemy.name + " 造成 " + damage + " 点伤害！", 0, this.index * 20, 15);
            if (damage == 0) {
                textField = new TextField(this.player.name + " 逃跑失败辣！", 0, this.index * 20, 15);
            } else {
                textField = new TextField(this.player.name + " 对 " + this.enemy.name + " 造成 " + damage + " 点伤害！", 0, this.index * 20, 15);
            }

            this.enemyHpText.text = '' + this.enemy.hp + ' / ' + this.enemyMaxHP;
            this.textGroup.addChild(textField);
            this.index++;

        })
        batManager.addEventListener('enemyDealDamage', (damage: number) => {
            let textField = new TextField("", 0, this.index * 20, 15);
            if (damage > 0) {
                textField = new TextField(this.enemy.name + " 对 " + this.player.name + " 造成 " + damage + " 点伤害！", 0, this.index * 20, 15);
            } else if (damage < 0) {
                textField.text = this.player.name + " 吸了 " + -damage + " 点血！";
            }

            if (player._hp <= 0) {
                this.playerHpText.text = "0" + " / " + this.player.maxHP;
            } else {
                this.playerHpText.text = "" + player._hp + " / " + this.player.maxHP;
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
            for (let i = 0; i < this.skillButtonGroup.length; i++) {
                this.skillButtonGroup[i].deleteAllEventListener();
            }
        })

        batManager.addEventListener('playerDie', (eventData: any) => {
            let textField = new TextField(this.player.name + " 被 " + this.enemy.name + " 打飞辣！", 0, this.index * 20, 15);
            this.textGroup.addChild(textField);
            this.index++;
            this.indexJudge();

            this.attackButton.deleteAllEventListener();
            for (let i = 0; i < this.skillButtonGroup.length; i++) {
                this.skillButtonGroup[i].deleteAllEventListener();
            }
        })
    }


    indexJudge() {
        if (this.index >= 17) {
            this.textGroup.deleteAll();
            this.index = 0;
        }
    }

    consumChoiceID = 0;
    updateConsumCount() {

        this.itemTextGroup.deleteAll();

        let redCount = 0;
        let blueCount = 0;
        let lineCount = 0;
        for (let i = 0; i < player.packageEquipment.length; i++) {
            if (player.packageEquipment[i].id == 1000) {
                redCount++;

            }
            if (player.packageEquipment[i].id == 1001) {
                blueCount++;
            }
        }
        let red = equipManager.getEquipByID(1000) as Equipment;
        let blue = equipManager.getEquipByID(1001) as Equipment;

        if (redCount > 0) {
            let redText = new TextField(red.name + " X " + redCount, 315, 165 + 32 * lineCount, 20);
            redText.addEventListener("onClick", () => {
                clickaudio.play();
                this.consumChoiceID = red.id;
            })
            this.itemTextGroup.addChild(redText);
            lineCount++;
        }
        if (blueCount > 0) {
            let blueText = new TextField(blue.name + " X " + blueCount, 315, 165 + 32 * lineCount, 20);
            this.itemTextGroup.addChild(blueText);
            blueText.addEventListener("onClick", () => {
                clickaudio.play();
                this.consumChoiceID = blue.id;
            })
            lineCount++;
        }
        if (blueCount == 0 && redCount == 0) {
            this.consumChoiceID = 0;
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
    coinText: TextField;

    dropTextGroup: DisplayObjectContainer = new DisplayObjectContainer(310, 270);
    hasListener = false;

    constructor(x: number, y: number) {
        super(x, y);

        this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);

        this.backGround = new Bitmap(254, 104, battleEndBGImg);
        this.backButton = new Bitmap(500, 353, backButtonImg);
        this.expText = new TextField('2333', 400, 207, 20);
        this.coinText = new TextField('111', 520, 207, 20);

        // this.addChild(this.blackMask);
        this.addChild(this.backGround);
        this.addChild(this.backButton);
        this.addChild(this.expText);
        this.addChild(this.coinText);
        this.addChild(this.dropTextGroup);

        // this.backButton.deleteAllEventListener();
        this.backButton.addEventListener("onClick", (eventData: any) => {
            batManager.dispatchEvent("backSceneWin", null);
            clickaudio.play();
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
            clickaudio.play();
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

    descriptionText: Bitmap;

    mountedSkillText: TextField;
    mountedSkillGroup: DisplayObjectContainer;

    skillOnButton: Bitmap;
    skillOffButton: Bitmap;

    choosingSkillArrayNo: number = 0;
    choosingMountedSkillArrayNo: number = 0;

    nowChoice = 0;//1为技能栏中技能被选中，2为已装备技能被选中。

    blackMask = new Bitmap(0, 0, battlePanelBlackMask);

    hasOn = false;

    constructor(x: number, y: number) {
        super(x, y);

        this.hasOn = true;
        this.backGround = new Bitmap(225, 25, skillBoxBGImg);
        this.closeButton = new Bitmap(225, 25, skillBoxCloseImg);
        this.skillTextGroup = new DisplayObjectContainer(375, 20);
        // this.backButton = new Bitmap(500, 325, backButtonImg);
        this.descriptionText = new Bitmap(508, 100, skillEmptyDesImg);
        this.mountedSkillGroup = new DisplayObjectContainer(485, 350);
        this.skillOnButton = new Bitmap(510, 290, bagOnUI);
        this.skillOffButton = new Bitmap(582, 290, bagOffUI);

        this.addChild(this.blackMask);
        this.addChild(this.backGround);
        this.addChild(this.closeButton);
        this.addChild(this.skillTextGroup);
        this.addChild(this.descriptionText);
        this.addChild(this.mountedSkillGroup);
        this.addChild(this.skillOnButton);
        this.addChild(this.skillOffButton);

        this.closeButton.addEventListener('onClick', () => {
            this.deleteAll();
            clickaudio.play();
        })

        inputManager.addEventListener("Esc", (eventData: any) => {
            this.deleteAll();
        });

        this.skillOnButton.addEventListener('onClick', () => {
            if (this.nowChoice == 1) {
                clickaudio.play();
                for (let i = 0; i < skillArray.length; i++) {
                    if (this.choosingSkillArrayNo == skillArray[i].id) {
                        for (let b = 0; b < player.skill.length; b++) {
                            if (player.skill[b].id == 1) {
                                player.skill.splice(b, 1, skillArray[i]);
                                skillArray.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
                this.skillButtonUpdate();
                this.mountedSkillUpdate();
            }
        })

        this.skillOffButton.addEventListener('onClick', () => {
            if (this.nowChoice == 2) {
                clickaudio.play();
                for (let i = 0; i < player.skill.length; i++) {
                    if (this.choosingMountedSkillArrayNo == player.skill[i].id) {
                        if (player.skill[i].id != 1) {
                            skillArray.push(player.skill[i]);
                            player.skill.splice(i, 1);
                            if (player.skill.length < 3) {
                                player.skill.push(skillEmpty);
                            }
                        }
                    }
                }
                this.skillButtonUpdate();
                this.mountedSkillUpdate();
            }

        })

        this.skillButtonUpdate();
        this.mountedSkillUpdate();


    }

    skillButtonUpdate() {
        this.skillTextGroup.deleteAll();
        for (let i = 2; i < skillArray.length; i++) {//0为普通攻击 1为空
            this.skillText = new TextField(skillArray[i].name, 0, (i - 1) * 33, 25);
            this.skillText.addEventListener('onClick', () => {
                clickaudio.play();
                this.nowChoice = 1;
                this.descriptionText.img = skillArray[i].description.img;
                this.choosingSkillArrayNo = skillArray[i].id;
                console.log(this.choosingSkillArrayNo);
            })
            this.skillTextGroup.addChild(this.skillText);
        }
    }

    mountedSkillUpdate() {
        this.mountedSkillGroup.deleteAll();
        for (let i = 0; i < player.skill.length; i++) {

            this.mountedSkillText = new TextField(player.skill[i].name, 0, i * 33, 25);
            this.mountedSkillText.addEventListener('onClick', () => {
                clickaudio.play();
                this.nowChoice = 2;
                this.descriptionText.img = player.skill[i].description.img;
                this.choosingMountedSkillArrayNo = player.skill[i].id;
                console.log(this.choosingMountedSkillArrayNo);
            })
            this.mountedSkillGroup.addChild(this.mountedSkillText);
        }
    }

    // returnSkillNo(id: number) {
    //     for (let i = 0; i < skillArray.length; i++) {
    //         if (id == skillArray[i].id) {
    //             return i;
    //         }
    //     }
    //     return 1;
    // }
}


/**
 * 设置UI
 */
class SettingUI extends DisplayObjectContainer {

    backGround: Bitmap;
    on: Bitmap;
    off: Bitmap;
    save: Bitmap;
    load: Bitmap;
    backButton: Bitmap;
    blackMask: Bitmap;
    recharge: Bitmap;
    rechargeInput: MultiTextField;
    hasOn = false;
    oneTime = true;
    code = "";
    constructor(x: number, y: number) {
        super(x, y);
        this.hasOn = true;
        this.backGround = new Bitmap(290, 120, Resource.get('SettingUI1') as HTMLImageElement);
        this.on = new Bitmap(440, 195, Resource.get('SettingUI2') as HTMLImageElement);
        this.off = new Bitmap(500, 195, Resource.get('SettingUI3') as HTMLImageElement);
        this.save = new Bitmap(333, 248, Resource.get('SettingUI9') as HTMLImageElement);
        this.load = new Bitmap(470, 248, Resource.get('SettingUI8') as HTMLImageElement);
        this.backButton = new Bitmap(400, 296, Resource.get('SettingUI4') as HTMLImageElement);
        this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        this.recharge = new Bitmap(400, 345, Resource.get('SettingUI7') as HTMLImageElement)
        this.addChild(this.blackMask);
        this.addChild(this.backGround);
        this.addChild(this.on);
        this.addChild(this.off);
        this.addChild(this.save);
        this.addChild(this.load);
        this.addChild(this.backButton);
        if (!inputManager.rechargeIsStart) {
            this.addChild(this.recharge);
        }

        inputManager.addEventListener("Esc", (eventData: any) => {
            this.deleteAll();
        });
        this.recharge.addEventListener("onClick", (eventData: any) => {
            this.deleteChild(this.recharge)
            this.rechargeInput = new MultiTextField(["请输入", "8×3", "充值码"], 400, 250, 20, 10)
            this.addChild(this.rechargeInput)
            inputManager.rechargeIsStart = true;
            inputManager.dispatchEvent('rechargeInput', null)
            clickaudio.play();
        })
        inputManager.addEventListener("inputChanged", (eventData: any) => {
            if (inputManager.rechargeIsStart) {
                this.deleteChild(this.rechargeInput)
                if (!inputManager.oneTime) {
                    let event: string = eventData;
                    this.code = event.slice(0, 24)
                    console.log(this.code)
                    this.rechargeInput = new MultiTextField(["请输入充值码"], 408, 244, 20, 30).setStringByNumber(event.slice(0, 24), 8)
                    this.addChild(this.rechargeInput)
                    clickaudio.play();
                }

            }
        })
        this.backButton.addEventListener("onClick", (eventData: any) => {
            this.deleteAll();
            this.rechargeInput = new MultiTextField([], 400, 250, 20, 10)
            if (this.code == "QWERASDFZXCVVFRCDEXSWZAQ" && this.oneTime) {
                player.coin += 10000
            }
            this.oneTime = false
            inputManager.dispatchEvent('inputOver', null);
            this.deleteChild(this.rechargeInput)
            clickaudio.play();
        })
        this.on.addEventListener("onClick", (eventData: any) => {

            StartAudio.src = "assets/音效/常规/创建角色.mp3"
            CreateAudio.src = "assets/音效/常规/点一下玩一年.mp3"
            BattleAudio.src = "assets/音效/常规/战斗背景音乐.mp3"
            SucceedAudio.src = "assets/音效/常规/战斗胜利.mp3"
            FailAudio.src = "assets/音效/常规/战斗失败.mp3"
            Attack1Audio.src = "assets/音效/dnf/暴击1.mp3"
            Attack2Audio.src = "assets/音效/dnf/暴击2.mp3"
            BuyAudio.src = "assets/音效/常规/金币.mp3"
            HPMPAudio.src = "assets/音效/dnf/药水.mp3"
            MainAudio.src = "assets/音效/常规/欢快bgm.mp3"
            ClickAudio.src = "assets/音效/常规/单击.mp3"
            FinishAudio.src = "assets/音效/常规/游戏胜利完成.mp3"
            ChangeMapAudio.src = "assets/音效/dnf/瞬移（传送）.mp3"
            LevelUpAudio.src = "assets/音效/常规/升级1.mp3"
            MissionAudio.src = "assets/音效/常规/奖励.mp3"

            clickaudio.play();
            mainaudio.play();
        })
        this.off.addEventListener("onClick", (eventData: any) => {
            clickaudio.play();

            StartAudio.src = "assets/音效/dnf/静音.mp3"
            CreateAudio.src = "assets/音效/dnf/静音.mp3"
            BattleAudio.src = "assets/音效/dnf/静音.mp3"
            SucceedAudio.src = "assets/音效/dnf/静音.mp3"
            FailAudio.src = "assets/音效/dnf/静音.mp3"
            Attack1Audio.src = "assets/音效/dnf/静音.mp3"
            Attack2Audio.src = "assets/音效/dnf/静音.mp3"
            BuyAudio.src = "assets/音效/dnf/静音.mp3"
            HPMPAudio.src = "assets/音效/dnf/静音.mp3"
            MainAudio.src = "assets/音效/dnf/静音.mp3"
            ClickAudio.src = "assets/音效/dnf/静音.mp3"
            FinishAudio.src = "assets/音效/dnf/静音.mp3"
            ChangeMapAudio.src = "assets/音效/dnf/静音.mp3"
            LevelUpAudio.src = "assets/音效/dnf/静音.mp33"
            MissionAudio.src = "assets/音效/dnf/静音.mp3"
        })
    }
}

/**
 * 制作团队UI
 */
class WorkerUI extends DisplayObjectContainer {

    backGround: Bitmap;
    backButton: Bitmap;

    constructor(x: number, y: number) {
        super(x, y);

        this.backGround = new Bitmap(0, 0, Resource.get('WorkerUI1') as HTMLImageElement);
        this.backButton = new Bitmap(800, 490, Resource.get('WorkerUI2') as HTMLImageElement);

        this.addChild(this.backGround);
        this.addChild(this.backButton);

        this.backButton.addEventListener("onClick", (eventData: any) => {
            this.deleteAll();
            clickaudio.play();
        })

    }
}

/**
 * 游戏胜利UI
 */
class GameWinUI extends DisplayObjectContainer {

    gameWinBg: Bitmap;
    replayButton: Bitmap;
    endButton: Bitmap;
    blackMask: Bitmap

    constructor(x: number, y: number) {
        super(x, y);


        this.blackMask = new Bitmap(0, 0, battlePanelBlackMask);
        this.gameWinBg = new Bitmap(100, 100, gameWinBgImg);
        this.replayButton = new Bitmap(200, 340, replayButtonImg);
        this.endButton = new Bitmap(380, 340, endButtonImg);

        this.addChild(this.blackMask);
        this.addChild(this.gameWinBg);
        this.addChild(this.replayButton);
        this.addChild(this.endButton);

        this.replayButton.addEventListener("onClick", (eventData: any) => {
            batManager.dispatchEvent("backSceneWin", null);
            mainaudio.play();
        })

        this.endButton.addEventListener("onClick", (eventData: any) => {
            history.go(0);
        })

    }
}