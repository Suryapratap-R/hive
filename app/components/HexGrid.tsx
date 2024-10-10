import React, { useRef, useEffect, useState } from "react";
import { useGridContext } from "~/context/GridContext";
import { Tile } from "~/types/Tile";
import { Position } from "~/types/types";
import { getSnapPosition, getTileAtPosition } from "~/utils/gridUtils";
import { drawGrid } from "~/utils/renderUtils/drawHexGrid";
import { Camera } from "./Camera";

const HexGrid = ({ width, height }: { width: number; height: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, dispatch } = useGridContext();
  const [draggingTile, setDraggingTile] = useState<Tile | null>(null);
  const [mousePosition, setMousePosition] = useState<Position | null>(null);
  const cameraRef = useRef(new Camera());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const camera = cameraRef.current;

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / camera.zoom + camera.x;
      const y = (e.clientY - rect.top) / camera.zoom + camera.y;
      const tile = getTileAtPosition(state.tiles, x, y);
      if (tile) {
        setDraggingTile(tile);
        setMousePosition({ x, y });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / camera.zoom + camera.x;
      const y = (e.clientY - rect.top) / camera.zoom + camera.y;

      if (draggingTile) {
        setMousePosition({ x, y });
      } else if (e.buttons === 1) {
        camera.pan(-e.movementX / camera.zoom, -e.movementY / camera.zoom);
      }
    };

    const handleMouseUp = () => {
      if (draggingTile && mousePosition) {
        const newPosition = getSnapPosition(
          mousePosition.x,
          mousePosition.y,
          camera.zoom
        );
        const updatedTile = new Tile(
          newPosition.x,
          newPosition.y,
          draggingTile.color
        );
        updatedTile.id = draggingTile.id;
        dispatch({
          type: "MOVE_TILE",
          payload: updatedTile,
        });
        setDraggingTile(null);
        setMousePosition(null);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      camera.zoomAt(x, y, factor);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("wheel", handleWheel);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [state.tiles, draggingTile, mousePosition, dispatch]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const camera = cameraRef.current;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      camera.applyToContext(ctx);

      drawGrid(ctx);

      state.tiles.forEach((tile) => {
        if (tile === draggingTile && mousePosition) {
          const draggedTile = new Tile(
            mousePosition.x,
            mousePosition.y,
            tile.color
          );
          draggedTile.draw(ctx, 30, true);
        } else {
          tile.draw(ctx, 30, false);
        }
      });

      ctx.restore();
      requestAnimationFrame(render);
    };

    render();
  }, [state.tiles, draggingTile, mousePosition]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default HexGrid;
