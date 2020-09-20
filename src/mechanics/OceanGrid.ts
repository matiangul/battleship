import { ShipPlacement } from "./ShipPlacement";

export class OverlapsError extends Error {}

export class OceanGrid {
  constructor(private readonly fleet: ShipPlacement[]) {
    this.assertShipsDoNotOverlap();
  }

  private assertShipsDoNotOverlap() {
    // @todo extract this logic to ShipPlacement
    if (
      this.fleet[0].bow.equals(this.fleet[1].bow) ||
      this.fleet[0].stern.equals(this.fleet[1].stern) ||
      this.fleet[0].stern.equals(this.fleet[1].bow) ||
      this.fleet[0].bow.equals(this.fleet[1].stern)
    ) {
      throw new OverlapsError(
        `${this.fleet[0]} is overlapped by ${this.fleet[1]}`
      );
    }
  }
}
