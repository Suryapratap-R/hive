import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import Canvas from "~/components/Canvas";
import { Tile } from "~/components/Tile";
import TileControls from "~/components/TileControls";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Canvas width={800} height={600} />
    </div>
  );
}
