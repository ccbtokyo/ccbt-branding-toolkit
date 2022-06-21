import Shape from './shape.js';
import g from './global.js';
import Tool from './tool.js';

window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas');
  g.ctx = canvas.getContext('2d');

  new Tool();

  const snap = x => {
    return Math.floor(x / g.GRID_SIZE) * g.GRID_SIZE;
  }

  const update = () => {
    g.ctx.clearRect(0, 0, g.CANVAS_WIDTH, g.CANVAS_HEIGHT);
    if (g.grid) {
      g.ctx.strokeStyle = `rgb(127, 127, 127)`;
      for (let i = 0; i <= g.GRID_H; i++) {
        g.ctx.beginPath();
        g.ctx.moveTo(i * g.GRID_SIZE, 0);
        g.ctx.lineTo(i * g.GRID_SIZE, g.CANVAS_HEIGHT);
        g.ctx.stroke();
      }

      for (let j = 0; j <= g.GRID_V; j++) {
        g.ctx.beginPath();
        g.ctx.moveTo(0, j * g.GRID_SIZE);
        g.ctx.lineTo(g.CANVAS_WIDTH, j * g.GRID_SIZE);
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