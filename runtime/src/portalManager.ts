class PortalManager {

    portalList: Portal[] = []

    init(callback: Function) {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'config/portal.json');
        xhr.send();
        xhr.onload = () => {
            const obj = JSON.parse(xhr.response)
            this.parseFromConfig(obj);
            callback();
        }
    }

    parseFromConfig(obj: any) {
        for (let item of obj.portal) {
            const portal = new Portal(item.id, item.from, item.to, item.targetRow, item.targetCol);

            this.portalList.push()
        }
    }
}