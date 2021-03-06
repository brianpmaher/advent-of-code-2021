const fs = require('fs');

const lines = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const [inputLine, _, ...boardsLines] = lines;

const newBoardChar = '';
boardsLines.push(newBoardChar);

const inputs = inputLine.trim().split(',').map(char => parseInt(char));

const boards = [];

function createBoard() {
    return {
        numRows: 0,
        numCols: 0,
        matrix: [],
    };
}

function createCell(value) {
    return {
        value,
        isMarked: false,
    };
}

let scratchBoard = createBoard();
let numRows = 0;
for (let i = 0; i < boardsLines.length; i++) {
    const row = boardsLines[i];

    if (row === newBoardChar) {
        scratchBoard.numRows = numRows;
        numRows = 0;
        boards.push(scratchBoard);
        scratchBoard = createBoard();
        continue;
    }

    numRows++;

    const rowValues = row
        .trim()
        .split(' ')
        .map(c => parseInt(c))
        .filter(v => !isNaN(v))
        .map(createCell);

    scratchBoard.numCols = rowValues.length;
    scratchBoard.matrix = scratchBoard.matrix.concat(rowValues);
}

function markBoardWithNumber(board, bingoNumber) {
    board.matrix.forEach(cell => {
        if (cell.value === bingoNumber) {
            cell.isMarked = true;
        }
    });
}

function checkIfBoardIsWinner(board) {
    const { numRows, numCols } = board;

    // check all rows
    for (let y = 0; y < numRows; y++) {
        // check each cell
        for (let x = 0; x < numCols; x++) {
            const index = y * numRows + x;
            const cell = board.matrix[index];
            if (!cell.isMarked) {
                break;
            } else if (x === numCols - 1) {
                return true;
            }
        }
    }

    // check all columns
    for (let x = 0; x < numCols; x++) {
        // check each cell
        for (let y = 0; y < numRows; y++) {
            const index = y * numRows + x;
            const cell = board.matrix[index];
            if (!cell.isMarked) {
                break;
            } else if (y === numRows - 1) {
                return true;
            }
        }
    }

    return false;
}

const remainingBoards = [...boards];
// for each bingo number
for (let i = 0; i < inputs.length; i++) {
    const bingoNumber = inputs[i];

    // mark all boards
    boards.forEach(board => markBoardWithNumber(board, bingoNumber));

    if (remainingBoards.length > 1) {
        // check all boards for winner
        const winningIndices = [];
        remainingBoards.forEach((board, boardIndex) => {
            if (checkIfBoardIsWinner(board)) {
                winningIndices.push(boardIndex);
            }
        });

        // is there a winner
        if (winningIndices.length > 0) {
            for (let winningIndexIndex = winningIndices.length - 1; winningIndexIndex >= 0; winningIndexIndex--) {
                const winningIndex = winningIndices[winningIndexIndex];
                // remove the winning board from the remaining boards list
                remainingBoards.splice(winningIndex, 1);
            }
        }
    } else {
        const remainingBoard = remainingBoards[0];
        if (checkIfBoardIsWinner(remainingBoard)) {
            const sumOfUnmarked = remainingBoard.matrix
                .reduce((sum, cell) => {
                    if (!cell.isMarked) {
                        return sum + cell.value;
                    } else {
                        return sum;
                    }
                }, 0);
            console.log('final score', sumOfUnmarked * bingoNumber);
            break;
        }
    }
}

