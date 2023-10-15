import Shape from './shape.js';
import g from './global.js';
import Tool from './tool.js';

window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas');
  const CANVAS_WIDTH = g.GRID_COLS * g.GRID_SIZE;
  const CANVAS_HEIGHT = g.GRID_ROWS * g.GRID_SIZE;
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  g.ctx = canvas.getContext('2d');

  new Tool();

  const snap = x => {
    return Math.floor(x / g.GRID_SIZE) * g.GRID_SIZE;
  }

  const update = () => {
    g.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (g.grid) {
      g.ctx.strokeStyle = `rgb(127, 127, 127)`;
      for (let i = 0; i <= g.GRID_COLS; i++) {
        g.ctx.beginPath();
        g.ctx.moveTo(i * g.GRID_SIZE, 0);
        g.ctx.lineTo(i * g.GRID_SIZE, CANVAS_HEIGHT);
        g.ctx.stroke();
      }

      for (let j = 0; j <= g.GRID_ROWS; j++) {
        g.ctx.beginPath();
        g.ctx.moveTo(0, j * g.GRID_SIZE);
        g.ctx.lineTo(CANVAS_WIDTH, j * g.GRID_SIZE);
        g.ctx.stroke();
      }
    }

    for (let i = 0; i < g.shapes.length; i++) {
      g.shapes[i].draw();
    }
    requestAnimationFrame(update);
  }

  canvas.addEventListener('click', e => {
    let s = new Shape(snap(e.offsetX), snap(e.offsetY), g.currentMode, g.currentColor);
    g.shapes.push(s);
  });

  requestAnimationFrame(update);
});