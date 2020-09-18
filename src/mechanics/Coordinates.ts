const COLUMNS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export type Column = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J";

export type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export class Coords {
  public readonly column: Column;
  public readonly row: Row;

  constructor(column: string, row: number) {
    this.assertColumn(column);
    this.assertRow(row);
    this.column = column;
    this.row = row;
  }

  public get rowGridIndex(): number {
    return this.row - 1;
  }

  public get columnGridIndex(): number {
    return this.column.charCodeAt(0) - "A".charCodeAt(0);
  }

  private assertColumn(column: string): asserts column is Column {
    if (!COLUMNS.includes(column)) {
      throw new TypeError("Coords.column must be a letter between A-J");
    }
  }

  private assertRow(row: number): asserts row is Row {
    if (!Number.isInteger(row) || row > 10 || row < 1) {
      throw new TypeError("Coords.row must be a number between 1-10");
    }
  }
}
