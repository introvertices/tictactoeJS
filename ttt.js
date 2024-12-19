let currentPlayer = '∆';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// listen out to reset button
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);

// grabs every element with this class on the page
const cells = document.querySelectorAll('.tttcell');

//perform click check
cells.forEach (cell =>{
    cell.addEventListener('click', cellClicked, false);
});

function handlePlayerTurn(clickedCellIndex){
    if (gameBoard[clickedCellIndex] !== '' || !gameActive){
        return;
    }
    gameBoard[clickedCellIndex] = currentPlayer;

    checkForWinOrDraw();
    
    // this is a shorthand if statement. if currentplayer is X then set to O, else set to X.
    currentPlayer = currentPlayer === '∆' ? 'Ө' : '∆';
}

function cellClicked(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;

    //this strips the text from the cell id and leaves the int, minusing 1 to prevent an off by 1 error.
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-','')) - 1;

    console.log(clickedCellIndex);

    if (gameBoard[clickedCellIndex] !== '' || !gameActive){
        return;
    }

    handlePlayerTurn(clickedCellIndex);
    updateUI();
}



function checkForWinOrDraw(){
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++){
        const [a,b,c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon){
        announceWinner(currentPlayer);
        gameActive = false;
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        announceDraw();
        gameActive = false;
        return;
    }
}


// translates the gameboard array to the div text for each cell.
function updateUI(){
    for (let i = 0; i < cells.length; i++){
        cells[i].innerText = gameBoard[i];
    }
}

function announceWinner(player){
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = `Player ${player} Wins!`;
}

function announceDraw(){
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = 'Game is a draw!';
}

function resetGame(){
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = '∆';

    cells.forEach (cell =>{
        cell.innerText = '';
    });
    document.getElementById('gameMessage').innerText = '';
}