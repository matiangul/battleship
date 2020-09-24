const COLUMNS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

type Column = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J";

const ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type GridCoordinatesString = string;

/**
 * Represents valid grid coordinates.
 */
export class GridCoordinates {
  public readonly column: Column;
  public readonly row: Row;
  public static readonly POSSIBLE_OPTIONS_COUNT = COLUMNS.length * ROWS.length;

  constructor(column: string, row: number) {
    this.assertColumn(column);
    this.assertRow(row);
    this.column = column;
    this.row = row;
  }

  private assertColumn(column: string): asserts column is Column {
    if (!COLUMNS.includes(column)) {
      throw new TypeError(
        "GridCoordinates.column must be a letter between A-J"
      );
    }
  }

  private assertRow(row: number): asserts row is Row {
    if (!ROWS.includes(row)) {
      throw new TypeError("GridCoordinates.row must be a number between 1-10");
    }
  }

  public toString(): GridCoordinatesString {
    return `${this.column}${this.row}`;
  }

  public equals(coords: GridCoordinates) {
    return this.toString() === coords.toString();
  }

  public get columnCharCode(): number {
    return this.column.charCodeAt(0);
  }

  public static random(): GridCoordinates {
    return new GridCoordinates(
      GridCoordinates.randomColumn(),
      GridCoordinates.randomRow()
    );
  }

  private static randomColumn(): Column {
    return COLUMNS[Math.round(Math.random() * (COLUMNS.length - 1))] as Column;
  }

  private static randomRow(): Row {
    return ROWS[Math.round(Math.random() * (ROWS.length - 1))] as Row;
  }
}
