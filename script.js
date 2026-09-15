const player = document.querySelector('.player')
const scoreEl = document.getElementById('score')

const highScoreEl = document.getElementById('high-score')

const finalScoreEl = document.querySelector('.final-score')

const gameOver = document.querySelector('.game-over')

const startScreen = document.getElementById('start-screen')

const startBtn = document.getElementById('start-btn')

const restartBtn = document.getElementById('restart-btn')

const GRAVITY = 0.6
const JUMP_VELOCITY = -12
const GROUND_Y = 0

const container = document.querySelector('.game-container')
const OBSTACLE_SPEED = 4

const obstacleEl = document.createElement('div')
obstacleEl.className = 'obstacle'
container.appendChild(obstacleEl)

let velocityY = 0
let playerBottom = GROUND_Y
let isJumping = false
let gameRunning = false

let obstacleX = container.clientWidth

function jump() {
  if (isJumping) return
  isJumping = true
  velocityY = JUMP_VELOCITY
}

function updatePlayer() {
  if (!isJumping) return

  velocityY += GRAVITY
  playerBottom -= velocityY

  if (playerBottom <= GROUND_Y) {
    playerBottom = GROUND_Y
    velocityY = 0
    isJumping = false
  }

  player.style.bottom = `${30 + playerBottom}px`
}

function updateObstacle() {
  obstacleX -= OBSTACLE_SPEED
  obstacleEl.style.left = `${obstacleX}px`
}

function loop() {
  updatePlayer()
  updateObstacle()
  requestAnimationFrame(loop)
}

function startGame() {
  gameRunning = true
  startScreen.classList.add('hidden')
  requestAnimationFrame(loop)
}

startBtn.addEventListener('click', startGame)

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault()
    jump()
  }
})

requestAnimationFrame(loop)
