import { GridCoordinates } from "./GridCoordinates";
import { OceanGrid } from "./OceanGrid";
import { ShotResult, TargetGrid } from "./TargetGrid";

export class Game {
  private readonly playersTargetGrid: TargetGrid;

  public constructor(private readonly computersOceanGrid: OceanGrid) {
    this.playersTargetGrid = new TargetGrid(this.computersOceanGrid);
  }

  public shot(coords: GridCoordinates): ShotResult {
    return this.playersTargetGrid.shot(coords);
  }

  public get isOver(): boolean {
    return this.playersTargetGrid.areAllSunk;
  }
}
