const DOM = {
    nodes: {
        playerOneBoard: document.querySelector('.player-one-board'),
    },

    createPlayerBoard() {
        for (let i = 0; i < 10; i++) {
            const row = document.createElement('div');

            for (let j = 0; j < 10; j++) {
                const square = document.createElement('div');

                row.append(square);
            }

            this.nodes.playerOneBoard.append(row);
        }
    },
};

export { DOM };
