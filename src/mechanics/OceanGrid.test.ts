import { GridCoordinates } from "./GridCoordinates";
import { OceanGrid, OverlapsError } from "./OceanGrid";
import { Battleship } from "./Ship";
import { ShipPlacement } from "./ShipPlacement";

describe("OceanGrid", () => {
  const oceanGridWithOneBattleship = new OceanGrid([
    new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "N"),
  ]);

  // @todo copy an array to meet requirement of not changin position during the game

  test("is type of OceanGrid", () => {
    expect(oceanGridWithOneBattleship).toBeInstanceOf(OceanGrid);
  });

  test("does not accept overlapping ships", () => {
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

  test("does not accept ships with overlapping bows", () => {
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
});
