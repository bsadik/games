var turn = 0;
var gameOver = false;
var board = new Array(6);

for (var i = 0; i < 6; i++) {
    board[i] = new Array(7);
}

createBoard();

function createBoard() {
    document.writeln("<div id='c4container'>");
    document.writeln("<table id='c4header'>");
    document.writeln("<tr>");
    for (var i = 0; i < 7; i++) {
        document.writeln("<td id='h" + i + "' onmouseover='hov(" + i + ")' onmouseout='white(" + i + ")'></td>");
    }
    document.writeln("</tr>");
    document.writeln("</table>");

    document.writeln("<table id='c4board'>");
    document.writeln("</tr>");
    for (var i = 0; i < 6; i++) {
        document.writeln("<tr>");
        for (var j = 0; j < 7; j++) {
            document.writeln("<td id='c" + i + "" + j + "' onClick='play(" + i + ", " + j + ")' onmouseover='hov(" + j + ")' onmouseout='white(" + j + ")'></td>");
            board[i][j] = document.getElementById("c" + i + "" + j);
            board[i][j].style.backgroundColor = "white";
        }
        document.writeln("</tr>");
    }
    document.writeln("</table>");
    document.writeln("</div>");
}

function hov(col) {
    if (gameOver) {
        return;
    }
    var h = document.getElementById("h" + col);
    if (turn == 0) {
        h.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
    } else {
        h.style.backgroundColor = "rgba(0, 0, 255, 0.3)";
    }
}

function white(col) {
    if (gameOver) {
        return;
    }
    var h = document.getElementById("h" + col);
    h.style.backgroundColor = "white";
}

function turnToColor() {
    if (turn == 0) {
        return "red";
    }
    return "blue";
}

function play(r, c) {
    if (gameOver) {
        return;
    }
    white(c);

    for (var i = 5; i >= 0; i--) {
        if (board[i][c].style.backgroundColor[0] == 'w') {
            board[i][c].style.backgroundColor = turnToColor();

            checkWin(i, c);

            if (turn == 0) {
                turn = 1;
            } else {
                turn = 0;
            }

            break;
        }
    }
}

function checkWin(r, c) {
    var color = turnToColor();
    var horizontal = 0, vertical = 0, diag = 0, adiag = 0;

    //vertical
    for (var i = 1; i < 4; i++) {
        if (r + i > 5) {
            break;
        }
        if (board[r + i][c].style.backgroundColor[0] == color[0]) {
            vertical++;
        } else {
            break;
        }
    }
    for (var i = 1; i < 4; i++) {
        if (r - i < 0) {
            break;
        }
        if (board[r - i][c].style.backgroundColor[0] == color[0]) {
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
        if (c + i > 6) {
            break;
        }
        if (board[r][c + i].style.backgroundColor[0] == color[0]) {
            horizontal++;
        } else {
            break;
        }
    }
    for (var i = 1; i < 4; i++) {
        if (c - i < 0) {
            break;
        }
        if (board[r][c - i].style.backgroundColor[0] == color[0]) {
            horizontal++;
        } else {
            break;j
        }
    }
    if (horizontal >= 3) {
        win();
        return;
    }

    //diag
    for (var i = 1; i < 4; i++) {
        if (r - i < 0 || c + i > 6) {
            break;
        }
        if (board[r - i][c + i].style.backgroundColor[0] == color[0]) {
            diag++;
        } else {
            break;
        }
    }
    for (var i = 1; i < 4; i++) {
        if (r + i > 5 || c - i < 0) {
            break;
        }
        if (board[r + i][c - i].style.backgroundColor[0] == color[0]) {
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
        if (r + i > 5 || c + i > 6) {
            break;
        }
        if (board[r + i][c + i].style.backgroundColor[0] == color[0]) {
            adiag++;
        } else {
            break;
        }
    }
    for (var i = 1; i < 4; i++) {
        if (r - i < 0 || c - i < 0) {
            break;
        }
        if (board[r - i][c - i].style.backgroundColor[0] == color[0]) {
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
    document.getElementById("h2").innerHTML = "W";
    document.getElementById("h3").innerHTML = "I";
    document.getElementById("h4").innerHTML = "N";
    var r, b;
    if (turn == 0) {
        r = 255;
        b = 0;
    } else {
        r = 0;
        b = 255;
    }
    for (var i = 0; i < 7; i++) {
        document.getElementById("h" + i).style.backgroundColor = "rgba(" + r + ", 0, " + b + ", 255)";
    }
}
