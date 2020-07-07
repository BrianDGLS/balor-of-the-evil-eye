import { keys } from './keyboard'
import { clamp } from './utils'

export class Player {
  x = 32
  y = 256
  vy = 0
  vx = 0
  speed = 4
  state: 'run' | 'idle' | 'jump' | 'hurt' = 'idle'
  direction: 'right' | 'left' = 'right'
}

export const updatePlayer = (player: Player) => {
  if (keys.isDown(keys.RIGHT)) {
    player.vx = player.speed
    player.direction = 'right'
    player.state = 'run'
  } else if (keys.isDown(keys.LEFT)) {
    player.vx = -player.speed
    player.direction = 'left'
    player.state = 'run'
  } else if (keys.isDown(keys.SPACE)) {
    player.vy = -player.speed * 2
    player.state = 'jump'
  } else if (player.y < 256) {
    player.state = 'jump'
  } else {
    player.state = 'idle'
  }

  player.x += player.vx
  player.y += player.vy

  player.vx *= 0.01
  player.vx = clamp(player.vx, 0, player.speed)

  if (player.y <= 256) {
    player.vy += 0.05
  }
  player.vy = clamp(player.vy, 0, player.speed * 2)

  player.y = clamp(player.y, 0, 256)
}
