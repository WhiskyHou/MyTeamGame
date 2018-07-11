class MapManager extends EventDispatcher {

    maps: GameMap[] = []

    constructor() {
        super()
    }

    init() {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "config/mission.json")
        xhr.send();
        xhr.onload = () => {
            const obj = JSON.parse(xhr.response)
            // console.log(xhr.response)
            this.parseFromConfig(obj);
        }
    }

    parseFromConfig(obj: any) {

    }
}