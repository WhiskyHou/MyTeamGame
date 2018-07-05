const MAX_LEVEL = 99;
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
    moveStatus: boolean = true;

    public name: string;
    private _originAttack = 20;
    private _originHealth = 100;

    mounthedEquipment: Equipment[] = [];
    packageEquipment: Equipment[] = [];

    _attack = 8;
    hp = 60;
    _criticalPer = 0;

    _suitDefensePer = 0;
    suitAttackPer = 0;
    _suitCriticalPer = 0;

    constructor() {
        super();
        // 以下测试用
        // this.name = "菜鸡";
        // let eq0 = new Equipment(1, '【毁天灭地】武器', 3, 0, 0, 100, 20);
        // let eq1 = new Equipment(2, '【毁天灭地】头盔', 3, 1, 0, 0, 0);
        // let eq2 = new Equipment(3, '【毁天灭地】肩甲', 3, 2, 0, 0, 0);
        // let eq3 = new Equipment(4, '【毁天灭地】衣服', 3, 3, 0, 0, 0);
        // let eq4 = new Equipment(5, '【毁天灭地】腰带', 3, 4, 0, 0, 0);
        // let eq5 = new Equipment(6, '【毁天灭地】护腿', 3, 5, 0, 0, 0);
        // this.mounthedEquipment.push(eq0);
        // this.mounthedEquipment.push(eq1);
        // this.mounthedEquipment.push(eq2);
        // this.mounthedEquipment.push(eq3);
        // this.mounthedEquipment.push(eq4);
        // this.mounthedEquipment.push(eq5);
        // this.changeEquipments();
    }

    _level: number;
    get level() {
        return this._level;
    }
    set level(level: number) {
        this._level = level;
        this.dispatchEvent('updateUserInfo', null);
    }

    pick(equipment: Equipment) {
        this.mounthedEquipment.push(equipment);
        this.dispatchEvent('updateUserInfo', null);
        this.dispatchEvent('pickEquipment', { name: equipment.name })
    }
    drop() {

    }

    fight(monster: Monster) {
        this.dispatchEvent('fightWithMonster', { name: monster.name });
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
        const targetX = player.x * TILE_SIZE;
        const targetY = player.y * TILE_SIZE;
        if (player.view.x == targetX && player.view.y == targetY) {
            return;
        }
        var stepX = 0;
        var stepY = 0;
        if (Math.abs(targetX - player.view.x) > 2) {
            stepX = TILE_SIZE * INTERVAL / PLAYER_WALK_SPEED;
            stepX = (targetX < player.view.x) ? -stepX : stepX;
            player.view.x += stepX;
        } else {
            player.view.x = targetX;
        }
        if (Math.abs(targetY - player.view.y) > 2) {
            stepY = TILE_SIZE * INTERVAL / PLAYER_WALK_SPEED;
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
    }

    toString() {
        return `[User ~ name:${this.name}, level:${this.level}, hp:${this.hp}, attack:${this._attack}]`;
    }

    //---------------------------------------------------------------


    public changeEquipments() {
        this.initProperty();
        for (var i = 0; i < this.mounthedEquipment.length; i++) {
            this._attack += this.mounthedEquipment[i].attack;
            this.hp += this.mounthedEquipment[i].health;
            this._criticalPer += this.mounthedEquipment[i].criticalPer;
        }
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
        this.hp = this._originHealth;
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

    going: Function;
    reward: Function;

    constructor(type: string, going: Function, reward: Function) {
        this.going = going;
        this.reward = reward;
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
                nextStatus = MissionStatus.CAN_ACCEPT;
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


    canAcceptMissions: Mission[] = []
    canSubmitMissions: Mission[] = []

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
            if (mission.status == MissionStatus.CAN_ACCEPT && mission.fromNpcId == this.id) {
                this.canAcceptMissions.push(mission);
            }
            if (mission.status == MissionStatus.CAN_SUBMIT && mission.toNpcId == this.id) {
                this.canSubmitMissions.push(mission);
            }
        }
    }

    toString() {
        return `[NPC ~ id:${this.id}, name:${this.name}]`
    }

}




/**
 * 怪物
 */
class Monster extends EventDispatcher {
    x: number = 0;
    y: number = 0;
    view: Bitmap;
    id: number = 0;
    name: string = '';
    hp: number;
    attack: number;
    curEquipSet: EquipmentSet;
    dropTime = 3;//掉落次数

    constructor(id: number, name: string, hp: number, attack: number) {
        super();
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.attack = attack;
    }

    toString() {
        return `[Monster ~ id:${this.id}, name:${this.name}, hp:${this.hp}, attack:${this.attack}]`
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

    public makeDrop() {
        let equipBox: number[] = [];
        for (let i = 0; i < this.dropTime; i++) {
            equipBox.push(this.equipDrop());
        }
        return equipBox;
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

let lv1Set = new lv1EquipSet();
let lv2Set = new lv2EquipSet();
let lv3Set = new lv3EquipSet();
let lv4Set = new lv4EquipSet();
let lv5Set = new lv5EquipSet();

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