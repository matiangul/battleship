import { Battleship, Destroyer, Shipify } from "./Ship";
import { randomlyPlaceShipsOnOceanGrid } from "./ShipPlacementRandomizer";

describe("ShipPlacementRandomizer", () => {
  test("returns OceanGrid whith empty fleet for empty list of ships", () => {
    expect(randomlyPlaceShipsOnOceanGrid([]).fleet.length).toBe(0);
  });

  test("returns OceanGrid with one passed ship", () => {
    expect(randomlyPlaceShipsOnOceanGrid([new Destroyer()]).fleet.length).toBe(
      1
    );
  });

  test("returns OceanGrid with one passed ship placed somewhere", () => {
    expect(
      randomlyPlaceShipsOnOceanGrid([new Destroyer()]).fleet[0].ship.name
    ).toContain("Destroyer");
  });

  test("returns OceanGrid with fleet of three passed ships", () => {
    expect(
      randomlyPlaceShipsOnOceanGrid([
        new Destroyer(),
        new Destroyer(),
        new Battleship(),
      ]).fleet.length
    ).toBe(3);
  });

  test("returns different OceanGrid each time same fleet of three is passed", () => {
    const fleet = [new Destroyer(), new Destroyer(), new Battleship()];

    const oceanGrid1 = randomlyPlaceShipsOnOceanGrid(fleet).toString();
    const oceanGrid2 = randomlyPlaceShipsOnOceanGrid(fleet).toString();

    expect(oceanGrid1).not.toEqual(oceanGrid2);
  });

  test("throws RangeError for fleet not fitting ocean board", () => {
    const fleet = Array(101).fill(new (Shipify("Shorty", 1))());

    expect(() => randomlyPlaceShipsOnOceanGrid(fleet)).toThrowError(
      new RangeError(
        `There is no way to put Shorty num 101 next to rest of the ships in this randomized layout`
      )
    );
  });

  test("throws RangeError for some big ship not fitting ocean board on randomized layout", () => {
    const fleet = Array(21).fill(new Battleship());

    expect(() => randomlyPlaceShipsOnOceanGrid(fleet)).toThrow();
  });

  test("throws RangeError on some random sized boat not fitting ocean board on current layout", () => {
    const fleet = Array(101).fill(null).map(() => new (Shipify("Shorty", Math.round(Math.random() * 5) + 1))());

    expect(() => randomlyPlaceShipsOnOceanGrid(fleet)).toThrow();
  });
});
