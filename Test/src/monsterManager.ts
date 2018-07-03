/**
 * 怪物管理器
 */
class monsterManager {
    monsList: Monster[] = []

    constructor() {

    }

    init(callback: Function) {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'config/monster.json');
        xhr.send();
        xhr.onload = () => {
            const obj = JSON.parse(xhr.response)
            this.parseFromConfig(obj);
            callback();
        }
    }



    parseFromConfig(config: any) {
        for (let item of config.monster) {
            const id = parseInt(item.id);
            const name = item.name;
            const hp = parseInt(item.hp);
            const damage = parseInt(item.damage);

            let monster = new Monster(id, name, hp, damage);

            this.monsList.push(monster);
        }
    }
}

