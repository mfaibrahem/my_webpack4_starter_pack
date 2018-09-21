import { Circle, randomNum } from './circle';

const UIcanvas = document.querySelector('canvas');
const ctx = UIcanvas.getContext('2d');

function resizeCanvas() {
  UIcanvas.width = window.innerWidth;
  UIcanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => {
  resizeCanvas();
  init();
});
window.addEventListener('click', init);

let ballArray;
function init() {
ballArray = [];
  for (let i=0; i<500; i++) {
    let r = randomNum(10, 15);
    let x = Math.random()*(UIcanvas.width - 2*r) + r;
    let y = Math.random()*(UIcanvas.height - 2*r) + r;
    let dx = randomNum(-2, 2);
    let dy = randomNum(-2, 2);
    ballArray.push(new Circle(x, y, r, dx, dy));
  }

}
init();

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ballArray.forEach(ball => ball.update);
}
console.log(ballArray);

export { animate };