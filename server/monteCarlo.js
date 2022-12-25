const Game = require("./game");

class MonteCarlo {
  constructor(clones) {
    this.clones = clones;
    this.movements = ["RIGHT", "LEFT", "UP", "DOWN"];
  }

  simulate() {
    const mainGame = new Game();
    let mainResponse = 0;

    while (mainResponse === 0) {
      let rightScore = 0;
      let leftScore = 0;
      let upScore = 0;
      let downScore = 0;
      for (const movement of this.movements) {
        for (let i = 0; i < this.clones; i++) {
          const carloGame = new Game();
          carloGame.move(movement);

          let carloResponse = 0;
          while (carloResponse === 0) {
            carloResponse = carloGame.move(randomInArray(this.movements));
          }

          switch (movement) {
            case "RIGHT":
              rightScore += carloGame.highScore;
              break;

            case "LEFT":
              leftScore += carloGame.highScore;
              break;

            case "UP":
              upScore += carloGame.highScore;
              break;

            case "DOWN":
              downScore += carloGame.highScore;
              break;

            default:
              break;
          }

        }
      }
      if (rightScore > leftScore && rightScore > upScore && rightScore > downScore) {
        mainResponse = mainGame.move("RIGHT")
        console.log('RIGHT ' + mainGame.highScore)
      }

      if (rightScore < leftScore && leftScore > upScore && leftScore > downScore) {
        mainResponse = mainGame.move("LEFT")
        console.log("LEFT " + mainGame.highScore)
      }

      if (upScore > leftScore && rightScore < upScore && upScore > downScore) {
        mainResponse = mainGame.move("UP")
        console.log("UP " + mainGame.highScore)
      }

      if (downScore > leftScore && rightScore > downScore && upScore < downScore) {
        mainResponse = mainGame.move("DOWN")
        console.log("DOWN " + mainGame.highScore)
      }
    }

    
  }
}

const randomInArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
module.exports = MonteCarlo;
