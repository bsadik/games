var board = new Array(4);
var nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '', '15'];
var gameOver = false;
createBoard();

function createBoard() {
    document.writeln("<table id='board'>");

    for (var i = 0; i < 4; i++) {
        document.writeln("<tr>");
        board[i] = new Array(4);
        for (var j = 0; j < 4; j++) {
            document.writeln("<td id='c" + i + "" + j + "' onClick='move(this)'></td>");
            board[i][j] = document.getElementById("c" + i + "" + j); 
            var rand = Math.floor(Math.random() * nums.length);
            board[i][j].innerHTML = nums[rand];
            if (nums[rand] != '') {
                board[i][j].style.boxShadow = "1px 1px 1px black";
            } else {
                board[i][j].style.backgroundColor = "lightgrey";
            }
            nums.splice(rand, 1);
        }
        document.writeln("</tr>");
    }
    document.writeln("</table>");

    document.writeln("<div id='suh'></div>");
}

function move(cell) {
    if (gameOver) {
        return;
    }
    var cell2 = checkAdjacent(cell);

    if (cell2 == false) {
        return;
    }

    cell2.innerHTML = cell.innerHTML;
    cell2.style.backgroundColor = "dodgerblue";
    cell2.style.boxShadow = "1px 1px 1px black";

    cell.innerHTML = "";
    cell.style.backgroundColor = "lightgrey";
    cell.style.boxShadow = "";

    if (checkWin()) {
        win();
    }
}

function checkAdjacent(cell) {
    var r = x(cell);
    var c = y(cell);

    for (var i = -1; i <= 1; i += 2) {
        if (r + i > 3 || r + i < 0) {
            continue;
        }
        if (board[r + i][c].style.backgroundColor[0] == 'l') {
            return board[r + i][c];
        }
    }

    for (var i = -1; i <= 1; i += 2) {
        if (c + i > 3 || c + i < 0) {
            continue;
        }
        if (board[r][c + i].style.backgroundColor[0] == 'l') {
            return board[r][c + i];
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

function checkWin() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (parseInt(board[i][j].innerHTML) != (i * 4 + j + 1)) {
                if (i == 3 && j == 3) {
                    continue;
                }
                return false;
            }
        }
    }
    return true;
}

function win() {
    gameOver = true;
    document.getElementById("board").style.backgroundColor = "gold";
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j].innerHTML == '') {
                board[i][j].style.backgroundColor = "gold";
            } else {
                board[i][j].style.backgroundColor = "red";
                board[i][j].style.color = "gold";
            }
        }
    }
}
