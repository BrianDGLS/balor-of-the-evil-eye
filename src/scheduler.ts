import { Game } from './game'

export class Scheduler {
  constructor(private readonly game: Game) {}

  loop: number = 0

  start() {
    this.loop = requestAnimationFrame(this.animationFrame)
  }

  animationFrame = (timestamp: number) => {
    if (this.game.playing) {
      this.game.update(timestamp)
    }

    requestAnimationFrame(this.animationFrame)
  }

  stop() {
    cancelAnimationFrame(this.loop)
  }
}
