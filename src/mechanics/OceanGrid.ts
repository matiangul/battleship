import { GridCoordinates, GridCoordinatesString } from './GridCoordinates';
import { Ship } from './Ship';
import { ShipPlacement } from "./ShipPlacement";

export class OverlapsError extends Error {}

export class OceanGrid {
  constructor(private readonly inputFleet: ShipPlacement[]) {
    this.assertShipsDoNotOverlap();
  }

  public get fleet(): ShipPlacement[] {
    return [...this.inputFleet];
  }

  public toString(): string {
    return `OceanGrid(${this.fleet.join(", ")})`;
  }

  public getShipOccuping(coords: GridCoordinates): Ship | undefined {
    return this.fleet.find((placement) => placement.isOccupying(coords))?.ship;
  }

  public isShipFullyOccupiedBy(ship: Ship, coords: Set<GridCoordinatesString>): boolean {
    return this.fleet.some((placement) => placement.ship === ship && placement.isOccupyingFully(coords));
  }

  private assertShipsDoNotOverlap() {
    const remaining = this.fleet;

    for (
      let head = remaining.shift();
      remaining.length > 0;
      head = remaining.shift()
    ) {
      remaining.forEach((next) => {
        if (head.isOverlappedBy(next)) {
          throw new OverlapsError(`${head} is overlapped by ${next}`);
        }
      });
    }
  }
}
