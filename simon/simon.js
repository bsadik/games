var begun = false, seq = false, gameOver = false;
var curlen = 0, curcheck = 0;
var colors = ["red", "blue", "green", "yellow"];
var puzzle = [];
createBoard();

function createBoard() {
    document.writeln("<table id='board'>");

    document.writeln("<tr>");
    document.writeln("<td id='yellow' class='colors' bgcolor='yellow' onClick='enter(this.id)'></td>");
    document.writeln("<td id='blue' class='colors' bgcolor='blue' onClick='enter(this.id)'></td>");
    document.writeln("</tr>");

    document.writeln("<tr>");
    document.writeln("<td id='red' class='colors' bgcolor='red' onClick='enter(this.id)'></td>");
    document.writeln("<td id='green' class='colors' bgcolor='green' onClick='enter(this.id)'></td>");
    document.writeln("</tr>");

    document.writeln("</table>");

    document.writeln("<form><input type='button' value='Start' onClick='start()'/></form>");

    document.writeln("<div id='results'></div>");
    document.writeln("<table id='sequence'></table>");
}


function highlight(c) {
    var cell = document.getElementById(c);
    var color = "";
    if (cell.id[0] == 'r') {
        color = "rgb(255, 128, 128)";
    } else if (cell.id[0] == 'g') {
        color = "rgb(128, 255, 128)";
    } else if (cell.id[0] == 'b') {
        color = "rgb(128, 128, 255)";
    } else {
        color = "rgb(255,255, 170)";
    }

    cell.style.backgroundColor = color;
}

function enter(id) {
    if (seq) {
        return;
    }
    if (gameOver) {
        return;
    }

    if (!begun) {
        return;
    }

    highlight(id);

    if (id[0] != puzzle[curcheck][0]) {
        fail();
        return;
    }

    setTimeout(function() {
        if (!gameOver) {
            document.getElementById(id).style.backgroundColor = id;
        }
    }, 150);

    if (++curcheck == curlen) {
        newSeq();
        curcheck = 0;
    }
}

function start() {
    if (begun) {
        return;
    }
    begun = true;

    newSeq();
}

function newSeq() {
    seq = true;
    puzzle.push(colors[Math.floor(Math.random()*4)]);
    curlen++;
    var i = 0;

    timeLoop(i);

    if (gameOver) {
        fail();
    }
}

function timeLoop(i) {
    if (i == curlen) {
        seq = false;
        return;
    }
    setTimeout(function() {
        if (i < curlen) {
            highlight(puzzle[i]);
        }
        timeLoop2(i);
    }, 350);
}

function timeLoop2(i) {
    setTimeout(function() {
        document.getElementById(puzzle[i]).style.backgroundColor = puzzle[i];
        timeLoop(i + 1);
    }, 350);
}

function fail() {
    for (var i = 0; i < colors.length; i++) {
        document.getElementById(colors[i]).style.backgroundColor = "black";
    }
    gameOver = true;

    document.getElementById("results").innerHTML = "<h1>You lasted " + curlen + " rounds!</h1>";
    printSeq();
}

function printSeq() {
    var output = "";

    for (var i = 0; i < puzzle.length; i++) {
        output += "<tr><td bgcolor='" + puzzle[i] + "'></td></tr>";
    }

    document.getElementById("sequence").innerHTML = output;
}
