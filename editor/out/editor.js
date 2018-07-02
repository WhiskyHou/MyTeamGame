"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var menu = __importStar(require("./menu"));
var history_1 = require("./history");
var url_1 = require("url");
var propertyItem_1 = require("./propertyItem");
menu.run();
/**
 * 属性编辑命令
 */
var PropertyEditCommand = /** @class */ (function () {
    function PropertyEditCommand(object, from, to, key, inspector, input) {
        this.object = object;
        this.from = from;
        this.to = to;
        this.key = key;
        this.inspector = inspector;
        this.input = input;
    }
    PropertyEditCommand.prototype.execute = function () {
        this.object[this.key] = this.to;
        this.input.updateView(this.to);
        propertyEditor.saveState = false;
    };
    PropertyEditCommand.prototype.revert = function () {
        this.object[this.key] = this.from;
        this.input.updateView(this.from);
    };
    return PropertyEditCommand;
}());
/**
 * 元数据 具体数据
 */
var metadatas = [
    {
        filepath: path.resolve(__dirname, '../../runtime/config/mission.json'),
        prefix: 'mission',
        title: '任务编辑器',
        propertyMetadatas: [
            { key: 'id', description: '编号', type: 'primarykey', default: '0' },
            { key: 'name', description: '标题', type: 'input', default: 'new mission' },
            { key: 'needLevel', description: '限制等级', type: 'input', default: '1' },
            { key: 'fromNpcId', description: '接受方', type: 'dropdown', default: '1', options: { filepath: path.resolve(__dirname, '../../runtime/config/npc.json'), prefix: 'npc' } },
            { key: 'toNpcId', description: '提交方', type: 'dropdown', default: '1', options: { filepath: path.resolve(__dirname, '../../runtime/config/npc.json'), prefix: 'npc' } }
        ]
    },
    {
        filepath: path.resolve(__dirname, '../../runtime/config/npc.json'),
        prefix: 'npc',
        title: 'NPC编辑器',
        propertyMetadatas: [
            { key: 'id', description: '编号', type: 'primarykey', default: '0' },
            { key: 'name', description: '名字', type: 'input', default: 'null' },
            { key: 'view', description: '图片', type: 'image', default: '' },
            { key: 'head', description: '头像', type: 'image', default: '' }
        ]
    },
    {
        filepath: path.resolve(__dirname, '../../runtime/config/map.json'),
        prefix: 'map',
        title: '地图编辑器',
        propertyMetadatas: [
            { key: 'id', description: '编号', type: 'primarykey', default: '0' },
            { key: 'name', description: '名字', type: 'input', default: 'null' },
            { key: 'row', description: '行', type: 'primarykey', default: '0' },
            { key: 'col', description: '列', type: 'primarykey', default: '0' },
            { key: 'tile', description: '地面', type: 'mapTile', default: '' }
        ]
    }
];
/**
 * 属性编辑器
 */
var PropertyEditor = /** @class */ (function () {
    function PropertyEditor(dataMetadata) {
        this.data = [];
        this.propertyItemArray = [];
        this.dataMetadata = dataMetadata;
        var file = fs.readFileSync(dataMetadata.filepath, 'utf-8');
        this.jsonData = JSON.parse(file);
        this.data = this.jsonData[dataMetadata.prefix];
        this.view = document.createElement('div');
        this.propertyEditorChoice = document.createElement('select');
        this.propertyEditorBody = document.createElement('div');
        this.appendButton = document.createElement('button');
        this.appendButton.innerText = '添加';
        this.removeButton = document.createElement('button');
        this.removeButton.innerText = '删除';
        this.view.appendChild(this.propertyEditorChoice);
        this.view.appendChild(this.appendButton);
        this.view.appendChild(this.removeButton);
        this.view.appendChild(this.propertyEditorBody);
        this.init();
    }
    PropertyEditor.prototype.init = function () {
        var _this = this;
        // 初始化当前编辑对象
        if (this.data.length > 0) {
            this.currentEditObject = this.data[0];
        }
        else {
            this.currentEditObject = null;
        }
        // 初始化选择器
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var object = _a[_i];
            var option = document.createElement('option');
            option.value = object.id;
            option.innerText = object.name;
            this.propertyEditorChoice.appendChild(option);
        }
        // 选择器改变后更新所有属性单项的数据
        this.propertyEditorChoice.onchange = function () {
            var id = _this.propertyEditorChoice.value;
            _this.updateCurrentEditObject(id);
            for (var _i = 0, _a = _this.propertyItemArray; _i < _a.length; _i++) {
                var propertyItem = _a[_i];
                propertyItem.update(_this.currentEditObject);
            }
        };
        var _loop_1 = function (propertyMetadata) {
            // const propertyItem = new PropertyItem(propertyMetadata, this.currentEditObject);
            var propertyItem = propertyItem_1.createPropertyItem(propertyMetadata, this_1.currentEditObject);
            propertyItem.setOnSubmitFunction(function (from, to) {
                var command = new PropertyEditCommand(_this.currentEditObject, from, to, propertyMetadata.key, propertyEditor, propertyItem);
                history_1.editorHistory.add(command);
            });
            this_1.propertyItemArray.push(propertyItem);
            this_1.propertyEditorBody.appendChild(propertyItem.getView());
            // 啥玩意儿？？？获得焦点不知道写啥，离开焦点更新数据也能在item里面做了，我这还监听个毛线……
            //
            // propertyItem.addEventListener('onfocus', () => {
            // });
            // propertyItem.addEventListener('onblur', () => {
            //     // const temp = propertyItem.getValue();
            //     // this.currentEditObject[propertyItem.key] = temp;
            // });
        };
        var this_1 = this;
        // 初始化各个属性编辑单项
        for (var _b = 0, _c = this.dataMetadata.propertyMetadatas; _b < _c.length; _b++) {
            var propertyMetadata = _c[_b];
            _loop_1(propertyMetadata);
        }
        // 添加按钮事件
        this.appendButton.onclick = function () {
            var newObject = {};
            for (var _i = 0, _a = _this.dataMetadata.propertyMetadatas; _i < _a.length; _i++) {
                var metadata = _a[_i];
                if (metadata.type == "primarykey") {
                    newObject[metadata.key] = parseInt(_this.data[_this.data.length - 1][metadata.key]) + 1;
                }
                else {
                    newObject[metadata.key] = metadata.default;
                }
            }
            _this.data.push(newObject);
            _this.updata();
            // this.saveAndReload();
        };
        this.removeButton.onclick = function () {
            var index = _this.data.indexOf(_this.currentEditObject);
            if (index >= 0) {
                _this.data.splice(index, 1);
                _this.updata();
            }
            // this.saveAndReload();
        };
    };
    /**
     * 添加 或 删除一个对象的时候调用
     *
     * 重新加载编辑器
     */
    PropertyEditor.prototype.updata = function () {
        // 重新加载选择栏
        this.propertyEditorChoice.innerText = '';
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var object = _a[_i];
            var option = document.createElement('option');
            option.value = object.id;
            option.innerText = object.name;
            this.propertyEditorChoice.appendChild(option);
        }
        // 将各个属性编辑单项回到第一个对象
        if (this.data.length > 0) {
            this.currentEditObject = this.data[0];
        }
        else {
            this.currentEditObject = null;
        }
        for (var _b = 0, _c = this.propertyItemArray; _b < _c.length; _b++) {
            var propertyItem = _c[_b];
            propertyItem.update(this.currentEditObject);
        }
    };
    /**
     * 通过 id 来更新当前编辑的对象
     */
    PropertyEditor.prototype.updateCurrentEditObject = function (id) {
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var object = _a[_i];
            if (object.id == id) {
                this.currentEditObject = object;
            }
        }
    };
    /**
     * 保存到文件 刷新runtime窗口
     */
    PropertyEditor.prototype.saveAndReload = function () {
        var content = JSON.stringify(this.jsonData, null, '\t');
        fs.writeFileSync(this.dataMetadata.filepath, content);
        var runtime = document.getElementById("runtime");
        if (runtime) {
            runtime.reload();
        }
        this.saveState = true;
    };
    Object.defineProperty(PropertyEditor.prototype, "saveState", {
        /**
         * 是否保存的状态
         */
        set: function (save) {
            this.hasSaved = save;
            if (this.hasSaved) {
                menu.changeTitle('Engine');
            }
            else {
                menu.changeTitle('尚未保存 *');
            }
        },
        enumerable: true,
        configurable: true
    });
    return PropertyEditor;
}());
/**
 * 属性编辑项
 */
/*
class PropertyItem {

    view: HTMLElement;

    key: string;

    private name: HTMLSpanElement;

    private content: HTMLInputElement | HTMLSelectElement;

    private metadata: PropertyMetadata;

    private from: any;

    private to: any;



    constructor(metadata: PropertyMetadata, currentEditObject: any) {

        this.metadata = metadata;
        this.key = metadata.key;

        this.view = document.createElement('div');
        this.name = document.createElement('span');
        if (metadata.type == 'input') {
            this.content = document.createElement('input');
        } else if (metadata.type == 'dropdown') {
            this.content = document.createElement('select');
            const optionMetadata = metadata.options;
            if (optionMetadata) {
                const file = fs.readFileSync(optionMetadata.filepath, 'utf-8');
                const jsonData = JSON.parse(file);
                const items = jsonData[optionMetadata.prefix];
                for (let item of items) {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.innerText = item.name;
                    this.content.appendChild(option);
                }
            }
        } else if (metadata.type == 'primarykey') {
            this.content = document.createElement('input');
            this.content.disabled = true;
        }

        this.content.onfocus = () => {
            // this.dispatchEvent('onfocus', null);
            this.from = this.content.value;
        }
        this.content.onblur = () => {
            // this.dispatchEvent('onblur', null);
            if (this.content.value != this.from) {
                this.to = this.content.value;
                const command = new PropertyEditCommand(currentEditObject, this.from, this.to, this.key, propertyEditor, this.content);
                editorHistory.add(command);
            }
        }

        this.name.innerText = metadata.description;

        this.view.appendChild(this.name);
        this.view.appendChild(this.content);

        this.update(currentEditObject);
    }

    update(currentEditObject: any) {
        this.content.value = currentEditObject[this.key];
    }

    getValue() {
        return this.content.value;
    }

    setValue(value: any) {
        this.content.value = value;
    }
}
*/
/**
 * 切换编辑器
 */
function changeEditor(metadata) {
    var propertyEditorTitle = document.getElementById('propertyEditorTitle');
    var propertyEditorContainer = document.getElementById('propertyEditorContainer');
    if (propertyEditorTitle && propertyEditorContainer) {
        propertyEditorTitle.innerText = metadata.title;
        propertyEditorContainer.innerText = '';
        propertyEditor = new PropertyEditor(metadata);
        propertyEditorContainer.appendChild(propertyEditor.view);
    }
}
/**
 * 保存到文件
 */
function save() {
    if (propertyEditor) {
        propertyEditor.saveAndReload();
    }
}
exports.save = save;
// 初始化webView
var webView = document.getElementById('runtime');
if (webView) {
    // search 属性是一个可读可写的字符串，可设置或返回当前 URL 的查询部分（问号 ? 之后的部分
    var search = location.search;
    // 解析获得 gameUrl 的值，就是该项目的地址
    var param = new url_1.URLSearchParams(search);
    var gameUrl = decodeURIComponent(param.get('gameUrl'));
    // 设置预览窗口的 url
    webView.setAttribute('src', gameUrl + "/index.html");
}
// 初始化inspector
var buttonGroup = document.getElementById('buttonGroup');
if (buttonGroup) {
    var _loop_2 = function (metadata) {
        var button_1 = document.createElement('button');
        button_1.innerText = metadata.title;
        buttonGroup.appendChild(button_1);
        button_1.onclick = function () {
            changeEditor(metadata);
        };
    };
    for (var _i = 0, metadatas_1 = metadatas; _i < metadatas_1.length; _i++) {
        var metadata = metadatas_1[_i];
        _loop_2(metadata);
    }
}
var propertyEditor;
setTimeout(function () {
    var runtimeDiv = document.getElementById("runtime");
    runtimeDiv.openDevTools();
}, 500);
// 撤销恢复功能测试
var count = 0;
var button = document.getElementById('go');
if (button) {
    button.onclick = function () {
        var command = new history_1.TestCommand(count, ++count);
        history_1.editorHistory.add(command);
    };
}
