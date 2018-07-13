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
console.log(file);
var data;
if (file) {
    data = JSON.parse(file);
}
console.log(data);
var inputX = document.getElementById('inputX');
var inputY = document.getElementById('inputY');
var makeButton = document.getElementById('makeButton');
var mapid = document.getElementById('mapId');
var mapName = document.getElementById('mapName');
var mapPath = document.getElementById('mapTilePath');
var mapItem = document.getElementById('mapItemPath');
var mapEquip = document.getElementById('mapEquip');
var mapWalkable = document.getElementById('mapWalkable');
var mapNpc = document.getElementById('mapNpc');
var mapMonster = document.getElementById('mapMonster');
var mapPortal = document.getElementById('mapPortal');
var submitButton = document.getElementById('submitButton');
var currentX = 0;
var currentY = 0;
if (makeButton) {
    makeButton.onclick = function () {
        createButtonGroup(parseInt(inputX.value), parseInt(inputY.value));
        if (!data) {
            data = {
                map: {
                    id: 0,
                    name: "null",
                    row: parseInt(inputX.value),
                    col: parseInt(inputY.value),
                    tile: [],
                    item: [],
                    equipment: [],
                    walkable: [],
                    npc: [],
                    monster: [],
                    portal: []
                }
            };
            for (var i = 0; i < parseInt(inputY.value); i++) {
                var arrayStr = [];
                var arrayNum = [];
                for (var j = 0; j < parseInt(inputX.value); j++) {
                    arrayStr.push("");
                    arrayNum.push(0);
                }
                data.map.tile.push(arrayStr);
                data.map.item.push(arrayStr);
                data.map.equipment.push(arrayNum);
                data.map.walkable.push(arrayNum);
                data.map.npc.push(arrayNum);
                data.map.monster.push(arrayNum);
                data.map.portal.push(arrayNum);
            }
        }
    };
}
if (submitButton) {
    submitButton.onclick = function () {
        if (data) {
            data.map.id = mapid.value;
            data.map.name = mapName.value;
            data.map.tile[currentY][currentX] = mapPath.value;
            data.map.item[currentY][currentX] = mapItem.value;
            data.map.equipment[currentY][currentX] = parseInt(mapEquip.value);
            data.map.walkable[currentY][currentX] = parseInt(mapWalkable.value);
            data.map.npc[currentY][currentX] = parseInt(mapNpc.value);
            data.map.monster[currentY][currentX] = parseInt(mapMonster.value);
            data.map.portal[currentY][currentX] = parseInt(mapPortal.value);
            saveToFile();
        }
    };
}
function createButtonGroup(x, y) {
    var div = document.getElementById('buttonGroup');
    div.innerHTML = "";
    var _loop_1 = function (i) {
        var rowDiv = document.createElement('div');
        var _loop_2 = function (j) {
            var button = document.createElement('button');
            button.innerText = j + "," + i;
            button.id = j.toString();
            button.name = i.toString();
            button.onclick = function () {
                currentX = j;
                currentY = i;
                mapPath.value = data.map.tile[i][j];
                mapItem.value = data.map.item[i][j];
                mapEquip.value = data.map.equipment[i][j];
                mapWalkable.value = data.map.walkable[i][j];
                mapNpc.value = data.map.npc[i][j];
                mapMonster.value = data.map.monster[i][j];
                mapPortal.value = data.map.portal[i][j];
            };
            rowDiv.appendChild(button);
        };
        for (var j = 0; j < x; j++) {
            _loop_2(j);
        }
        div.appendChild(rowDiv);
    };
    for (var i = 0; i < y; i++) {
        _loop_1(i);
    }
}
function saveToFile() {
    var content = JSON.stringify(data, null, '\t');
    fs.writeFileSync('editor/config/map.json', content);
}
