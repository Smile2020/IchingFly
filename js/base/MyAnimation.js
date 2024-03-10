import MyDataBus from "../MyDatabus";
import MySprite from "./MySprite";

const databus = new MyDataBus()

const __ = {
    timer: Symbol('timer')
}

export default class MyAnimation extends MySprite {
    constructor(imgSrc, width, height) {
        super(imgSrc, width, height)
        
        this.isPlaying = false
        this.loop = false
        this.interval = 1000 / 60
        this[__.timer] = null
        this.index = -1
        this.count = 0
        this.imgList = []
        databus.animations.push(this)
    }
    
    initFrames(imgList) {
        imgList.forEach((imgSrc) => {
            const img = new Image()
            img.src = imgSrc
            this.imgList.push(img)
        })
        this.count = imgList.length
    }
    
    aniRender(ctx) {
        if (!this.isPlaying) return
        ctx.drawImage(
            this.imgList[this.index],
            this.x,
            this.y,
            this.width * 1.2,
            this.height * 1.2
        )
    }
    
    playAnimation(index = 0, loop = false) {
        this.index = index
        this.loop = loop
        this.isPlaying = true
        this.visible = false
        
        if (this.interval > 0 && this.count) {
            this[__.timer] = setInterval(
                this.frameLoop.bind(this),
                this.interval
            )
        }
    }
    
    stop() {
        this.isPlaying = false
        if (this[__.timer]) {
            clearInterval(this[__.timer])
        }
    }
    
    frameLoop() {
        this.index++
        if (this.index > this.count - 1) {
            if (this.loop) {
                this.index = 0
            } 
            else {
                this.index--
                this.stop()
            }
        }
    }
}