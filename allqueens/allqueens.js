var gameOver = false;
var board = new Array(5);
var selected = [];
var turn = 'w';
for (var i = 0; i < 5; i++) {
    board[i] = new Array(5);
}
createBoard();
function createBoard() {
    document.writeln("<table id='board'>");

    for (var i = 0; i < 5; i++) {
        document.writeln("<tr>");
        for (var j = 0; j < 5; j++) {
            document.writeln("<td id='c" + i + "" + j + "' class='cells' onClick='select(this)' onmouseover='hov(this)' onmouseout='white(this)'></td>");
            board[i][j] = document.getElementById("c" + i + "" + j);
            board[i][j].style.backgroundImage = "none";
        }
        document.writeln("</tr>");
    }
    document.writeln("</table>");

    for (var i = 0; i < 5; i++) {
        placeQueen(board[0][i]);
        changeTurn();
        placeQueen(board[4][i]);
    }

    placeQueen(board[2][0]);
    changeTurn();
    placeQueen(board[2][4]);


    document.writeln("<div id='playerTurn'><h3>Turn:</h3>White</div>");
}

function changeTurn() {
    if (turn == 'w') {
        turn = 'r';
    } else {
        turn = 'w';
    }
}

function hov(cell) {
    if (gameOver) {
        return;
    }
    cell.style.backgroundColor = "#ABCBFF";
}

function white(cell) {
    if (gameOver) {
        return;
    }
    if (selected.includes(cell)) {
        return;
    }
    cell.style.backgroundColor = "white";
}

function getURL(turn) {
    return "url('queens/" + turn + "_queen.gif')";
}

function placeQueen(cell) {
    cell.style.backgroundImage = getURL(turn);
}

function select(cell) {
    if (gameOver) {
        return;
    }
    hov(cell);
    if (selected.length == 0) {
        selected.push(cell);
        return;
    }
    if (selected.length == 1) {
        selected.push(cell);
        selected[0].style.backgroundColor = "white";
        selected[1].style.backgroundColor = "white";

        if (selected[0].style.backgroundImage[12] != turn) {
            document.getElementById("playerTurn").innerHTML = "<h2>Invalid Move!</h2>";
            selected = [];
            return;
        }
        if (selected[1].style.backgroundImage[0] != 'n') {
            document.getElementById("playerTurn").innerHTML = "<h2>Invalid Move!</h2>";
            selected = [];
            return;
        }

        var diffx = x(selected[0]) - x(selected[1]);
        var diffy = y(selected[0]) - y(selected[1]);
        var startx = x(selected[0]);
        var starty = y(selected[0]);

        if ((x(selected[0]) != x(selected[1])) && (y(selected[0]) != y(selected[1]))) {
            if (Math.abs(diffx) != Math.abs(diffy)) {
                document.getElementById("playerTurn").innerHTML = "<h2>Invalid Move!</h2>";
                selected = [];
                return;
            }
        }
//---------------------- CHECK IMPEDENCE -------------------------//

        if (diffx == 0) {
            if (diffy > 0) {
                for (var i = 1; i < diffy; i++) {
                    var temp = board[startx][starty - i];
                    if (temp.style.backgroundImage[0] != 'n') {
                        document.getElementById("playerTurn").innerHTML = "<h2>Invalid Move!</h2>";
                        selected = [];
                        return;
                    }
                }
            } else {
                for (var i = 1; i < Math.abs(diffy); i++) {
                    var temp = board[startx][starty + i];
                    if (temp.style.backgroundImage[0] != 'n') {
                        document.getElementById("playerTurn").innerHTML = "<h2>Invalid Move!</h2>";
                        selected = [];
                        return;
                    }
                }
            }
        } else if (diffy == 0) {
            if (diffx > 0) {
                for (var i = 1; i < diffx; i++) {
                    var temp = board[startx - i][starty];
                    if (temp.style.backgroundImage[0] != 'n') {
                        document.getElementById("playerTurn").innerHTML = "<h2>Invalid Move!</h2>";
                        selected = [];
                        return;
                    }
                }
            } else {
                for (var i = 1; i < Math.abs(diffx); i++) {
                    var temp = board[startx + i][starty];
                    if (temp.style.backgroundImage[0] != 'n') {
                        document.getElementById("playerTurn").innerHTML = "<h2>Invalid Move!</h2>";
                        selected = [];
                        return;
                    }
                }
            }
        } else {
            if (diffx > 0 && diffy > 0) {
                for (var i = 1; i < diffx; i++) {
                    var temp = board[startx - i][starty - i];
                    if (temp.style.backgroundImage[0] != 'n') {
                        document.getElementById("playerTurn").innerHTML = "<h2>Invalid Move!</h2>";
                        selected = [];
                        return;
                    }
                }
            } else if (diffx > 0 && diffy < 0) {
                for (var i = 1; i < diffx; i++) {
                    var temp = board[startx - i][starty + i];
                    if (temp.style.backgroundImage[0] != 'n') {
                        document.getElementById("playerTurn").innerHTML = "<h2>Invalid Move!</h2>";
                        selected = [];
                        return;
                    }
                }
            } else if (diffx < 0 && diffy > 0) {
                for (var i = 1; i < diffy; i++) {
                    var temp = board[startx + i][starty - i];
                    if (temp.style.backgroundImage[0] != 'n') {
                        document.getElementById("playerTurn").innerHTML = "<h2>Invalid Move!</h2>";
                        selected = [];
                        return;
                    }
                }
            } else {
                for (var i = 1; i < Math.abs(diffy); i++) {
                    var temp = board[startx + i][starty + i];
                    if (temp.style.backgroundImage[0] != 'n') {
                        document.getElementById("playerTurn").innerHTML = "<h2>Invalid Move!</h2>";
                        selected = [];
                        return;
                    }
                }
            }
        }

//---------------------- CHECK IMPEDENCE -------------------------//

        selected[0].style.backgroundImage = "none";
        selected[1].style.backgroundImage = getURL(turn);

        checkWin(cell);

        changeTurn();
        if (turn == 'r') {
            document.getElementById("playerTurn").innerHTML = "<h3>Turn:</h3>Red";
        } else {
            document.getElementById("playerTurn").innerHTML = "<h3>Turn:</h3>White";
        }

        selected = [];
    }
}

function checkWin(cell) {
    var r = x(cell), c = y(cell);
    var horizontal = 0, vertical = 0, diag = 0, adiag = 0;

    //vertical
    for (var i = 1; i < 4; i++) {
        if (r + i > 4) {
            break;
        }
        if (board[r + i][c].style.backgroundImage[12] == turn) {
            vertical++;
        } else {
            break;
        }
    }
    for (var i = 1; i < 4; i++) {
        if (r - i < 0) {
            break;
        }
        if (board[r - i][c].style.backgroundImage[12] == turn) {
            vertical++;
        } else {
            break;
        }
    }
    if (vertical >= 3) {
        win();
        return;
    }

    //horizontal
    for (var i = 1; i < 4; i++) {
        if (c + i > 4) {
            break;
        }
        if (board[r][c + i].style.backgroundImage[12] == turn) {
            horizontal++;
        } else {
            break;
        }
    }
    for (var i = 1; i < 4; i++) {
        if (c - i < 0) {
            break;
        }
        if (board[r][c - i].style.backgroundImage[12] == turn) {
            horizontal++;
        } else {
            break;
        }
    }
    if (horizontal >= 3) {
        win();
        return;
    }

    //diag
    for (var i = 1; i < 4; i++) {
        if (r - i < 0 || c + i > 4) {
            break;
        }
        if (board[r - i][c + i].style.backgroundImage[12] == turn) {
            diag++;
        } else {
            break;
        }
    }
    for (var i = 1; i < 4; i++) {
        if (r + i > 4 || c - i < 0) {
            break;
        }
        if (board[r + i][c - i].style.backgroundImage[12] == turn) {
            diag++;
        } else {
            break;
        }
    }
    if (diag >= 3) {
        win();
        return;
    }

    //adiag
    for (var i = 1; i < 4; i++) {
        if (r + i > 4 || c + i > 4) {
            break;
        }
        if (board[r + i][c + i].style.backgroundImage[12] == turn) {
            adiag++;
        } else {
            break;
        }
    }
    for (var i = 1; i < 4; i++) {
        if (r - i < 0 || c - i < 0) {
            break;
        }
        if (board[r - i][c - i].style.backgroundImage[12] == turn) {
            adiag++;
        } else {
            break;
        }
    }
    if (adiag >= 3) {
        win();
        return;
    }
}

function win() {
    gameOver = true;
    var color = "";
    if (turn =='w') {
        color = "white";
    } else {
        color = "red";
    }

    document.getElementById("c20").style.backgroundColor = "black";
    document.getElementById("c20").style.backgroundImage = "none";
    document.getElementById("c21").style.color = color;
    document.getElementById("c21").style.backgroundColor = "black";
    document.getElementById("c21").innerHTML = "W";
    document.getElementById("c21").style.backgroundImage = "none";
    document.getElementById("c22").style.color = color;
    document.getElementById("c22").style.backgroundColor = "black";
    document.getElementById("c22").innerHTML = "I";
    document.getElementById("c22").style.backgroundImage = "none";
    document.getElementById("c23").style.color = color;
    document.getElementById("c23").style.backgroundColor = "black";
    document.getElementById("c23").innerHTML = "N";
    document.getElementById("c23").style.backgroundImage = "none";
    document.getElementById("c24").style.backgroundColor = "black";
    document.getElementById("c24").style.backgroundImage = "none";
}

function x(cell) {
    return parseInt(cell.id[1]);
}

function y(cell) {
    return parseInt(cell.id[2]);
}
