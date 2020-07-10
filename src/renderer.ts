import { Player } from './player'
import { State } from './state-machine'

const scale = 2
const width = 32
const height = 32
const scaledWidth = scale * width
const scaledHeight = scale * height

const getDrawFrame = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => (
  frameX: number,
  frameY: number,
  canvasX: number,
  canvasY: number
) => {
  ctx.drawImage(
    img,
    frameX * width,
    frameY * height,
    width,
    height,
    canvasX,
    canvasY,
    scaledWidth,
    scaledHeight
  )
}

const colors = {
  white: '#fefdff',
  black: '#010022',
}

export const renderBackground = (ctx: CanvasRenderingContext2D) => {
  ctx.save()
  ctx.fillStyle = colors.white
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.restore()
}

const playerIdle = new Image()
playerIdle.src = './assets/sprites/player/idle.png'

const playerRun = new Image()
playerRun.src = './assets/sprites/player/run.png'

const playerJump = new Image()
playerJump.src = './assets/sprites/player/jump.png'

const playerHurt = new Image()
playerHurt.src = './assets/sprites/player/hurt.png'

const cycleIdleLoop = [0, 1]
const cycleRunLoop = [0, 1, 2, 3]
let currentLoopIndex = 0
let frameCount = 0
export const renderPlayer = (ctx: CanvasRenderingContext2D, p: Player) => {
  const drawIdleFrame = getDrawFrame(ctx, playerIdle)
  const drawRunFrame = getDrawFrame(ctx, playerRun)
  const drawJumpFrame = getDrawFrame(ctx, playerJump)

  frameCount++

  let maxFrames = p.idle ? 30 : 8

  if (frameCount >= maxFrames) {
    currentLoopIndex++
    frameCount = 0
  }

  ctx.save()
  ctx.fillStyle = colors.black
  ctx.translate(p.x, p.y)
  if (p.facingLeft) {
    // flip image
  }

  let loop = p.idle ? cycleIdleLoop : cycleRunLoop
  if (currentLoopIndex >= loop.length) {
    currentLoopIndex = 0
  }

  const direction = p.facingLeft ? 1 : 0

  if (p.idle) {
    drawIdleFrame(cycleIdleLoop[currentLoopIndex], direction, 0, -32)
  }

  if (p.running) {
    drawRunFrame(cycleRunLoop[currentLoopIndex], direction, 0, -32)
  }

  if (p.jumping) {
    drawJumpFrame(0, direction, 0, -32)
  }

  ctx.restore()
}

export const renderFPS = (ctx: CanvasRenderingContext2D, fps: string) => {
  ctx.save()
  ctx.translate(ctx.canvas.width - 15, 15)
  ctx.fillStyle = colors.black
  ctx.font = '12px serif'
  ctx.fillText(fps, 0, 0)
  ctx.restore()
}
