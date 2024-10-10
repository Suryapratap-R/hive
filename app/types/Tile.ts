import { drawHexagon } from "~/utils/renderUtils/hexagonUtils";

export class Tile {
  public id: string;

  constructor(
    public x: number,
    public y: number,
    public color: string = "yellow"
  ) {
    this.id = `tile_${Math.random().toString(36).substr(2, 9)}`;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    hexSize: number,
    isDragging: boolean = false
  ) {
    ctx.fillStyle = isDragging ? "rgba(255, 255, 0, 0.5)" : this.color;
    drawHexagon(ctx, this.x, this.y, hexSize);
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}