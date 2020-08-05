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
let test_state = 'rnkbqbnr/pppppppp/8/8/8/8/PPPPPPPP/RNKBQBNR w KQkq - 0 1';
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
            generateChess960();
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

let generateChess960 = () => {
    if (generateStartingState()) {
        console.log('it worked.')
    }
}

let generateStartingState = () => {
    // Randomizes the starting state of the back row
    let backrow_state = '';

    // Intial starting state
    for (let i = 0; i < 9; i++) {
        // Checks if the piece being insertted already is or has more than two
        switch (Math.floor(Math.random() * 5)) {
            // Bishop has at most 2
            case 0:
                if (!backrow_state.match(`.*${bishop}.*${bishop}.*`)) {
                    backrow_state += bishop;
                }
                break;
            // Knight has at most 2
            case 1:
                if (!backrow_state.match(`.*${knight}.*${knight}.*`)) {
                    backrow_state += knight;
                }
                break;
            // Rook has at most 2
            case 2:
                if (!backrow_state.match(`.*${rook}.*${rook}.*`)) {
                    backrow_state += rook;
                }
                break;
            // Queen has at most 1
            case 3:
                if (!backrow_state.match(`.*${queen}.*`)) {
                    backrow_state += queen;
                }
                break;
            // King has at most 1
            case 4:
                if (!backrow_state.match(`.*${king}.*`)) {
                    backrow_state += king;
                }
                break;
            default:
                console.log('Something went wrong when trying to insert chess pieces.')
                break;
        }
    }

    // Makes sure that the starting state contains each piece with the corrent amount per piece.
    if (backrow_state.length < 8) {
        if (!backrow_state.match(`.*${bishop}.*${bishop}.*`)) {
            backrow_state += bishop;
        }
        if (!backrow_state.match(`.*${knight}.*${knight}.*`)) {
            backrow_state += knight;
        }
        if (!backrow_state.match(`.*${rook}.*${rook}.*`)) {
            backrow_state += rook;
        }
        if (!backrow_state.match(`.*${queen}.*`)) {
            backrow_state += queen;
        }
        if (!backrow_state.match(`.*${king}.*`)) {
            backrow_state += king;
        }

        // If this still does not work, recurssivly calls the method.
        if (backrow_state.length < 8) generateStartingState();
        // else console.log(`${backrow_state} :: ${backrow_state.length}`);
        else checksBishopPosition(backrow_state);
    }
}

let checksBishopPosition = (placedPieces) => {
    /*
        The other Bishop can only be 
            1 square away,
            3 squares away,
            5 squares away,
            7 squares away
    */

    let list = placedPieces.split("");
    let firstBishopPosition;
    let secondBishopPostition;

    // Gets the position of the first bishop
    for (let index = 0; index < list.length; index++) {
        if (list[index] == 'b') {
            // Gets the position of the second bishop
            if (firstBishopPosition == "") {
                firstBishopPosition = index;
            } else {
                secondBishopPostition = index;
            }
        }
    }

    console.log(placedPieces);
    console.log(`${firstBishopPosition} :: ${secondBishopPostition}`);
}
// generateMenu();

// UNIT TEST 1
// Tests the starting state for Chess960
// for (let index = 0; index < 10; index++) {
//     generateStartingState();                    
// }

// UNIT TEST 2
// Makes sure that the bishops are on different colored squares.
for (let i = 0; i < 10; i++) {
    generateStartingState();
}