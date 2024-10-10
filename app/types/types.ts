export interface HexCoordinates {
    q: number;
    r: number;
    s: number;
  }
  
  export interface Position {
    x: number;
    y: number;
  }
  
  export interface Tile {
    id: string;
    x: number;
    y: number;
    type: string;
  }
  
  export interface Connection {
    id: string;
    fromTile: string;
    toTile: string;
  }