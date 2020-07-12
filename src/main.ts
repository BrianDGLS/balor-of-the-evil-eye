import { frame } from './game'
import { start } from './scheduler'
import { createGameMenu } from './game-menu'

createGameMenu()

start(frame)
