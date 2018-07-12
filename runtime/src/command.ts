
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

        anim.play();////

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
                anim.end();////
                player.moveStatus = true;
                callback();
                return;
            }
            this.walk(path, callback);
        }, 128000 / PLAYER_WALK_SPEED);
    }
}


/**
 * 传送命令
 */
class PortalCommand extends Command {

    portal: Portal
    mapnameBitmap: Bitmap
    mapname: TextField;

    constructor(portal: Portal) {
        super()
        this.portal = portal;
        this.mapnameBitmap = new Bitmap(0, 0, Resource.get('mapchange1') as HTMLImageElement)
        this.mapname = new TextField('', 400, 250, 50)
    }

    execute() {
        console.log(`传送目标${this.portal.toString()}`)
        dynamicStage.deleteChild(map)

        map = mapManager.getMap(this.portal.to) as GameMap
        map.addChild(player.view)


        if (this.portal.to == 1) {
            this.mapname = new TextField('- 校园 -', 300, 200, 100)
            staticStage.addChild(this.mapname)

            setTimeout(() => {
                staticStage.deleteChild(this.mapname);
            }, 2000);
        }

        if (this.portal.to == 2) {
            this.mapname = new TextField('- 操场 -', 300, 200, 100)
            staticStage.addChild(this.mapname)

            setTimeout(() => {
                staticStage.deleteChild(this.mapname);
            }, 2000);
        }

        if (this.portal.to == 3) {
            this.mapname = new TextField('- 家 -', 300, 200, 100)
            staticStage.addChild(this.mapname)

            setTimeout(() => {
                staticStage.deleteChild(this.mapname);
            }, 2000);
        }

        if (this.portal.to == 4) {
            this.mapname = new TextField('- 教室 -', 300, 200, 100)
            staticStage.addChild(this.mapname)

            setTimeout(() => {
                staticStage.deleteChild(this.mapname);
            }, 2000);
        }

        if (this.portal.to == 5) {
            this.mapname = new TextField('- 街道 -', 300, 200, 100)
            staticStage.addChild(this.mapname)

            setTimeout(() => {
                staticStage.deleteChild(this.mapname);
            }, 2000);
        }

        if (this.portal.to == 6) {
            this.mapname = new TextField('- 密室 -', 300, 200, 100)
            staticStage.addChild(this.mapname)

            setTimeout(() => {
                staticStage.deleteChild(this.mapname);
            }, 2000);
        }

        if (this.portal.to == 7) {
            this.mapname = new TextField('- 副本 -', 300, 200, 100)
            staticStage.addChild(this.mapname)

            setTimeout(() => {
                staticStage.deleteChild(this.mapname);
            }, 2000);
        }

        if (this.portal.to == 8) {
            this.mapname = new TextField('- 副本1 -', 300, 200, 100)
            staticStage.addChild(this.mapname)

            setTimeout(() => {
                staticStage.deleteChild(this.mapname);
            }, 2000);
        }

        if (this.portal.to == 9) {
            this.mapname = new TextField('- 副本2 -', 300, 200, 100)
            staticStage.addChild(this.mapname)

            setTimeout(() => {
                staticStage.deleteChild(this.mapname);
            }, 2000);
        }

        if (this.portal.to == 10) {
            this.mapname = new TextField('- 副本3 -', 300, 200, 100)
            staticStage.addChild(this.mapname)

            setTimeout(() => {
                staticStage.deleteChild(this.mapname);
            }, 2000);
        }

        if (this.portal.to == 11) {
            this.mapname = new TextField('- 副本4 -', 300, 200, 100)
            staticStage.addChild(this.mapname)

            setTimeout(() => {
                staticStage.deleteChild(this.mapname);
            }, 2000);
        }

        player.x = this.portal.targetRow
        player.y = this.portal.targetCol
        player.view.x = player.x * TILE_SIZE
        player.view.y = player.y * TILE_SIZE

        dynamicStage.addChild(map)


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

        // console.log('任务长度' + missionManager.missions.length);

        if (mission) {

            const talkWindow = new TalkWindow(100, 150);
            talkUIContainer.addChild(talkWindow);
            talkWindow.setMission(mission);
            talkWindow.setNpc(this.npc);
            talkWindow.addEventListener("talkWiondowClose", () => {
                talkUIContainer.deleteChild(talkWindow);
                if (mission) {
                    console.log(mission.status);

                    if (mission.status == MissionStatus.CAN_ACCEPT) {
                        console.log(`接受任务：${mission.toString()}`);
                        missionManager.accept(mission);
                        if (this.npc.changeTypeID != 0) {
                            this.npc.changeType();//测试换类型！！！ 
                        }

                    } else if (mission.status == MissionStatus.CAN_SUBMIT) {
                        console.log(`完成任务: ${mission.toString()}`);
                        missionManager.submit(mission);
                    }
                    callback();
                }
            })
        } else {
            if (this.npc.uselessTalks.length != 0) {
                const uselessTalkWindow = new UselessTalkWindow(100, 150);
                talkUIContainer.addChild(uselessTalkWindow);
                uselessTalkWindow.setNpc(this.npc);
                uselessTalkWindow.update();
                uselessTalkWindow.addEventListener("uselessTalkWiondowClose", () => {
                    talkUIContainer.deleteAll();
                })
            }
            callback();
        }
    }
}


/**
 * 对话命令
 */
class ShopCommand extends Command {
    npc: Npc;

    constructor() {
        super();
    }


    execute(callback: Function): void {
        shpManager.openShop()
        callback();
    }
}


/**
 * 打架命令
 */
class FightCommand extends Command {


    battleaudio: AudioPlay
    succeedaudio: AudioPlay
    failaudio: AudioPlay


    monster: Monster = new Monster(0, "1", 3, 4, 5, 6, 7, 8);
    monsterOriginHp: number;
    hasUselessTalk = false;


    constructor(monster: Monster) {
        super();
        this.monster = monster;
        this.monsterOriginHp = this.monster.hp;

        this.battleaudio = new AudioPlay(BattleAudio)
        this.succeedaudio = new AudioPlay(SucceedAudio)
        this.failaudio = new AudioPlay(FailAudio)
        this.battleaudio.playOnlyOnce = false;
        this.succeedaudio.playOnlyOnce = true;
        this.failaudio.playOnlyOnce = true;
        if (monster.uselessTalks.length != 0) {
            this.hasUselessTalk = true;
        }
    }

    execute(callback: Function): void {
        console.log(`开始打架：${this.monster.toString()}`);

        player.fight(this.monster);

        if (this.hasUselessTalk) {
            const uselessTalkWindow = new UselessTalkWindow(100, 150);
            talkUIContainer.addChild(uselessTalkWindow);
            uselessTalkWindow.setMonster(this.monster);
            uselessTalkWindow.update();
            uselessTalkWindow.addEventListener("uselessTalkWiondowClose", () => {
                talkUIContainer.deleteAll();
                batteUIContainer.addChild(batUI);
                mainaudio.end();
                this.battleaudio.play();
            })
        }

        const batUI = new battleUI(0, 0);

        const batEndLoseUI = new battleEndLoseUI(0, 0);
        batManager.dispatchEvent('enemyBattleStart', this.monster);
        if (!this.hasUselessTalk) {
            batteUIContainer.addChild(batUI);
            mainaudio.end();
            this.battleaudio.play();
        }
        batManager.addEventListener(this.monster.name + 'enemyDie', (enemy: Monster) => {
            batteUIContainer.addChild(batEndUI);
            this.monster.changeType();//此处测试换类型
            map.deleteMonster(this.monster);

            this.battleaudio.end();
            this.succeedaudio.play();
            mainaudio.play();
        })

        batManager.addEventListener('backSceneWin', (eventData: any) => {

            batteUIContainer.deleteAll();

            this.battleaudio.end();
            mainaudio.play();

        })

        batManager.addEventListener('playerDie', (eventData: any) => {
            this.monster.hp = this.monsterOriginHp;
            batteUIContainer.addChild(batEndLoseUI);

            this.battleaudio.end();
            this.failaudio.play();
            mainaudio.play();

        })
        batManager.addEventListener('backSceneLose', (eventData: any) => {
            batteUIContainer.deleteAll();
            this.monster.hp = this.monsterOriginHp;

            this.battleaudio.end();
            mainaudio.play();
        })




        callback();
    }
}

