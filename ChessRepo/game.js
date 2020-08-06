const { Chess } = require('chess.js');
const { cwd } = require('process');
const { chownSync } = require('fs');
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
let finalStartGameString;

let pawn = 'p';
let bishop = 'b';
let knight = 'n';
let rook = 'r';
let queen = 'q';
let king = 'k';

let kingPosition;
let rook1Position;
let rook2Position;
let bishop1Position;
let bishop2Position;

let possiblePlaces = [0, 1, 2, 3, 4, 5, 6, 7];
let pieceOrientation = new Array(8);

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
            placeKing();
            placeRooks();
            placeFirstBishop();
            placeSecondBishop();
            placeKnightsAndQueen();
            buildBoard();
            playGame();
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

/*
    Places the King anywhere within an array 
    except for the two corner stops.
*/
let placeKing = () => {
    kingPosition = possiblePlaces[Math.floor(Math.random() * (pieceOrientation.length - 2)) + 1];

    pieceOrientation[possiblePlaces.splice(kingPosition, 1)[0]] = king;
}

let placeRooks = () => {
    rook1Position = Math.floor(Math.random() * kingPosition);
    rook2Position = Math.floor(Math.random() * (pieceOrientation.length - kingPosition + 1)) + kingPosition + 1;

    pieceOrientation[possiblePlaces.splice(possiblePlaces.indexOf(rook1Position), 1)[0]] = rook;
    pieceOrientation[possiblePlaces.splice(possiblePlaces.indexOf(rook2Position), 1)[0]] = rook;
}

let placeFirstBishop = () => {
    let evenPlaces = [];

    // Places the remaining places into all evens array
    possiblePlaces.forEach(element => {
        if (element % 2 == 0) {
            evenPlaces.push(element);
        }
    });
    
    bishop1Position = Math.floor(Math.random() * evenPlaces.length);

    pieceOrientation[possiblePlaces.splice(possiblePlaces.indexOf(evenPlaces[bishop1Position]), 1)[0]] = bishop;
}

let placeSecondBishop = () => {
    let oddPlaces = [];

    // Places the remaining places into all odds array
    possiblePlaces.forEach(element => {
        if (element % 2 != 0) {
            oddPlaces.push(element);
        }
    });
    
    bishop2Position = Math.floor(Math.random() * oddPlaces.length);

    pieceOrientation[possiblePlaces.splice(possiblePlaces.indexOf(oddPlaces[bishop2Position]), 1)[0]] = bishop;
}

let placeKnightsAndQueen = () => {
    let queenPosition = Math.floor(Math.random() * possiblePlaces.length);

    pieceOrientation[possiblePlaces.splice(possiblePlaces.indexOf(possiblePlaces[queenPosition]), 1)[0]] = queen;

    // Places both Knights in the last two spots
    possiblePlaces.forEach(element => {
        pieceOrientation[element] = knight;
    });
}

let buildBoard = () => {
    let pieceOrienString = pieceOrientation.join("");

    finalStartGameString = `${pieceOrienString}/pppppppp/8/8/8/8/PPPPPPPP/${pieceOrienString.toUpperCase()} w KQkq - 0 1`
}

let playGame = () => {
    chess.load(finalStartGameString);

    console.log(chess.ascii());

    // while (!chess.game_over()) {
    //     const moves = chess.moves();
    //     const move = moves[Math.floor(Math.random() * moves.length)];
    //     chess.move(move);
    // }

    // console.log(chess.pgn());
    // console.log(chess.ascii());
}

generateMenu();

// UNIT TEST 1
// Testing if I am able to place the King everywhere but the corners.
// for (let index = 0; index < 10; index++) {
//     possiblePlaces = [0, 1, 2, 3, 4, 5, 6, 7];
//     placeKing();
//     console.log(pieceOrientation);
//     pieceOrientation = new Array(8);
// }

// UNIT TEST 2 
// Placing the Rooks around the King
// for (let index = 0; index < 10; index++) {
//     possiblePlaces = [0, 1, 2, 3, 4, 5, 6, 7];
//     placeKing();
//     placeRooks();
//     // console.log(`${rook1Position} :: ${rook2Position}`)
//     console.log(pieceOrientation);
//     console.log(possiblePlaces)
//     // console.log(rook2Position);
//     // console.log("\n");
//     pieceOrientation = new Array(8);
// }

// UNIT TEST 3
// Places the first Bishop
// for (let index = 0; index < 10; index++) {
//     possiblePlaces = [0, 1, 2, 3, 4, 5, 6, 7];
//     placeKing();
//     placeRooks();
//     placeFirstBishop();
//     console.log(pieceOrientation);
//     // console.log(possiblePlaces)
//     // console.log(bishop1Position);
//     // console.log("\n");
//     pieceOrientation = new Array(8);
// }

// UNIT TEST 4
// Places the second Bishop on a the opposite colored square from the first Bishop
// for (let index = 0; index < 10; index++) {
//     possiblePlaces = [0, 1, 2, 3, 4, 5, 6, 7];
//     placeKing();
//     placeRooks();
//     placeFirstBishop();
//     placeSecondBishop();
//     console.log(pieceOrientation);
//     // console.log(possiblePlaces)
//     // console.log(bishop1Position);
//     // console.log("\n");
//     pieceOrientation = new Array(8);
// }

// UNIT TEST 5
// Places the rest of the pieces (Queen and Knights)
// for (let index = 0; index < 10; index++) {
//     possiblePlaces = [0, 1, 2, 3, 4, 5, 6, 7];
//     placeKing();
//     placeRooks();
//     placeFirstBishop();
//     placeSecondBishop();
//     placeKnightsAndQueen();
//     console.log(pieceOrientation.join(""));
//     pieceOrientation = new Array(8);
// }