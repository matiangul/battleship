import { Game } from "./Game";
import { GridCoordinates } from "./GridCoordinates";
import { Battleship, Destroyer, Ship } from "./Ship";
import { randomlyPlaceShipsOnOceanGrid } from "./ShipPlacementRandomizer";
import { ShotResult } from "./TargetGrid";

describe("Game", () => {
  const computersOceanGrid = randomlyPlaceShipsOnOceanGrid([
    new Battleship(),
    new Destroyer(),
    new Destroyer(),
  ]);

  test("initialize with passed ocean grid", () => {
    expect(new Game(computersOceanGrid)).toBeInstanceOf(Game);
  });

  test("can be played by shooting", () => {
    expect(
      new Game(computersOceanGrid).shot(new GridCoordinates("A", 1))
    ).toBeInstanceOf(ShotResult);
  });

  test("knows whether is over", () => {
    expect(new Game(computersOceanGrid).isOver).toBe(false);

    const game = new Game(computersOceanGrid);
    for (const column of ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]) {
      for (let row = 1; row <= 10; row++) {
        game.shot(new GridCoordinates(column, row));
      }
    }

    expect(game.isOver).toBe(true);
  });
});
