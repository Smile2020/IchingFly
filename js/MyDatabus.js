import MyPool from "./base/MyPool";

let instance

export default class MyDataBus{
    constructor() {
        if (instance) return instance

        instance = this
        
        this.pool = new MyPool()

        this.reset()
    }
    
    reset() {
        this.frame = 0
        this.score = 0
        this.bullets = []
        this.animations = []
        this.enemys = []
        this.animations = []
        this.gameOver = false

    }

    removeBullets(myBullet) {
        const temp = this.bullets.shift()
        temp.visible = false
        this.pool.recover('myBullet', myBullet)        
    }

    removeEnemy(myEnemy) {
        const temp = this.enemys.shift()
        temp.visible = false
        this.pool.recover('myEnemy', myEnemy)
    }
}