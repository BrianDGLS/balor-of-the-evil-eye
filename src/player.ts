import { clamp } from './utils'
import { keys } from './keyboard'
import { State } from './state-machine'
import { GameObject } from './game-object'
import { drawSprite, DrawSpriteOptions } from './renderer'

export enum PLAYER_STATES {
  IDLE,
  HURT,
  RUNNING,
  JUMPING,
}

export enum PLAYER_DIRECTION {
  LEFT,
  RIGHT,
}

export class Player extends GameObject {
  x = 0
  y = 0
  vy = 0
  vx = 0
  speed = 4
  width = 16
  height = 32

  hurtFrames = [7]
  jumpFrames = [6]
  idleFrames = [0, 1]
  runningFrames = [2, 3, 4, 5]

  sprite = new Image()
  spriteLoaded = false
  loadSprite() {
    this.sprite.src = './assets/sprites/player.png'
    this.sprite.addEventListener('load', () => (this.spriteLoaded = true))
  }

  get spriteLoop() {
    if (this.running) return this.runningFrames
    if (this.jumping) return this.jumpFrames
    if (this.hurt) return this.hurtFrames
    return this.idleFrames
  }

  get frameSpeed() {
    if (this.running) return 8
    if (this.jumping) return 100
    if (this.hurt) return 100
    return 30
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

  direction: PLAYER_DIRECTION = PLAYER_DIRECTION.RIGHT
  get facingRight() {
    return this.direction === PLAYER_DIRECTION.RIGHT
  }
  get facingLeft() {
    return this.direction === PLAYER_DIRECTION.LEFT
  }

  state: PLAYER_STATES = PLAYER_STATES.IDLE
  get idle() {
    return this.state === PLAYER_STATES.IDLE
  }
  get hurt() {
    return this.state === PLAYER_STATES.HURT
  }
  get running() {
    return this.state === PLAYER_STATES.RUNNING
  }
  get jumping() {
    return this.state === PLAYER_STATES.JUMPING
  }

  get canJump() {
    return !this.jumping
  }

  jump() {
    if (!this.canJump) return

    this.vy = -4

    if (this.running) {
      if (this.facingRight) this.vx = this.speed
      if (this.facingLeft) this.vx = -this.speed
    }

    this.state = PLAYER_STATES.JUMPING
  }

  runRight() {
    if (this.jumping) return

    this.state = PLAYER_STATES.RUNNING

    this.vx = this.speed
    this.direction = PLAYER_DIRECTION.RIGHT
  }

  runLeft() {
    if (this.jumping) return

    this.state = PLAYER_STATES.RUNNING

    this.vx = -this.speed
    this.direction = PLAYER_DIRECTION.LEFT
  }

  setIdle() {
    this.state = PLAYER_STATES.IDLE
  }

  update() {
    const rightKeyPressed = keys.isDown(keys.RIGHT)
    const leftKeyPressed = keys.isDown(keys.LEFT)
    const jumpKeyPressed = keys.isDown(keys.SPACE)

    if (rightKeyPressed) {
      this.runRight()
    } else if (leftKeyPressed) {
      this.runLeft()
    } else if (!this.jumping) {
      this.setIdle()
    }

    if (jumpKeyPressed) {
      this.jump()
    }

    if (this.jumping && this.y === State.screen.height - this.height - 16) {
      this.setIdle()
    }

    this.x += this.vx
    this.y += this.vy

    if (!this.jumping) {
      this.vx *= State.physics.friction
    }

    this.vy += State.physics.gravity

    this.x = clamp(this.x, 0, State.screen.width - this.width)
    this.y = clamp(this.y, 0, State.screen.height - this.height - 16)
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)

    const drawOptions: DrawSpriteOptions = {
      ctx,
      img: this.sprite,

      frameX: this.getSpriteFrame(),
      frameY: this.facingLeft ? 1 : 0,

      canvasX: 0,
      canvasY: 0,

      scale: 1,

      gameObject: this,
    }

    drawSprite(drawOptions)

    ctx.restore()
  }
}
