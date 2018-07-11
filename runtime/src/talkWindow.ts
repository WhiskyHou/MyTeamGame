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

    playerView: Bitmap;
    playerNameText: TextField;

    count: number = 0;

    constructor(x: number, y: number) {


        super(x, y);

        this.view = new Bitmap(0, 0, talk_window);
        this.text = new TextField("", 190, 100, 24);

        // this.playerView.img = player.view.img;
        // this.playerView.x = 50;
        // this.playerView.y = 50;
        // this.playerNameText = new TextField(player.name, 200, 200, 24);


        this.addChild(this.view);
        this.addChild(this.text);
        // this.addChild(this.playerView);
        // this.addChild(this.playerNameText);

        this.addEventListener("onClick", (eventData: any) => {
            switch (this.count % 2) {
                case 0:
                    this.text.y = 220;
                    break;
                case 1:
                    this.text.y = 100;
                    break;
            }
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
        this.head.x = 400;
        this.head.y = 60;
        this.name = new TextField(this.npc.name, 445, 35, 20);

        this.playerView = player.head;
        this.playerView.x = 50;
        this.playerView.y = 170;
        this.playerNameText = new TextField(player.name, 90, 140, 24);

        this.addChild(this.head);
        this.addChild(this.name);
        this.addChild(this.playerView);
        this.addChild(this.playerNameText);
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