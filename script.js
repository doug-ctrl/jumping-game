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
let obstacleSpeed = 4
const MAX_OBSTACLE_SPEED = 12
const MIN_OBSTACLE_HEIGHT = 24
const MAX_OBSTACLE_HEIGHT = 50
const SPEED_INCREMENT = 0.001

const obstacleEl = document.createElement('div')
obstacleEl.className = 'obstacle'
container.appendChild(obstacleEl)

function randomizeObstacleHeight() {
  const height = Math.floor(Math.random() * (MAX_OBSTACLE_HEIGHT - MIN_OBSTACLE_HEIGHT + 1)) + MIN_OBSTACLE_HEIGHT
  obstacleEl.style.height = `${height}px`
}

randomizeObstacleHeight()

let velocityY = 0
let playerBottom = GROUND_Y
let isJumping = false
let gameRunning = false
let score = 0

let obstacleX = container.clientWidth
let obstaclePassed = false

function jump() {
  if (!gameRunning || isJumping) return
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
  obstacleX -= obstacleSpeed

  const playerLeft = player.getBoundingClientRect().left - container.getBoundingClientRect().left

  if (!obstaclePassed && obstacleX + 20 < playerLeft) {
    score++
    scoreEl.textContent = score
    obstaclePassed = true
  }

  if (obstacleX < -20) {
    obstacleX = container.clientWidth + Math.random() * 300
    obstaclePassed = false
    randomizeObstacleHeight()
  }

  if (obstacleSpeed < MAX_OBSTACLE_SPEED) {
    obstacleSpeed += SPEED_INCREMENT
  }

  obstacleEl.style.left = `${obstacleX}px`
}


function checkCollision() {
  const playerRect = player.getBoundingClientRect()
  const obstacleRect = obstacleEl.getBoundingClientRect()

  if (
    playerRect.left < obstacleRect.right &&
    playerRect.right > obstacleRect.left &&
    playerRect.top < obstacleRect.bottom &&
    playerRect.bottom > obstacleRect.top
  ) {
    return true
  }
  return false
}

function loop(timestamp) {
  if (!gameRunning) return

  updatePlayer()
  updateObstacle()

  if (checkCollision()) {
    endGame()
    return
  }

  requestAnimationFrame(loop)
}


function startGame() {
  gameRunning = true
  startScreen.classList.add('hidden')
  requestAnimationFrame(loop)
}

startBtn.addEventListener('click', startGame)

function resetGame() {
  score = 0
  scoreEl.textContent = score
  obstacleX = container.clientWidth
  playerBottom = GROUND_Y
  velocityY = 0
  isJumping = false
  obstaclePassed = false
  player.style.bottom = `${30 + GROUND_Y}px`
  obstacleSpeed = 4

  gameOver.classList.add('hidden')
  gameRunning = true
  requestAnimationFrame(loop)
}

restartBtn.addEventListener('click', resetGame)

function endGame() {
  if (score > parseInt(highScoreEl.textContent)) {
    highScoreEl.textContent = score
  }
  gameRunning = false
  gameOver.classList.remove('hidden')
  finalScoreEl.textContent = `Final Score: ${score}`
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault()
    jump()
  }
})
