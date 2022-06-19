import g from "./global.js";
import Shape from "./shape.js";

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

    const exportShape = document.getElementById('export');
    exportShape.addEventListener('click', () => {
      const txt = JSON.stringify(g.shapes);
      const file = new File([txt], 'logo.json', { type: 'text/plain' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });

    const importShape = document.getElementById('import');
    importShape.addEventListener('change', e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', e => {
        const shapes = JSON.parse(e.target.result);
        for(let i=0; i<shapes.length; i++) {
          let s = new Shape(shapes[i].x, shapes[i].y, shapes[i].shape, shapes[i].color);
          g.shapes.push(s);
        }
      });
      reader.readAsText(file);
    });

    const clear = document.getElementById('clear');
    clear.addEventListener('click', () => {
      g.shapes = [];
      g.ctx.clearRect(0, 0, g.CANVAS_SIZE, g.CANVAS_SIZE);
    });
  }
}

export default Tool;