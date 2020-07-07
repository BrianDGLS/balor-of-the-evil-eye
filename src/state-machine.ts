import { Player } from './player'

export const State: { [key: string]: any } = {
  $canvas: document.querySelector('canvas') as HTMLCanvasElement,

  game: {
    playing: false,
    player: new Player(),
  },

  hasStoredProgress: false,

  loop: 0,
  debugMode: true,
  lastLoop: new Date(),
  currentLoop: new Date(),
}

const initialState = Object.create(State)

export const resetState = () => {
  for (const key in initialState) {
    State[key] = initialState[key]
  }
}
