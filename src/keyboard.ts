class KeyBoard {
  private _pressed: { [key: string]: boolean } = {}

  LEFT = 'ArrowLeft'
  UP = 'ArrowUp'
  RIGHT = 'ArrowRight'
  DOWN = 'ArrowDown'
  SPACE = ' '

  isDown(keyCode: string) {
    return this._pressed[keyCode]
  }

  onKeydown(e: KeyboardEvent) {
    this._pressed[e.key] = true
  }

  onKeyup(e: KeyboardEvent) {
    delete this._pressed[e.key]
  }
}

export const keys = new KeyBoard()

window.addEventListener('keyup', (e) => keys.onKeyup(e))
window.addEventListener('keydown', (e) => keys.onKeydown(e))
