import { State } from './state-machine'

export const getFPS = () => {
  const currentLoop = new Date()
  const fps = 1000 / (currentLoop.getMilliseconds() - State.lastLoop.getMilliseconds())
  State.lastLoop = currentLoop
  return Math.round(fps).toString()
}
