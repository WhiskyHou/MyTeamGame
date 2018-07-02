/**
 * Npc管理器
 */
class NpcManager extends EventDispatcher {
    npcList: Npc[] = []

    constructor() {
        super();
    }

    init() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'config/npc.json');
        xhr.send();
        xhr.onload = () => {
            const obj = JSON.parse(xhr.response)
            // console.log(xhr.response)
            this.parseFromConfig(obj);
        }
    }

    parseFromConfig(config: any) {
        for (let item of config.npc) {
            const id = parseInt(item.id);
            const name = item.name;
            const viewPath = item.view;
            const headPath = item.head;
            let viewImg = new Image();
            viewImg.src = viewPath;
            let headImg = new Image();
            headImg.src = headPath;

            const view = new Bitmap(0, 0, viewImg);
            const head = new Bitmap(0, 0, headImg);

            let npc = new Npc(id, name);
            npc.view = view;
            npc.head = head;

            this.npcList.push(npc);
        }
    }
}