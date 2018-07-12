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
            const exp = parseInt(item.exp);
            const coin = parseInt(item.coin);
            const level = parseInt(item.level);
            const dropType = parseInt(item.dropType);

            let monster = new Monster(id, name, hp, attack, exp, coin, level, dropType);

            const viewPath = item.view;
            let viewImg = new Image();
            viewImg.src = viewPath;
            const view = new Bitmap(0, 0, viewImg);
            monster.view = view;
            if (item.uselessTalks) {
                monster.head.img = viewImg;
                monster.uselessTalks = item.uselessTalks;
            }
            if (item.changeTypeID) {
                monster.changeTypeID = item.changeTypeID;
            }

            this.monsterList.push(monster);

        }
    }
}

