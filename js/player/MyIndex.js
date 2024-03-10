import MySprite from "../base/MySprite";
import MyDataBus from "../MyDatabus";
import MyBullet from "./MyBullet";

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const PLAYER_IMG_SRC = 'images/hero.png'
const PLAYER_WIDTH = 80
const PLAYER_HEIGHT = 80

const databus = new MyDataBus()

export default class MyPlayer extends MySprite {
    constructor() {
        super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT);

        this.x = screenWidth / 2 - this.width / 2
        this.y = screenHeight - this.height - 30

        this.touched = false
        this.bullets = []

        this.initEvent()
    }

    initEvent() {
        canvas.addEventListener('touchstart', ((e) => {
            e.preventDefault()

            const x = e.touches[0].clientX
            const y = e.touches[0].clientY

            if (this.checkIsFingerOnAir(x, y)) {
                this.touched = true
                this.setAirPosAcrossFingerPosZ(x, y)
            }
        }))

        canvas.addEventListener('touchmove', ((e) => {
            e.preventDefault()

            if (this.touched) {
                let x = e.touches[0].clientX
                let y = e.touches[0].clientY

                this.setAirPosAcrossFingerPosZ(x, y)
            }
        }))

        canvas.addEventListener('touchend', ((e) => {
            e.preventDefault()

            this.touched = false
        }))
    }

    checkIsFingerOnAir(x, y) {
        const deviation = 30

        return !!(x >= this.x - deviation
            && y >= this.y - deviation
            && x <= this.x + this.width + deviation
            && y <= this.y + this.height + deviation)
    }

    setAirPosAcrossFingerPosZ(x, y) {
        let disX = x - this.width / 2
        let disY = y - this.height / 2

        if (disX < 0) disX = 0

        else if (disX > screenWidth - this.width) disX = screenWidth - this.width

        if (disY <= 0) disY = 0

        else if (disY > screenHeight - this.height) disY = screenHeight - this.height

        this.x = disX
        this.y = disY
    }
    
    shoot() {
        const bullet = databus.pool.getItemByClass('myBullet', MyBullet)
        bullet.init(this.x + this.width / 2 - 5, this.y - 10, 10)

        databus.bullets.push(bullet)
    }
}
