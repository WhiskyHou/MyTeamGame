/**
 * 对话窗口
 */
class TalkWindow extends DisplayObjectContainer {
    view: Bitmap;

    head: Bitmap;

    name: TextField;

    text: TextField;

    npc: Npc;

    mission: Mission;

    count: number = 0;

    constructor(x: number, y: number) {
        super(x, y);

        this.view = new Bitmap(0, 0, talk_window);
        this.text = new TextField("", 100, 200, 24);

        this.addChild(this.view);
        this.addChild(this.text);

        this.addEventListener("onClick", (eventData: any) => {
            this.count++;
            this.update();
        });
    }

    update() {
        let contents: string[] = [];
        if (this.mission.status == MissionStatus.CAN_ACCEPT) {
            contents = this.mission.canAcceptContent;
        }
        else if (this.mission.status == MissionStatus.CAN_SUBMIT) {
            contents = this.mission.canSubmitContent;
        }


        if (this.count >= contents.length) {
            this.dispatchEvent("talkWiondowClose", null);
        } else {
            this.text.text = contents[this.count];
        }
    }

    initNpcInfo() {
        this.head = this.npc.head;
        this.head.x = 60;
        this.head.y = 60;
        this.name = new TextField(this.npc.name, 180, 100, 20);
        this.addChild(this.head);
        this.addChild(this.name);
    }

    setNpc(npc: Npc) {
        this.npc = npc;
        this.initNpcInfo();
    }

    setMission(mission: Mission) {
        this.mission = mission;
        this.update();
    }
}