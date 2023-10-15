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
  g.canvas = canvas;

  let pointerIsOn = false;
  let pointerIsIn = false;
  let lastPlotXY = [0, 0];

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

    // for (let i = 0; i < g.shapes.length; i++) {
    for (let i = 0; i < Math.min((g.shapesIndex + 1), g.shapes.length); i++) {
      g.shapes[i].draw();
    }

    requestAnimationFrame(update);
  }

  const forkShapes = _ => {
    if (g.shapesIndex != g.shapes.length - 1) {
      g.shapes.splice(g.shapesIndex + 1);
    }
  }

  // TODO: touch devices
  canvas.addEventListener('mouseleave', e => {
    pointerIsIn = false;
  });

  canvas.addEventListener('mouseenter', e => {
    pointerIsIn = true;
    pointerIsOn = e.buttons > 0;
  });

  canvas.addEventListener('mousedown', e => {
    pointerIsOn = true;
  });

  canvas.addEventListener('mouseup', e => {
    if (pointerIsOn && pointerIsIn) {
      const sx = snap(e.offsetX);
      const sy = snap(e.offsetY);

      if (Math.abs(lastPlotXY[0] - sx) > (g.GRID_SIZE / 2) || Math.abs(lastPlotXY[1] - sy) > (g.GRID_SIZE / 2)) {
        forkShapes();

        let s = new Shape(sx, sy, g.currentMode, g.currentColor);
        g.shapes.push(s);
        g.shapesIndex = g.shapes.length - 1;
      }
    }
    lastPlotXY = [0, 0];
    pointerIsOn = false;
  });

  canvas.addEventListener('mousemove', e => {
    if (pointerIsOn && pointerIsIn) {
      const sx = snap(e.offsetX);
      const sy = snap(e.offsetY);

      if (Math.abs(lastPlotXY[0] - sx) > (g.GRID_SIZE / 2) || Math.abs(lastPlotXY[1] - sy) > (g.GRID_SIZE / 2)) {
        forkShapes();

        let s = new Shape(sx, sy, g.currentMode, g.currentColor);
        g.shapes.push(s);
        g.shapesIndex = g.shapes.length - 1;
        lastPlotXY = [sx, sy];
      }
    }
  });
  // --

  document.addEventListener('keydown', (e) => {
    const { ctrlKey, shiftKey, code } = e;

    if (ctrlKey && !shiftKey && code == 'KeyZ') {
      g.shapesIndex = Math.max(-1, g.shapesIndex - 1);
      lastPlotXY = [0, 0];
    } else if (ctrlKey && shiftKey && code == 'KeyZ') {
      g.shapesIndex = Math.min(g.shapes.length - 1, g.shapesIndex + 1);
      lastPlotXY = [0, 0];
    }
  });

  requestAnimationFrame(update);
});
