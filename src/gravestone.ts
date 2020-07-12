import { GameObject } from './game-object'
import { DrawSpriteOptions, drawSprite } from './renderer'
import { PLAYER_STATES } from './player'

export class GraveStone extends GameObject {
  width = 16
  height = 16

  hurtFrames = [2]
  idleFrames = [0, 1]

  sprite = new Image()
  spriteLoaded = false
  loadSprite() {
    this.sprite.src = './assets/sprites/gravestone.png'
    this.sprite.addEventListener('load', () => (this.spriteLoaded = true))
  }

  get spriteLoop() {
    if (this.hurt) return this.hurtFrames
    return this.idleFrames
  }

  get frameSpeed() {
    if (this.hurt) return 100
    return 30
  }

  state: PLAYER_STATES = PLAYER_STATES.IDLE
  get idle() {
    return this.state === PLAYER_STATES.IDLE
  }
  get hurt() {
    return this.state === PLAYER_STATES.HURT
  }

  frameCount = 0
  currentLoopIndex = 0

  getSpriteFrame() {
    this.frameCount++

    if (this.frameCount >= this.frameSpeed) {
      this.currentLoopIndex++
      this.frameCount = 0
    }
    if (this.currentLoopIndex >= this.spriteLoop.length) {
      this.currentLoopIndex = 0
    }
    return this.spriteLoop[this.currentLoopIndex]
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)

    const drawOptions: DrawSpriteOptions = {
      ctx,
      img: this.sprite,

      frameX: this.getSpriteFrame(),
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

export class GraveStoneBoss extends GraveStone {
  width = 32
  height = 64
  loadSprite() {
    this.sprite.src = './assets/sprites/gravestone-boss.png'
    this.sprite.addEventListener('load', () => (this.spriteLoaded = true))
  }
}
