import Pool from './base/pool'
import GameState from "./base/gamestate";

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
    constructor() {
        if (instance) return instance

        instance = this

        this.pool = new Pool()

        this.reset()
    }

    reset() {
        this.gamestate = GameState.MainMenu
    }
}