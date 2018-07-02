const { app, BrowserWindow, dialog, Menu, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')


function getConfigPath() {
    const dir = path.join(app.getPath("appData"), "TSengine");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const configFilepath = path.join(dir, 'app.json');
    if (!fs.existsSync(configFilepath)) {
        fs.writeFileSync(configFilepath, '{}', 'utf-8');
    }
    return configFilepath;
}



function initEditor(gameUrl) {
    // const data = { gameUrl: gameUrl };
    // fs.writeFileSync(configFilepath, JSON.stringify(data, null, '\t', 'utf-8'));

    window = new BrowserWindow({ width: 1920, height: 1000 });
    const editorUrl = 'file://' + __dirname + '/editor/index.html?gameUrl=' + encodeURIComponent(gameUrl);
    window.loadURL(editorUrl);
    window.openDevTools();
}


function initLauncher() {
    Menu.setApplicationMenu(null)

    window = new BrowserWindow({ width: 800, height: 500 });
    window.loadURL('file://' + __dirname + '/launcher/index.html');

    ipcMain.on('open', function (event, arg) {
        console.log(arg);
        initEditor(arg);
    })
}


// const configFilepath = getConfigPath();

app.on('ready', initLauncher)