
/**
 * 走路命令
 */
class WalkCommand extends Command {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;

    constructor(fromX: number, fromY: number, toX: number, toY: number) {
        super();
        this.fromX = fromX;
        this.fromY = fromY;
        this.toX = toX;
        this.toY = toY;
    }

    execute(callback: Function): void {
        console.log(`开始走路！！！从(${this.fromX}, ${this.fromY})出发`);

        map.grid.setStartNode(this.fromX, this.fromY);
        map.grid.setEndNode(this.toX, this.toY);
        const findpath = new astar.AStar();
        findpath.setHeurisitic(findpath.diagonal);
        const result = findpath.findPath(map.grid);
        // console.log(map.grid.toString());
        console.log(findpath._path);

        let path;
        if (result) {
            path = findpath._path;
            path.shift();
            this.walk(path, callback);
        } else {
            player.moveStatus = true;
            callback();
        }
    }

    walk(path: astar.Node[], callback: Function) {
        setTimeout(() => {
            let node = path.shift();
            if (node) {
                // player.dispatchEvent('walkOneStep', { nodeX: node.x, nodeY: node.y });
                player.changeGridPos(node.x, node.y);
            }
            else {
                console.log(`到达地点！！！(${this.toX},${this.toY})`);
                player.moveStatus = true;
                callback();
                return;
            }
            this.walk(path, callback);
        }, PLAYER_WALK_SPEED);
    }
}


/**
 * 拾取命令
 */
class PickCommand extends Command {
    equipment: Equipment;

    constructor(equipment: Equipment) {
        super();
        this.equipment = equipment;
    }

    execute(callback: Function): void {
        player.pick(this.equipment);
        console.log(`捡起了${this.equipment.toString()}`);
        // map.dispatchEvent({ message: 'pickEquipment' });
        map.deleteEquipment(this.equipment);
        callback();
    }
}


/**
 * 对话命令
 */
class TalkCommand extends Command {
    npc: Npc;

    constructor(npc: Npc) {
        super();
        this.npc = npc;
    }

    execute(callback: Function): void {
        console.log(`开始和NPC：${this.npc.toString()}对话`)

        player.talk(this.npc);

        let mission: Mission | null = null;
        if (this.npc.canAcceptMissions.length > 0) {
            mission = this.npc.canAcceptMissions[0];
        }
        if (this.npc.canSubmitMissions.length > 0) {
            mission = this.npc.canSubmitMissions[0];
        }



        if (mission) {
            const talkWindow = new TalkWindow(100, 150);
            talkUIContainer.addChild(talkWindow);
            talkWindow.setMission(mission);
            talkWindow.setNpc(this.npc);
            talkWindow.addEventListener("talkWiondowClose", () => {
                talkUIContainer.deleteChild(talkWindow);
                if (mission) {
                    if (mission.status == MissionStatus.CAN_ACCEPT) {
                        console.log(`接受任务：${mission.toString()}`);
                        missionManager.accept(mission);
                    } else if (mission.status == MissionStatus.CAN_SUBMIT) {
                        console.log(`完成任务: ${mission.toString()}`);
                        missionManager.submit(mission);
                    }
                    callback();
                }
            })
        } else {
            callback();
        }
    }
}


/**
 * 打架命令
 */
class FightCommand extends Command {
    monster: Monster = new Monster(0, "1", 3, 4, 5, 6);
    monsterOriginHp: number;

    constructor(monster: Monster) {
        super();
        this.monster = monster;
        this.monsterOriginHp = this.monster.hp;
    }

    execute(callback: Function): void {
        console.log(`开始打架：${this.monster.toString()}`);
        const batUI = new battleUI(0, 0);
        const batEndUI = new battleEndWinUI(0, 0);
        const batEndLoseUI = new battleEndLoseUI(0, 0);
        batManager.dispatchEvent('enemyBattleStart', this.monster);
        batteUIContainer.addChild(batUI);
        batManager.addEventListener(this.monster.name + 'enemyDie', (enemy: Monster) => {

            batteUIContainer.addChild(batEndUI);
            map.deleteMonster(this.monster);
        })

        batManager.addEventListener('backSceneWin', (eventData: any) => {
            batteUIContainer.deleteAll();


        })

        batManager.addEventListener('playerDie', (eventData: any) => {
            this.monster.hp = this.monsterOriginHp;
            batteUIContainer.addChild(batEndLoseUI);
        })
        batManager.addEventListener('backSceneLose', (eventData: any) => {
            batteUIContainer.deleteAll();
            // this.monster.hp = this.monsterOriginHp;
        })


        // stage.addChild(this.batteUIContainer);
        // this.batteUIContainer.addChild(this.battleUI);
        // this.monster.hp -= player.attack;
        // player._hp -= this.monster.attack;
        // if (this.monster.hp <= 0) {
        //     player.fight(this.monster);
        //     map.deleteMonster(this.monster);
        // }
        callback();
    }
}