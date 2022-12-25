class Game {
  constructor() {
    this.board = spawnTile(spawnTile(constructBoard()));
    this.highScore = 0;
  }

  move(movement) {
    let priority;
    let direction;
    switch (movement) {
      case "RIGHT":
        priority = [{ x: 3 }, { x: 2 }, { x: 1 }, { x: 0 }];
        direction = { x: 1, y: 0 };
        return play(this, this.board, priority, direction);

      case "LEFT":
        priority = [{ x: 0 }, { x: 1 }, { x: 2 }, { x: 3 }];
        direction = { x: -1, y: 0 };
        return play(this, this.board, priority, direction);

      case "UP":
        priority = [{ y: 3 }, { y: 2 }, { y: 1 }, { y: 0 }];
        direction = { x: 0, y: 1 };
        return play(this, this.board, priority, direction);

      case "DOWN":
        priority = [{ y: 0 }, { y: 1 }, { y: 2 }, { y: 3 }];
        direction = { x: 0, y: -1 };
        return play(this, this.board, priority, direction);
      default:
        break;
    }
  }
  
}

const constructBoard = () => {
  const board = [];
  for (let i = 0; i < 4; i++) {
    const row = [];
    for (let c = 0; c < 4; c++) {
      const cell = { x: c, y: i, value: 0 };
      row.push(cell);
    }

    board.push(row);
  }

  return board;
};

const spawnTile = (board) => {
  const available = [];
  for (const row of board) {
    for (const cell of row) {
      if (cell.value === 0) {
        available.push(cell);
      }
    }
  }

  if (available.length < 1) {
    return -1;
  }
  const selected = randomInArray(available);
  board[selected.y][selected.x].value = Math.random() > 0.9 ? 4 : 2;
  return board;
};

const randomInArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const play = (obj, board, priority, movement) => {
  for (const order of priority) {
    for (const cell of selectAllTilesWithCondition(board, order)) {
      if (cell.value !== 0) {
        let currentCel = cell;
        while (true) {
          let nextCel;
          try {
            nextCel =
              board[currentCel.y + movement.y][currentCel.x + movement.x];
          } catch {
            board[currentCel.y][currentCel.x].value = cell.value;
            if (!(currentCel.y === cell.y && currentCel.x === cell.x)) {
              board[cell.y][cell.x].value = 0;
            }
            break;
          }

          if (!nextCel || nextCel.value !== 0) {
            if (nextCel && nextCel.value === cell.value) {
              if (cell.value * 2 > obj.highScore) {
                obj.highScore = cell.value * 2;
              }
              board[nextCel.y][nextCel.x].value = cell.value * 2;
              board[cell.y][cell.x].value = 0;
              break;
            } else {
              board[currentCel.y][currentCel.x].value = cell.value;
              if (!(currentCel.y === cell.y && currentCel.x === cell.x)) {
                board[cell.y][cell.x].value = 0;
              }
              break;
            }
          }
          currentCel = nextCel;
        }
      }
    }
  }

  const response = spawnTile(board);
  if (response === -1) {
    return -1;
  } else {
    obj.board = response;
    return 0;
  }
};

const selectAllTilesWithCondition = (board, condition) => {
  const selecteds = [];
  for (const row of board) {
    for (const cell of row) {
      if (cell.y === condition.y || cell.x === condition.x) {
        selecteds.push(cell);
      }
    }
  }

  return selecteds;
};
module.exports = Game;
