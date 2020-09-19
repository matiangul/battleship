import { GridCoordinates } from "./GridCoordinates";
import { Ship } from "./Ship";

const DIRECTIONS = ["N", "E", "S", "W"];

type Direction = "N" | "E" | "S" | "W";

/**
 * Represents where and how the ship is placed on the grid.
 */
export class ShipPlacement {
  private readonly direction: Direction;

  constructor(
    private readonly ship: Ship,
    private readonly bow: GridCoordinates,
    direction: string
  ) {
    this.assertDirection(direction);
    this.direction = direction;
    this.assertSternHasValidGridCoordinates();
  }

  private assertDirection(direction: string): asserts direction is Direction {
    if (!DIRECTIONS.includes(direction)) {
      throw new TypeError("ShipPlacement.direction must be one of N,E,S,W");
    }
  }

  private assertSternHasValidGridCoordinates(): void {
    const sternColumn = this.calculateSternColumn();
    const sternRow = this.calculateSternRow();

    try {
      new GridCoordinates(sternColumn, sternRow);
    } catch (error) {
      throw new RangeError(
        `Ships stern has invalid GridCoordinates('${sternColumn}', ${sternRow})`
      );
    }
  }

  private calculateSternColumn(): string {
    if (this.direction === "N") {
      return String.fromCharCode(
        this.bow.column.charCodeAt(0) + this.ship.size
      );
    }

    if (this.direction === "S") {
      return String.fromCharCode(
        this.bow.column.charCodeAt(0) - this.ship.size
      );
    }

    return this.bow.column;
  }

  private calculateSternRow(): number {
    if (this.direction === "E") {
      return this.bow.row - this.ship.size;
    }

    if (this.direction === "W") {
      return this.bow.row + this.ship.size;
    }

    return this.bow.row;
  }
}
