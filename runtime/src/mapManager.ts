class MapManager extends EventDispatcher {

    maps: GameMap[] = []

    constructor() {
        super()
    }

    init() {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "config/map.json")
        xhr.send();
        xhr.onload = () => {
            const obj = JSON.parse(xhr.response)
            // console.log(xhr.response)
            this.parseFromConfig(obj);
        }
    }

    parseFromConfig(obj: any) {
        for (let item of obj.map) {
            const map = new GameMap(item)
            this.maps.push(map)
        }
    }

    getMap(index: number) {
        if (index < this.maps.length) {
            return this.maps[index]
        }
        return null
    }
}