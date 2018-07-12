/**
 * 输入框
 */
class InputManager extends EventDispatcher {
    inputText: TextField
    inputString: string = ""
    inputOver: boolean = false
    constructor() {
        super()

        this.addEventListener("inputStart", (eventData: any) => {
            console.log(eventData)
            this.parse(eventData)
        });
        this.listen()
    }

    onUpdate(delta: number): void {

    }

    onDestory(): void {

    }

    CodeTOWords(code: number): string {
        //字母：65 = A , 90 = Z ;上边的数字： 48 = 1 , 57 = 0
        let Words1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        let Words2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        if (code > 64 && code < 91) {
            return Words1[code - 65]
        } else if (code > 48 && code < 59) {
            return Words2[code - 49]
        } else if (code == 32) {
            return " "
        } else {
            return ""
        }
    }
<<<<<<< HEAD
    parse(code: number) {
        switch (code) {
=======
    parse(code : number){
        switch (code){
>>>>>>> 89b05dda96e3e42291f83d294662e9c84abbbd13
            case 76://L
                this.dispatchEvent('L', this.inputString);
                break;
            case 75://K
                this.dispatchEvent('K', this.inputString);
                break;
            case 73://I
                this.dispatchEvent('I', this.inputString);
                break;
            case 79://O
<<<<<<< HEAD
                this.dispatchEvent('O', this.inputString);
                break;
=======
            this.dispatchEvent('O', this.inputString);    
            break;
>>>>>>> 89b05dda96e3e42291f83d294662e9c84abbbd13
            case 8://BACK
                this.dispatchEvent('Back', this.inputString);
                break;
            case 13://Enter
                this.dispatchEvent('Enter', this.inputString);
                break;
            case 20://Caps Lock
                this.dispatchEvent('Caps Lock', this.inputString);
                break;
            case 9://Tab
                this.dispatchEvent('Caps Lock', this.inputString);
                break;
            case 27://ESC
                this.dispatchEvent('Esc', this.inputString);
                break;
        }
    }
<<<<<<< HEAD

=======
>>>>>>> 89b05dda96e3e42291f83d294662e9c84abbbd13
    listen() {
        this.addEventListener("inputStart", (eventData: any) => {
            if (!this.inputOver) {
                this.inputString += this.CodeTOWords(eventData)
                console.log('你按下了', this.inputString)
                this.dispatchEvent('inputChanged', this.inputString);
            }
        });
        this.addEventListener("L", (eventData: any) => {
            //任务快捷键
        });
        this.addEventListener("K", (eventData: any) => {
            //技能快捷键
        });
        this.addEventListener("I", (eventData: any) => {
            //背包快捷键
            baManager.openBag()
        });
        this.addEventListener("O", (eventData: any) => {
            //设置快捷键
        });
        this.addEventListener("Back", (eventData: any) => {
            if (!this.inputOver) {
                this.inputString = this.inputString.slice(0, this.inputString.length - 1)
                this.dispatchEvent('inputChanged', this.inputString);
            }
        });
        this.addEventListener("Enter", (eventData: any) => {
            this.inputOver = true;
            this.dispatchEvent('inputOver', this.inputString);
        });
        this.addEventListener("Caps Lock", (eventData: any) => {


        });
        this.addEventListener("Esc", (eventData: any) => {
            baManager.dispatchEvent('bagDown', player);
            shpManager.dispatchEvent('shopDown', player);
<<<<<<< HEAD
=======
            //大哥自己有自己的想法不用我这个思路了很遗憾。
>>>>>>> 89b05dda96e3e42291f83d294662e9c84abbbd13

        });
    }
}
