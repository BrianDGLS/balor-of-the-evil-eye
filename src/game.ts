import { getFPS } from './debug'
import { Player } from './player'
import { Ground } from './ground'
import { State, resetState } from './state-machine'
import { renderBackground, renderFPS } from './renderer'
import { GraveStone, GraveStoneBoss } from './gravestone'

export const play = () => (State.game.playing = true)
export const pause = () => (State.game.playing = false)

export const startNewGame = () => {
  resetState()
  play()
}

State.screen.width = 256
State.screen.height = 144
State.$canvas.width = 512
State.$canvas.height = 288

const tiles: Ground[] = []
const numberOfFloorTiles = State.screen.width / 16
for (let i = 0; i < numberOfFloorTiles; i++) {
  const ground = new Ground()
  ground.loadSprite()
  ground.x = ground.width * i
  ground.y = State.screen.height - ground.height
  tiles.push(ground)
}

const enemies: GraveStone[] = []
const graveStone = new GraveStone()
graveStone.loadSprite()
graveStone.x = 120
graveStone.y = State.screen.height - graveStone.height - 16
enemies.push(graveStone)

const graveStoneBoss = new GraveStoneBoss()
graveStoneBoss.loadSprite()
graveStoneBoss.x = 180
graveStoneBoss.y = State.screen.height - graveStoneBoss.height - 16
enemies.push(graveStoneBoss)

const player: Player = State.game.player
player.y = State.screen.height - player.height

const ctx = State.$canvas.getContext('2d') as CanvasRenderingContext2D

ctx.scale(2, 2)

export const frame = (timestamp: number) => {
  if (!player.spriteLoaded) {
    State.game.player.loadSprite()
  }

  if (State.game.playing && player.spriteLoaded) {
    State.game.player.update()

    ctx.clearRect(0, 0, State.screen.width, State.screen.height)
    tiles.map((_) => _.render(ctx))
    enemies.map((_) => _.render(ctx))
    State.game.player.render(ctx)

    if (State.debugMode) {
      renderFPS(ctx, getFPS())
    }
  }

  requestAnimationFrame(frame)
}
