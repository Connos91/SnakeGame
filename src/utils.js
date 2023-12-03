export const direction = (e, isGameOver, startGameAgain) => {
  let snakeDirection;
  switch (e.keyCode) {
    case 32:
      if (isGameOver) {
        startGameAgain();
      }
      snakeDirection = "RIGHT";
      break;
    case 37: // left arrow
      snakeDirection = "LEFT";
      break;
    case 38: // up arrow
      snakeDirection = "UP";
      break;
    case 39: // right arrow
      snakeDirection = "RIGHT";
      break;
    case 40: // down arrow
      snakeDirection = "DOWN";
      break;
    default:
      break;
  }

  return snakeDirection;
};

export const calcMoveSnakeHead = (currentHead, direction) => {
  let newPositionSnakeHead = [...currentHead];
  switch (direction) {
    case "LEFT":
      newPositionSnakeHead[1] -= 1;
      break;
    case "UP":
      newPositionSnakeHead[0] -= 1;
      break;
    case "RIGHT":
      newPositionSnakeHead[1] += 1;
      break;
    case "DOWN":
      newPositionSnakeHead[0] += 1;
      break;
    default:
      return;
  }
  return newPositionSnakeHead;
};

export const isOutOfBoardBoundaries = (snakeHead) => {
  // check if is x and y is less than zero and greater than 15 to exit the game
  return (
    snakeHead[0] < 0 ||
    snakeHead[1] < 0 ||
    snakeHead[0] >= 15 ||
    snakeHead[1] >= 15
  );
};

export const isEatingItSelf = (snakeHead, snake) => {
  return snake.some(
    (segment) => segment[0] === snakeHead[0] && segment[1] === snakeHead[1]
  );
};

export const isEatingFood = (snakeHead, food) => {
  return snakeHead[0] === food[0] && snakeHead[1] === food[1];
};

// Check if a new food position is on the snake a
export const isPositionOnSnake = (position, snakeArray) => {
  return snakeArray.some(
    (segment) => segment[0] === position[0] && segment[1] === position[1]
  );
};
