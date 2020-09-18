export abstract class Ship {
  constructor(readonly name: string, readonly size: number) {}
}

export function Shipify(name: string, size: number,) {
  return class extends Ship {
    constructor() {
      super(name, size);
    }
  };
}

export const Battleship = Shipify("Battleship", 5);
export const Destroyer = Shipify("Destroyer", 4);
