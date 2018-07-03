/**
 * 装备管理器
 */
class EquipmentManager {
    equipList: Equipment[] = []

    constructor() {

    }

    init() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'config/equip.json');
        xhr.send();
        xhr.onload = () => {
            const obj = JSON.parse(xhr.response)
            this.parseFromConfig(obj);
        }
    }

    parseFromConfig(config: any) {
        for (let item of config.equip) {
            const id = parseInt(item.id);
            const name = item.name;
            const quality = parseInt(item.quality);
            const posID = parseInt(item.posID);
            const health = parseInt(item.health);
            const attack = parseInt(item.attack);
            const criticalPer = parseInt(item.criticalPer);

            let equip = new Equipment(id, name, quality, posID, health, attack, criticalPer);

            this.equipList.push(equip);
        }
    }
}

