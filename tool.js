import g from "./global.js";

class Tool {
  constructor() {
    const buttons = document.querySelectorAll('#tool .mode');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () => {
        g.currentMode = buttons[i].value;
      });
    }

    const color = document.getElementById('color');
    color.addEventListener('input', () => {
      g.currentColor = color.value;
      g.ctx.fillStyle = color.value;
    });

    const toggleGrid = document.getElementById('toggle-grid');
    toggleGrid.addEventListener('change', () => {
      g.grid = toggleGrid.checked;
    });

    const rotate = document.getElementById('randomRotation');
    rotate.addEventListener('click', () => {
      for (let i = 0; i < g.shapes.length; i++) {
        g.shapes[i].angle = Math.random() * Math.PI * 2;
      }
    });

    const hSlider = document.getElementById('hslider');
    hSlider.addEventListener('input', () => {
      for (let i = 0; i < g.shapes.length; i++) {
        g.shapes[i].hScale = hSlider.value;
      }
    });

    const vSlider = document.getElementById('vslider');
    vSlider.addEventListener('input', () => {
      for (let i = 0; i < g.shapes.length; i++) {
        g.shapes[i].vScale = vSlider.value;
      }
    });

    const reset = document.getElementById('reset');
    reset.addEventListener('click', () => {
      for (let i = 0; i < g.shapes.length; i++) {
        g.shapes[i].vScale = 1;
        g.shapes[i].hScale = 1;
        g.shapes[i].angle = 0;
      }
    });

    const randShape = document.getElementById('randomShape');
    const shapeTypes = ['rect', 'circle', 'arc-ul', 'arc-ur', 'arc-lr', 'arc-ll', 'tri-ur', 'tri-ul', 'tri-lr', 'tri-ll'];
    randShape.addEventListener('click', () => {
      for (let i = 0; i < g.shapes.length; i++) {
        const shapeIndex = Math.floor(Math.random() * shapeTypes.length);
        g.shapes[i].type = shapeTypes[shapeIndex];
      }
    });
  }
}

export default Tool;