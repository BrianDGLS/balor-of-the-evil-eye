import { getFPS } from './debug'
import { State, resetState } from './state-machine'
import { renderBackground, renderFPS, renderPlayer } from './renderer'
import { updatePlayer } from './player'

export const play = () => (State.game.playing = true)
export const pause = () => (State.game.playing = false)

export const startNewGame = () => {
  resetState()
  play()
}

export const frame = (timestamp: number) => {
  const ctx = State.$canvas.getContext('2d') as CanvasRenderingContext2D

  if (State.game.playing) {
    updatePlayer(State.game.player)

    renderBackground(ctx)
    renderPlayer(ctx, State.game.player)

    if (State.debugMode) {
      renderFPS(ctx, getFPS())
    }
  }

  requestAnimationFrame(frame)
}
