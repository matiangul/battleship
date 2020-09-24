import { GridCoordinates } from "./GridCoordinates";
import { OceanGrid } from "./OceanGrid";
import { Ship } from "./Ship";
import { ShipPlacement } from "./ShipPlacement";

export function randomlyPlaceShipsOnOceanGrid(ships: Ship[]): OceanGrid {
  if (ships.length === 0) {
    return new OceanGrid([]);
  }

  const [firstShip, ...restOfShips] = ships;
  const subOceanGrid = randomlyPlaceShipsOnOceanGrid(restOfShips);
  const triedPlacements = new Set();
  const firstShipPossiblePlacmentsCount =
    ShipPlacement.POSSIBLE_OPTIONS_COUNT - 10 * 4 * (firstShip.size - 1);

  while (triedPlacements.size < firstShipPossiblePlacmentsCount) {
    try {
      const firstPlacement = randomlyPlaceShipOnOceanGrid(firstShip);
      triedPlacements.add(firstPlacement.toString());

      return new OceanGrid([firstPlacement, ...subOceanGrid.fleet]);
    } catch (error) {}
  }

  throw new RangeError(
    `There is no way to put ${firstShip} num ${
      restOfShips.length + 1
    } next to rest of the ships in this randomized layout`
  );
}

function randomlyPlaceShipOnOceanGrid(ship: Ship): ShipPlacement {
  return new ShipPlacement(
    ship,
    GridCoordinates.random(),
    ShipPlacement.randomDirection()
  );
}
