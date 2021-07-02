const DENSITY = 120;
const AMOUNT = 20;
const INTERVAL = 14000/DENSITY;
const cage = document.getElementById('cage');
const EMOJIS = ['👏', '👌 ', '🥇', '🎊', '🎉 ', '💯', '💵'];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wW = window.innerWidth;
const wH = window.innerHeight;

// ctx.scale(2, 2);

const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const confetties = [];

class Confetti {
  constructor(width, height, emoji, speed, x, y, rotation) {
    this.width = width;
    this.height = height;
    this.emoji = emoji;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.dirX = 1;
    this.dirY = 1;
  }

  update() {
    if(this.x + this.width > wW) {
      this.dirX = -this.speed;
    }
    if(this.x <= 0) {
      this.dirX = this.speed;
    }
    if(this.y + this.height > wH) {
      this.dirY = -this.speed;
    }
    if(this.y <= 0) {
      this.dirY = this.speed;
    }
    const y = this.y += this.dirY;
    const x = this.x += this.dirX;
    this.x = x;
    this.y = y;
    ctx.save();
    ctx.translate(x, y);
    ctx.drawImage(cage,0,0);
    ctx.restore();
  }
}

canvas.width = wW;
canvas.height = wH;

const drawConfetti = () => {
  ctx.clearRect(0, 0, wW, wH);

  confetties.forEach(confetti => {
    confetti.update();
  });

  if(confetties.length > 0) {
    requestAnimationFrame(drawConfetti);
  }
};

const renderConfetti = () => {
  let count = 0;
  let stagger = setInterval(() => {
    if(count < AMOUNT) {
      const x = random(0, wW);
      const speed = random(1, 2);
      const width = 210;
      const height = 250;
      const emoji = EMOJIS[randomInt(0, EMOJIS.length)];
      const confetti = new Confetti(width, height, emoji, speed, x, -20, 0);
      confetties.push(confetti);
    }
    else {
      clearInterval(stagger);
    }
    count++;
  }, INTERVAL);

  setTimeout(() => {
    drawConfetti();
  }, INTERVAL);
};

const dropConfetti = () => {
  renderConfetti();
};

dropConfetti();