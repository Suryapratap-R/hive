import { drawHexagon } from "./hexagonUtils";

export const drawGrid = (ctx: CanvasRenderingContext2D) => {
  const hexSize = 30;
  const horizontalSpacing = hexSize * Math.sqrt(3);
  const verticalSpacing = hexSize * 1.5;
  ctx.lineWidth = 2;
  ctx.strokeStyle = "oklch(72.66% 0.15 90 / .1)";
  for (let row = 0; row < 30; row++) {
    for (let col = 0; col < 30; col++) {
      const x = col * horizontalSpacing + (row % 2) * (horizontalSpacing / 2);
      const y = row * verticalSpacing;
      drawHexagon(ctx, x, y, hexSize);
    }
  }
};
