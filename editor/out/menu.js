"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var electron = __importStar(require("electron"));
var editor = __importStar(require("./editor"));
var history_1 = require("./history");
function run() {
    var templete = [
        {
            label: '文件',
            submenu: [
                {
                    label: '打开',
                    accelerator: 'CmdOrCtrl+O',
                    click: function () { }
                },
                {
                    label: '保存',
                    accelerator: 'CmdOrCtrl+S',
                    click: function () {
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
                    click: function () {
                        history_1.editorHistory.revertOnce();
                    }
                },
                {
                    label: '恢复',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    click: function () {
                        history_1.editorHistory.redoOnce();
                    }
                }
            ]
        }
    ];
    var menu = electron.remote.Menu.buildFromTemplate(templete);
    electron.remote.Menu.setApplicationMenu(menu);
}
exports.run = run;
function changeTitle(title) {
    var t = document.getElementById('title');
    if (t) {
        t.innerText = title;
    }
}
exports.changeTitle = changeTitle;
