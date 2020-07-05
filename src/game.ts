import { getFPS } from './debug'
import { State, resetState } from './state-machine'
import { renderBackground, renderFPS } from './renderer'

export const play = () => (State.game.playing = true)
export const pause = () => (State.game.playing = false)

export const startNewGame = () => {
  resetState()
  play()
}

export const frame = (timestamp: number) => {
  const ctx = State.$canvas.getContext('2d') as CanvasRenderingContext2D

  if (State.game.playing) {
    renderBackground(ctx)

    if (State.debugMode) {
      renderFPS(ctx, getFPS())
    }
  }

  requestAnimationFrame(frame)
}
