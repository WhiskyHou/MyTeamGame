
class EditorHistory {

    private commandList: Command[] = [];

    private currentIndex: number = -1;

    private maxLength: number = 5;

    add(command: Command) {
        this.commandList.push(command);
        command.execute();
        this.currentIndex++;

        // this.remove();
    }

    // TODO:回退到中间位置再执行操作会有顺序问题
    remove() {
        if (this.currentIndex > this.maxLength - 1) {
            this.commandList.splice(0, 1);
            this.currentIndex--;
        }
    }

    revert(index: number) {
        const length = this.commandList.length;
        for (let i = this.currentIndex; i > index; i--) {
            const command = this.commandList[i];
            command.revert();
        }
        this.currentIndex = index;
    }

    redo(index: number) {
        const length = this.commandList.length;
        for (let i = this.currentIndex; i < index; i++) {
            //王泽：
            //重做操作是把【下一个】命令进行重做，所以是当前游标+1
            const command = this.commandList[i + 1];
            command.execute();
        }
        this.currentIndex = index;
    }

    revertOnce() {
        if (this.currentIndex >= 0) {
            this.revert(this.currentIndex - 1);
        }
        console.log('history_revert');
    }

    redoOnce() {
        if (this.currentIndex < this.commandList.length - 1) {
            this.redo(this.currentIndex + 1);
        }
        console.log('history_redo')
    }

}



export interface Command {
    execute(): void;
    revert(): void;
}


export class TestCommand implements Command {

    private from: number;
    private to: number;

    constructor(from: number, to: number) {
        this.from = from;
        this.to = to;
    }

    execute() {
        console.log(`from ${this.from} to ${this.to}`);
    }

    revert() {
        console.log(`from ${this.to} to ${this.from}`)
    }
}

export const editorHistory = new EditorHistory();
