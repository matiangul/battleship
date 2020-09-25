import { GridCoordinates } from "./GridCoordinates";
import { OceanGrid } from "./OceanGrid";
import { Battleship, Destroyer } from "./Ship";
import { ShipPlacement } from "./ShipPlacement";
import { randomlyPlaceShipsOnOceanGrid } from "./ShipPlacementRandomizer";
import { TargetGrid } from "./TargetGrid";

describe("TargetGrid", () => {
  test("should be created out of OceanGrid", () => {
    new TargetGrid(
      randomlyPlaceShipsOnOceanGrid([
        new Battleship(),
        new Destroyer(),
        new Destroyer(),
      ])
    );
  });

  test("should allow shoting to ships", () => {
    const target = new TargetGrid(
      randomlyPlaceShipsOnOceanGrid([
        new Battleship(),
        new Destroyer(),
        new Destroyer(),
      ])
    );

    target.shot(new GridCoordinates("A", 10));
  });

  test("should comunicate which ship has been hit", () => {
    const battleship = new Battleship();
    const target = new TargetGrid(
      new OceanGrid([
        new ShipPlacement(battleship, new GridCoordinates("A", 1), "N"),
      ])
    );

    expect(target.shot(new GridCoordinates("B", 1)).ship).toEqual(battleship);
    expect(target.shot(new GridCoordinates("B", 2)).ship).toBeUndefined();
  });

  test("should comunicate result of a hit", () => {
    const target = new TargetGrid(
      new OceanGrid([
        new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "N"),
      ])
    );

    expect(target.shot(new GridCoordinates("B", 1)).status).toEqual("hit");
    expect(target.shot(new GridCoordinates("B", 2)).status).toEqual("missed");
  });

  test("should comunicate when ship has been sunk", () => {
    const target = new TargetGrid(
      new OceanGrid([
        new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "N"),
      ])
    );

    expect(target.shot(new GridCoordinates("A", 1)).status).toEqual("hit");
    expect(target.shot(new GridCoordinates("B", 1)).status).toEqual("hit");
    expect(target.shot(new GridCoordinates("C", 1)).status).toEqual("hit");
    expect(target.shot(new GridCoordinates("D", 1)).status).toEqual("hit");
    expect(target.shot(new GridCoordinates("E", 1)).status).toEqual("sunk");
    expect(target.shot(new GridCoordinates("A", 1)).status).toEqual("sunk");
    expect(target.shot(new GridCoordinates("B", 1)).status).toEqual("sunk");
    expect(target.shot(new GridCoordinates("C", 1)).status).toEqual("sunk");
    expect(target.shot(new GridCoordinates("D", 1)).status).toEqual("sunk");
  });

  test("should know whether all ships are sunk", () => {
    const target = new TargetGrid(
      new OceanGrid([
        new ShipPlacement(new Battleship(), new GridCoordinates("A", 1), "N"),
        new ShipPlacement(new Destroyer(), new GridCoordinates("B", 2), "N"),
        new ShipPlacement(new Destroyer(), new GridCoordinates("G", 4), "W"),
      ])
    );

    expect(target.areAllSunk).toBe(false);

    target.shot(new GridCoordinates("A", 1));
    target.shot(new GridCoordinates("B", 1));
    target.shot(new GridCoordinates("C", 1));
    target.shot(new GridCoordinates("D", 1));
    target.shot(new GridCoordinates("E", 1));

    target.shot(new GridCoordinates("B", 2));
    target.shot(new GridCoordinates("C", 2));
    target.shot(new GridCoordinates("D", 2));
    target.shot(new GridCoordinates("E", 2));

    target.shot(new GridCoordinates("G", 4));
    target.shot(new GridCoordinates("G", 5));
    target.shot(new GridCoordinates("G", 6));
    target.shot(new GridCoordinates("G", 7));

    expect(target.areAllSunk).toBe(true);
  });
});
