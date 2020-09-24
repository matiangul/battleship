import { GridCoordinates } from './GridCoordinates';
import { OceanGrid } from './OceanGrid';
import { Battleship, Destroyer } from "./Ship";
import { ShipPlacement } from './ShipPlacement';
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
    const target = new TargetGrid(new OceanGrid([
      new ShipPlacement(battleship, new GridCoordinates("A", 1), "N")
    ]));

    expect(target.shot(new GridCoordinates("B", 1)).ship).toEqual(battleship);
    expect(target.shot(new GridCoordinates("B", 2)).ship).toBeUndefined();
  });

  test("should comunicate result of a hit", () => {
    const battleship = new Battleship();
    const target = new TargetGrid(new OceanGrid([
      new ShipPlacement(battleship, new GridCoordinates("A", 1), "N")
    ]));

    expect(target.shot(new GridCoordinates("B", 1)).status).toEqual('hit');
    expect(target.shot(new GridCoordinates("B", 2)).status).toEqual('missed');
  });

  test("should comunicate when ship has been sunk", () => {
    const battleship = new Battleship();
    const target = new TargetGrid(new OceanGrid([
      new ShipPlacement(battleship, new GridCoordinates("A", 1), "N")
    ]));

    expect(target.shot(new GridCoordinates("A", 1)).status).toEqual('hit');
    expect(target.shot(new GridCoordinates("B", 1)).status).toEqual('hit');
    expect(target.shot(new GridCoordinates("C", 1)).status).toEqual('hit');
    expect(target.shot(new GridCoordinates("D", 1)).status).toEqual('hit');
    expect(target.shot(new GridCoordinates("E", 1)).status).toEqual('sunk');
    expect(target.shot(new GridCoordinates("A", 1)).status).toEqual('sunk');
    expect(target.shot(new GridCoordinates("B", 1)).status).toEqual('sunk');
    expect(target.shot(new GridCoordinates("C", 1)).status).toEqual('sunk');
    expect(target.shot(new GridCoordinates("D", 1)).status).toEqual('sunk');
  });
});
