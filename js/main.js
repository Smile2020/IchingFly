import BackGround from "./runtime/background";
import DataBus from "./databus";
import GameState from "./base/gamestate";
import MainMenu from "./runtime/mainmenu";

const ctx = canvas.getContext('2d')
const databus = new DataBus()


export default class Main {
    constructor() {
        this.restart()
    }

    restart() {
        this.bindLoop = this.loop.bind(this)

        databus.reset()

        this.bg = new BackGround(ctx)
        this.mainmenu = new MainMenu()
        

        // 清除上一局的动画
        window.cancelAnimationFrame(this.aniId)
        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }

    update() {
        if (databus.gamestate === GameState.GamePlaying) {
            this.bg.update()
        }
        if (databus.gamestate === GameState.MainMenu) {
        }
        if (databus.gamestate === GameState.GameOver) {
        }
    }
    
    render() {
        this.bg.render(ctx)

        if (databus.gamestate === GameState.GamePlaying) {
        }
        if (databus.gamestate === GameState.MainMenu) {
            this.mainmenu.render(ctx)
        }
        if (databus.gamestate === GameState.GameOver) {
        }
    }

    loop() {
        this.update()
        this.render()

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }
}