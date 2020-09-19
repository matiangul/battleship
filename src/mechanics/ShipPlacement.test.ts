import { GridCoordinates } from "./GridCoordinates";
import { Battleship, Destroyer } from "./Ship";
import { ShipPlacement } from "./ShipPlacement";

describe("ShipPlacement", () => {
  const battleshipPlacement = new ShipPlacement(
    new Battleship(),
    new GridCoordinates("A", 5),
    "N"
  );
  const destroyerPlacement = new ShipPlacement(
    new Destroyer(),
    new GridCoordinates("I", 3),
    "W"
  );
  const center = new GridCoordinates("E", 5);
  const topLeft = new GridCoordinates("A", 1);
  const bottomRight = new GridCoordinates("J", 10);

  test("is type of ShipPlacement", () => {
    expect(battleshipPlacement).toBeInstanceOf(ShipPlacement);
    expect(destroyerPlacement).toBeInstanceOf(ShipPlacement);
  });

  test("accepts N, E, S, W directions", () => {
    ["N", "E", "S", "W"].forEach(
      (direction) => new ShipPlacement(new Destroyer(), center, direction)
    );
  });

  test("does not accept other letters", () => {
    ["Z", "A", "Y", "Q"].forEach((direction) =>
      expect(
        () => new ShipPlacement(new Destroyer(), center, direction)
      ).toThrowError(
        new TypeError("ShipPlacement.direction must be one of N,E,S,W")
      )
    );
  });

  test("does not accept diagonal directions", () => {
    ["NE", "NW", "SE", "SW"].forEach((direction) =>
      expect(
        () => new ShipPlacement(new Destroyer(), center, direction)
      ).toThrowError(
        new TypeError("ShipPlacement.direction must be one of N,E,S,W")
      )
    );
  });

  test("does not accept stern with coordinates too far in north", () => {
    expect(() => new ShipPlacement(new Destroyer(), topLeft, "S")).toThrowError(
      new RangeError("Ships stern has invalid GridCoordinates('=', 1)")
    );
  });

  test("does not accept stern with coordinates too far in west", () => {
    expect(() => new ShipPlacement(new Destroyer(), topLeft, "E")).toThrowError(
      new RangeError("Ships stern has invalid GridCoordinates('A', -3)")
    );
  });

  test("does not accept stern with coordinates too far in south", () => {
    expect(
      () => new ShipPlacement(new Destroyer(), bottomRight, "N")
    ).toThrowError(
      new RangeError("Ships stern has invalid GridCoordinates('N', 10)")
    );
  });

  test("does not accept stern with coordinates too far in east", () => {
    expect(
      () => new ShipPlacement(new Destroyer(), bottomRight, "W")
    ).toThrowError(
      new RangeError("Ships stern has invalid GridCoordinates('J', 14)")
    );
  });
});
