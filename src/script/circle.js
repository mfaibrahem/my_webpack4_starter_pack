
const UIcanvas = document.querySelector('canvas');
const ctx = UIcanvas.getContext('2d');

// private props
const _x = new WeakMap();
const _y = new WeakMap();
const _r = new WeakMap();
const _dx = new WeakMap();
const _dy = new WeakMap();
const _color = new WeakMap();
const _gravity = new WeakMap();
const _friction = new WeakMap();

// private methods
const _draw = new WeakMap();
const _udpate = new WeakMap();
class Circle {
  constructor(x, y, r, dx, dy) {
    _x.set(this, x);
    _y.set(this, y);
    _r.set(this, r);
    _dx.set(this, dx);
    _dy.set(this, dy);
    _color.set(this, randomColor());
    _gravity.set(this, 1);
    _friction.set(this, .99)

    _draw.set(this, () => {
      ctx.beginPath();
      ctx.arc(_x.get(this), _y.get(this), _r.get(this), 0, Math.PI*2, false);
      ctx.fillStyle = _color.get(this);
      ctx.fill();
      ctx.stroke();
    });

    _udpate.set(this, () => {
      _draw.get(this)();
      if (_x.get(this)+_r.get(this) > UIcanvas.width || _x.get(this)-_r.get(this) < 0)
          _dx.set(this, _dx.get(this)*-1);
      if (_y.get(this)+_r.get(this) + _dy.get(this) > UIcanvas.height || _y.get(this)-_r.get(this) < 0)
          _dy.set(this, _dy.get(this) * -1 * _friction.get(this));
      else 
          _dy.set(this, _dy.get(this)+_gravity.get(this));
      _x.set(this, _x.get(this)+_dx.get(this))
      _y.set(this, _y.get(this)+_dy.get(this));
    });
  }

  // getter 
  get update() {
    return _udpate.get(this)();
  }

}









function randomColor() {
  return `
    hsla(
      ${Math.round(Math.random()*240)},
      ${Math.round(Math.random()*100)}%,
      ${Math.round(Math.random()*100)}%,
      ${Math.random()}
    )
  `;
}

function randomNum(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

export { Circle, randomNum };