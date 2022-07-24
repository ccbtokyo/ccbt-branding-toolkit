import g from "./global.js";
import Shape from "./shape.js";

class Tool {
  constructor() {
    const buttons = document.querySelectorAll("#tool .mode");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", () => {
        g.currentMode = buttons[i].value;
        if (!buttons[i].classList.contains("selected")) {
          for (let j = 0; j < buttons.length; j++) {
            buttons[j].classList.remove("selected");
          }
          buttons[i].classList.add("selected");
        }
      });
    }

    const color = document.getElementById("color");
    color.addEventListener("input", () => {
      g.currentColor = color.value;
      g.ctx.fillStyle = color.value;
    });

    const toggleGrid = document.getElementById("toggle-grid");
    toggleGrid.addEventListener("change", () => {
      g.grid = toggleGrid.checked;
    });

    const exportShape = document.getElementById("export");
    exportShape.addEventListener("click", () => {
      const txt = JSON.stringify(g.shapes);
      const file = new File([txt], `ccbt-${Date.now()}.json`, { type: "text/plain" });
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });

    const importShape = document.getElementById("import");
    importShape.addEventListener("click", (e) => {
      const input = document.createElement("input");
      input.type = "file";
      input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          const shapes = JSON.parse(e.target.result);
          for (let i = 0; i < shapes.length; i++) {
            let s = new Shape(
              shapes[i].x,
              shapes[i].y,
              shapes[i].type,
              shapes[i].color
            );
            g.shapes.push(s);
          }
        });
        reader.readAsText(file);
      };
      input.click();
    });

    const clear = document.getElementById("clear");
    clear.addEventListener("click", () => {
      g.shapes = [];
      g.ctx.clearRect(0, 0, g.CANVAS_WIDTH, g.CANVAS_HEIGHT);
    });
  }
}

export default Tool;
