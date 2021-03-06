/**
 * 对话窗口
 */
class TalkWindow extends DisplayObjectContainer {
    view: Bitmap;
    blackMask: Bitmap;
    head: Bitmap;

    name: TextField;

    text: MultiTextField;

    npc: Npc;

    mission: Mission;

    playerView: Bitmap;
    playerNameText: TextField;

    count: number = 0;

    constructor(x: number, y: number) {


        super(x, y);

        this.view = new Bitmap(0, 0, talk_window);
        this.text = new MultiTextField([], 190, 100, 24, 5);
        this.blackMask = new Bitmap(-100, -150, battlePanelBlackMask);

        this.addChild(this.blackMask);
        this.addChild(this.view);
        this.addChild(this.text);
        // this.addChild(this.playerView);
        // this.addChild(this.playerNameText);

        this.addEventListener("onClick", (eventData: any) => {
            clickaudio.play();
            switch (this.count % 2) {
                case 0:
                    this.text.x = 160;
                    this.text.y = 220;
                    break;
                case 1:
                    this.text.x = 195;
                    this.text.y = 100;
                    break;
            }
            this.count++;
            this.update();
        });
    }

    update() {
        let contents: string[] = [];
        if (this.mission.status == MissionStatus.CAN_SUBMIT) {
            contents = this.mission.canSubmitContent;
        } else if (this.mission.status == MissionStatus.CAN_ACCEPT) {
            contents = this.mission.canAcceptContent;
        }

        if (this.count >= contents.length) {
            this.dispatchEvent("talkWiondowClose", null);
        } else {
            this.text.setStringByNumber(contents[this.count], 8);
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
        this.playerNameText = new TextField(player.name, 90, 140, 20);

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