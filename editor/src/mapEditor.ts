import * as fs from 'fs'
import * as path from 'path'
import * as electron from 'electron'
import * as menu from './menu'
import { editorHistory, TestCommand, Command } from './history'
import { URLSearchParams } from 'url'
import { PropertyItem, createPropertyItem } from './propertyItem'
import { encode } from 'punycode';


let file = fs.readFileSync("editor/config/map.json", 'utf-8')
let data = JSON.parse(file)
console.log(data)

const inputX = document.getElementById('inputX') as HTMLInputElement;
const inputY = document.getElementById('inputY') as HTMLInputElement;
const makeButton = document.getElementById('makeButton') as HTMLButtonElement;

if (makeButton) {
    makeButton.onclick = () => {
        createButtonGroup(parseInt(inputX.value), parseInt(inputY.value))
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
                const x = j
                const
            }
            rowDiv.appendChild(button);
        }
        div.appendChild(rowDiv)
    }
}

const mapid = document.getElementById('mapId')
const mapName = document.getElementById('mapName')
const mapPath = document.getElementById('mapTilepath')
const mapItem = document.getElementById('mapItemPath')
const mapEquip = document.getElementById('mapEquip')
const mapWalkable = document.getElementById('mapWalkable')
const mapNpc = document.getElementById('mapNpc')
const mapMonster = document.getElementById('mapMonster')
const mapPortal = document.getElementById('mapPortal')
