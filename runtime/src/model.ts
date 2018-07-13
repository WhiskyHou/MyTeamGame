const MAX_LEVEL = 20;
const MAX_HP = 140;
const MAX_ATTACK = 200;
const USER_ATTACK_PRE = 100;


/**
 * 玩家
 */
class User extends EventDispatcher {
    x: number;
    y: number;
    view: Bitmap;
    head: Bitmap;
    moveStatus: boolean = true;

    public name: string;
    public diamond: number = 0;
    _originAttack = 10;
    _originHealth = 60;
    _originMp = 110;
    maxHP = this._originHealth;
    maxMp = this._originMp;

    mounthedEquipment: Equipment[] = [];//已装备的装备
    packageEquipment: Equipment[] = [];//背包中的装备

    skill: Skill[] = [];

    _attack = this._originAttack;
    _hp = this._originHealth
    _criticalPer = 0;
    _charm = 0;
    _mp = this._originMp;

    _suitDefensePer = 0;
    suitAttackPer = 0;
    _suitCriticalPer = 0;

    constructor() {
        super();
        // 以下测试用
        let eq0 = new Equipment(1, '一无是处的烂武器', 0, 0, 1000, 1000, 0);//36558
        let eq1 = new Equipment(2, '一无是处的烂衣服', 0, 1, 0, 0, 0);
        let eq2 = new Equipment(3, '一无是处的烂手表', 0, 2, 0, 0, 0);
        let eq3 = new Equipment(4, '一无是处的烂裤子', 0, 3, 0, 0, 0);
        let eq4 = new Equipment(5, '一无是处的烂电话', 0, 4, 0, 0, 0);
        let eq5 = new Equipment(6, '一无是处的烂鞋子', 0, 5, 0, 0, 0);
        this.mounthedEquipment.push(eq0);
        this.mounthedEquipment.push(eq1);
        this.mounthedEquipment.push(eq2);
        this.mounthedEquipment.push(eq3);
        this.mounthedEquipment.push(eq4);
        this.mounthedEquipment.push(eq5);
        this.changeEquipments();
        // this.packageEquipment.push(eq0)
        // this.packageEquipment.push(eq0)
        // this.packageEquipment.push(eq0)
        // this.packageEquipment.push(eq0)
        // this.packageEquipment.push(eq0)
        // this.packageEquipment.push(eq1)
        // this.packageEquipment.push(eq1)
        // this.packageEquipment.push(eq2)
        // this.packageEquipment.push(eq3)
        // this.packageEquipment.push(eq4)

        this.skill.push(skillEmpty);
        this.skill.push(skillEmpty);
        this.skill.push(skillEmpty);

        this.addEventListener('updateUserInfo', () => this.calProperty());
        this.head = new Bitmap(0, 0, playerHeadImg);
    }

    _level: number;
    get level() {
        return this._level;
    }
    set level(level: number) {
        this._level = level;
        this.dispatchEvent('updateUserInfo', null);
    }
    _needEXP: number = 20;
    _currentEXP: number;
    get needEXP() {
        return this._needEXP;
    }
    set needEXP(needEXP: number) {
        this._needEXP = needEXP;
        this.dispatchEvent('updateUserInfo', null);
    }
    get currentEXP() {
        return this._currentEXP;
    }
    set currentEXP(currentEXP: number) {
        this._currentEXP = currentEXP;
        this.dispatchEvent('updateUserInfo', null);
    }
    _coin: number;
    get coin() {
        return this._coin;
    }
    set coin(coin: number) {
        this._coin = coin;
        this.dispatchEvent('updateUserInfo', null);
    }
    pick(equipment: Equipment) {
        this.packageEquipment.push(equipment);
        this.dispatchEvent('updateUserInfo', null);
        this.dispatchEvent('pickEquipment', { name: equipment.name })
        console.log('packageEquipemt', this.packageEquipment)
    }
    drop() {

    }

    fight(monster: Monster) {
        this.dispatchEvent('fightWithMonster', { name: monster.name });
        console.log(monster.name);

    }

    talk(npc: Npc) {
        this.dispatchEvent('talkWithNpc', { name: npc.name })
    }

    // get attack(): number {
    //     let equipmentAttack = 0;
    //     for (let equipment of this.mounthedEquipment) {
    //         equipmentAttack += equipment.attack;
    //     }
    //     return this.level * USER_ATTACK_PRE + equipmentAttack;
    // }

    changeGridPos(row: number, col: number) {
        this.x = row;
        this.y = col;
    }

    moveSmooth() {
        // 角色每帧移动
        // animTemp.x = player.view.x;///
        // animTemp.y = player.view.y;///
        const targetX = player.x * TILE_SIZE;
        const targetY = player.y * TILE_SIZE;
        if (player.view.x == targetX && player.view.y == targetY) {
            return;
        }
        var stepX = 0;
        var stepY = 0;
        if (Math.abs(targetX - player.view.x) > 5) {
            stepX = DELTA_TIME * PLAYER_WALK_SPEED;
            stepX = (targetX < player.view.x) ? -stepX : stepX;
            player.view.x += stepX;
        } else {
            player.view.x = targetX;
        }
        if (Math.abs(targetY - player.view.y) > 5) {
            stepY = DELTA_TIME * PLAYER_WALK_SPEED;
            stepY = (targetY < player.view.y) ? -stepY : stepY;
            player.view.y += stepY;
        } else {
            player.view.y = targetY;
        }

    }

    levelUp() {
        this.level += 1;
    }

    levelDown() {
        this.level -= 1;
    }

    update() {
        this.moveSmooth();
        this.dispatchEvent('updateUserInfo', null);
    }

    toString() {
        return `[User ~ name:${this.name}, level:${this.level}, hp:${this._hp}, attack:${this._attack}]`;
    }

    //---------------------------------------------------------------

    public changeEquipments() {
        // let currentHp = this._hp;
        let subHP = this.maxHP - this._hp;
        this.initProperty();
        for (var i = 0; i < this.mounthedEquipment.length; i++) {
            this._attack += this.mounthedEquipment[i].attack;
            this._hp += this.mounthedEquipment[i].health;
            // currentHp += this.mounthedEquipment[i].health;
            this._criticalPer += this.mounthedEquipment[i].criticalPer;
        }
        this.maxHP = this._hp;
        this._hp -= subHP;
        // this._hp = currentHp;
        this.dispatchEvent("changeEquips", null);
        // this.checkSuit();
    }

    //TODO:套装属性检测
    private checkSuit() {
        let suitIDSearchArray: Array<Array<any>> = new Array<Array<any>>();
        //检索是否有套装属性加成
        //遍历装备整理成一个二维数组
        let nowSuitIDNum = 1;//当前存了几个suitID,上来先把武器给存了
        suitIDSearchArray[0][nowSuitIDNum - 1] = 0;
        suitIDSearchArray[1][nowSuitIDNum - 1] = 1;
        for (var i = 1; i < this.mounthedEquipment.length; i++) {
            let isStored: boolean = false;
            for (var j = 0; j < nowSuitIDNum; j++) {
                if (this.mounthedEquipment[i].suitID == suitIDSearchArray[0][j]) {
                    suitIDSearchArray[1][j]++;
                    isStored = true;
                }
            }
            if (!isStored) {
                nowSuitIDNum++;
                suitIDSearchArray[0][nowSuitIDNum - 1] = this.mounthedEquipment[i].suitID;
                suitIDSearchArray[1][nowSuitIDNum - 1] = 1;
            }
        }
        //判断是否有叠加属性
        for (var i = 0; i < nowSuitIDNum; i++) {
            if (suitIDSearchArray[1][i] > 2) {
                this.addSuitProperty(i);
            }
        }
    }

    private addSuitProperty(suitIDNum: number) {
        for (var i = 0; i < this.mounthedEquipment.length; i++) {
            if (this.mounthedEquipment[i].suitID == suitIDNum) {
                this._suitDefensePer += this.mounthedEquipment[i].suitDefensePer;
                this.suitAttackPer += this.mounthedEquipment[i].suitAttackPer;
                this._suitCriticalPer += this.mounthedEquipment[i].suitCriticalPer;
            }
        }

    }

    calProperty() {
        if (this._currentEXP >= this._needEXP) {
            this._level += 1;
            this._currentEXP = this._currentEXP - this._needEXP;
            this._needEXP = Math.floor(this._needEXP * 1.2);
            this._originHealth += 6;
            this._originAttack += 2;
            this._originMp += 10;
            this._mp = this._originMp;
            this.maxMp = this._originMp;
            this.maxHP = this._originHealth;
            this._hp = this.maxHP;
            this.changeEquipments();
            console.log('现在等级：' + this._level + ' 当前经验：' + this._currentEXP + " 需要经验：" + this._needEXP);

            setTimeout(() => {
                levelupaudio.play();
            }, 500);
        }
    }

    // private _httpaaa: number
    // public get aaa(){
    //     return this._aaa;
    // }
    // public set aaa(v: number){
    //     this._aaa = v

    //     ..
    // }

    public dressEquip(equip: Equipment) {
        this.mounthedEquipment[equip.posID] = equip;
        this.changeEquipments();
    }

    private initProperty() {
        this._attack = this._originAttack;
        this._hp = this._originHealth;
        this._criticalPer = 0;

        this._suitDefensePer = 0;
        this.suitAttackPer = 0;
        this._suitCriticalPer = 0;
    }


    private die() {

    }
}


/**
 * 装备
 */
class Equipment {
    x: number = 0;
    y: number = 0;
    view: Bitmap

    public id: number;
    public name: string;
    public quality: number;//品质ID：12345
    public posID: number;//部位ID：0武器、1头、2肩膀、3衣服、4腰带、5护腿
    public health: number;
    public attack: number;
    public criticalPer: number;

    public suitID: number;
    public suitDefensePer: number;
    public suitAttackPer: number;
    public suitCriticalPer: number;

    constructor(id: number, name: string, quality: number, posID: number, health: number, attack: number, criticalPer: number) {
        this.id = id;
        this.name = name;
        this.quality = quality;
        this.posID = posID;
        this.health = health;
        this.attack = attack;
        this.criticalPer = criticalPer;
        //, suitID: number, suitDefensePer: number, suitAttackPer: number, suitCriticalPer: number
        // this.suitID = suitID;
        // this.suitDefensePer = suitDefensePer;
        // this.suitAttackPer = suitAttackPer;
        // this.suitCriticalPer = suitCriticalPer;
    }

    toString() {
        return `[Equipment ~ name:${this.name}, attack:${this.attack}]`;
    }
}
/**
 * 消耗品、其他、技能
 */
class Consumable extends Equipment {
    x: number = 0;
    y: number = 0;
    view: Bitmap

    public addHP: number = 0;
    public addMP: number = 0;
    public addCharm: number = 0;

    constructor(id: number, name: string, posID: number, addHP: number, addMP: number, addCharm: number) {
        super(id, name, 0, posID, 0, 0, 0);
        this.addHP = addHP;
        this.addMP = addMP;
        this.addCharm = addCharm;
    }

    use(callback: Function) {

        player._hp += Math.ceil((this.addHP / 100) * player.maxHP)
        if (player._hp > player.maxHP) { player._hp = player.maxHP }
        player._mp += Math.ceil((this.addMP / 100) * player.maxMp)
        if (player._mp > player.maxMp) { player._mp = player.maxMp }
        player._charm += this.addCharm
        callback()
    }
    toString() {
        return `[Equipment ~ name:${this.name}, add:${this.addCharm + this.addHP + this.addMP}]`;
    }
}
/**
 * 商品
 */
class Product {
    x: number = 0;
    y: number = 0;
    view: Bitmap
    public productID: number;
    public equipment: Equipment;
    public price: number;
    public description: string;

    constructor(productID: number, equipment: Equipment, price: number, description: string) {
        this.productID = productID;
        this.equipment = equipment;
        this.price = price;
        this.description = description;
    }

    toString() {
        return `[Product ~ name:${this.equipment.name}, price:${this.price}]`;
    }
}

// class Skill {
//     x: number = 0;
//     y: number = 0;
//     view: Bitmap

//     public id: number;
//     public name: string;
//     public addattack: number;
//     constructor(id: number, name: string, addattack: number) {
//         this.id = id;
//         this.name = name;
//         this.addattack = addattack;
//     }

//     toString() {
//         return `[Equipment ~ name:${this.name}, attack:${this.addattack}]`;
//     }
// }


/**
 * 任务
 */
enum MissionStatus {
    UNACCEPT = 0,
    CAN_ACCEPT = 1,
    DURRING = 2,
    CAN_SUBMIT = 3,
    FINISH = 4
}

class Mission {
    id: number = 0
    name: string = ''
    needLevel: number = 0
    fromNpcId: number = 0
    toNpcId: number = 0
    isAccepted: boolean = false
    isSubmit: boolean = false
    isReward: boolean = false
    canAcceptContent: string[] = []
    canSubmitContent: string[] = []
    current: number = 0
    total: number = 1
    status: MissionStatus = MissionStatus.UNACCEPT
    type = '';
    talkTarget: Npc;
    fightTarget: Npc;
    foreMissionID: number = 0;

    going: Function;
    reward: Function;
    addCoin: number;
    addEXP: number;
    equipment: Equipment;

    constructor(type: string, going: Function, reward: Function) {
        this.going = going;
        this.reward = reward;
        this.type = type;
        player.addEventListener(type, this.going)
    }

    update() {
        let nextStatus: MissionStatus = MissionStatus.UNACCEPT;
        if (this.isSubmit) {
            if (!this.isReward) {
                this.reward();
                this.isReward = true;
            }
            nextStatus = MissionStatus.FINISH;
        }
        else if (this.isAccepted) {
            if (this.current >= this.total) {

                nextStatus = MissionStatus.CAN_SUBMIT;
            } else {
                nextStatus = MissionStatus.DURRING;
            }
        } else {
            if (player.level >= this.needLevel) {
                if (this.foreMissionID == 0) {
                    nextStatus = MissionStatus.CAN_ACCEPT;
                } else {
                    for (let i = 0; i < missionManager.missions.length; i++) {
                        if (missionManager.missions[i].id == this.foreMissionID) {
                            if (missionManager.missions[i].status == MissionStatus.FINISH) {
                                nextStatus = MissionStatus.CAN_ACCEPT;
                            }
                        }
                    }
                }

            }
        }
        if (nextStatus != this.status) {
            this.status = nextStatus;
            return true;
        }

        else {
            return false;
        }
    }

    toString() {
        return `[Mission ~ id:${this.id}, name:${this.name}]`
    }
}




/**
 * NPC
 */
class Npc {
    x: number = 0
    y: number = 0
    view: Bitmap
    head: Bitmap

    id = 0;
    name: string = ''

    changeTypeID = 0;//要转变成的怪物的ID

    canAcceptMissions: Mission[] = []
    canSubmitMissions: Mission[] = []

    uselessTalks: string[] = [];
    nowMapID = 0;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;

        missionManager.addEventListener('missionUpdate', (eventData: any) => {
            this.update();
        })


    }

    update() {
        this.canAcceptMissions = [];
        this.canSubmitMissions = [];
        for (let mission of missionManager.missions) {
            if (mission.status == MissionStatus.CAN_SUBMIT && mission.toNpcId == this.id) {
                this.canSubmitMissions.push(mission);
            }
            if (mission.status == MissionStatus.CAN_ACCEPT && mission.fromNpcId == this.id) {
                this.canAcceptMissions.push(mission);
            }

        }

    }

    toString() {
        return `[NPC ~ id:${this.id}, name:${this.name}]`
    }

    changeType() {
        // map.deleteMonster(this)
        let tempX = this.x;
        let tempY = this.y;
        let mapCount = 0;

        for (let i = 0; i < mapManager.maps.length; i++) {
            if (this.nowMapID == mapManager.maps[i].id) {
                mapCount = i;
            }
        }

        mapManager.maps[mapCount].deleteNpc(this);

        for (let i = 0; i < monsManager.monsterList.length; i++) {
            if (monsManager.monsterList[i].id == this.changeTypeID) {
                let mons = monsManager.monsterList[i];
                mons.x = tempX;
                mons.y = tempY;
                mons.nowMapID = this.nowMapID;

                const monsterView = new Bitmap(TILE_SIZE * tempX, TILE_SIZE * tempY, monsManager.monsterList[i].view.img);
                const monsterItem = monsManager.monsterList[i];

                monsterItem.x = tempX;
                monsterItem.y = tempY;
                const key = tempX + '_' + tempY;
                mapManager.maps[mapCount].monsterConfig[key] = monsterItem;
                mapManager.maps[mapCount].roleContainer.addChild(monsterView);


                // const map2 = mapManager.getMap(2)
            }
        }
    }

}



/**
 * 传送门
 */
class Portal extends EventDispatcher {

    id: number

    from: number

    to: number

    targetRow: number

    targetCol: number

    constructor(id: number, from: number, to: number, targetRow: number, targetCol: number) {
        super()
        this.id = id
        this.from = from
        this.to = to
        this.targetRow = targetRow
        this.targetCol = targetCol
    }

    toString() {
        if (this.to == 8) {
            mapManager.maps[this.to - 1].reset();
        }
        return `[Portal ~ id:${this.id}, from:${this.from}, to:${this.to}, targetX:${this.targetRow}, targetY:${this.targetCol}]`
    }
}



/**
 * 怪物
 */
class Monster extends EventDispatcher {
    x: number = 0;
    y: number = 0;
    view: Bitmap;
    head = new Bitmap(0, 0, backButtonImg);
    id: number = 0;
    name: string = '';
    hp: number;
    attack: number;
    curEquipSet: EquipmentSet;
    dropTime = 2;//掉落次数
    exp: number = 0;
    coin: number = 0;
    level: number = 0;
    dropType = 0;//0默认掉落集，1初始主线小怪,2初级副本,3主线小怪2,4肥宅,5低级副本,6主线小怪3,7中级副本,8主线小怪4，9主线小怪5,10高级副本
    changeTypeID = 0;//要转变成的NPC的ID

    nowMapID = 0;//当前所处地图ID

    uselessTalks: string[] = [];

    originHP = 0;

    constructor(id: number, name: string, hp: number, attack: number, exp: number, coin: number, level: number, dropType: number) {
        super();

        this.id = id;
        this.name = name;
        this.hp = hp;
        this.originHP = hp;
        this.attack = attack;
        this.exp = exp;
        this.coin = coin;
        this.level = level;
        this.dropType = dropType;
    }

    toString() {
        return `[Monster ~ id:${this.id}, name:${this.name}, hp:${this.hp}, attack:${this.attack}, exp:${this.exp}, coin:${this.coin}, level:${this.level}]`
    }

    private die() {

    }

    private equipDrop(): number {
        let ran = Math.random() * 100;
        // lv5掉率2% lv4掉率10% lv3掉率20% lv2掉率28% lv1掉率40%
        if (ran >= 98) {
            return lv5Set.buildEquip();
        } else if (ran < 98 && ran >= 88) {
            return lv4Set.buildEquip();
        } else if (ran < 88 && ran >= 68) {
            return lv3Set.buildEquip();
        } else if (ran < 68 && ran >= 40) {
            return lv2Set.buildEquip();
        } else {
            return lv1Set.buildEquip();
        }
    }

    private equipDropLv1(): number {
        let ran = Math.random() * 100;
        // lv2掉率45% lv1掉率55%
        if (ran >= 45) {
            return lv1DgSetlv2.buildEquip();
        } else {
            return lv1DgSetlv1.buildEquip();
        }
    }

    private equipDropLv2(): number {
        let ran = Math.random() * 100;
        // lv3掉率30% lv2掉率70% 
        if (ran >= 70) {
            return lv2DgSetlv3.buildEquip();
        } else {
            return lv2DgSetlv2.buildEquip();
        }
    }

    private equipDropLv3(): number {
        let ran = Math.random() * 100;
        // lv4掉率20% lv3掉率80% 
        if (ran >= 80) {
            return lv3DgSetlv5.buildEquip();
        } else {
            return lv3DgSetlv4.buildEquip();
        }
    }

    private equipDropLv4(): number {
        return lv4DgSet.buildEquip();
    }

    public makeDrop() {
        let equipBox: number[] = [];
        switch (this.dropType) {
            case 0:
                for (let i = 0; i < this.dropTime; i++) {
                    equipBox.push(this.equipDrop());
                }
                return equipBox;
            case 1:
                equipBox.push(0);//掉犬牙
                return equipBox;
            case 2:
                for (let i = 0; i < this.dropTime; i++) {
                    equipBox.push(this.equipDropLv1());
                }
                return equipBox;
            case 3:
                equipBox.push(13);//掉丑男的T恤
                return equipBox;
            case 4:
                equipBox.push(3);//肥宅的游戏机
                return equipBox;
            case 5:
                for (let i = 0; i < this.dropTime; i++) {
                    equipBox.push(this.equipDropLv2());
                }
                return equipBox;
            case 6:
                equipBox.push(4);//真·肉包子
                return equipBox;
            case 7:
                for (let i = 0; i < this.dropTime; i++) {
                    equipBox.push(this.equipDropLv3());
                }
                return equipBox;
            case 8:
                equipBox.push(26);//朋克上衣
                return equipBox;
            case 9:
                equipBox.push(27);//最强跑鞋
                return equipBox;
            case 10:
                for (let i = 0; i < this.dropTime; i++) {
                    equipBox.push(this.equipDropLv4());
                }
                return equipBox;
        }
    }

    changeType() {
        // map.deleteMonster(this)
        let tempX = this.x;
        let tempY = this.y;

        let mapCount = 0;

        for (let i = 0; i < mapManager.maps.length; i++) {
            if (this.nowMapID == mapManager.maps[i].id) {
                mapCount = i;
            }
        }

        console.log("当前地图ID：" + this.nowMapID);
        console.log("当前地图数组位置：" + mapCount);

        mapManager.maps[mapCount].deleteMonster(this);

        for (let i = 0; i < npcManager.npcList.length; i++) {
            if (npcManager.npcList[i].id == this.changeTypeID) {
                let npc = npcManager.npcList[i];

                npc.nowMapID = this.nowMapID;
                npc.x = tempX;
                npc.y = tempY;

                const npcView = new Bitmap(TILE_SIZE * tempX, TILE_SIZE * tempY, npcManager.npcList[i].view.img);
                const npcItem = npcManager.npcList[i];

                npcItem.x = tempX;
                npcItem.y = tempY;
                const key = tempX + '_' + tempY;
                mapManager.maps[mapCount].npcConfig[key] = npcItem;
                mapManager.maps[mapCount].roleContainer.addChild(npcView);

            }
        }
    }

    resetHP() {
        this.hp = this.originHP;
    }
}



/**
 * 装备集（用于掉落）
 */
class EquipmentSet {

    public idSet: number[] = [];

    buildEquip() {
        let count = this.idSet.length - 1;
        let ran = this.getRandom(0, count);
        let equipID = this.idSet[ran];
        for (let i = 0; i < equipManager.equipList.length; i++) {
            if (equipManager.equipList[i].id == equipID) {
                console.log(equipManager.equipList[i].name);
            }
        }
        return equipID;
    }

    getRandom(n: number, m: number) {
        return Math.round(Math.random() * (m - n) + n);
    }

    addEquipID(id: number) {
        this.idSet.push(id);
    }

}

class lv1EquipSet extends EquipmentSet {
    constructor() {
        super();
    }
}

class lv2EquipSet extends EquipmentSet {
    constructor() {
        super();
    }
}

class lv3EquipSet extends EquipmentSet {
    constructor() {
        super();
    }
}

class lv4EquipSet extends EquipmentSet {
    constructor() {
        super();
    }
}

class lv5EquipSet extends EquipmentSet {
    constructor() {
        super();
    }
}

class lv1DungeonEquipSet extends EquipmentSet {
    constructor() {
        super();
    }
}
class lv1DungeonEquipSetlv1 extends lv1DungeonEquipSet {
    constructor() {
        super();
    }
}
class lv1DungeonEquipSetlv2 extends lv1DungeonEquipSet {
    constructor() {
        super();
    }
}

class lv2DungeonEquipSet extends EquipmentSet {
    constructor() {
        super();
    }
}

class lv2DungeonEquipSetlv2 extends lv2DungeonEquipSet {
    constructor() {
        super();
    }
}

class lv2DungeonEquipSetlv3 extends lv2DungeonEquipSet {
    constructor() {
        super();
    }
}

class lv3DungeonEquipSet extends EquipmentSet {
    constructor() {
        super();
    }
}

class lv3DungeonEquipSetlv4 extends lv3DungeonEquipSet {
    constructor() {
        super();
    }
}

class lv3DungeonEquipSetlv5 extends lv3DungeonEquipSet {
    constructor() {
        super();
    }
}

class lv4DungeonEquipSet extends EquipmentSet {
    constructor() {
        super();
    }
}

let lv1Set = new lv1EquipSet();
let lv2Set = new lv2EquipSet();
let lv3Set = new lv3EquipSet();
let lv4Set = new lv4EquipSet();
let lv5Set = new lv5EquipSet();

let lv1DgSetlv1 = new lv1DungeonEquipSetlv1();
let lv1DgSetlv2 = new lv1DungeonEquipSetlv2();

let lv2DgSetlv2 = new lv2DungeonEquipSetlv2();
let lv2DgSetlv3 = new lv2DungeonEquipSetlv3();

let lv3DgSetlv4 = new lv3DungeonEquipSetlv4();
let lv3DgSetlv5 = new lv3DungeonEquipSetlv5();

let lv4DgSet = new lv4DungeonEquipSet();

function equipSetInit(equipManager: EquipmentManager) {
    for (var i = 0; i < equipManager.equipList.length; i++) {
        switch (equipManager.equipList[i].quality) {
            case 1:
                lv1Set.addEquipID(equipManager.equipList[i].id);
                break;
            case 2:
                lv2Set.addEquipID(equipManager.equipList[i].id);
                break;
            case 3:
                lv3Set.addEquipID(equipManager.equipList[i].id);
                break;
            case 4:
                lv4Set.addEquipID(equipManager.equipList[i].id);
                break;
            case 5:
                lv5Set.addEquipID(equipManager.equipList[i].id);
                break;
        }
    }
}

function dungeonEquipSetInitequip(Manager: EquipmentManager) {

    //lv1地下城固定掉落
    lv1DgSetlv1.addEquipID(8);
    lv1DgSetlv1.addEquipID(9);
    lv1DgSetlv2.addEquipID(10);
    lv1DgSetlv1.addEquipID(11);
    lv1DgSetlv2.addEquipID(12);
    lv1DgSetlv1.addEquipID(1);

    //lv2地下城固定掉落
    lv2DgSetlv2.addEquipID(14);
    lv2DgSetlv2.addEquipID(15);
    lv2DgSetlv3.addEquipID(16);
    lv2DgSetlv3.addEquipID(17);
    lv2DgSetlv3.addEquipID(18);
    lv2DgSetlv3.addEquipID(19);
    lv2DgSetlv3.addEquipID(20);

    //lv3地下城固定掉落
    lv3DgSetlv5.addEquipID(5);
    lv3DgSetlv4.addEquipID(21);
    lv3DgSetlv4.addEquipID(22);
    lv3DgSetlv4.addEquipID(23);
    lv3DgSetlv4.addEquipID(24);
    lv3DgSetlv4.addEquipID(25);

    //lv4地下城固定掉落
    lv4DgSet.addEquipID(28);
    lv4DgSet.addEquipID(29);
    lv4DgSet.addEquipID(30);
    lv4DgSet.addEquipID(31);
    lv4DgSet.addEquipID(32);
    lv4DgSet.addEquipID(6);

}

/**
 * 技能
 */
class Skill {

    id: number;
    name: string = '[空]';
    description: Bitmap;
    // desImg: Bitmap;
    buttonView: Bitmap;
    mp: number

    constructor(id: number, name: string, mp: number) {
        this.id = id;
        this.name = name;
        this.mp = mp;
    }

    searchSkillByID(id: number) {
        for (let i = 0; i < skillArray.length; i++) {
            if (id == skillArray[i].id) {
                return skillArray[i];
            }
        }
    }
}

/**
 * 废话窗口
 */
class UselessTalkWindow extends DisplayObjectContainer {
    view: Bitmap;
    head: Bitmap;
    blackMask: Bitmap;

    name: TextField;
    text: MultiTextField;

    npc: Npc;
    monster: Monster;

    playerView: Bitmap;
    playerNameText: TextField;

    count: number = 0;

    isNpc = true;


    constructor(x: number, y: number) {


        super(x, y);

        this.view = new Bitmap(0, 0, talk_window);
        this.text = new MultiTextField([], 190, 100, 24, 5);
        this.blackMask = new Bitmap(-100, -150, battlePanelBlackMask);

        this.addChild(this.blackMask);
        this.addChild(this.view);
        this.addChild(this.text);

        this.addEventListener("onClick", (eventData: any) => {
            switch (this.count % 2) {
                case 0:
                    this.text.x = 160;
                    this.text.y = 220;
                    break;
                case 1:
                    this.text.x = 195;
                    this.text.y = 100;
                    break;
            }
            this.count++;
            this.update();
        });
    }

    update() {

        let contents: string[] = [];
        if (this.isNpc) {
            contents = this.npc.uselessTalks;
        } else {
            contents = this.monster.uselessTalks;
        }

        if (this.count >= contents.length) {
            this.dispatchEvent("uselessTalkWiondowClose", null);
        } else {
            this.text.setStringByNumber(contents[this.count], 8);
        }
    }

    initNpcInfo() {
        if (this.isNpc) {
            this.head = this.npc.head;
        } else {
            this.head = this.monster.head;
        }

        this.head.x = 400;
        this.head.y = 60;
        if (this.isNpc) {

            this.name = new TextField(this.npc.name, 445, 35, 20);
        } else {

            this.name = new TextField(this.monster.name, 445, 35, 20);
        }


        this.playerView = player.head;
        this.playerView.x = 50;
        this.playerView.y = 170;
        this.playerNameText = new TextField(player.name, 90, 140, 24);

        this.addChild(this.head);
        this.addChild(this.name);
        this.addChild(this.playerView);
        this.addChild(this.playerNameText);
    }

    setNpc(npc: Npc) {
        this.npc = npc;
        this.isNpc = true;
        this.initNpcInfo();


    }

    setMonster(monster: Monster) {
        this.monster = monster;
        this.isNpc = false;
        this.initNpcInfo();

    }
}