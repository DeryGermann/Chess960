const { Chess } = require('chess.js');
const chess = new Chess();

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// chess.load(test_state);
// console.log(chess.ascii());
// console.log(chess.move('e4'));
// console.log(chess.move('e5'));
// console.log(chess.move('f4'));
// console.log(chess.ascii());

// Chess 960
/*
    Make a menu system to start the game
    in either normal or Chess960.

    Randomize the back row for the black side
    and make the white side match that pattern.

    All other rules are the same.
*/

let starting_state = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

let pawn = 'p';
let bishop = 'b';
let knight = 'n';
let rook = 'r';
let queen = 'q';
let king = 'k';

let generateMenu = () => {
    readline.question('Choose a starting game state!\n1. Normal Chess\n2. Chess960\n\nYour Choice: ', choice => {
        
        choseGameState(choice);

        readline.close();
    });
}

let choseGameState = (choice) => {
    // Checks if the menu choice was a number
    if (!isNaN(choice)) {
        // Checks if the menu item was a value choice
        if (choice == 1) {
            generateNormalChess();
        } else if (choice == 2) {
            generateStartingState();
        } else {
            console.log('*** Make sure you input the correct menu item. ***\n\nRerun the program');
        }
    } else {
        console.log('*** Make sure you input the correct menu item. ***\n\nRerun the program');
    }
}

let generateNormalChess = () => {
    chess.load(starting_state);

    while (!chess.game_over()) {
        const moves = chess.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        chess.move(move);
    }

    console.log(chess.pgn());
    console.log(chess.ascii());
}

