let snakeSpeed = 130;



let gameBoard = document.getElementById("game-board");

let boardWidth = 500;
let boardHeight = 500;
let squareSize = 20;

let snake = [
    {x: 2, y: 0 },
    {x: 1, y: 0 },
    {x: 0, y: 0 },
];

let apple = {x: 10, y: 10};

let score = 0;

function drawSnike() {
    for(let i = 0; i < snake.length; i++){
        let snakePart = document.createElement("div");
        snakePart.className = "snake";
        snakePart.style.left = snake[i].x * squareSize + "px";
        snakePart.style.top = snake[i].y * squareSize + "px";
        gameBoard.appendChild(snakePart);
    }
}

function drawApple() {
    let appleElement = document.createElement("div");
    appleElement.className = "apple";
    appleElement.style.left = apple.x * squareSize + "px";
    appleElement.style.top = apple.y * squareSize + "px";
    gameBoard.appendChild(appleElement);
  };

  function clearBoard() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
  }

  function updateScore() {
    let scoreElement = document.getElementById("score");
    scoreElement.textContent = "Очки: " + score;
  }

 

 

  function gameLoop() {
    clearBoard();
    moveSnake();
    
    drawApple();
    drawSnike();
    updateScore();
  };

  document.addEventListener("keydown", function(event) {
    changeDirection(event.keyCode);
  });

  function changeDirection(keyCode) {
    if (keyCode === 37 && direction !== "right") {
        direction = "left";
    } else if (keyCode === 38 && direction!== "down") {
        direction = "up";
    } else if (keyCode === 39 && direction!== "left") {
        direction = "right";
    } else if (keyCode === 40 && direction!== "up") {
        direction = "down";
    }
  }

  function moveSnake() {
    let head = { x: snake[0].x, y: snake[0].y };
  
    if (direction === "right") {
      head.x++;
    } else if (direction === "left") {
      head.x--;
    } else if (direction === "up") {
      head.y--;
    } else if (direction === "down") {
      head.y++;
    }
  
    snake.unshift(head);
  
    if (head.x === apple.x && head.y === apple.y) {
      generateApple();
      score += 1;
    } else {
      snake.pop();
    }
  
    if (checkCollision()) {
      alert(`Ваш счет: ${score}`);
      resetGame();
    }
  }

  function generateApple() {
    apple.x = Math.floor(Math.random() * (boardWidth / squareSize));
    apple.y = Math.floor(Math.random() * (boardHeight / squareSize));
  }

  function checkCollision() {
    let head = snake[0];
  
    
    if (
      head.x < 0 || head.x >= boardWidth / squareSize || head.y < 0 || head.y >= boardHeight / squareSize
    ) {
      return true;
    }
  
    
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
  
    return false;
  }

  function resetGame() {
    snake = [
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ];
    direction = "right";
    generateApple();
    score = 0;
  }

  let direction = "right";
setInterval(gameLoop, snakeSpeed);


  