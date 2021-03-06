import { GridCoordinates, GridCoordinatesString } from "./GridCoordinates";
import { Ship } from "./Ship";

const DIRECTIONS = ["N", "E", "S", "W"];

type Direction = "N" | "E" | "S" | "W";

/**
 * Represents where and how the ship is placed on the grid.
 */
export class ShipPlacement {
  public readonly direction: Direction;
  public static readonly POSSIBLE_OPTIONS_COUNT =
    DIRECTIONS.length * GridCoordinates.POSSIBLE_OPTIONS_COUNT;

  constructor(
    public readonly ship: Ship,
    public readonly bow: GridCoordinates,
    direction: string
  ) {
    this.assertDirection(direction);
    this.direction = direction;
    this.assertSternHasValidGridCoordinates();
  }

  public isOverlappedBy(placement: ShipPlacement): boolean {
    return [...placement.occupiedCoordinates].some((coords) =>
      this.occupiedCoordinates.has(coords)
    );
  }

  public isOccupying(coords: GridCoordinates): boolean {
    return this.occupiedCoordinates.has(coords.toString());
  }

  public isOccupyingFully(coords: Set<GridCoordinatesString>): boolean {
    return [...this.occupiedCoordinates].every((occupied) =>
      coords.has(occupied)
    );
  }

  public toString(): string {
    return `${this.ship.name}('${this.bow.column}', ${this.bow.row}, '${this.direction}')`;
  }

  public static randomDirection(): Direction {
    return DIRECTIONS[
      Math.round(Math.random() * (DIRECTIONS.length - 1))
    ] as Direction;
  }

  private assertDirection(direction: string): asserts direction is Direction {
    if (!DIRECTIONS.includes(direction)) {
      throw new TypeError("ShipPlacement.direction must be one of N, E, S, W");
    }
  }

  private assertSternHasValidGridCoordinates(): void {
    const sternColumn = this.getColumnAwayFromBowBy(this.ship.size - 1);
    const sternRow = this.getRowAwayFromBowBy(this.ship.size - 1);

    try {
      new GridCoordinates(sternColumn, sternRow);
    } catch (error) {
      throw new RangeError(
        `Ships stern has invalid GridCoordinates('${sternColumn}', ${sternRow})`
      );
    }
  }

  private getColumnAwayFromBowBy(length: number): string {
    if (this.direction === "N") {
      return String.fromCharCode(this.bow.columnCharCode + length);
    }

    if (this.direction === "S") {
      return String.fromCharCode(this.bow.columnCharCode - length);
    }

    return this.bow.column;
  }

  private getRowAwayFromBowBy(length: number): number {
    if (this.direction === "E") {
      return this.bow.row - length;
    }

    if (this.direction === "W") {
      return this.bow.row + length;
    }

    return this.bow.row;
  }

  private get occupiedCoordinates(): Set<GridCoordinatesString> {
    return new Set(
      Array(this.ship.size)
        .fill(null)
        .map((_, lengthFromBow) =>
          new GridCoordinates(
            this.getColumnAwayFromBowBy(lengthFromBow),
            this.getRowAwayFromBowBy(lengthFromBow)
          ).toString()
        )
    );
  }
}
