
window.onload = () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    context.scale(10, 10);


    let snake = [
        [1, 1],
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 4],
        [2, 5],
    ];

    let keyBoardState = [0, 0]
    const snakeObj = new Snake(new GameBoard());

    // snakeObj.updateSnake(context, snake, keyBoardState);

    keyBoardState = [1, 0];

    document.body.addEventListener('keydown',(e) => {
        switch (e.key) {
            case 'ArrowUp':
                keyBoardState = keyBoardState[1] === 1 ? keyBoardState : [0, -1];
                break;
            case 'ArrowDown':
                keyBoardState = keyBoardState[1] === -1 ? keyBoardState : [0, 1];
                break;
            case 'ArrowRight':
                keyBoardState = keyBoardState[0] === -1 ? keyBoardState : [1, 0];
                break;
            case 'ArrowLeft':
                keyBoardState = keyBoardState[0] === 1 ? keyBoardState : [-1, 0];
                break;
        }
    });

    setInterval(() => {
        snakeObj.updateSnake(context, snake, keyBoardState);
    }, 200);
}


class GameBoard {
    apple  = [10, 10];

}

class Snake {

    gameBoard = {};
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
    }

    updateSnake = (context, snakeLocations, keyBoardState) => {
        const snakeHead = snakeLocations[0];
        if (this.gameBoard.apple[0] === snakeHead[0] && this.gameBoard.apple[1] === snakeHead[1]) {
            this.gameBoard.apple = [Math.random() * 20 | 0, Math.random() * 20 | 0];
        }
        else {
            snakeLocations.pop();
        }
        snakeLocations.unshift([snakeHead[0] + keyBoardState[0], snakeHead[1] + keyBoardState[1]]);

        context.clearRect(0, 0, 300, 300);

        context.fillStyle = 'red';
        context.fillRect(this.gameBoard.apple[0], this.gameBoard.apple[1], 1, 1);

        context.fillStyle = 'black';
        snakeLocations.forEach(([x, y]) => {
            context.fillRect(x, y, 1, 1);
        });
    }

}