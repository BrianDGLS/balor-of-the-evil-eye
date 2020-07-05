import { State } from './state-machine'

export const start = (callback: (timestamp: number) => void) => {
  State.loop = requestAnimationFrame(callback)
}

export const stop = () => {
  cancelAnimationFrame(State.loop)
}
