export class Camera {
  x: number = 0;
  y: number = 0;
  zoom: number = 1;

  pan(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  zoomAt(x: number, y: number, factor: number) {
    const oldZoom = this.zoom;
    this.zoom *= factor;
    this.x += (x - this.x) * (1 - factor);
    this.y += (y - this.y) * (1 - factor);
  }

  applyToContext(ctx: CanvasRenderingContext2D) {
    ctx.translate(-this.x, -this.y);
    ctx.scale(this.zoom, this.zoom);
  }
}
