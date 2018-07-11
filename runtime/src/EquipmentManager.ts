/**
 * 装备管理器
 */
class EquipmentManager {
    equipList: Equipment[] = []

    constructor() {

    }

    init(callback: Function) {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'config/equip.json');
        xhr.send();
        xhr.onload = () => {
            const obj = JSON.parse(xhr.response)
            this.parseFromConfig(obj);
            callback();
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
        for (let item of config.consumable) {
            const id = parseInt(item.id);
            const name = item.name;
            const posID = parseInt(item.posID);
            const addHP = parseInt(item.addHP);
            const addMP = parseInt(item.addMP);
            const addCharm = parseInt(item.addCharm);
            let consum = new Consumable(id, name, posID, addHP, addMP, addCharm);
            this.equipList.push(consum);
        }
    }

    getEquipByID(id: number): Equipment | null {
        for (let i = 0; i < equipManager.equipList.length; i++) {
            if (equipManager.equipList[i].id == id) {
                console.log(equipManager.equipList[i].name);
                return equipManager.equipList[i];
            }
        }
        return null;

    }
}

