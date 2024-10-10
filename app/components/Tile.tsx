import React from 'react';

interface TileProps {
  x: number;
  y: number;
  selected: boolean;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ x, y, selected, onClick }) => {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
      className={`tile ${selected ? 'selected' : ''}`}
    >
      {/* Placeholder hexagon SVG */}
      <polygon
        points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15"
        fill={selected ? '#ff9999' : '#cccccc'}
        stroke="#000000"
        strokeWidth="2"
      />
    </g>
  );
};

export default Tile;