import { Game } from './game'
import { Renderer } from './renderer'
import { Scheduler } from './scheduler'
import { createGameMenu } from './game-menu'

const $canvas = document.querySelector('canvas') as HTMLCanvasElement
$canvas.width = 420
$canvas.height = 420

const game = new Game($canvas, new Renderer())
const scheduler = new Scheduler(game)

scheduler.start()

createGameMenu(game)
