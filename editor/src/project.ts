class Project {

    get projectRoot() {
        const search = location.search;
        const param = new URLSearchParams(search)
        const root = decodeURIComponent(param.get("gameUrl") as string);
        return root
    }
}


export const project = new Project();
