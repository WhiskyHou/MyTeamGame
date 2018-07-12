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
/**
 * 输入框
 */
var InputManager = /** @class */ (function (_super) {
    __extends(InputManager, _super);
    function InputManager() {
        var _this = _super.call(this) || this;
        _this.inputString = "";
        _this.inputOver = false;
        _this.rechargeIsStart = false;
        _this.addEventListener("inputStart", function (eventData) {
            console.log(eventData);
            _this.parse(eventData);
        });
        _this.listen();
        return _this;
    }
    InputManager.prototype.onUpdate = function (delta) {
    };
    InputManager.prototype.onDestory = function () {
    };
    InputManager.prototype.CodeTOWords = function (code) {
        //字母：65 = A , 90 = Z ;上边的数字： 48 = 1 , 57 = 0
        var Words1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var Words2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        if (code > 64 && code < 91) {
            return Words1[code - 65];
        }
        else if (code > 48 && code < 59) {
            return Words2[code - 49];
        }
        else if (code == 32) {
            return " ";
        }
        else {
            return "";
        }
    };
    InputManager.prototype.parse = function (code) {
        switch (code) {
            case 76: //L
                this.dispatchEvent('L', this.inputString);
                break;
            case 75: //K
                this.dispatchEvent('K', this.inputString);
                break;
            case 73: //I
                this.dispatchEvent('I', this.inputString);
                break;
            case 79: //O
                this.dispatchEvent('O', this.inputString);
                break;
            case 8: //BACK
                this.dispatchEvent('Back', this.inputString);
                break;
            case 13: //Enter
                this.dispatchEvent('Enter', this.inputString);
                break;
            case 20: //Caps Lock
                this.dispatchEvent('Caps Lock', this.inputString);
                break;
            case 9: //Tab
                this.dispatchEvent('Caps Lock', this.inputString);
                break;
            case 27: //ESC
                this.dispatchEvent('Esc', this.inputString);
                break;
        }
    };
    InputManager.prototype.listen = function () {
        var _this = this;
        this.addEventListener("inputStart", function (eventData) {
            if (!_this.inputOver) {
                _this.inputString += _this.CodeTOWords(eventData);
                console.log('你按下了', _this.inputString);
                _this.dispatchEvent('inputChanged', _this.inputString);
            }
        });
        this.addEventListener("rechargeInput", function (eventData) {
            console.log(eventData);
            if (!_this.rechargeIsStart) {
                _this.rechargeIsStart = true;
                _this.inputString = "";
            }
            else {
                _this.inputString += _this.CodeTOWords(eventData);
                console.log('你按下了', _this.inputString);
                _this.dispatchEvent('inputChanged', _this.inputString);
            }
        });
        this.addEventListener("L", function (eventData) {
            //任务快捷键
        });
        this.addEventListener("K", function (eventData) {
            //技能快捷键
        });
        this.addEventListener("I", function (eventData) {
            //背包快捷键
            baManager.openBag();
        });
        this.addEventListener("O", function (eventData) {
            //设置快捷键
        });
        this.addEventListener("Back", function (eventData) {
            if (!_this.inputOver) {
                _this.inputString = _this.inputString.slice(0, _this.inputString.length - 1);
                _this.dispatchEvent('inputChanged', _this.inputString);
            }
        });
        this.addEventListener("Enter", function (eventData) {
            _this.inputOver = true;
            _this.rechargeIsStart = false;
            _this.dispatchEvent('inputOver', _this.inputString);
        });
        this.addEventListener("Caps Lock", function (eventData) {
        });
        this.addEventListener("Esc", function (eventData) {
            baManager.dispatchEvent('bagDown', player);
            shpManager.dispatchEvent('shopDown', player);
        });
    };
    return InputManager;
}(EventDispatcher));
