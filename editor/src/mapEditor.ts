import * as fs from 'fs'
import * as path from 'path'
import * as electron from 'electron'
import * as menu from './menu'
import { editorHistory, TestCommand, Command } from './history'
import { URLSearchParams } from 'url'
import { PropertyItem, createPropertyItem } from './propertyItem'
import { encode } from 'punycode';


let file = fs.readFileSync("editor/config/map.json", 'utf-8')
console.log(file)
let data: any
if (file) {
    data = JSON.parse(file)
}
console.log(data)



const inputX = document.getElementById('inputX') as HTMLInputElement;
const inputY = document.getElementById('inputY') as HTMLInputElement;
const makeButton = document.getElementById('makeButton') as HTMLButtonElement;

const mapid = document.getElementById('mapId') as HTMLInputElement
const mapName = document.getElementById('mapName') as HTMLInputElement
const mapPath = document.getElementById('mapTilePath') as HTMLInputElement
const mapItem = document.getElementById('mapItemPath') as HTMLInputElement
const mapEquip = document.getElementById('mapEquip') as HTMLInputElement
const mapWalkable = document.getElementById('mapWalkable') as HTMLInputElement
const mapNpc = document.getElementById('mapNpc') as HTMLInputElement
const mapMonster = document.getElementById('mapMonster') as HTMLInputElement
const mapPortal = document.getElementById('mapPortal') as HTMLInputElement

const submitButton = document.getElementById('submitButton') as HTMLButtonElement

let currentX = 0
let currentY = 0



if (makeButton) {
    makeButton.onclick = () => {
        createButtonGroup(parseInt(inputX.value), parseInt(inputY.value))
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
            }
            for (let i = 0; i < parseInt(inputY.value); i++) {
                const arrayStr: string[] = []
                const arrayNum: number[] = []
                for (let j = 0; j < parseInt(inputX.value); j++) {
                    arrayStr.push("")
                    arrayNum.push(0)
                }
                data.map.tile.push(arrayStr);
                data.map.item.push(arrayStr);
                data.map.equipment.push(arrayNum)
                data.map.walkable.push(arrayNum)
                data.map.npc.push(arrayNum)
                data.map.monster.push(arrayNum)
                data.map.portal.push(arrayNum)
            }
        }
    }
}
if (submitButton) {
    submitButton.onclick = () => {
        if (data) {
            data.map.id = mapid.value;
            data.map.name = mapName.value;
            data.map.tile[currentY][currentX] = mapPath.value
            data.map.item[currentY][currentX] = mapItem.value
            data.map.equipment[currentY][currentX] = parseInt(mapEquip.value)
            data.map.walkable[currentY][currentX] = parseInt(mapWalkable.value)
            data.map.npc[currentY][currentX] = parseInt(mapNpc.value)
            data.map.monster[currentY][currentX] = parseInt(mapMonster.value)
            data.map.portal[currentY][currentX] = parseInt(mapPortal.value)

            saveToFile()
        }
    }
}



function createButtonGroup(x: number, y: number) {
    const div = document.getElementById('buttonGroup') as HTMLDivElement
    div.innerHTML = ""

    for (let i = 0; i < y; i++) {
        const rowDiv = document.createElement('div');
        for (let j = 0; j < x; j++) {
            const button = document.createElement('button')
            button.innerText = j + "," + i
            button.id = j.toString()
            button.name = i.toString()
            button.onclick = () => {
                currentX = j
                currentY = i

                mapPath!.value = data.map.tile[i][j];
                mapItem!.value = data.map.item[i][j];
                mapEquip!.value = data.map.equipment[i][j];
                mapWalkable!.value = data.map.walkable[i][j];
                mapNpc!.value = data.map.npc[i][j];
                mapMonster!.value = data.map.monster[i][j];
                mapPortal!.value = data.map.portal[i][j];
            }
            rowDiv.appendChild(button);
        }
        div.appendChild(rowDiv)
    }
}

function saveToFile() {
    const content = JSON.stringify(data, null, '\t');
    fs.writeFileSync('editor/config/map.json', content);
}
