/**
 * 用户信息UI
 */
class UserInfoUI extends DisplayObjectContainer {
    userName: TextField;
    userLevel: TextField;
    userAttack: TextField;
    userEquipment: TextField;

    constructor(x: number, y: number) {
        super(x, y);

        this.userName = new TextField(player.name, 10, 0, 20);
        this.userLevel = new TextField('Lv:' + player.level, 120, 0, 20);
        this.userAttack = new TextField('Attck:' + player.attack, 240, 0, 20);
        this.userEquipment = new TextField('装备: ', 400, 0, 20);

        this.addChild(this.userName);
        this.addChild(this.userLevel);
        this.addChild(this.userAttack);
        this.addChild(this.userEquipment);

        player.addEventListener('updateUserInfo', (eventData: any) => {
            this.userLevel.text = 'Lv:' + player.level;
            this.userAttack.text = 'Attck:' + player.attack;
            let equipments: string = '';
            for (let item of player.mounthedEquipment) {
                equipments += item.name.toString();
            }
            this.userEquipment.text = '装备: ' + equipments;
        });
        // console.log(player);
    }
}


/**
 * 任务栏UI
 */
class MissionInfoUI extends DisplayObjectContainer {

    constructor(x: number, y: number) {
        super(x, y);

        this.update();
        missionManager.addEventListener('missionUpdate', (eventDate: any) => {
            this.update();
        })
    }

    update() {
        this.deleteAll();
        let index = 0;
        for (let mission of missionManager.missions) {
            if (mission.status == MissionStatus.DURRING) {
                const missionLabel = new TextField("", 0, 0, 24);
                this.addChild(missionLabel);
                missionLabel.text = mission.name;
                missionLabel.y = index * 24;
                index++;
            } else if (mission.status == MissionStatus.CAN_SUBMIT) {
                const missionLabel = new TextField("", 0, 0, 24);
                this.addChild(missionLabel);
                missionLabel.text = "请提交任务！";
                missionLabel.y = index * 24;
                index++;
            }
        }
    }
}



/**
 * 对话窗口UI
 */
// class TalkWindow extends DisplayObjectContainer {
//     view: Bitmap;
//     text: TextField;

//     count: number = 1;

//     _config = [
//         "欢迎来到新日暮里",
//         "你的等级还很低",
//         "攻击力也相当低",
//         "所以我不能给你任何击杀任务",
//         "你先找到屠龙刀再回来找我"
//     ]

//     constructor(x: number, y: number) {
//         super(x, y);

//         this.init();

//         missionManager.addEventListener("onkeydown_32", (eventData: any) => {
//             if (this.count <= this._config.length - 1) {
//                 this.text.text = this._config[this.count];
//                 this.count++;
//             } else {
//                 map.deleteChild(this);
//             }
//         })
//     }

//     init() {
//         this.view = new Bitmap(0, 0, talk_window);
//         this.text = new TextField('', 300, 200, 40);

//         this.addChild(this.view);
//         this.addChild(this.text);
//     }

//     set config(config: string[]) {
//         this._config = config;
//         this.text.text = this._config[0];
//     }
//     get config() {
//         return this._config;
//     }
// }