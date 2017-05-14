var board = new Array(8);
var remaining = [];
var turn = "white";
var tried = false;
for (var i = 0; i < 8; i++) {
    board[i] = new Array(8);
}

createBoard();

function createBoard() {
    document.writeln("<table id='board'>");

    for (var i = 0; i < 8; i++) {
        document.writeln("<tr>");
        for (var j = 0; j < 8; j++) {
            document.writeln("<td>");
            document.writeln("<div class='cells' id='c" + i + "" + j + "' onClick='putTile(this)' onmouseover='hov(this)' onmouseout='white(this)'></div>");
            document.writeln("</td>");
            board[i][j] = document.getElementById("c" + i + "" + j);
            remaining.push(board[i][j]);
        }
        document.writeln("</tr>");
    }
    document.writeln("</table>");
    board[3][3].style.backgroundColor = "black";
    board[4][4].style.backgroundColor = "black";
    board[3][4].style.backgroundColor = "white";
    board[4][3].style.backgroundColor = "white";

    remaining.splice(remaining.indexOf(board[3][3]), 2);
    remaining.splice(remaining.indexOf(board[4][3]), 2);

    document.writeln("<div id='box'><div id='status'><h3>Turn:</h3>White<br/></div>");
    document.writeln("<form><input type='button' value='No Moves??' onClick='autoMove()'/></form></div>");
}

function putTile(cell) {
    if (!checkAdjacent(cell)) {
        return;
    }

    var rows = validPlacement(cell);
    if (rows.length == 0) {
        return;
    }

    cell.style.backgroundColor = turn;
    flipTiles(rows);
    changeTurn();
    tried = false;

    remaining.splice(remaining.indexOf(cell), 1);

    if (remaining.length == 0) {
        checkWinner();
        return;
    }
}

function autoMove() {
    var len = remaining.length;
    for (var i = 0; i < len; i++) {
        var temp = remaining[i];

        putTile(temp);

        if (remaining.length != len) {
            return;
        }
    }

    if (tried) {
        checkWinner();
        return;
    }

    changeTurn();
    tried = true;
}

function flipTiles(rows) {
    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].length; j++) {
            rows[i][j].style.backgroundColor = turn;
        }
    }
}

function checkWinner() {
    var b = 0, w = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (board[i][j].style.backgroundColor[0] == 'w') {
                w++;
            } else {
                b++;
            }
        }
    }

    if (b > w) {
        window.alert("Black win.");
    } else if (w > b) {
        window.alert("White win.");
    } else {
        window.alert("Draw.");
    }
}

function validPlacement(cell) {
    var r = x(cell);
    var c = y(cell);

    var rows = [];

    // r positive
    var pieces = [];
    for (var i = 1; i < 8; i++) {
        
        if (r + i > 7) {
            break;
        }

        var temp = board[r + i][c];

        if (temp.style.backgroundColor[0] == opp()) {
            pieces.push(temp);
            continue;
        }

        if (temp.style.backgroundColor[0] == turn[0]) {
            if (pieces.length > 0) {
                rows.push(pieces);
            }
        }
        break;
    }

    // r negative
    pieces = [];
    for (var i = 1; i < 8; i++) {
        
        if (r - i < 0) {
            break;
        }

        var temp = board[r - i][c];

        if (temp.style.backgroundColor[0] == opp()) {
            pieces.push(temp);
            continue;
        }

        if (temp.style.backgroundColor[0] == turn[0]) {
            if (pieces.length > 0) {
                rows.push(pieces);
            }
        }
        break;
    }

    // c positive
    pieces = [];
    for (var i = 1; i < 8; i++) {
        
        if (c + i > 7) {
            break;
        }

        var temp = board[r][c + i];

        if (temp.style.backgroundColor[0] == opp()) {
            pieces.push(temp);
            continue;
        }

        if (temp.style.backgroundColor[0] == turn[0]) {
            if (pieces.length > 0) {
                rows.push(pieces);
            }
        }
        break;
    }

    // c negative
    pieces = [];
    for (var i = 1; i < 8; i++) {
        
        if (c - i < 0) {
            break;
        }

        var temp = board[r][c - i];

        if (temp.style.backgroundColor[0] == opp()) {
            pieces.push(temp);
            continue;
        }

        if (temp.style.backgroundColor[0] == turn[0]) {
            if (pieces.length > 0) {
                rows.push(pieces);
            }
        }
        break;
    }

    // r pos c pos
    pieces = [];
    for (var i = 1; i < 8; i++) {
        
        if (r + i > 7 || c + i > 7) {
            break;
        }

        var temp = board[r + i][c + i];

        if (temp.style.backgroundColor[0] == opp()) {
            pieces.push(temp);
            continue;
        }

        if (temp.style.backgroundColor[0] == turn[0]) {
            if (pieces.length > 0) {
                rows.push(pieces);
            }
        }
        break;
    }

    // r pos c neg
    pieces = [];
    for (var i = 1; i < 8; i++) {
        
        if (r + i > 7 || c - i < 0) {
            break;
        }

        var temp = board[r + i][c - i];

        if (temp.style.backgroundColor[0] == opp()) {
            pieces.push(temp);
            continue;
        }

        if (temp.style.backgroundColor[0] == turn[0]) {
            if (pieces.length > 0) {
                rows.push(pieces);
            }
        }
        break;
    }

    // r neg c pos
    pieces = [];
    for (var i = 1; i < 8; i++) {
        
        if (r - i < 0 || c + i > 7) {
            break;
        }

        var temp = board[r -  i][c + i];

        if (temp.style.backgroundColor[0] == opp()) {
            pieces.push(temp);
            continue;
        }

        if (temp.style.backgroundColor[0] == turn[0]) {
            if (pieces.length > 0) {
                rows.push(pieces);
            }
        }
        break;
    }

    // r neg c neg
    pieces = [];
    for (var i = 1; i < 8; i++) {
        
        if (r - i < 0 || c - i < 0) {
            break;
        }

        var temp = board[r - i][c - i];

        if (temp.style.backgroundColor[0] == opp()) {
            pieces.push(temp);
            continue;
        }

        if (temp.style.backgroundColor[0] == turn[0]) {
            if (pieces.length > 0) {
                rows.push(pieces);
            }
        }
        break;
    }

    return rows;
}

function changeTurn() {
    if (turn[0] == 'w') {
        turn = "black";
        document.getElementById("status").innerHTML = "<h3>Turn:</h3>Black<br/>";
        return;
    }
    if (turn[0] == 'b') {
        turn = "white";
        document.getElementById("status").innerHTML = "<h3>Turn:</h3>White<br/>";
        return;
    }
}

function opp() {
    if (turn[0] == 'w') {
        return 'b';
    }
    return 'w';
}

function hov(cell) {
    if (cell.style.backgroundColor[0] == 'b') {
        return;
    }

    if (cell.style.backgroundColor[0] == 'w') {
        return;
    }

    if (!checkAdjacent(cell)) {
        return;
    }

    if (turn[0] == 'w') {
        cell.style.backgroundColor = "rgb(147, 205, 152)";
        return;
    }

    if (turn[0] == 'b') {
        cell.style.backgroundColor = "rgb(19, 78, 25)";
        return;
    }
}

function white(cell) {
    if (cell.style.backgroundColor[0] == 'b') {
        return;
    }
    if (cell.style.backgroundColor[0] == 'w') {
        return;
    }
    cell.style.backgroundColor = "#389B49";
}

function checkAdjacent(cell) {
    var r = x(cell);
    var c = y(cell);
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                continue;
            }

            if (r + i > 7 || r + i < 0) {
                continue;
            }

            if (c + j > 7 || c + j < 0) {
                continue;
            }

            if (board[r + i][c + j].style.backgroundColor[0] == 'w') {
                return true;
            }

            if (board[r + i][c + j].style.backgroundColor[0] == 'b') {
                return true;
            }
        }
    }
    return false;
}

function x(cell) {
    return parseInt(cell.id[1]);
}

function y(cell) {
    return parseInt(cell.id[2]);
}
