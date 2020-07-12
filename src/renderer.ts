import { GameObject } from './game-object'

export interface DrawSpriteOptions {
  ctx: CanvasRenderingContext2D
  img: HTMLImageElement

  frameX: number
  frameY: number

  canvasX: number
  canvasY: number

  scale: number

  gameObject: GameObject
}

export const drawSprite = (options: DrawSpriteOptions) => {
  const { width, height } = options.gameObject
  options.ctx.drawImage(
    options.img,
    options.frameX * width,
    options.frameY * height,
    width,
    height,
    options.canvasX,
    options.canvasY,
    options.scale * width,
    options.scale * height
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

export const renderFPS = (ctx: CanvasRenderingContext2D, fps: string) => {
  ctx.save()
  ctx.translate(ctx.canvas.width - 15, 15)
  ctx.fillStyle = colors.black
  ctx.font = '12px serif'
  ctx.fillText(fps, 0, 0)
  ctx.restore()
}
