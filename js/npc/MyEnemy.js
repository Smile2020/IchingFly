import MyDataBus from "../MyDatabus";
import MyAnimation from "../base/MyAnimation";

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH = 60
const ENEMY_HEIGHT = 60

const __ = {
    speed: Symbol('speed')
}

const databus = new MyDataBus()

function rnd(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}

export default class MyEnemy extends MyAnimation {
    constructor() {
        super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)

        this.initExplosionAnimation()
    }
    
    init(speed){
        this.x = rnd(0, window.innerWidth - ENEMY_WIDTH)
        this.y = -this.height
        this[__.speed] = speed
        this.visible = true
    }
    
    initExplosionAnimation() {
        const frames = []

        const EXPLO_IMG_PREFIX = 'images/explosion'
        const EXPLO_FRAME_COUNT = 19

        for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
            frames.push(`${EXPLO_IMG_PREFIX + (i + 1)}.png`)
        }

        this.initFrames(frames)
    }
    
    update() {
        this.y += this[__.speed]

        if (this.y > window.innerHeight + this.height) databus.removeEnemy(this)
    }
}