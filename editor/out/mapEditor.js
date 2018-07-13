"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var file = fs.readFileSync("editor/config/map.json", 'utf-8');
var data = JSON.parse(file);
console.log(data);
var inputX = document.getElementById('inputX');
var inputY = document.getElementById('inputY');
var makeButton = document.getElementById('makeButton');
if (makeButton) {
    makeButton.onclick = function () {
        createButtonGroup(parseInt(inputX.value), parseInt(inputY.value));
    };
}
function createButtonGroup(x, y) {
    var div = document.getElementById('buttonGroup');
    div.innerHTML = "";
    for (var i = 0; i < y; i++) {
        var rowDiv = document.createElement('div');
        var _loop_1 = function (j) {
            var button = document.createElement('button');
            button.innerText = j + "," + i;
            button.id = j.toString();
            button.name = i.toString();
            button.onclick = function () {
                var x = j;
                var ;
            };
            rowDiv.appendChild(button);
        };
        for (var j = 0; j < x; j++) {
            _loop_1(j);
        }
        div.appendChild(rowDiv);
    }
}
var mapid = document.getElementById('mapId');
var mapName = document.getElementById('mapName');
var mapPath = document.getElementById('mapTilepath');
var mapItem = document.getElementById('mapItemPath');
var mapEquip = document.getElementById('mapEquip');
var mapWalkable = document.getElementById('mapWalkable');
var mapNpc = document.getElementById('mapNpc');
var mapMonster = document.getElementById('mapMonster');
var mapPortal = document.getElementById('mapPortal');
