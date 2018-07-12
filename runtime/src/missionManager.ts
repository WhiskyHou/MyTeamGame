
/**
 * 任务管理器
 */
class MissionManager extends EventDispatcher {
    missions: Mission[] = []

    constructor() {
        super();
    }

    init() {
        player.addEventListener('userChange', (eventData: any) => {
            this.update();
        })

        const xhr = new XMLHttpRequest();
        xhr.open("get", "config/mission.json")
        xhr.send();
        xhr.onload = () => {
            const obj = JSON.parse(xhr.response)
            this.parseFromConfig(obj);
        }


        this.update();
    }

    update() {
        for (let mission of this.missions) {
            mission.update();
        }
        this.dispatchEvent('missionUpdate', {});
    }

    parseFromConfig(config: any) {
        for (let item of config.mission) {
            const going: string = item.going;
            const goingFunc = (eventData: any) => {
                if (mission.status == MissionStatus.DURRING
                    && eventData.name === item.goingFunc) {
                    mission.current++;
                }
            }
            let rewardNumber = this.parseRewardString(item.reward)
            const rewardFunc = () => {
                    player.coin += rewardNumber[0]
                    player.currentEXP += rewardNumber[1]
                    if(rewardNumber[2]>0){
                        player.packageEquipment.push(shpManager.getEquipment(rewardNumber[2]))
                    }   
            }                                                                                                             
            let mission = new Mission(going, goingFunc, rewardFunc);
            mission.id = item.id;
            mission.name = item.name;
            mission.needLevel = item.needLevel;
            mission.fromNpcId = item.fromNpcId;
            mission.toNpcId = item.toNpcId;
            mission.canAcceptContent = item.canAcceptConfig;
            mission.canSubmitContent = item.canSubmitConfig;
            mission.status = MissionStatus.UNACCEPT;
            mission.addCoin = rewardNumber[0]
            mission.addEXP = rewardNumber[1]
            mission.equipment = shpManager.getEquipment(rewardNumber[2])
            // console.log('任务名' + mission.name);
            this.missions.push(mission);
        }
    }

    accept(mission: Mission) {
        mission.isAccepted = true;
        this.update()
    }

    submit(mission: Mission) {
        mission.isSubmit = true;
        this.update();
    }
    parseRewardString(reward : string):Array<any>{
        let rewards = reward.split(",")
        let rewardNumber =[]
        for (let item of rewards) {
            rewardNumber.push(parseInt(item))
        }
        return rewardNumber
    }

}