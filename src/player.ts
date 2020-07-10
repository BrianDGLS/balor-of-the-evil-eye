import { clamp } from './utils'
import { keys } from './keyboard'
import { State } from './state-machine'

enum PLAYER_STATES {
  IDLE,
  HURT,
  RUNNING,
  JUMPING,
}
enum PLAYER_DIRECTION {
  LEFT,
  RIGHT,
}

export class Player {
  x = 32
  y = 256
  vy = 0
  vx = 0
  speed = 4
  width = 32
  height = 32

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
}

const GRAVITY = 0.25
const FRICTION = 0.01

const keepPlayerInScreen = (p: Player) => {
  p.x = clamp(p.x, 0, State.screen.width - p.width)
  p.y = clamp(p.y, 0, State.screen.height - p.height)
}

export const updatePlayer = (p: Player) => {
  const rightKeyPressed = keys.isDown(keys.RIGHT)
  const leftKeyPressed = keys.isDown(keys.LEFT)
  const jumpKeyPressed = keys.isDown(keys.SPACE)

  if (rightKeyPressed) {
    p.runRight()
  } else if (leftKeyPressed) {
    p.runLeft()
  } else if (!p.jumping) {
    p.setIdle()
  }

  if (jumpKeyPressed) {
    p.jump()
  }

  if (p.jumping && p.y === State.screen.height - p.height) {
    p.setIdle()
  }

  p.x += p.vx
  p.y += p.vy

  if (!p.jumping) {
    p.vx *= FRICTION
  }

  p.vy += GRAVITY

  keepPlayerInScreen(p)
}
