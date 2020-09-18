import { Battleship, Destroyer, Ship, Shipify } from "./Ship";

describe("Ship", () => {
  const XShip = Shipify("XShip", 6);

  test("can be dynamically created out of name and size", () => {
    expect(new (Shipify("XShip", 6))()).toBeInstanceOf(Ship);
  });

  test("has name", () => {
    expect(new XShip().name).toBe("XShip");
  });

  test("has size", () => {
    expect(new XShip().size).toBe(6);
  });
});

test("Battleship is type of Ship", () => {
  expect(new Battleship()).toBeInstanceOf(Ship);
});

test("Battleship has corresponding name", () => {
  expect(new Battleship().name).toBe("Battleship");
});

test("Battleship has size of 5", () => {
  expect(new Battleship().size).toBe(5);
});

test("Destroyer is type of Ship", () => {
  expect(new Destroyer()).toBeInstanceOf(Ship);
});

test("Destroyer has corresponding name", () => {
  expect(new Destroyer().name).toBe("Destroyer");
});

test("Destroyer has size of 5", () => {
  expect(new Destroyer().size).toBe(4);
});
