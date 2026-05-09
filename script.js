const boardElement = document.getElementById('board');
const statusText = document.getElementById('statusText');
const restartButton = document.getElementById('restartButton');
const xScoreElement = document.getElementById('xScore');
const oScoreElement = document.getElementById('oScore');
const drawScoreElement = document.getElementById('drawScore');
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let boardState = Array(9).fill('');
let currentPlayer = 'X';
let isGameActive = true;
let xScore = 0;
let oScore = 0;
let drawScore = 0;

const updateScores = () => {
  xScoreElement.textContent = xScore;
  oScoreElement.textContent = oScore;
  drawScoreElement.textContent = drawScore;
};

const updateStatus = () => {
  if (!isGameActive) return;
  statusText.textContent = `${currentPlayer}'s turn`;
};

const highlightWinner = (pattern) => {
  pattern.forEach(index => {
    const cell = boardElement.querySelector(`[data-index='${index}']`);
    if (cell) cell.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.18) inset';
  });
};

const checkResult = () => {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      isGameActive = false;
      statusText.textContent = `${boardState[a]} wins!`;
      if (boardState[a] === 'X') {
        xScore += 1;
      } else {
        oScore += 1;
      }
      updateScores();
      highlightWinner(pattern);
      return;
    }
  }

  if (!boardState.includes('')) {
    isGameActive = false;
    drawScore += 1;
    statusText.textContent = 'Draw!';
    updateScores();
  }
};

const handleCellClick = (event) => {
  const cell = event.target;
  if (!cell.classList.contains('cell')) return;
  const index = Number(cell.dataset.index);

  if (!isGameActive || boardState[index] || cell.disabled) {
    return;
  }

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.disabled = true;

  checkResult();
  if (!isGameActive) return;

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
};

const restartGame = () => {
  boardState = Array(9).fill('');
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = "X's turn";

  boardElement.querySelectorAll('.cell').forEach((cell) => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x', 'o');
    cell.style.boxShadow = 'none';
  });
};

boardElement.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', restartGame);
updateStatus();
updateScores();
