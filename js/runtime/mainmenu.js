import Button from "../base/button";

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const START_IMG_SRC = 'images/startButton.png'
const START_WIDTH = 373
const START_HEIGHT = 109


export default class MainMenu {
    constructor() {
        this.title = new Image()
        this.title.src = 'images/title.png'
        
        this.startBtn = new Button(START_IMG_SRC, START_WIDTH, START_HEIGHT, screenWidth / 2 - START_WIDTH / 2, screenHeight / 2 + 200)
    }
    
    render(ctx) {
        // draw title
        ctx.drawImage(this.title, screenWidth / 2 - 150, screenHeight / 2 - 200, 300, 160);
        
        // draw start button
        this.startBtn.drawToCanvas(ctx)
    }

    checkIsFingerOnButton(x, y) {
        return this.startBtn.isClicked(x, y)
    }
}