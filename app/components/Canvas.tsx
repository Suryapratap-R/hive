import { useRef, useEffect } from "react";
import { Camera } from "./Camera";
import { drawHexagon } from "~/utils/hexagonUtils";
const drawGrid = (ctx: CanvasRenderingContext2D) => {
  const hexSize = 60;
  const horizontalSpacing = hexSize * Math.sqrt(3);
  const verticalSpacing = hexSize * 1.5;
  ctx.lineWidth = 2;
  ctx.strokeStyle = "oklch(96.48% 0.0171875 90)";
  for (let row = 0; row < 30; row++) {
    for (let col = 0; col < 30; col++) {
      const x = col * horizontalSpacing + (row % 2) * (horizontalSpacing / 2);
      const y = row * verticalSpacing;
      drawHexagon(ctx, x, y, hexSize);
    }
  }
};
const Canvas = ({ width, height }: { width: number; height: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef(new Camera());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const camera = cameraRef.current;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      camera.zoomAt(x, y, factor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.buttons === 1) {
        camera.pan(-e.movementX, -e.movementY);
      }
    };

    canvas.addEventListener("wheel", handleWheel);
    canvas.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      camera.applyToContext(ctx);

      drawGrid(ctx);

      ctx.restore();
      requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas;
