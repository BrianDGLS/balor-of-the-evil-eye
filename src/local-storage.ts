import { State } from './state-machine'

export const storeState = () => {
  localStorage.setItem('state', JSON.stringify(State.game))
}

export const getStoredState = () => {
  const storedState = localStorage.getItem('state')
  if (storedState) return JSON.parse(storedState)
}

export const hasStoredState = (): boolean => {
  return Boolean(localStorage.getItem('state'))
}

export const mergeStoredState = () => {
  if (hasStoredState()) {
    const storedState = getStoredState()
    for (const key in storedState) {
      if (key in State.game) {
        State.game[key] = storedState[key]
      }
    }
  }
}
