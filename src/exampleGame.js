/*board */
const board = [
    {
        flipped: false,
        animal: "pig"
    }
];
const flipMatchedCards=(pick1, pick2)=>{
    board[pick1]['flipped'] = true;
    board[pick2]['flipped'] = true;
};

const checkForMatch=(pick1, pick2)=>{
   return board[pick1]['animal'] == board[pick2]['animal']
};

const isValidPick=(pick1, pick2)=>{
   return board[pick1] && board[pick2]
};

const hasUserWon=()=>{
    let win = true;
    board.forEach(obj => {
        if (!obj.flipped) {
            win = false;
        }
    });
    return win;
};

const matchGame = (pick1, pick2) => {
    if(isValidPick(pick1, pick2)){
        if (checkForMatch(pick1, pick2)) {
            flipMatchedCards(pick1, pick2);
                if (hasUserWon()) {

                }
        }
    };
};