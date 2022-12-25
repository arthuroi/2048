// const Game = require("./game");

const MonteCarlo = require("./monteCarlo");

// const game = new Game()
// let response = 0
// while (response === 0) {
//     response = game.move("UP")
// }
// console.log(game.highScore, game.board)



const sim = new MonteCarlo(30000)
sim.simulate()