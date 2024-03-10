import MySprite from "../base/MySprite";
import MyDataBus from "../MyDatabus";

const BULLET_IMG_SRC = 'images/bullet.png'
const BULLET_WIDTH = 16
const BULLET_HEIGHT = 30

const __ = {
    speed: Symbol('speed')
}

const databus = new MyDataBus()

export default class MyBullet extends MySprite {
    constructor() {
        super(BULLET_IMG_SRC, BULLET_WIDTH, BULLET_HEIGHT);
    }
    
    init(x, y, speed) {
        this.x = x
        this.y = y

        this[__.speed] = speed

        this.visible = true
    }
    
    update() {
        this.y -= this[__.speed]

        if (this.y < -this.height) databus.removeBullets(this)
    }
    
}