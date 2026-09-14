const player = document.querySelector('.player');

const GRAVITY = 0.6;
const JUMP_VELOCITY = -12;
const GROUND_Y = 0;

let velocityY = 0;
let playerBottom = GROUND_Y;
let isJumping = false;