import { play, pause, startNewGame } from './game'
import { mergeStoredState, storeState } from './local-storage'

export function createGameMenu(): void {
  const $newGameButton = document.querySelector('.new-game') as HTMLElement
  const $continueButton = document.querySelector('.continue') as HTMLElement

  const $playGameButton = document.querySelector('.play-game') as HTMLElement
  const $pauseGameButton = document.querySelector('.pause-game') as HTMLElement

  const showElement = ($el: HTMLElement) => {
    $el.classList.remove('hide')
  }

  const hideElement = ($el: HTMLElement) => {
    $el.classList.add('hide')
  }

  $newGameButton.addEventListener('click', () => {
    startNewGame()

    storeState()
    hideElement($continueButton)
    hideElement($playGameButton)
    showElement($pauseGameButton)
  })

  $pauseGameButton.addEventListener('click', () => {
    pause()

    storeState()
    hideElement($pauseGameButton)
    showElement($playGameButton)
  })

  $playGameButton.addEventListener('click', () => {
    play()

    storeState()
    hideElement($playGameButton)
    showElement($pauseGameButton)
  })

  $continueButton.addEventListener('click', () => {
    mergeStoredState()

    play()

    storeState()
    hideElement($continueButton)
    hideElement($playGameButton)
    showElement($pauseGameButton)
  })
}
