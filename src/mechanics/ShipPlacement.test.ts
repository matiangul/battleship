import { GridCoordinates } from "./GridCoordinates";
import { Battleship, Destroyer } from "./Ship";
import { ShipPlacement } from "./ShipPlacement";

describe("ShipPlacement", () => {
  const center = new GridCoordinates("E", 5);
  const topLeft = new GridCoordinates("A", 1);
  const bottomRight = new GridCoordinates("J", 10);

  test("is type of ShipPlacement", () => {
    expect(
      new ShipPlacement(new Battleship(), new GridCoordinates("A", 5), "N")
    ).toBeInstanceOf(ShipPlacement);
    expect(
      new ShipPlacement(new Destroyer(), new GridCoordinates("I", 3), "W")
    ).toBeInstanceOf(ShipPlacement);
  });

  describe("direction", () => {
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
          new TypeError("ShipPlacement.direction must be one of N, E, S, W")
        )
      );
    });

    test("does not accept diagonal directions", () => {
      ["NE", "NW", "SE", "SW"].forEach((direction) =>
        expect(
          () => new ShipPlacement(new Destroyer(), center, direction)
        ).toThrowError(
          new TypeError("ShipPlacement.direction must be one of N, E, S, W")
        )
      );
    });
  });

  describe("boundaries", () => {
    test("does not accept stern with coordinates too far in north", () => {
      expect(
        () => new ShipPlacement(new Destroyer(), topLeft, "S")
      ).toThrowError(
        new RangeError("Ships stern has invalid GridCoordinates('>', 1)")
      );
    });

    test("does not accept stern with coordinates too far in west", () => {
      expect(
        () => new ShipPlacement(new Destroyer(), topLeft, "E")
      ).toThrowError(
        new RangeError("Ships stern has invalid GridCoordinates('A', -2)")
      );
    });

    test("does not accept stern with coordinates too far in south", () => {
      expect(
        () => new ShipPlacement(new Destroyer(), bottomRight, "N")
      ).toThrowError(
        new RangeError("Ships stern has invalid GridCoordinates('M', 10)")
      );
    });

    test("does not accept stern with coordinates too far in east", () => {
      expect(
        () => new ShipPlacement(new Destroyer(), bottomRight, "W")
      ).toThrowError(
        new RangeError("Ships stern has invalid GridCoordinates('J', 13)")
      );
    });

    test("accepts stern with coordinates on west boundary", () => {
      expect(
        () =>
          new ShipPlacement(new Destroyer(), new GridCoordinates("E", 4), "E")
      ).not.toThrow();
    });

    test("accepts stern with coordinates on east boundary", () => {
      expect(
        () =>
          new ShipPlacement(new Destroyer(), new GridCoordinates("E", 7), "W")
      ).not.toThrow();
    });

    test("accepts stern with coordinates on north boundary", () => {
      expect(
        () =>
          new ShipPlacement(new Destroyer(), new GridCoordinates("D", 1), "S")
      ).not.toThrow();
    });

    test("accepts stern with coordinates on south boundary", () => {
      expect(
        () =>
          new ShipPlacement(new Destroyer(), new GridCoordinates("G", 1), "N")
      ).not.toThrow();
    });
  });

  describe("overlapping", () => {
    test("is detected for two ships have same bow coordinates", () => {
      expect(
        new ShipPlacement(
          new Battleship(),
          new GridCoordinates("A", 1),
          "N"
        ).isOverlappedBy(
          new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "W")
        )
      ).toBe(true);
    });

    test("is detected for two overlapping completly ships", () => {
      expect(
        new ShipPlacement(
          new Battleship(),
          new GridCoordinates("A", 1),
          "N"
        ).isOverlappedBy(
          new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "N")
        )
      ).toBe(true);
    });

    test("is not in place for two ships not overlapping each other", () => {
      expect(
        new ShipPlacement(
          new Battleship(),
          new GridCoordinates("A", 1),
          "N"
        ).isOverlappedBy(
          new ShipPlacement(new Destroyer(), new GridCoordinates("J", 10), "S")
        )
      ).toBe(false);
    });

    test("is detected for two ships with overlapping sterns", () => {
      expect(
        new ShipPlacement(
          new Battleship(),
          new GridCoordinates("A", 1),
          "N"
        ).isOverlappedBy(
          new ShipPlacement(new Destroyer(), new GridCoordinates("E", 4), "E")
        )
      ).toBe(true);
    });

    test("is detected for two ships with overlapping stern and bow", () => {
      expect(
        new ShipPlacement(
          new Destroyer(),
          new GridCoordinates("A", 2),
          "N"
        ).isOverlappedBy(
          new ShipPlacement(new Battleship(), new GridCoordinates("D", 2), "W")
        )
      ).toBe(true);
    });

    test("is detected for two ships with overlapping bow and stern", () => {
      expect(
        new ShipPlacement(
          new Destroyer(),
          new GridCoordinates("D", 2),
          "S"
        ).isOverlappedBy(
          new ShipPlacement(new Battleship(), new GridCoordinates("D", 6), "E")
        )
      ).toBe(true);
    });

    test("is detected for one ship crossing second one stern", () => {
      expect(
        new ShipPlacement(
          new Destroyer(),
          new GridCoordinates("E", 6),
          "S"
        ).isOverlappedBy(
          new ShipPlacement(new Battleship(), new GridCoordinates("D", 2), "W")
        )
      ).toBe(true);
    });

    test("is detected for one ship crossing second one bow", () => {
      expect(
        new ShipPlacement(
          new Battleship(),
          new GridCoordinates("D", 2),
          "W"
        ).isOverlappedBy(
          new ShipPlacement(new Destroyer(), new GridCoordinates("C", 2), "N")
        )
      ).toBe(true);
    });

    test("is detected for one ship crossing second between bow and stern", () => {
      expect(
        new ShipPlacement(
          new Battleship(),
          new GridCoordinates("D", 2),
          "W"
        ).isOverlappedBy(
          new ShipPlacement(new Destroyer(), new GridCoordinates("E", 5), "S")
        )
      ).toBe(true);
    });
  });
});
