// start with these global variables
var xIsNext = true;
var winner = null;
var squares = Array(9).fill(null);
var winningLine = Array();
var lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let symbol = null;

function init() {
    // Add an onclick handler to all of the squares
    // The name attribute for all of the divs is square
    // Use the function handleClick to handle the event 
    let square = document.getElementsByName("square");
    for (let i = 0; i < squares.length; i++) {
        square[i].onclick = handleClick;
        square[i].style.cursor = 'pointer';
    }

    let resetBtn = document.getElementById("reset");
    resetBtn.onclick = reset;
}

function handleClick() {
    //console.log("click"); - onclick handler works //
    // Get the id from the square and put it in a variable
    // Remember that the id is an integer 0 - 8
    index = this.id;
    // Set the element in the squares array to the player's symbol
    // Update the inner html for this square in the UI
    // Set the onclick handler for this square in the UI to an empty anonymous function or arrow function
    // Update the variable xIsNext
    this.id.onclick() = () => {};
    if (xIsNext == true) {
        symbol = "X";
    }
    else {
        symbol = "O";
    }
    squares[index] = symbol;
    disableOne(index);
    document.getElementById(this.id).innerHTML = (symbol);

    if (xIsNext == true) {
        xIsNext = false;
        symbol = "O";
    }
    else {
        xIsNext = true;
        symbol = "X";
    }
    // If calculateWinner returns true
    // highlight the winner and disable all of the squares
    // otherwise update the status in the UI to display the player
    if (calculateWinner() == true) {
        highlightWinner()
        disableAll();
    }
    else {
        document.getElementById("status").innerHTML = ("Next Player: " + symbol);
    }
}

function calculateWinner() {
    for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0];
        var b = lines[i][1];
        var c = lines[i][2];
        if (squares[a] && //ask if typo seems to not make sense?
            squares[a] === squares[b] &&
            squares[a] === squares[c]) {
            winner = squares[a];
            winningLine = lines[i];
            return true;
        }
    }
    winner = null;
    winningLine = Array();
    return false;
}

//
function highlightWinner() {

    // Update the status in the UI to display the winner
    // Iterate through the winningLine array.  It contains the indices of the winning squares
    //      get the next square using the current index in the winningLine array as the id
    //      add the class red to the square
    // Disable all of the squares
    document.getElementById("status").innerHTML = ("Winner: " + winner);
    for (let i = 0; i < winningLine.length; i++) {
        let id = winningLine[i];
        let redSquare = document.getElementById(id);
        redSquare.classList.add("red");
    }

    disableAll();
}

function disableOne(index) {
    let square = document.getElementById(index);
    square.onclick = () => { };
}

function disableAll() {
    // Set the onclick handler for all squares to function that does nothing
    // The id of the square is a number 0 - 8
    let square = document.getElementsByName("square");
    for (let i = 0; i < squares.length; i++) {
        square[i].onclick = () => { };
        square[i].style.cursor = 'none';
    }
}

function removeRed() {
    for (let i = 0; i < squares.length; i++) {
        let redSquare = document.getElementById(i);
        redSquare.classList.remove("red");
    }
  }

function reset() {
    for (let i = 0; i < squares.length; i++) {
        squares[i] = null;
        document.getElementById(i).innerHTML = null;
    }

    if (winner == "X") {
        symbol = "O",
        document.getElementById("status").innerHTML = ("Next Player: " + symbol);
    }

    removeRed();
    init();
} 

// When the page has finished loading, call the function init 
window.onload = init; 
