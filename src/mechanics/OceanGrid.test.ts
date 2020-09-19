import { GridCoordinates } from "./GridCoordinates";
import { OceanGrid } from "./OceanGrid";
import { Battleship } from "./Ship";
import { ShipPlacement } from "./ShipPlacement";

describe("OceanGrid", () => {
  test("must specify fleet", () => {
    new OceanGrid([
      new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "N"),
    ]);
  });
});
