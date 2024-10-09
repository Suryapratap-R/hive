import React, { useRef, useEffect } from "react";


const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Rendering logic will go here
      requestAnimationFrame(render);
    };
    render();
  }, []);
  return <canvas ref={canvasRef} width={800} height={600} />;
};
export default Canvas;
