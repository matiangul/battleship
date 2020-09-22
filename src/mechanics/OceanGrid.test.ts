import { GridCoordinates } from "./GridCoordinates";
import { OceanGrid, OverlapsError } from "./OceanGrid";
import { Battleship, Destroyer } from "./Ship";
import { ShipPlacement } from "./ShipPlacement";

describe("OceanGrid", () => {
  test("does not accept two ships that overlapps", () => {
    expect(
      () =>
        new OceanGrid([
          new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "N"),
          new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "W"),
        ])
    ).toThrowError(
      new OverlapsError(
        "Battleship('A', 1, 'N') is overlapped by Battleship('A', 1, 'W')"
      )
    );
  });

  test("accepts not overlapping ships", () => {
    expect(
      () =>
        new OceanGrid([
          new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "N"),
          new ShipPlacement(new Destroyer(), new GridCoordinates("J", 10), "S"),
        ])
    ).not.toThrow();
  });
});
