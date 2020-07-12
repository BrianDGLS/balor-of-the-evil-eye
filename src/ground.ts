import { GameObject } from './game-object'
import { DrawSpriteOptions, drawSprite } from './renderer'

export class Ground extends GameObject {
  width = 16
  height = 16

  sprite = new Image()
  spriteLoaded = false
  loadSprite() {
    this.sprite.src = './assets/sprites/ground.png'
    this.sprite.addEventListener('load', () => (this.spriteLoaded = true))
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)

    const drawOptions: DrawSpriteOptions = {
      ctx,
      img: this.sprite,

      frameX: 0,
      frameY: 0,

      canvasX: 0,
      canvasY: 0,

      scale: 1,

      gameObject: this,
    }

    drawSprite(drawOptions)

    ctx.restore()
  }
}
