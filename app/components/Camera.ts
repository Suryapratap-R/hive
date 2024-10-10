export class Camera {
  x: number = 0;
  y: number = 0;
  zoom: number = 1;
  pan(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }
  zoomAt(x: number, y: number, factor: number) {
    const minZoom = 0.3;
    const scale = Math.max(this.zoom * factor, minZoom);
    this.x = x - (x - this.x) * (scale / this.zoom);
    this.y = y - (y - this.y) * (scale / this.zoom);
    this.zoom = scale;
  }
  applyToContext(ctx: CanvasRenderingContext2D) {
    ctx.setTransform(
      this.zoom,
      0,
      0,
      this.zoom,
      -this.x * this.zoom,
      -this.y * this.zoom
    );
  }
}
