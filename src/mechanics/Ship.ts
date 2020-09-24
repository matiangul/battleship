export abstract class Ship {
  constructor(public readonly name: string, public readonly size: number) {}

  public toString(): string {
    return this.name;
  }
}

export function Shipify(name: string, size: number) {
  return class extends Ship {
    constructor() {
      super(name, size);
    }
  };
}

export const Battleship = Shipify("Battleship", 5);
export const Destroyer = Shipify("Destroyer", 4);
