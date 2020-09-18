import { Fleet } from "./Fleet";
import { Battleship } from "./Ship";

describe("Fleet", () => {
  test("must specify array of ships", () => {
    new Fleet([new Battleship()]);
  });
});
