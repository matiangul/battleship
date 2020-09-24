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

  test("should know which ship occupies which GridCoordinates", () => {
    const first = new Battleship();
    const second = new Destroyer();
    const third = new Battleship();

    const ocean = new OceanGrid([
      new ShipPlacement(first, new GridCoordinates("A", 1), "N"),
      new ShipPlacement(second, new GridCoordinates("D", 4), "W"),
      new ShipPlacement(third, new GridCoordinates("J", 10), "S"),
    ]);

    expect(ocean.getShipOccuping(new GridCoordinates("A", 1))).toEqual(first);
    expect(ocean.getShipOccuping(new GridCoordinates("D", 7))).toEqual(second);
    expect(ocean.getShipOccuping(new GridCoordinates("H", 10))).toEqual(third);

    expect(ocean.getShipOccuping(new GridCoordinates("A", 2))).toBeUndefined();
  });

  test("should whether the ship is fully occupied by passed cords", () => {
    const first = new Battleship();
    const second = new Destroyer();
    const third = new Battleship();

    const ocean = new OceanGrid([
      new ShipPlacement(first, new GridCoordinates("A", 1), "N"),
      new ShipPlacement(second, new GridCoordinates("D", 4), "W"),
      new ShipPlacement(third, new GridCoordinates("J", 10), "S"),
    ]);

    expect(ocean.isShipFullyOccupiedBy(first, new Set([
      new GridCoordinates("A", 1).toString(),
      new GridCoordinates("B", 1).toString(),
      new GridCoordinates("C", 1).toString(),
      new GridCoordinates("D", 1).toString(),
      new GridCoordinates("E", 1).toString(),
    ]))).toBe(true);

    expect(ocean.isShipFullyOccupiedBy(first, new Set([
      new GridCoordinates("A", 1).toString(),
      new GridCoordinates("B", 1).toString(),
      new GridCoordinates("C", 1).toString(),
      new GridCoordinates("D", 1).toString(),
    ]))).toBe(false);

    expect(ocean.isShipFullyOccupiedBy(second, new Set([
      new GridCoordinates("D", 4).toString(),
      new GridCoordinates("D", 7).toString(),
      new GridCoordinates("D", 6).toString(),
      new GridCoordinates("D", 5).toString(),
    ]))).toBe(true);

    expect(ocean.isShipFullyOccupiedBy(third, new Set([
      new GridCoordinates("J", 10).toString(),
      new GridCoordinates("D", 1).toString(),
    ]))).toBe(false);
  });
});
