const DOM = {
    nodes: {
        playerOneBoard: document.querySelector('.player-one-board'),
    },

    createPlayerBoard(playerGameBoard) {
        const gameBoard = playerGameBoard.board;

        for (let i = 0; i < 10; i++) {
            const row = document.createElement('div');
            row.classList.add(`row-${i}`);

            for (let j = 0; j < 10; j++) {
                const square = document.createElement('div');
                square.classList.add(`square-${j}`);
                square.classList.add(`${gameBoard[i][j].toLowerCase()}`);
                square.textContent = gameBoard[i][j].toUpperCase();

                row.append(square);
            }

            this.nodes.playerOneBoard.append(row);
        }

        console.log(gameBoard);
    },

    clearBoard() {
        [...this.nodes.playerOneBoard.children].forEach((child) => {
            this.nodes.playerOneBoard.removeChild(child);
        });
    },
};

export { DOM };
