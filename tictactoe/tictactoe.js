var turn = 0, moveCount = 0;

createBoard();

function createBoard() {
    document.writeln("<table id='board'>");
    for (var i = 0; i < 3; i++) {
        document.writeln("<tr>");
        for (var j = 0; j < 3; j++) {
            document.writeln("<td id='c" + i + "" + j + "' class='cells' onClick='play(this)'></td>");
        }
        document.writeln("</tr>");
    }
    document.writeln("</table>");

    document.writeln("<div id='result'></div>");
}

function play(cell) {
    if (moveCount == 9) {
        return;
    }

    if (cell.style.backgroundColor == "red") {
        return;
    }
    if (cell.style.backgroundColor == "blue") {
        return;
    }

    if (turn == 0) {
        turn = 1;
        cell.style.backgroundImage = "url('tictactoe_images/x.gif')";
        cell.style.backgroundColor = "red";
    } else {
        turn = 0;
        cell.style.backgroundImage = "url('tictactoe_images/o.gif')";
        cell.style.backgroundColor = "blue";
    }

    moveCount++;

    var x = parseInt(cell.id.charAt(1));
    var y = parseInt(cell.id.charAt(2));

    checkWinner(x, y, cell.style.backgroundColor);
}

function checkWinner(x, y, color) {
    for (var i = 0; i < 3; i++) {
        if (document.getElementById("c" + x + "" + i).style.backgroundColor[0] != color[0]) {
            break;
        }
        if (i == 2) {
            win(x, y, color, 'r');
            return;
        }
    }

    for (var i = 0; i < 3; i++) {
        if (document.getElementById("c" + i + "" + y).style.backgroundColor[0] != color[0]) {
            break;
        }
        if (i == 2) {
            win(x, y, color, 'c');
            return;
        }
    }

    if (x == y) {
        for (var i = 0; i < 3; i++) {
            if (document.getElementById("c" + i + "" + i).style.backgroundColor[0] != color[0]) {
                break;
            }
            if (i == 2) {
                win(x, y, color, 'd');
                return;
            }
        }
    }

    if (x + y == 2) {
        for (var i = 0; i < 3; i++) {
            if (document.getElementById("c" + i + "" + (2 - i)).style.backgroundColor[0] != color[0]) {
                break;
            }
            if (i == 2) {
                win(x, y, color, 'a');
                return;
            }
        }
    }

    if (moveCount == 9) {
        win(x, y, "draw", '');
    }
    
}

function win(x, y, victor, rcda) {
    moveCount = 9;
    if (victor[0] == 'd') {
        document.getElementById("result").innerHTML = "DRAW";
        return;
    }

    if (rcda == 'r') {
        for (var i = 0; i < 3; i++) {
            var c = document.getElementById("c" + x + "" + i);
            c.style.backgroundImage = 'url("tictactoe_images/r_' + c.style.backgroundImage.substring(22);
        }
    }

    if (rcda == 'c') {
        for (var i = 0; i < 3; i++) {
            var c = document.getElementById("c" + i + "" + y);
            c.style.backgroundImage = 'url("tictactoe_images/c_' + c.style.backgroundImage.substring(22);
        }
    }

    if (rcda == 'd') {
        for (var i = 0; i < 3; i++) {
            var c = document.getElementById("c" + i + "" + i);
            c.style.backgroundImage = 'url("tictactoe_images/d_' + c.style.backgroundImage.substring(22);
        }
    }

    if (rcda == 'a') {
        for (var i = 0; i < 3; i++) {
            var c = document.getElementById("c" + i + "" + (2 - i));
            c.style.backgroundImage = 'url("tictactoe_images/a_' + c.style.backgroundImage.substring(22);
        }
    }


    if (victor[0] == 'r') {
        document.getElementById("result").innerHTML = "X'S WIN!!";
        return;
    }

    if (victor[0] == 'b') {
        document.getElementById("result").innerHTML = "O'S WIN!!";
        return;
    }

}
