class TicTacToe {
    constructor() {
        this.board = document.getElementById('board');
        this.cells = document.querySelectorAll('[data-cell]');
        this.status = document.getElementById('status');
        this.restartButton = document.getElementById('restart');
        this.xScore = document.getElementById('x-score');
        this.oScore = document.getElementById('o-score');
        this.scores = {
            x: 0,
            o: 0
        };
        this.xTurn = true;
        this.gameActive = true;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.init();
    }

    init() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.handleClick.bind(this), { once: true });
        });
        
        this.restartButton.addEventListener('click', () => {
            this.restart();
        });
    }

    handleClick(e) {
        if (!this.gameActive) return;
        
        const cell = e.target;
        if (cell.classList.contains('x') || cell.classList.contains('o')) {
            return;
        }
        
        const currentClass = this.xTurn ? 'x' : 'o';
        this.placeMark(cell, currentClass);
        
        if (this.checkWin(currentClass)) {
            this.endGame(false);
            this.updateScore(currentClass);
        } else if (this.isDraw()) {
            this.endGame(true);
        } else {
            this.swapTurns();
        }
    }

    updateScore(winner) {
        this.scores[winner]++;
        if (winner === 'x') {
            this.xScore.textContent = this.scores.x;
        } else {
            this.oScore.textContent = this.scores.o;
        }
    }

    placeMark(cell, currentClass) {
        cell.classList.remove('x', 'o');
        cell.classList.add(currentClass);
        cell.removeEventListener('click', this.handleClick.bind(this));
    }

    swapTurns() {
        this.xTurn = !this.xTurn;
        this.status.textContent = `${this.xTurn ? 'X' : 'O'}'s turn`;
    }

    checkWin(currentClass) {
        return this.winningCombinations.some(combination => {
            if (combination.every(index => {
                return this.cells[index].classList.contains(currentClass);
            })) {
                // Add winner animation to winning cells
                combination.forEach(index => {
                    this.cells[index].classList.add('winner');
                });
                return true;
            }
            return false;
        });
    }

    isDraw() {
        return [...this.cells].every(cell => {
            return cell.classList.contains('x') || cell.classList.contains('o');
        });
    }

    endGame(draw) {
        this.gameActive = false;
        if (draw) {
            this.status.textContent = "Draw";
        } else {
            this.status.textContent = `${this.xTurn ? 'X' : 'O'} wins`;
        }
    }

    restart() {
        this.xTurn = true;
        this.gameActive = true;
        this.status.textContent = "X's turn";
        
        this.cells.forEach(cell => {
            cell.classList.remove('x', 'o', 'winner');
            
            const newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);
            
            newCell.addEventListener('click', this.handleClick.bind(this), { once: true });
        });
        
        this.cells = document.querySelectorAll('[data-cell]');
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    new TicTacToe();
}); 