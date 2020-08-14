// Create a class called TTT
class TTT {
    /*
        Add a constructor that 
        -   defines and initializes all variables
        -   binds the keyword this to the class for each function because
            this will otherwise will refer to the clicked square
            -   this.calculateWinner = this.calculateWinner.bind(this);
            -   DON'T bind this for handleClick at this point
        -   calls the init method
    */
    constructor() {
        this.xIsNext = true;
        this.winner = null;
        this.squares = Array(9).fill(null);
        this.winningLine = Array();
        this.lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        this.symbol = null;

        this.calculateWinner = this.calculateWinner.bind(this);
        this.highlightWinner = this.highlightWinner.bind(this);
        //this.disableOne = this.disableOne.bind(this);
        this.disableAll = this.disableAll.bind(this);
       // this.reset = this.reset.bind(this);
        this.init();
    }

    init() {
        let square = document.getElementsByName("square");
        for (let i = 0; i < this.squares.length; i++) {
            square[i].onclick = this.handleClick.bind(this, i);
            square[i].style.cursor = 'pointer';
        }

        let resetBtn = document.getElementById("reset");
        resetBtn.onclick = this.reset.bind(this);
    }

    handleClick(i) {
        if (this.xIsNext == true) {
            this.symbol = "X";
        }
        else {
            this.symbol = "O";
        }
        this.squares[i] = this.symbol;
        this.disableOne(i);
        document.getElementById(i).innerHTML = (this.symbol);

        if (this.xIsNext == true) {
            this.xIsNext = false;
            this.symbol = "O";
        }
        else {
            this.xIsNext = true;
            this.symbol = "X";
        }
        if (this.calculateWinner() == true) {
            this.highlightWinner()
            this.disableAll();
        }
        else {
            document.getElementById("status").innerHTML = ("Next Player: " + this.symbol);
        }
    }

    calculateWinner() {
        for (let i = 0; i < this.lines.length; i++) {
            let a = this.lines[i][0];
            let b = this.lines[i][1];
            let c = this.lines[i][2];
            if (this.squares[a] &&
                this.squares[a] === this.squares[b] &&
                this.squares[a] === this.squares[c]) {
                this.winner = this.squares[a];
                this.winningLine = this.lines[i];
                return true;
            }
        }
        this.winner = null;
        this.winningLine = Array();
        return false;
    }

    highlightWinner() {
        document.getElementById("status").innerHTML = ("Winner: " + this.winner);
        for (let i = 0; i < this.winningLine.length; i++) {
            let id = this.winningLine[i];
            let redSquare = document.getElementById(id);
            redSquare.classList.add("red");
        }

        this.disableAll();
    }

    disableOne(i) {
        let square = document.getElementById(i);
        square.onclick = () => { };
    }

    disableAll() {
        let square = document.getElementsByName("square");
        for (let i = 0; i < this.squares.length; i++) {
            square[i].onclick = () => { };
            square[i].style.cursor = 'none';
        }
    }

    removeRed() {
        for (let i = 0; i < this.squares.length; i++) {
            let redSquare = document.getElementById(i);
            redSquare.classList.remove("red");
        }
    }

    reset() {
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i] = null;
            document.getElementById(i).innerHTML = null;
        }
    
        if (this.winner == "X") {
            this.symbol = "O",
            document.getElementById("status").innerHTML = ("Next Player: " + this.symbol);
        }
    
        this.removeRed();
        this.init();
    } 
}

/*
    Convert each function to a method
    -   move it inside the class
    -   remove the keyword function
    -   add this to all of the variables that belong to the class
    -   change var to let or const for local variables
    -   add this to all method calls
 
    Init
    -   bind both this and i to handleClick
        -   this.handleClick.bind(this, i);

    CalculateWinner
    -   use destructuring assingment to assign values to
        a b and c in one line

    HandleClick
    -   add a parameter i rather than getting i from this
        -   this now refers to the class not the square
    -   remove the local variable i
    -   add a local variable to refer to the clicked square
        -   remember that squares have an integer id 0 - 8
*/


// declare a variable ttt
let ttt;
// add an onload handler to the window that assigns ttt to a TTT
window.onload = () => { new TTT(); }