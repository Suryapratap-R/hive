import React from "react";

interface TileControlsProps {
  onAddTile: (color: string) => void;
}

const TileControls: React.FC<TileControlsProps> = ({ onAddTile }) => {
  const colors = ["yellow", "red", "blue", "green"];

  return (
    <div>
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onAddTile(color)}
          style={{ backgroundColor: color }}
        >
          Add {color} tile
        </button>
      ))}
    </div>
  );
};

export default TileControls;
