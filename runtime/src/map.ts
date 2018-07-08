/**
 * 游戏地图容器
 */
class GameMap extends DisplayObjectContainer {
    grid: astar.Grid;

    config = [
        { x: 0, y: 0, id: GRASS_L }, { x: 1, y: 0, id: GRASS_D }, { x: 2, y: 0, id: GRASS_L }, { x: 3, y: 0, id: GRASS_D }, { x: 4, y: 0, id: GRASS_L }, { x: 5, y: 0, id: GRASS_D, npc: NPC1 }, { x: 6, y: 0, id: GRASS_L }, { x: 7, y: 0, id: GRASS_D },
        { x: 0, y: 1, id: GRASS_D, wall: WALL_LEFT }, { x: 1, y: 1, id: GRASS_L, wall: WALL_MIDDLE }, { x: 2, y: 1, id: GRASS_D, wall: WALL_MIDDLE }, { x: 3, y: 1, id: GRASS_L, wall: WALL_RIGHT }, { x: 4, y: 1, id: GRASS_D }, { x: 5, y: 1, id: GRASS_L }, { x: 6, y: 1, id: GRASS_D }, { x: 7, y: 1, id: GRASS_L, monster: MONSTER },
        { x: 0, y: 2, id: GRASS_L, monster: MONSTER }, { x: 1, y: 2, id: GRASS_D, tree: TREE }, { x: 2, y: 2, id: GRASS_L }, { x: 3, y: 2, id: GRASS_D }, { x: 4, y: 2, id: GRASS_L }, { x: 5, y: 2, id: GRASS_D }, { x: 6, y: 2, id: GRASS_L }, { x: 7, y: 2, id: GRASS_D },
        { x: 0, y: 3, id: GRASS_D }, { x: 1, y: 3, id: GRASS_L }, { x: 2, y: 3, id: GRASS_D }, { x: 3, y: 3, id: GRASS_L, wall: WALL_LEFT }, { x: 4, y: 3, id: GRASS_D, wall: WALL_MIDDLE }, { x: 5, y: 3, id: GRASS_L, wall: WALL_RIGHT }, { x: 6, y: 3, id: GRASS_D }, { x: 7, y: 3, id: GRASS_L },
        { x: 0, y: 4, id: GRASS_L }, { x: 1, y: 4, id: GRASS_D }, { x: 2, y: 4, id: GRASS_L, tree: TREE }, { x: 3, y: 4, id: GRASS_D, npc: NPC3 }, { x: 4, y: 4, id: GRASS_L }, { x: 5, y: 4, id: GRASS_D, equipment: KILL_DARGON_KNIFE }, { x: 6, y: 4, id: GRASS_L }, { x: 7, y: 4, id: GRASS_D },
        { x: 0, y: 5, id: GRASS_D, npc: NPC2 }, { x: 1, y: 5, id: GRASS_L }, { x: 2, y: 5, id: GRASS_D }, { x: 3, y: 5, id: GRASS_L }, { x: 4, y: 5, id: GRASS_D }, { x: 5, y: 5, id: GRASS_L }, { x: 6, y: 5, id: GRASS_D }, { x: 7, y: 5, id: GRASS_L, npc: NPC5 },
        { x: 0, y: 6, id: GRASS_L }, { x: 1, y: 6, id: GRASS_D }, { x: 2, y: 6, id: GRASS_L }, { x: 3, y: 6, id: GRASS_D, equipment: HP_BOTTLE }, { x: 4, y: 6, id: GRASS_L, wall: WALL_LEFT }, { x: 5, y: 6, id: GRASS_D, wall: WALL_MIDDLE }, { x: 6, y: 6, id: GRASS_L, wall: WALL_MIDDLE }, { x: 7, y: 6, id: GRASS_D, wall: WALL_RIGHT },
        { x: 0, y: 7, id: GRASS_D, npc: NPC4 }, { x: 1, y: 7, id: GRASS_L }, { x: 2, y: 7, id: GRASS_D }, { x: 3, y: 7, id: GRASS_L }, { x: 4, y: 7, id: GRASS_D, monster: MONSTER }, { x: 5, y: 7, id: GRASS_L }, { x: 6, y: 7, id: GRASS_D }, { x: 7, y: 7, id: GRASS_L, monster: MONSTER }
    ]

    private equipmentConfig: { [index: string]: Equipment } = {}
    private npcConfig: { [index: string]: Npc } = {}
    private monsterConfig: { [index: string]: Monster } = {}

    private tileContainer = new DisplayObjectContainer(0, 0);
    private itemContainer = new DisplayObjectContainer(0, 0);
    private roleContainer = new DisplayObjectContainer(0, 0);



    constructor() {
        super(0, 0);

        this.addChild(this.tileContainer);
        this.addChild(this.itemContainer);
        this.addChild(this.roleContainer);

        this.init();
    }
    // 好像只调用了一次…… 初始化……
    init() {
        this.grid = new astar.Grid(COL_NUM, ROW_NUM);

        const xhr = new XMLHttpRequest();
        xhr.open("get", "config/map.json")
        xhr.send();
        let obj: any;
        xhr.onload = () => {
            obj = JSON.parse(xhr.response);

            this.config = obj

            const mapTile = obj.map[0].tile as string[][];
            for (let i = 0; i < mapTile.length; i++) {
                const row = mapTile[i];
                for (let j = 0; j < row.length; j++) {
                    const item = row[j];
                    const img = new Image()
                    img.src = item;
                    const tile = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, img);
                    this.grid.setWalkable(j, i, true);
                    this.tileContainer.addChild(tile);
                }
            }

            const mapItem = obj.map[0].item as string[][];
            for (let i = 0; i < mapItem.length; i++) {
                const row = mapItem[i];
                for (let j = 0; j < row.length; j++) {
                    const item = row[j];
                    if (item) {
                        const img = new Image();
                        img.src = item;
                        const building = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, img);
                        this.grid.setWalkable(j, i, false);
                        this.tileContainer.addChild(building);
                    }
                }
            }

            const mapNpc = obj.map[0].npc as number[][];
            for (let i = 0; i < mapNpc.length; i++) {
                const row = mapNpc[i];
                for (let j = 0; j < row.length; j++) {
                    const item = row[j]
                    if (item != 0) {
                        const id = item;
                        console.log(npcManager.npcList.length);
                        for (let npc of npcManager.npcList) {

                            if (npc.id == id) {
                                const npcView = npc.view;
                                const npcHead = npc.head;
                                npcView.x = TILE_SIZE * i;
                                npcView.y = TILE_SIZE * j;
                                npc.x = i
                                npc.y = j
                                const key = i + '_' + j;
                                this.npcConfig[key] = npc;
                                this.roleContainer.addChild(npcView);
                            }
                        }
                    }
                }
            }

            const mapEquip = obj.map[0].equipment as number[][];
            for (let i = 0; i < mapEquip.length; i++) {
                const row = mapEquip[i];
                for (let j = 0; j < row.length; j++) {
                    const id = row[j]
                    if (id == KILL_DARGON_KNIFE) {
                        const equipmentView = new Bitmap(TILE_SIZE * i, TILE_SIZE * j, knife);
                        const equipmentTiem = new Equipment(1, '2', 3, 4, 5, 6, 7);
                        equipmentTiem.view = equipmentView;
                        equipmentTiem.name = '屠龙刀'
                        equipmentTiem.attack = 35;
                        equipmentTiem.x = i;
                        equipmentTiem.y = j;
                        const key = i + '_' + j;
                        this.equipmentConfig[key] = equipmentTiem;
                        this.itemContainer.addChild(equipmentView);
                    } else if (id == HP_BOTTLE) {
                        // TODO
                        const equipmentView = new Bitmap(TILE_SIZE * i, TILE_SIZE * j, hp_bottle);
                        const equipmentTiem = new Equipment(1, '2', 3, 4, 5, 6, 7);
                        equipmentTiem.view = equipmentView;
                        equipmentTiem.name = '扁鹊的药瓶'
                        equipmentTiem.attack = 0;
                        equipmentTiem.x = i;
                        equipmentTiem.y = j;
                        const key = i + '_' + j;
                        this.equipmentConfig[key] = equipmentTiem;
                        this.itemContainer.addChild(equipmentView);
                    }
                }
            }

            // const mapMonster = obj.map[0].monster as number[][]
            // for (let i = 0; i < mapMonster.length; i++) {
            //     const row = mapMonster[i];
            //     for (let j = 0; j < row.length; j++) {
            //         const id = row[j]
            //         if (id) {
            //             const monsterView = new Bitmap(TILE_SIZE * i, TILE_SIZE * j, captain);
            //             const monsterItem = new Monster(1, '队长', 1200, 100);
            //             monsterItem.name = '队长';
            //             monsterItem.view = monsterView;
            //             // monsterItem.hp = 120;
            //             monsterItem.x = i;
            //             monsterItem.y = j;
            //             const key = i + '_' + j;
            //             this.monsterConfig[key] = monsterItem;
            //             this.roleContainer.addChild(monsterView);
            //         }
            //     }
            // }

            const mapMonster = obj.map[0].monster as number[][];
            for (let i = 0; i < mapMonster.length; i++) {
                const row = mapMonster[i];
                for (let j = 0; j < row.length; j++) {
                    const item = row[j]
                    if (item != 0) {
                        const id = item
                        console.log(monsManager.monsterList.length);
                        for (let monster of monsManager.monsterList) {


                            if (monster.id == id) {
                                const monsterView = monster.view;
                                // const npcHead = npc.head;
                                monsterView.x = TILE_SIZE * i;
                                monsterView.y = TILE_SIZE * j;
                                monster.x = i
                                monster.y = j
                                const key = i + '_' + j;
                                this.monsterConfig[key] = monster;
                                this.roleContainer.addChild(monsterView);
                            }
                        }
                    }
                }
            }


        }


        // for (let item of this.config) {
        //     const img = item.id == GRASS_L ? grassLight : grassDark;
        //     const tile = new Bitmap(TILE_SIZE * item.x, TILE_SIZE * item.y, img);
        //     this.grid.setWalkable(item.x, item.y, true);
        //     this.tileContainer.addChild(tile);

        //     if (item.tree) {
        //         const tile = new Bitmap(TILE_SIZE * item.x, TILE_SIZE * item.y, tree);
        //         this.grid.setWalkable(item.x, item.y, false);
        //         this.tileContainer.addChild(tile);
        //     }
        //     if (item.wall) {
        //         const img = item.wall == WALL_MIDDLE ? wall_middle : (item.wall == WALL_LEFT ? wall_left : wall_right);
        //         const tile = new Bitmap(TILE_SIZE * item.x, TILE_SIZE * item.y, img);
        //         this.grid.setWalkable(item.x, item.y, false);
        //         this.tileContainer.addChild(tile);
        //     }
        //     if (item.equipment) {
        //         const id = item.equipment;
        //         if (id == KILL_DARGON_KNIFE) {
        //             const equipmentView = new Bitmap(TILE_SIZE * item.x, TILE_SIZE * item.y, knife);
        //             const equipmentTiem = new Equipment();
        //             equipmentTiem.view = equipmentView;
        //             equipmentTiem.name = '屠龙刀'
        //             equipmentTiem.attack = 35;
        //             equipmentTiem.x = item.x;
        //             equipmentTiem.y = item.y;
        //             const key = item.x + '_' + item.y;
        //             this.equipmentConfig[key] = equipmentTiem;
        //             this.itemContainer.addChild(equipmentView);
        //         } else if (id == HP_BOTTLE) {
        //             // TODO
        //             const equipmentView = new Bitmap(TILE_SIZE * item.x, TILE_SIZE * item.y, hp_bottle);
        //             const equipmentTiem = new Equipment();
        //             equipmentTiem.view = equipmentView;
        //             equipmentTiem.name = '扁鹊的药瓶'
        //             equipmentTiem.attack = 0;
        //             equipmentTiem.x = item.x;
        //             equipmentTiem.y = item.y;
        //             const key = item.x + '_' + item.y;
        //             this.equipmentConfig[key] = equipmentTiem;
        //             this.itemContainer.addChild(equipmentView);
        //         }
        //     }
        //     if (item.monster) {
        //         const monsterView = new Bitmap(TILE_SIZE * item.x, TILE_SIZE * item.y, captain);
        //         const monsterItem = new Monster();
        //         monsterItem.name = '队长';
        //         monsterItem.view = monsterView;
        //         monsterItem.hp = 120;
        //         monsterItem.x = item.x;
        //         monsterItem.y = item.y;
        //         const key = item.x + '_' + item.y;
        //         this.monsterConfig[key] = monsterItem;
        //         this.roleContainer.addChild(monsterView);
        //     }
        //     if (item.npc) {
        //         const id = item.npc;
        //         for (let npc of npcManager.npcList) {
        //             if (npc.id == id) {
        //                 const npcView = npc.view;
        //                 const npcHead = npc.head;
        //                 npcView.x = TILE_SIZE * item.x;
        //                 npcView.y = TILE_SIZE * item.y;
        //                 npc.x = item.x;
        //                 npc.y = item.y;
        //                 const key = item.x + '_' + item.y;
        //                 this.npcConfig[key] = npc;
        //                 this.roleContainer.addChild(npcView);
        //             }
        //         }
        //     }
        // }
    }

    // getNodeInfo(row: number, col: number) {
    //     for (let item of this.config.map.) {
    //         if (item.x == row && item.y == col) {
    //             return item;
    //         }
    //     }
    //     return null;
    // }
    getEquipmentInfo(row: number, col: number) {
        const key = row + '_' + col
        return this.equipmentConfig[key]
    }
    getNpcInfo(row: number, col: number) {
        const key = row + '_' + col;
        return this.npcConfig[key];
    }
    getMonsterInfo(row: number, col: number) {
        const key = row + '_' + col;
        return this.monsterConfig[key];
    }

    deleteEquipment(equipment: Equipment) {
        const key = equipment.x + '_' + equipment.y;
        delete this.equipmentConfig[key];
        this.itemContainer.deleteChild(equipment.view);
    }
    deleteMonster(monster: Monster) {
        const key = monster.x + '_' + monster.y;
        delete this.monsterConfig[key];
        this.roleContainer.deleteChild(monster.view);
    }
}