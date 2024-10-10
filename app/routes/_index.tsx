import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import Canvas from "~/components/Canvas";
import HexGrid from "~/components/HexGrid";
import TileControls from "~/components/TileControls";
import { GridProvider, useGridContext } from "~/context/GridContext";
import { Tile } from "~/types/Tile";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
const GridWithControls = () => {
  const { dispatch } = useGridContext();

  const handleAddTile = (color: string) => {
    const newTile = new Tile(0, 0, color); // You may want to set initial position
    dispatch({ type: "ADD_TILE", payload: newTile });
  };

  return (
    <>
      <HexGrid width={800} height={600} />
      <TileControls onAddTile={handleAddTile} />
    </>
  );
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <GridProvider>
        <GridWithControls />
      </GridProvider>
    </div>
  );
}
