const player = document.querySelector('.player');

const GRAVITY = 0.6;
const JUMP_VELOCITY = -12;
const GROUND_Y = 0;

let velocityY = 0;
let playerBottom = GROUND_Y;
let isJumping = false;

function jump() {
  if (isJumping) return;
  isJumping = true;
  velocityY = JUMP_VELOCITY;
}

function updatePlayer() {
  if (!isJumping) return;

  velocityY += GRAVITY;
  playerBottom -= velocityY;

  if (playerBottom <= GROUND_Y) {
    playerBottom = GROUND_Y;
    velocityY = 0;
    isJumping = false;
  }

  player.style.bottom = `${30 + playerBottom}px`;
}

function loop() {
  updatePlayer();
  requestAnimationFrame(loop);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    jump();
  }
});

requestAnimationFrame(loop);