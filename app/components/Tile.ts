import { drawHexagon } from "~/utils/hexagonUtils";

export class Tile {
  constructor(
    public x: number,
    public y: number,
    public color: string = "yellow"
  ) {}
  draw(ctx: CanvasRenderingContext2D, hexSize: number) {
    ctx.fillStyle = this.color;
    drawHexagon(ctx, this.x, this.y, hexSize);
    ctx.fill();
  }
}
