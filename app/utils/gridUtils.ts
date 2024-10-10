import { Tile } from "~/types/Tile";
import { HexCoordinates, Position } from "~/types/types";

const HEX_SIZE = 30;

export function getSnapPosition(x: number, y: number, zoom: number): Position {
  const hexCoords = pixelToHex(x / zoom, y / zoom);
  const roundedCoords = roundHexCoordinates(hexCoords);
  const snappedPixel = hexToPixel(roundedCoords);
  return { x: snappedPixel.x * zoom, y: snappedPixel.y * zoom };
}

function pixelToHex(x: number, y: number): HexCoordinates {
  const q = ((x * Math.sqrt(3)) / 3 - y / 3) / HEX_SIZE;
  const r = (y * 2) / 3 / HEX_SIZE;
  return { q, r, s: -q - r };
}

function roundHexCoordinates(coords: HexCoordinates): HexCoordinates {
  let q = Math.round(coords.q);
  let r = Math.round(coords.r);
  let s = Math.round(coords.s);

  const q_diff = Math.abs(q - coords.q);
  const r_diff = Math.abs(r - coords.r);
  const s_diff = Math.abs(s - coords.s);

  if (q_diff > r_diff && q_diff > s_diff) {
    q = -r - s;
  } else if (r_diff > s_diff) {
    r = -q - s;
  } else {
    s = -q - r;
  }

  return { q, r, s };
}

function hexToPixel(coords: HexCoordinates): Position {
  const x =
    HEX_SIZE * (Math.sqrt(3) * coords.q + (Math.sqrt(3) / 2) * coords.r);
  const y = HEX_SIZE * ((3 / 2) * coords.r);
  return { x, y };
}

export function getTileAtPosition(
  tiles: Tile[],
  x: number,
  y: number
): Tile | null {
  return (
    tiles.find((tile) => {
      const dx = tile.x - x;
      const dy = tile.y - y;
      return Math.sqrt(dx * dx + dy * dy) < HEX_SIZE;
    }) || null
  );
}
