"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EditorHistory = /** @class */ (function () {
    function EditorHistory() {
        this.commandList = [];
        this.currentIndex = -1;
        this.maxLength = 5;
    }
    EditorHistory.prototype.add = function (command) {
        this.commandList.push(command);
        command.execute();
        this.currentIndex++;
        // this.remove();
    };
    // TODO:回退到中间位置再执行操作会有顺序问题
    EditorHistory.prototype.remove = function () {
        if (this.currentIndex > this.maxLength - 1) {
            this.commandList.splice(0, 1);
            this.currentIndex--;
        }
    };
    EditorHistory.prototype.revert = function (index) {
        var length = this.commandList.length;
        for (var i = this.currentIndex; i > index; i--) {
            var command = this.commandList[i];
            command.revert();
        }
        this.currentIndex = index;
    };
    EditorHistory.prototype.redo = function (index) {
        var length = this.commandList.length;
        for (var i = this.currentIndex; i < index; i++) {
            //王泽：
            //重做操作是把【下一个】命令进行重做，所以是当前游标+1
            var command = this.commandList[i + 1];
            command.execute();
        }
        this.currentIndex = index;
    };
    EditorHistory.prototype.revertOnce = function () {
        if (this.currentIndex >= 0) {
            this.revert(this.currentIndex - 1);
        }
        console.log('history_revert');
    };
    EditorHistory.prototype.redoOnce = function () {
        if (this.currentIndex < this.commandList.length - 1) {
            this.redo(this.currentIndex + 1);
        }
        console.log('history_redo');
    };
    return EditorHistory;
}());
var TestCommand = /** @class */ (function () {
    function TestCommand(from, to) {
        this.from = from;
        this.to = to;
    }
    TestCommand.prototype.execute = function () {
        console.log("from " + this.from + " to " + this.to);
    };
    TestCommand.prototype.revert = function () {
        console.log("from " + this.to + " to " + this.from);
    };
    return TestCommand;
}());
exports.TestCommand = TestCommand;
exports.editorHistory = new EditorHistory();
