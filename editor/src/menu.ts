import * as electron from 'electron'
import * as editor from './editor'
import { editorHistory } from './history'


export function run() {

    const templete: electron.MenuItemConstructorOptions[] = [
        {
            label: '文件',
            submenu: [
                {
                    label: '打开',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => { }
                },
                {
                    label: '保存',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        editor.save();
                    }
                }
            ]
        },
        {
            label: '编辑',
            submenu: [
                {
                    label: '撤销',
                    accelerator: 'CmdOrCtrl+Z',
                    click: () => {
                        editorHistory.revertOnce();
                    }
                },
                {
                    label: '恢复',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    click: () => {
                        editorHistory.redoOnce();
                    }
                }
            ]
        }
    ];

    var menu = electron.remote.Menu.buildFromTemplate(templete);
    electron.remote.Menu.setApplicationMenu(menu);
}

export function changeTitle(title: string) {
    const t = document.getElementById('title');
    if (t) {
        t.innerText = title;
    }
}