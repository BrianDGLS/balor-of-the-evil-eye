export const renderBackground = (ctx: CanvasRenderingContext2D) => {
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export const renderFPS = (ctx: CanvasRenderingContext2D, fps: string) => {
  ctx.save()
  ctx.translate(ctx.canvas.width - 15, 15)
  ctx.fillStyle = 'white'
  ctx.font = '12px serif'
  ctx.fillText(fps, 0, 0)
  ctx.restore()
}
