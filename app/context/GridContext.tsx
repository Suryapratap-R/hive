import React, { createContext, useReducer, useContext } from "react";
import { Tile } from "~/types/Tile";
import { Connection } from "~/types/types";

interface GridState {
  tiles: Tile[];
  connections: Connection[];
}
type Action =
  | { type: "ADD_TILE"; payload: Tile }
  | { type: "MOVE_TILE"; payload: Tile }
  | { type: "ADD_CONNECTION"; payload: Connection }
  | { type: "REMOVE_CONNECTION"; payload: string };

const GridContext = createContext<
  | {
      state: GridState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);
const gridReducer = (state: GridState, action: Action): GridState => {
  switch (action.type) {
    case "ADD_TILE":
      return { ...state, tiles: [...state.tiles, action.payload] };
    case "MOVE_TILE":
      return {
        ...state,
        tiles: state.tiles.map((tile) =>
          tile.id === action.payload.id ? action.payload : tile
        ),
      };
    case "ADD_CONNECTION":
      return { ...state, connections: [...state.connections, action.payload] };
    case "REMOVE_CONNECTION":
      return {
        ...state,
        connections: state.connections.filter(
          (conn) => conn.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export const GridProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gridReducer, {
    tiles: [],
    connections: [],
  });
  return (
    <GridContext.Provider value={{ state, dispatch }}>
      {children}
    </GridContext.Provider>
  );
};
export const useGridContext = () => {
  const context = useContext(GridContext);
  if (context === undefined) {
    throw new Error("useGridContext must be used within a GridProvider");
  }
  return context;
};
