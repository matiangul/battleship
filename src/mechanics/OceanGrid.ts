import { ShipPlacement } from "./ShipPlacement";

export class OverlapsError extends Error {}

export class OceanGrid {
  constructor(private readonly fleet: ShipPlacement[]) {
    this.assertShipsDoNotOverlap();
  }

  private assertShipsDoNotOverlap() {
    if (this.fleet.length > 1) {
      throw new OverlapsError(
        `${this.fleet[0]} is overlapped by ${this.fleet[1]}`
      );
    }
  }
}
