import { frame } from './game'
import { start } from './scheduler'
import { State } from './state-machine'
import { createGameMenu } from './game-menu'

State.$canvas.width = 512
State.$canvas.height = 288

createGameMenu()

start(frame)
