import { Game } from './game'

export function createGameMenu(game: Game): void {
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
    game.new()

    hideElement($newGameButton)
    hideElement($continueButton)
    showElement($pauseGameButton)
  })

  $pauseGameButton.addEventListener('click', () => {
    game.pause()

    hideElement($pauseGameButton)
    showElement($playGameButton)
  })

  $playGameButton.addEventListener('click', () => {
    game.play()

    hideElement($playGameButton)
    showElement($pauseGameButton)
  })
}
