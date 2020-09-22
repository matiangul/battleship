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
          new ShipPlacement(new Battleship(), new GridCoordinates("D", 4), "W"),
          new ShipPlacement(new Destroyer(), new GridCoordinates("J", 10), "S"),
        ])
    ).not.toThrow();
  });

  test("accepts just one ship", () => {
    expect(
      () =>
        new OceanGrid([
          new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "N"),
        ])
    ).not.toThrow();
  });

  test("accepts no ships at all", () => {
    expect(() => new OceanGrid([])).not.toThrow();
  });

  test("does not accept four ships with first one overlapped by last one", () => {
    expect(
      () =>
        new OceanGrid([
          new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "N"),
          new ShipPlacement(new Destroyer(), new GridCoordinates("J", 10), "S"),
          new ShipPlacement(new Destroyer(), new GridCoordinates("D", 2), "W"),
          new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "W"),
        ])
    ).toThrowError(
      new OverlapsError(
        "Battleship('A', 1, 'N') is overlapped by Battleship('A', 1, 'W')"
      )
    );
  });

  test("does not accept three ships with second one overlapped by last one", () => {
    expect(
      () =>
        new OceanGrid([
          new ShipPlacement(new Battleship(), new GridCoordinates("H", 9), "S"),
          new ShipPlacement(new Battleship(), new GridCoordinates("A", 2), "N"),
          new ShipPlacement(new Battleship(), new GridCoordinates("D", 2), "W"),
        ])
    ).toThrowError(
      new OverlapsError(
        "Battleship('A', 2, 'N') is overlapped by Battleship('D', 2, 'W')"
      )
    );
  });
});
