class MapManager extends EventDispatcher {

    maps: GameMap[] = []

    constructor() {
        super()
    }

    init(callback: Function) {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "config/map.json")
        xhr.send();
        xhr.onload = () => {
            const obj = JSON.parse(xhr.response)
            // console.log(xhr.response)
            this.parseFromConfig(obj);

            callback();
        }
    }

    parseFromConfig(obj: any) {
        for (let item of obj.map) {
            const map = new GameMap(item)
            this.maps.push(map)
        }
    }

    getMap(id: number) {
        let map: GameMap | null = null
        for (let item of this.maps) {
            if (item.id == id) {
                map = item
            }
        }
        if (map) {
            map.addEventListener('onClick', (eventData: any) => {
                if (player.moveStatus) {

                    clickaudio.play();

                    const globalX = eventData.globalX;
                    const globalY = eventData.globalY;
                    const localPos = map!.getLocalPos(new math.Point(globalX, globalY));

                    // 确定被点击的格子位置
                    const row = Math.floor(localPos.x / TILE_SIZE);
                    const col = Math.floor(localPos.y / TILE_SIZE);

                    // 添加行走命令
                    const walk = new WalkCommand(player.x, player.y, row, col);
                    commandPool.addCommand(walk);

                    // 获取被点击格子的装备信息 如果有东西的话 就添加一个拾取命令
                    const equipmentInfo = map!.getEquipmentInfo(row, col);
                    if (equipmentInfo) {
                        const pick = new PickCommand(equipmentInfo);
                        commandPool.addCommand(pick);
                    }

                    const npcInfo = map!.getNpcInfo(row, col);
                    if (npcInfo) {
                        if (npcInfo.id == 6) {
                            shpManager.openShop()
                        } else {
                            const talk = new TalkCommand(npcInfo);
                            commandPool.addCommand(talk)
                        }
                    }

                    const monsterInfo = map!.getMonsterInfo(row, col);
                    if (monsterInfo) {
                        // console.log('monster Info');
                        const fight = new FightCommand(monsterInfo);
                        commandPool.addCommand(fight);
                    }

                    const portalInfo = map!.getPortalInfo(row, col);
                    if (portalInfo) {
                        const portal = new PortalCommand(portalInfo);
                        commandPool.addCommand(portal);
                    }

                    player.moveStatus = false;

                    // 执行命令池的命令
                    commandPool.execute();
                }
            });
        }
        return map;

    }
}