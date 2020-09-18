import { Fleet } from "./Fleet";
import { OceanGrid } from "./OceanGrid";
import { Battleship } from "./Ship";

describe("OceanGrid", () => {
  test("must specify fleet", () => {
    new OceanGrid(new Fleet([new Battleship()]));
  });
});
