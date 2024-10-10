import { useRef, useEffect, useState } from "react";
import { Camera } from "./Camera";
import { Tile } from "../types/Tile";
import TileControls from "./TileControls";
import { drawGrid } from "~/utils/renderUtils/drawHexGrid";


const Canvas = ({ width, height }: { width: number; height: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef(new Camera());

  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("yellow");

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x =
      (e.clientX - rect.left) / cameraRef.current.zoom + cameraRef.current.x;
    const y =
      (e.clientY - rect.top) / cameraRef.current.zoom + cameraRef.current.y;
    setTiles([...tiles, new Tile(x, y, selectedColor)]);
  };

  const handleAddTile = (color: string) => {
    setSelectedColor(color);
  };

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

      tiles.forEach((tile) => tile.draw(ctx, 30));

      ctx.restore();
      requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [tiles]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
      />
      <TileControls onAddTile={handleAddTile} />
    </div>
  );
};

export default Canvas;