import { PropertyMetadata } from "./editor"
import * as fs from 'fs'
import * as electron from 'electron'
import * as path from 'path'
import { project } from "./project";


export function createPropertyItem(metadata: PropertyMetadata, currentObject: any): PropertyItem {

    let propertyItem: PropertyItem;
    const propertyType = metadata.type;

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

export abstract class PropertyItem {

    protected title: HTMLElement

    protected view: HTMLElement

    protected metadata: PropertyMetadata

    protected currentObject: any

    protected from: any

    private onSubmit: (from: any, to: any) => void


    constructor(metadata: PropertyMetadata, currentObject: any) {
        this.metadata = metadata;
        this.currentObject = currentObject;

        this.title = document.createElement('span');
        this.title.innerText = metadata.description;

        this.view = this.createView();
    }

    setOnSubmitFunction(onSubmit: (from: any, to: any) => void) {
        this.onSubmit = onSubmit;
    }

    submit(to: any) {
        if (to != this.from) {
            this.onSubmit(this.from, to);
            this.from = to;
        }
    }

    getView() {
        const container = document.createElement('div');
        container.appendChild(this.title);
        container.appendChild(this.view);
        this.initValue();
        return container;
    }

    initValue() {
        const propertyKey = this.metadata.key;
        const value = this.currentObject[propertyKey];
        this.updateView(value);
        this.from = value;
    }

    update(currentObject: any) {
        this.currentObject = currentObject;
        this.initValue();
    }

    abstract createView(): HTMLElement;

    abstract updateView(value: any): void;
}


class TextPropertyItem extends PropertyItem {

    constructor(metadata: PropertyMetadata, currentObject: any) {
        super(metadata, currentObject);
    }

    createView(): HTMLElement {
        const view = document.createElement('input');
        view.onblur = () => {
            const to = view.value;
            this.submit(to);
        }

        return view;
    }

    updateView(value: any): void {
        (this.view as HTMLInputElement).value = value;
    }
}


class DropdownPropertyItem extends PropertyItem {
    constructor(metadata: PropertyMetadata, currentObject: any) {
        super(metadata, currentObject);
    }

    createView(): HTMLElement {
        const view = document.createElement('select');
        const optionMetadata = this.metadata.options;
        if (optionMetadata) {
            const file = fs.readFileSync(optionMetadata.filepath, 'utf-8');
            const jsonData = JSON.parse(file);
            const items = jsonData[optionMetadata.prefix];
            for (let item of items) {
                const option = document.createElement('option');
                option.value = item.id;
                option.innerText = item.name;
                view.appendChild(option);
            }
        }

        view.onchange = () => {
            const to = view.value;
            this.submit(to);
        }

        return view;
    }

    updateView(value: any): void {
        (this.view as HTMLSelectElement).value = value;
    }
}


class PrimarykeyPropertyItem extends PropertyItem {
    constructor(metadata: PropertyMetadata, currentObject: any) {
        super(metadata, currentObject);
    }

    createView(): HTMLElement {
        const view = document.createElement('input');
        view.disabled = true;

        return view;
    }

    updateView(value: any): void {
        (this.view as HTMLInputElement).value = value;
    }
}


class ImageSelectPropertyItem extends PropertyItem {

    button: HTMLElement

    image: HTMLImageElement


    constructor(metadata: PropertyMetadata, currentObject: any) {
        super(metadata, currentObject);
    }

    createView(): HTMLElement {
        const view = document.createElement('div');

        this.button = document.createElement('button')
        this.image = document.createElement('img')

        view.appendChild(this.button);
        view.appendChild(this.image);

        this.button.innerText = '选择图片';
        this.image.src = '';
        this.image.height = this.image.width = 48;

        const defaultPath = project.projectRoot;
        this.button.onclick = () => {
            electron.remote.dialog.showOpenDialog({
                title: "选择图片",
                defaultPath,
                filters: [
                    { name: 'Images', extensions: ['jpg', 'png', "jpeg"] }
                ]
            }, (dirs) => {
                if (dirs) {
                    const filename = dirs[0];
                    // "a\b\c\d"  (split '\\' )=>  ["a","b","c","d"] (join '/' )=> "a/b/c/d"
                    const relativePath = path.relative(defaultPath, filename).split("\\").join("/");
                    this.submit(relativePath)
                    this.updateView(relativePath);
                }
            });
        }

        return view;
    }

    updateView(value: any) {
        if (value) {
            const root = project.projectRoot;
            const src = path.join(root, value);
            this.image.src = src;
        } else {
            this.image.src = ''
        }
    }
}

class GameMapTilePropertyItem extends PropertyItem {

    button: { [index: string]: HTMLButtonElement }

    img: HTMLImageElement[][]

    tile: string[][]

    constructor(metadata: any, currentObject: any) {
        super(metadata, currentObject);
    }

    createView(): HTMLElement {
        const view = document.createElement('div');

        this.tile = this.currentObject.tile as string[][]

        this.button = {}

        for (let i = 0; i < this.tile.length; i++) {
            const row = this.tile[i];
            const rowDiv = document.createElement('div');
            for (let j = 0; j < row.length; j++) {
                const item = row[j];
                const button = document.createElement('button');
                button.innerText = (i + 1).toString() + ',' + (j + 1).toString();
                rowDiv.appendChild(button);
                const key = i + '_' + j;
                this.button[key] = button;
            }
            view.appendChild(rowDiv);
        }

        return view;
    }
    updateView(value: any): void {

    }
}
