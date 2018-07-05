/**
 * 怪物管理器
 */
class monsterManager {
    monsterList: Monster[] = []

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
            const attack = parseInt(item.attack);

            let monster = new Monster(id, name, hp, attack);

            const viewPath = item.view;
            let viewImg = new Image();
            viewImg.src = viewPath;
            const view = new Bitmap(0, 0, viewImg);
            monster.view = view;

            this.monsterList.push(monster);

        }
    }
}
