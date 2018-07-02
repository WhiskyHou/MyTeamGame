import * as menu from './menu'
import * as fs from 'fs'
const electron = require('electron')
const path = require('path')




/**
 * 获取历史记录
 * 
 * 返回app.json地址
 */
function getConfigPath() {
    const dir = path.join(electron.remote.app.getPath("appData"), "TSengine");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const configFilepath = path.join(dir, 'app.json');
    if (!fs.existsSync(configFilepath)) {
        fs.writeFileSync(configFilepath, '{}', 'utf-8');
    }
    return configFilepath;
}


/**
 * 从app.json解析出历史项目文件夹地址
 */
function parseConfig() {
    const content = fs.readFileSync(configFilepath, 'utf-8');
    const config = JSON.parse(content);
    const gameUrl = config.gameUrl;

    return gameUrl;
}

/**
 * 打开文件夹选择窗口
 */
function openSelectWindow(callback: any) {
    electron.remote.dialog.showOpenDialog({
        title: "选项项目文件夹",
        properties: ["openDirectory"]
    }, (dirs) => {
        if (dirs) {
            callback(dirs[0])
        }
    });
}


/**
 * 选择文件夹的回调函数，用来检测选择的文件夹是否是项目文件
 */
function onSelectProject(gameURL: string) {
    if (fs.existsSync(gameURL + "/engineproj.json")) {
        const data = { gameUrl: gameURL };
        fs.writeFileSync(configFilepath, JSON.stringify(data, null, '\t'));
        // openEditorWindow(gameURL);
        ipcRenderer.send('open', gameURL);
    }
    else {
        electron.remote.dialog.showMessageBox({ message: "此目录非项目文件" })
        // openSelectWindow(onSelectProject)
    }
}



// 进程通信
const ipcRenderer = electron.ipcRenderer;
// 记录文件
const configFilepath = getConfigPath();
// 历史项目地址
const historyUrl = parseConfig();


// 构建历史项目选择
if (historyUrl) {
    const historyDiv = document.getElementById('historyTab');
    if (historyDiv) {
        const item = document.createElement('button');
        item.innerText = historyUrl;
        item.onclick = () => {
            ipcRenderer.send('open', historyUrl);
        }
        historyDiv.appendChild(item);
    }
}

// 构建打开现有项目
const openButton = document.getElementById('openTabButton');
if (openButton) {
    openButton.onclick = () => {
        openSelectWindow(onSelectProject);
    }
}

// 构建新建项目
// TODO：新建项目初始化文件结构
const createButton = document.getElementById('createProj');
const projName = document.getElementById('projName') as HTMLInputElement;
const projPath = document.getElementById('projPath') as HTMLInputElement;
if (createButton && projName && projPath) {
    createButton.onclick = () => {
        const name = projName.value;
        const path = projPath.value;
        if (name && path) {
            const url = path + '/' + name;
            if (!fs.existsSync(url)) {
                fs.mkdirSync(url);
            }

            const projFileUrl = url + '/engineproj.json';
            fs.writeFileSync(projFileUrl, '{}', 'utf-8');

            const indexHtmlUrl = url + '/index.html';
            fs.writeFileSync(indexHtmlUrl, '<p>This is a new project</p>');

            const data = { gameUrl: url };
            fs.writeFileSync(configFilepath, JSON.stringify(data, null, '\t'));

            ipcRenderer.send('open', url);
        }
    }
}
