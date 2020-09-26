import chalk from "chalk";
import { prompt } from "inquirer";
import { Game } from "./mechanics/Game";
import { GridCoordinates } from "./mechanics/GridCoordinates";
import { Battleship, Destroyer } from "./mechanics/Ship";
import { randomlyPlaceShipsOnOceanGrid } from "./mechanics/ShipPlacementRandomizer";

const game = new Game(
  randomlyPlaceShipsOnOceanGrid([
    new Battleship(),
    new Destroyer(),
    new Destroyer(),
  ])
);

async function play() {
  console.log(
    chalk.blue(
      "\nEnter coordinates on target board to shot untill game is over.\n" +
        "Coordinates must be in the form 'A5', where 'A' is the column and '5' is the row.\n"
    )
  );

  while (!game.isOver) {
    try {
      const answers = await prompt([
        {
          message: "Sqauare to target",
          name: "coords",
          type: "input",
        },
      ]);

      const [column, ...row] = answers.coords as string;
      const shotResult = game.shot(
        new GridCoordinates(column, parseInt(row.join(""), 10))
      );

      const colorize =
        shotResult.status === "missed"
          ? chalk.white
          : shotResult.status === "hit"
          ? chalk.red
          : chalk.bgRed;

      console.log(
        colorize(
          `${shotResult.status} ${shotResult.ship ? shotResult.ship.name : ""}`
        )
      );
    } catch (error) {
      if (error.isTtyError) {
        console.log(
          chalk.bgYellow(
            chalk.black(
              "Prompt couldn't be rendered in the current environment."
            )
          )
        );
      } else {
        console.log(
          chalk.bgYellow(chalk.black(`${error.message}. Try Again!`))
        );
      }
    }
  }

  console.log(chalk.bgBlack(chalk.white("\n GAME OVER \n")));
}

play();
