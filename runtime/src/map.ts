/**
 * 游戏地图容器
 */
class GameMap extends DisplayObjectContainer {
    grid: astar.Grid;

    config = []

    private equipmentConfig: { [index: string]: Equipment } = {}
    npcConfig: { [index: string]: Npc } = {}
    monsterConfig: { [index: string]: Monster } = {}
    portalConfig: { [index: string]: Portal } = {}

    private tileContainer = new DisplayObjectContainer(0, 0);
    private itemContainer = new DisplayObjectContainer(0, 0);
    roleContainer = new DisplayObjectContainer(0, 0);



    constructor(obj: any) {
        super(0, 0);

        this.addChild(this.tileContainer);
        this.addChild(this.itemContainer);
        this.addChild(this.roleContainer);

        this.init(obj);
    }

    // 好像只调用了一次…… 初始化……
    init(obj: any) {
        this.grid = new astar.Grid(COL_NUM, ROW_NUM);

        this.config = obj

        const mapTile = obj.tile as string[][];
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

        const mapItem = obj.item as string[][];
        for (let i = 0; i < mapItem.length; i++) {
            const row = mapItem[i];
            for (let j = 0; j < row.length; j++) {
                const item = row[j];
                if (item) {
                    const img = new Image();
                    img.src = item;
                    const building = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, img);
                    // this.grid.setWalkable(j, i, false);
                    this.tileContainer.addChild(building);
                }
            }
        }

        const mapWalkable = obj.walkable as number[][]
        for (let i = 0; i < mapWalkable.length; i++) {
            const row = mapWalkable[i]
            for (let j = 0; j < row.length; j++) {
                const item = row[j];
                if (item == 1) {
                    this.grid.setWalkable(j, i, false)
                }
            }
        }

        const mapNpc = obj.npc as number[][];
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
                            console.log(npcView.img.src)
                            npcView.x = TILE_SIZE * j;
                            npcView.y = TILE_SIZE * i;
                            npc.x = j
                            npc.y = i
                            const key = j + '_' + i;
                            this.npcConfig[key] = npc;
                            this.roleContainer.addChild(npcView);
                        }
                    }
                }
            }
        }

        const mapEquip = obj.equipment as number[][];
        for (let i = 0; i < mapEquip.length; i++) {
            const row = mapEquip[i];
            for (let j = 0; j < row.length; j++) {
                const id = row[j]
                if (id == KILL_DARGON_KNIFE) {
                    const equipmentView = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, knife);
                    const equipmentTiem = new Equipment(1, '2', 3, 0, 5, 6, 7);
                    equipmentTiem.view = equipmentView;
                    equipmentTiem.name = '屠龙刀'
                    equipmentTiem.attack = 35;
                    equipmentTiem.x = j;
                    equipmentTiem.y = i;
                    const key = j + '_' + i;
                    this.equipmentConfig[key] = equipmentTiem;
                    this.itemContainer.addChild(equipmentView);
                } else if (id == HP_BOTTLE) {
                    // TODO
                    const equipmentView = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, hp_bottle);
                    const equipmentTiem = new Equipment(1, '2', 3, 7, 5, 6, 7);
                    equipmentTiem.view = equipmentView;
                    equipmentTiem.name = '扁鹊的药瓶'
                    equipmentTiem.attack = 0;
                    equipmentTiem.x = j;
                    equipmentTiem.y = i;
                    const key = j + '_' + i;
                    this.equipmentConfig[key] = equipmentTiem;
                    this.itemContainer.addChild(equipmentView);
                } else if (id == 1004) {
                    const equipmentView = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, caihuaBookImg);
                    let equip = equipManager.getEquipByID(id) as Equipment;
                    const equipmentTiem = new Equipment(id, equip.name, equip.quality, equip.posID, equip.health, equip.attack, equip.criticalPer);
                    equipmentTiem.view = equipmentView;
                    // equipmentTiem.name = '扁鹊的药瓶'
                    // equipmentTiem.attack = 0;
                    equipmentTiem.x = j;
                    equipmentTiem.y = i;
                    const key = j + '_' + i;
                    this.equipmentConfig[key] = equipmentTiem;
                    this.itemContainer.addChild(equipmentView);
                } else if (id == 1005) {
                    const equipmentView = new Bitmap(TILE_SIZE * j, TILE_SIZE * i, xiXingBookImg);
                    let equip = equipManager.getEquipByID(id) as Equipment;
                    const equipmentTiem = new Equipment(id, equip.name, equip.quality, equip.posID, equip.health, equip.attack, equip.criticalPer);
                    equipmentTiem.view = equipmentView;
                    // equipmentTiem.name = '扁鹊的药瓶'
                    // equipmentTiem.attack = 0;
                    equipmentTiem.x = j;
                    equipmentTiem.y = i;
                    const key = j + '_' + i;
                    this.equipmentConfig[key] = equipmentTiem;
                    this.itemContainer.addChild(equipmentView);
                }
            }
        }

        const mapMonster = obj.monster as number[][];
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
                            monsterView.x = TILE_SIZE * j;
                            monsterView.y = TILE_SIZE * i;
                            monster.x = j
                            monster.y = i
                            const key = j + '_' + i;
                            this.monsterConfig[key] = monster;
                            this.roleContainer.addChild(monsterView);
                        }
                    }
                }
            }
        }

        const mapPortal = obj.portal as number[][];
        for (let i = 0; i < mapPortal.length; i++) {
            const row = mapPortal[i]
            for (let j = 0; j < row.length; j++) {
                const item = row[j];
                if (item != 0) {
                    const id = item
                    console.log(portalManager.portalList.length)
                    for (let portal of portalManager.portalList) {
                        if (portal.id == id) {
                            const key = j + '_' + i
                            this.portalConfig[key] = portal
                        }
                    }
                }
            }
        }


    } // init() end


    reset() {

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
    getPortalInfo(row: number, col: number) {
        const key = row + '_' + col;
        return this.portalConfig[key];
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
    deleteNpc(npc: Npc) {
        const key = npc.x + '_' + npc.y;
        delete this.npcConfig[key];
        this.roleContainer.deleteChild(npc.view);
    }
}