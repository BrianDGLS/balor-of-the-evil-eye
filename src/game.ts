import { Renderer } from './renderer'

export class Game {
  public debug = true

  public playing = false

  constructor(private readonly $canvas: HTMLCanvasElement, private readonly renderer: Renderer) {}

  public new() {
    this.play()
  }

  public play() {
    this.playing = true
  }

  public pause() {
    this.playing = false
  }

  private _lastLoop = new Date()
  get fps(): string {
    const currentLoop = new Date()
    const fps = 1000 / (currentLoop.getMilliseconds() - this._lastLoop.getMilliseconds())
    this._lastLoop = currentLoop
    return Math.round(fps).toString()
  }

  private _ctx!: CanvasRenderingContext2D
  get ctx(): CanvasRenderingContext2D {
    if (!this._ctx) {
      this._ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D
    }
    return this._ctx
  }

  public update(timestamp: number) {
    this.renderer.renderBackground(this.ctx)

    if (this.debug) {
      this.renderer.renderFPS(this.ctx, this.fps)
    }
  }
}
