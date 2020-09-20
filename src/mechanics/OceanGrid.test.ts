import { GridCoordinates } from "./GridCoordinates";
import { OceanGrid, OverlapsError } from "./OceanGrid";
import { Battleship, Destroyer } from "./Ship";
import { ShipPlacement } from "./ShipPlacement";

describe("OceanGrid", () => {
  // @todo copy an array to meet requirement of not changin position during the game

  test("does not accept two ships with overlapping bows", () => {
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

  test("does not accept two overlapping completly ships", () => {
    expect(
      () =>
        new OceanGrid([
          new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "N"),
          new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "N"),
        ])
    ).toThrowError(
      new OverlapsError(
        "Battleship('A', 1, 'N') is overlapped by Battleship('A', 1, 'N')"
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

  test("does not accept two ships with overlapping sterns", () => {
    expect(
      () =>
        new OceanGrid([
          new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "N"),
          new ShipPlacement(new Destroyer(), new GridCoordinates("E", 4), "E"),
        ])
    ).toThrowError(
      new OverlapsError(
        "Battleship('A', 1, 'N') is overlapped by Destroyer('E', 4, 'E')"
      )
    );
  });

  test("does not accept two ships with overlapping stern and bow", () => {
    expect(
      () =>
        new OceanGrid([
          new ShipPlacement(new Destroyer(), new GridCoordinates("A", 2), "N"),
          new ShipPlacement(new Battleship(), new GridCoordinates("D", 2), "W"),
        ])
    ).toThrowError(
      new OverlapsError(
        "Destroyer('A', 2, 'N') is overlapped by Battleship('D', 2, 'W')"
      )
    );
  });

  test("does not accept two ships with overlapping bow and stern", () => {
    expect(
      () =>
        new OceanGrid([
          new ShipPlacement(new Destroyer(), new GridCoordinates("D", 2), "S"),
          new ShipPlacement(new Battleship(), new GridCoordinates("D", 6), "E"),
        ])
    ).toThrowError(
      new OverlapsError(
        "Destroyer('D', 2, 'S') is overlapped by Battleship('D', 6, 'E')"
      )
    );
  });
});
