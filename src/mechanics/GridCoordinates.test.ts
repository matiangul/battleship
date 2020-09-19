import { GridCoordinates } from "./GridCoordinates";

describe("GridCoordinates", () => {
  const coordsA5 = new GridCoordinates("A", 5);
  const coordsJ1 = new GridCoordinates("J", 1);

  test("is type of GridCoordinates", () => {
    expect(coordsA5).toBeInstanceOf(GridCoordinates);
  });

  test("has literal column", () => {
    expect(coordsA5.column).toBe("A");
    expect(coordsJ1.column).toBe("J");
  });

  test("has numerical row", () => {
    expect(coordsA5.row).toBe(5);
    expect(coordsJ1.row).toBe(1);
  });

  test("accepts rows from 1 to 10", () => {
    for (let index = 1; index <= 10; index++) {
      expect(new GridCoordinates("A", index).row).toBe(index);
    }
  });

  test("accepts columns from range A to J", () => {
    for (
      let charCode = "A".charCodeAt(0);
      charCode <= "J".charCodeAt(0);
      charCode++
    ) {
      expect(new GridCoordinates(String.fromCharCode(charCode), 1).column).toBe(
        String.fromCharCode(charCode)
      );
    }
  });

  test("throws type error when row above the scope is passed", () => {
    expect(() => new GridCoordinates("A", 11)).toThrowError(
      new TypeError("GridCoordinates.row must be a number between 1-10")
    );
  });

  test("throws type error when row below the scope is passed", () => {
    expect(() => new GridCoordinates("A", 0)).toThrowError(
      new TypeError("GridCoordinates.row must be a number between 1-10")
    );
  });

  test("throws type error when column is out of scope", () => {
    expect(() => new GridCoordinates("K", 1)).toThrowError(
      new TypeError("GridCoordinates.column must be a letter between A-J")
    );
  });

  test("has row grid index", () => {
    expect(coordsA5.rowGridIndex).toBe(4);
    expect(coordsJ1.rowGridIndex).toBe(0);
  });

  test("has column grid index", () => {
    expect(coordsA5.columnGridIndex).toBe(0);
    expect(coordsJ1.columnGridIndex).toBe(9);
  });
});
