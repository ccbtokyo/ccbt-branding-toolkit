import g from "./global.js";

class Shape {
  constructor(x, y, mode, color) {
    this.x = x;
    this.y = y;
    this.type = parseInt(mode);
    this.color = color;
    this.angle = 0;
    this.hScale = 1.0;
    this.vScale = 1.0;
  }

  draw = () => {
    g.ctx.save();
    g.ctx.beginPath();
    g.ctx.fillStyle = this.color;
    g.ctx.translate(this.x + g.GRID_SIZE / 2, this.y + g.GRID_SIZE / 2);
    g.ctx.rotate(this.angle);
    g.ctx.translate(-this.x - g.GRID_SIZE / 2, -this.y - g.GRID_SIZE / 2);
    switch (this.type) {
      case 0: // rect
        g.ctx.fillRect(this.x, this.y, g.GRID_SIZE * this.hScale, g.GRID_SIZE * this.vScale);
        break;
      case 1: // circle
        g.ctx.ellipse(
          this.x - g.GRID_SIZE / 2 * this.hScale + g.GRID_SIZE * this.hScale,
          this.y - g.GRID_SIZE / 2 * this.vScale + g.GRID_SIZE * this.vScale,
          g.GRID_SIZE / 2 * this.hScale,
          g.GRID_SIZE / 2 * this.vScale,
          0,
          0, Math.PI * 2, 0);
        g.ctx.fill();
        break;
      case 2: // arc upper left
        g.ctx.ellipse(this.x + g.GRID_SIZE * this.hScale, this.y + g.GRID_SIZE * this.vScale,
          g.GRID_SIZE * this.hScale,
          g.GRID_SIZE * this.vScale,
          0,
          Math.PI, Math.PI + Math.PI / 2, 0);
        g.ctx.lineTo(this.x + g.GRID_SIZE * this.hScale, this.y + g.GRID_SIZE * this.vScale);
        g.ctx.fill();
        break;
      case 3: // arc upper right
        g.ctx.ellipse(this.x, this.y + g.GRID_SIZE * this.vScale,
          g.GRID_SIZE * this.hScale,
          g.GRID_SIZE * this.vScale,
          0,
          Math.PI + Math.PI / 2, Math.PI * 2, 0);
        g.ctx.lineTo(this.x, this.y + g.GRID_SIZE * this.vScale);
        g.ctx.fill();
        break;
      case 4: // arc lower left
        g.ctx.ellipse(this.x + g.GRID_SIZE * this.hScale, this.y,
          g.GRID_SIZE * this.hScale,
          g.GRID_SIZE * this.vScale,
          0,
          Math.PI / 2, Math.PI, 0);
        g.ctx.lineTo(this.x + g.GRID_SIZE * this.hScale, this.y);
        g.ctx.fill();
        break;
      case 5: // arc lower right
        g.ctx.ellipse(this.x, this.y,
          g.GRID_SIZE * this.hScale,
          g.GRID_SIZE * this.vScale,
          0,
          0, Math.PI / 2, 0);
        g.ctx.lineTo(this.x, this.y);
        g.ctx.fill();
        break;
      case 6: // triangle upper left
        g.ctx.lineTo(this.x + g.GRID_SIZE * this.hScale, this.y);
        g.ctx.lineTo(this.x + g.GRID_SIZE * this.hScale, this.y + g.GRID_SIZE * this.vScale);
        g.ctx.lineTo(this.x, this.y + g.GRID_SIZE * this.vScale);
        g.ctx.fill();
        break;
      case 7: // triangle upper right
        g.ctx.moveTo(this.x, this.y);
        g.ctx.lineTo(this.x + g.GRID_SIZE * this.hScale, this.y + g.GRID_SIZE * this.vScale);
        g.ctx.lineTo(this.x, this.y + g.GRID_SIZE * this.vScale);
        g.ctx.fill();
        break;
      case 8: // triangle lower left
        g.ctx.lineTo(this.x, this.y);
        g.ctx.lineTo(this.x + g.GRID_SIZE * this.hScale, this.y);
        g.ctx.lineTo(this.x + g.GRID_SIZE * this.hScale, this.y + g.GRID_SIZE * this.vScale);
        g.ctx.fill();
        break;
      case 9: // triangle lower right
        g.ctx.lineTo(this.x, this.y);
        g.ctx.lineTo(this.x + g.GRID_SIZE * this.hScale, this.y);
        g.ctx.lineTo(this.x, this.y + g.GRID_SIZE * this.vScale);
        g.ctx.fill();
        break;
      default:
        g.ctx.fillRect(this.x, this.y, g.GRID_SIZE * this.vScale, g.GRID_SIZE * this.hScale);
    }
    g.ctx.restore();
  }
}

export default Shape;