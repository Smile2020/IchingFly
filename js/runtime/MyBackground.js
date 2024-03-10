import MySprite from "../base/MySprite";


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg.jpg'
const BG_WIDTH = 512
const BG_HEIGHT = 512

export default class MyBackground extends MySprite {
    constructor(ctx) {
        super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

        this.top = 0

        this.render(ctx)
    }
    
    update() {
        this.top += 2

        if (this.top >= screenHeight) this.top = 0
    }
    
    render(ctx) {
        ctx.drawImage(
            this.img,
            0,
            0,
            this.width,
            this.height,
            0,
            this.top - screenHeight,
            screenWidth,
            screenHeight
        )

        ctx.drawImage(
            this.img,
            0,
            0,
            this.width,
            this.height,
            0,
            this.top,
            screenWidth,
            screenHeight
        )
    }
}