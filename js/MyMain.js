import MyDataBus from "./MyDatabus";
import MyBackground from "./runtime/MyBackground";
import MyPlayer from "./player/MyIndex";
import MyEnemy from "./npc/MyEnemy";
import MyMusic from "./runtime/MyMusic";
import MyGameInfo from "./runtime/MyGameInfo";
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const ctx = canvas.getContext('2d')
const databus = new MyDataBus()


export default class MyMain {
    constructor() {
        this.aniId = 0
        this.restart()
    }

    restart() {
        databus.reset()
        canvas.removeEventListener(
            'touchstart',
            this.touchHandler
        )

        this.bg = new MyBackground(ctx)
        this.player = new MyPlayer(ctx)
        this.gameinfo = new MyGameInfo()
        this.music = new MyMusic()
        
        this.bindLoop = this.loop.bind(this)
        this.hasEventBind = false

        window.cancelAnimationFrame(this.aniId)

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }

    touchEventHandler(e) {
        e.preventDefault()

        const x = e.touches[0].clientX
        const y = e.touches[0].clientY


        if (x >= (screenWidth / 2 - 40)
            && x <= (screenWidth / 2 + 50)
            && y >= (screenHeight / 2 - 100 + 180)
            && y <= (screenHeight / 2 - 100 + 255)) 
        {
            this.restart()
        }
    }
    
    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.bg.render(ctx)

        databus.bullets.forEach((item) => {
            item.drawToCanvas(ctx)
        })
        databus.enemys.forEach((item) => {
            item.drawToCanvas(ctx)
        })
        this.player.drawToCanvas(ctx)

        databus.animations.forEach((ani) => {
            if (ani.isPlaying) {
                ani.aniRender(ctx)
            }
        })

        this.gameinfo.renderGameScore(ctx, databus.score)
        
        if (databus.gameOver) {
            this.gameinfo.renderGameOver(ctx, databus.score)
        }

        if (!this.hasEventBind) {
            this.hasEventBind = true
            this.touchHandler = this.touchEventHandler.bind(this)
            canvas.addEventListener('touchstart', this.touchHandler)
        }
    }

    update() {
        if (databus.gameOver) return
        
        this.bg.update()
        this.enemyGenerate()

        databus.bullets.forEach((item) => {
            item.update()
        })

        databus.enemys.forEach((item) => {
            item.update()
        })
        
        this.collisionDetection()

        if (databus.frame % 20 === 0) {
            this.player.shoot()
            this.music.playShoot()
        }
    }

    loop() {
        databus.frame++
        this.update()
        this.render()
        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }

    enemyGenerate() {
        if (databus.frame % 30 === 0) {
            const enemy = databus.pool.getItemByClass('myEnemy', MyEnemy)
            enemy.init(6)
            databus.enemys.push(enemy)
        }
    }

    collisionDetection() {
        const that = this

        databus.bullets.forEach((bullet) => {
            for (let i = 0, il = databus.enemys.length; i < il; i++) {
                const enemy = databus.enemys[i]

                if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
                    enemy.playAnimation()
                    that.music.playExplosion()
                    
                    bullet.visible = false
                    databus.score += 1
                    break
                }
            }
        })
        
        for (let i = 0, il = databus.enemys.length; i < il; i++) {
            const enemy = databus.enemys[i]
            
            if (this.player.isCollideWith(enemy)) {
                databus.gameOver = true
                break
            }
        }
    }
}