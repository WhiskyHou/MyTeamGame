"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var electron = __importStar(require("electron"));
var path = __importStar(require("path"));
var project_1 = require("./project");
function createPropertyItem(metadata, currentObject) {
    var propertyItem;
    var propertyType = metadata.type;
    if (propertyType == 'input') {
        propertyItem = new TextPropertyItem(metadata, currentObject);
    }
    else if (propertyType == 'dropdown') {
        propertyItem = new DropdownPropertyItem(metadata, currentObject);
    }
    else if (propertyType == 'primarykey') {
        propertyItem = new PrimarykeyPropertyItem(metadata, currentObject);
    }
    else if (propertyType == 'image') {
        propertyItem = new ImageSelectPropertyItem(metadata, currentObject);
    }
    else if (propertyType == 'mapTile') {
        propertyItem = new GameMapTilePropertyItem(metadata, currentObject);
    }
    else {
        throw 'failed';
    }
    return propertyItem;
}
exports.createPropertyItem = createPropertyItem;
var PropertyItem = /** @class */ (function () {
    function PropertyItem(metadata, currentObject) {
        this.metadata = metadata;
        this.currentObject = currentObject;
        this.title = document.createElement('span');
        this.title.innerText = metadata.description;
        this.view = this.createView();
    }
    PropertyItem.prototype.setOnSubmitFunction = function (onSubmit) {
        this.onSubmit = onSubmit;
    };
    PropertyItem.prototype.submit = function (to) {
        if (to != this.from) {
            this.onSubmit(this.from, to);
            this.from = to;
        }
    };
    PropertyItem.prototype.getView = function () {
        var container = document.createElement('div');
        container.appendChild(this.title);
        container.appendChild(this.view);
        this.initValue();
        return container;
    };
    PropertyItem.prototype.initValue = function () {
        var propertyKey = this.metadata.key;
        var value = this.currentObject[propertyKey];
        this.updateView(value);
        this.from = value;
    };
    PropertyItem.prototype.update = function (currentObject) {
        this.currentObject = currentObject;
        this.initValue();
    };
    return PropertyItem;
}());
exports.PropertyItem = PropertyItem;
var TextPropertyItem = /** @class */ (function (_super) {
    __extends(TextPropertyItem, _super);
    function TextPropertyItem(metadata, currentObject) {
        return _super.call(this, metadata, currentObject) || this;
    }
    TextPropertyItem.prototype.createView = function () {
        var _this = this;
        var view = document.createElement('input');
        view.onblur = function () {
            var to = view.value;
            _this.submit(to);
        };
        return view;
    };
    TextPropertyItem.prototype.updateView = function (value) {
        this.view.value = value;
    };
    return TextPropertyItem;
}(PropertyItem));
var DropdownPropertyItem = /** @class */ (function (_super) {
    __extends(DropdownPropertyItem, _super);
    function DropdownPropertyItem(metadata, currentObject) {
        return _super.call(this, metadata, currentObject) || this;
    }
    DropdownPropertyItem.prototype.createView = function () {
        var _this = this;
        var view = document.createElement('select');
        var optionMetadata = this.metadata.options;
        if (optionMetadata) {
            var file = fs.readFileSync(optionMetadata.filepath, 'utf-8');
            var jsonData = JSON.parse(file);
            var items = jsonData[optionMetadata.prefix];
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                var option = document.createElement('option');
                option.value = item.id;
                option.innerText = item.name;
                view.appendChild(option);
            }
        }
        view.onchange = function () {
            var to = view.value;
            _this.submit(to);
        };
        return view;
    };
    DropdownPropertyItem.prototype.updateView = function (value) {
        this.view.value = value;
    };
    return DropdownPropertyItem;
}(PropertyItem));
var PrimarykeyPropertyItem = /** @class */ (function (_super) {
    __extends(PrimarykeyPropertyItem, _super);
    function PrimarykeyPropertyItem(metadata, currentObject) {
        return _super.call(this, metadata, currentObject) || this;
    }
    PrimarykeyPropertyItem.prototype.createView = function () {
        var view = document.createElement('input');
        view.disabled = true;
        return view;
    };
    PrimarykeyPropertyItem.prototype.updateView = function (value) {
        this.view.value = value;
    };
    return PrimarykeyPropertyItem;
}(PropertyItem));
var ImageSelectPropertyItem = /** @class */ (function (_super) {
    __extends(ImageSelectPropertyItem, _super);
    function ImageSelectPropertyItem(metadata, currentObject) {
        return _super.call(this, metadata, currentObject) || this;
    }
    ImageSelectPropertyItem.prototype.createView = function () {
        var _this = this;
        var view = document.createElement('div');
        this.button = document.createElement('button');
        this.image = document.createElement('img');
        view.appendChild(this.button);
        view.appendChild(this.image);
        this.button.innerText = '选择图片';
        this.image.src = '';
        this.image.height = this.image.width = 48;
        var defaultPath = project_1.project.projectRoot;
        this.button.onclick = function () {
            electron.remote.dialog.showOpenDialog({
                title: "选择图片",
                defaultPath: defaultPath,
                filters: [
                    { name: 'Images', extensions: ['jpg', 'png', "jpeg"] }
                ]
            }, function (dirs) {
                if (dirs) {
                    var filename = dirs[0];
                    // "a\b\c\d"  (split '\\' )=>  ["a","b","c","d"] (join '/' )=> "a/b/c/d"
                    var relativePath = path.relative(defaultPath, filename).split("\\").join("/");
                    _this.submit(relativePath);
                    _this.updateView(relativePath);
                }
            });
        };
        return view;
    };
    ImageSelectPropertyItem.prototype.updateView = function (value) {
        if (value) {
            var root = project_1.project.projectRoot;
            var src = path.join(root, value);
            this.image.src = src;
        }
        else {
            this.image.src = '';
        }
    };
    return ImageSelectPropertyItem;
}(PropertyItem));
var GameMapTilePropertyItem = /** @class */ (function (_super) {
    __extends(GameMapTilePropertyItem, _super);
    function GameMapTilePropertyItem(metadata, currentObject) {
        return _super.call(this, metadata, currentObject) || this;
    }
    GameMapTilePropertyItem.prototype.createView = function () {
        var view = document.createElement('div');
        this.tile = this.currentObject.tile;
        this.button = {};
        for (var i = 0; i < this.tile.length; i++) {
            var row = this.tile[i];
            var rowDiv = document.createElement('div');
            for (var j = 0; j < row.length; j++) {
                var item = row[j];
                var button = document.createElement('button');
                button.innerText = (i + 1).toString() + ',' + (j + 1).toString();
                rowDiv.appendChild(button);
                var key = i + '_' + j;
                this.button[key] = button;
            }
            view.appendChild(rowDiv);
        }
        return view;
    };
    GameMapTilePropertyItem.prototype.updateView = function (value) {
    };
    return GameMapTilePropertyItem;
}(PropertyItem));
