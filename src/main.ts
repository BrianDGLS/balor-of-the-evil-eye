const $canvas = document.createElement('canvas')
const ctx = $canvas.getContext('2d') as CanvasRenderingContext2D

const width = ($canvas.width = 420)
const height = ($canvas.height = 420)

document.body.appendChild($canvas)

class Game {
  public playing = false
}

class Scheduler {
  public frame!: number

  private renderFunc!: (timestamp: number) => void

  requestFrame(renderFunc?: (timestamp: number) => void) {
    if (renderFunc) this.renderFunc = renderFunc

    this.frame = requestAnimationFrame(this.renderFunc)
  }
}

const game = new Game()
const scheduler = new Scheduler()

game.playing = true
const render = () => {
  ctx.fillRect(0, 0, width, height)

  if (game.playing) {
    scheduler.requestFrame()
  }
  console.log(scheduler.frame)
}

scheduler.requestFrame(render)

setTimeout(() => {
  game.playing = false
}, 2000)
