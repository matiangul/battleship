import { GridCoordinates, GridCoordinatesString } from "./GridCoordinates";
import { OceanGrid } from "./OceanGrid";
import { Ship } from "./Ship";

export class ShotResult {
  public constructor(
    public readonly status: "hit" | "missed" | "sunk",
    public readonly ship?: Ship
  ) {}
}

export class TargetGrid {
  private readonly shots: Set<GridCoordinatesString> = new Set();

  public constructor(private readonly opponentsOceanGrid: OceanGrid) {}

  public shot(shotCoords: GridCoordinates): ShotResult {
    this.shots.add(shotCoords.toString());

    const hitShip = this.opponentsOceanGrid.getShipOccuping(shotCoords);
    const hasBeenSunk = this.opponentsOceanGrid.isShipFullyOccupiedBy(
      hitShip,
      this.shots
    );
    const status = hasBeenSunk ? "sunk" : hitShip ? "hit" : "missed";

    return new ShotResult(status, hitShip);
  }

  public get areAllSunk(): boolean {
    return this.opponentsOceanGrid.fleet.every((placement) =>
      this.opponentsOceanGrid.isShipFullyOccupiedBy(placement.ship, this.shots)
    );
  }
}
