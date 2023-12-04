import React, { useState, useEffect } from "react";
import * as U from "./utils";
import "./SnakeGame.css";
const SnakeGameBoard = () => {
  // the length of the snake three segments (3 squares)
  const initialPosition = [
    [0, 2],
    [0, 1],
    [0, 0],
  ];
  const [snake, setSnake] = useState(initialPosition);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState("RIGHT");
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState("normal");

  const startGameAgain = () => {
    setSnake(initialPosition);
    setIsGameOver(false);
    setScore(0);
  };

  const generateFood = () => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15),
      ];
    } while (U.isPositionOnSnake(newFood, snake));
    setFood(newFood);
  };

  useEffect(() => {
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }, [highScore]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      // keyboard button => direction Snake head
      setDirection(U.direction(e, isGameOver, startGameAgain));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGameOver]);

  // Snake movement logic
  useEffect(() => {
    if (isGameOver) return;
    const intervalTime = U.intervalSpeedTime(speed);
    const interval = setInterval(startSnakeMovement, intervalTime);

    return () => clearInterval(interval);
  }, [direction, isGameOver, food, score, snake, speed]);

  const startSnakeMovement = () => {
    // real time snake head position
    const newHead = U.calcMoveSnakeHead(snake[0], direction);

    // rules to check
    if (U.isOutOfBoardBoundaries(newHead) || U.isEatingItSelf(newHead, snake)) {
      setIsGameOver(true);
      const hightScoreValue = localStorage.getItem("highScore");
      if (score > parseInt(hightScoreValue)) {
        localStorage.setItem("highScore", JSON.stringify(score));
        setHighScore(score);
      }

      return; // game is over
    }

    let newSnake;
    if (U.isEatingFood(newHead, food)) {
      generateFood();
      setScore(score + 1);
      // grow the snake by eating new food
      newSnake = [newHead, ...snake];
    } else {
      // moving across the board by adding a new head on the front and removing one segment of its trail
      newSnake = [newHead, ...snake.slice(0, -1)];
    }
    setSnake(newSnake);
  };

  return (
    <div className="game">
      <div>Score: {score}</div>
      <div>High Score: {highScore}</div>
      <select
        name="speed"
        id="speed"
        styles={{ width: "200px" }}
        onChange={(e) => setSpeed(e.target.value)}
      >
        <option value="normal">Normal</option>
        <option value="double">Double</option>
        <option value="triple">Triple</option>
      </select>
      <div className="board">
        {Array.from({ length: 15 * 15 }).map((_, index) => (
          <div
            key={index}
            className="internalBoardLayout"
            style={{
              backgroundColor: snake.some(
                (segment) =>
                  // if this true means that at these x => Math.floor(index / 15), y => index % 15 coordinates the snake touches so is green
                  segment[0] === Math.floor(index / 15) &&
                  segment[1] === index % 15
              )
                ? "green"
                : // Alternately, if at this x, y coordinates are touched, is the food
                food[0] === Math.floor(index / 15) && food[1] === index % 15
                ? "red"
                : "white",
            }}
          />
        ))}
      </div>
      {isGameOver && "Game over. Please press enter to start again"}
    </div>
  );
};

export default SnakeGameBoard;
