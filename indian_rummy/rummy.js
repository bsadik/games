deck = ['2_of_spades.png', '3_of_spades.png', '4_of_spades.png', '5_of_spades.png', '6_of_spades.png', '7_of_spades.png', '8_of_spades.png', '9_of_spades.png', '10_of_spades.png', 'jack_of_spades.png', 'queen_of_spades.png', 'king_of_spades.png', 'ace_of_spades.png', '2_of_hearts.png', '3_of_hearts.png', '4_of_hearts.png', '5_of_hearts.png', '6_of_hearts.png', '7_of_hearts.png', '8_of_hearts.png', '9_of_hearts.png', '10_of_hearts.png', 'jack_of_hearts.png', 'queen_of_hearts.png', 'king_of_hearts.png', 'ace_of_hearts.png', '2_of_diamonds.png', '3_of_diamonds.png', '4_of_diamonds.png', '5_of_diamonds.png', '6_of_diamonds.png', '7_of_diamonds.png', '8_of_diamonds.png', '9_of_diamonds.png', '10_of_diamonds.png', 'jack_of_diamonds.png', 'queen_of_diamonds.png', 'king_of_diamonds.png', 'ace_of_diamonds.png', '2_of_clubs.png', '3_of_clubs.png', '4_of_clubs.png', '5_of_clubs.png', '6_of_clubs.png', '7_of_clubs.png', '8_of_clubs.png', '9_of_clubs.png', '10_of_clubs.png', 'jack_of_clubs.png', 'queen_of_clubs.png', 'king_of_clubs.png', 'ace_of_clubs.png'];
up = []
hands = [];
turn = 0;
turnActive = false;

makeHands();
populateCardBacks();
dealHands();

function makeHands() {
    document.writeln("<table id='p0' class='hand'><tr>");
    for (var i = 0; i < 13; i++) {
        document.writeln("<td class='card-cell' id='p0-" + i + "'>p0." + i + "</td>");
    }
    document.writeln("</tr></table>");

    document.writeln("<table id='p1' class='hand'><tr>");
    for (var i = 0; i < 13; i++) {
        document.writeln("<td class='card-cell' id='p1-" + i + "'>p1." + i + "</td>");
    }
    document.writeln("</tr></table>");

    document.writeln("<table id='mid'><tr><td id='up'><img src='./cards/blank.png' /></td><td id='down'><img src='./cards/back.png' /></td></tr></table>");

    document.writeln("<div id='turn'>Player One</div>");
    document.writeln("<div id='go' onclick='startTurn()'>Go</div>");
}

function dealHands() {
    shuffle();
    hands[0] = [];
    hands[1] = [];
    for (var i = 0; i < 13; i++) {
        hands[0].push(topCard());
        hands[1].push(topCard());
    }
}

function displayHand(p) {
    for (var i = 0; i < 13; i++) {
        var c = hands[p][i];
        document.getElementById("p" + p + "-" + i).innerHTML = "<img src='./cards/" + c + "'/>";
    }
}

function hideHand(p) {
    for (var i = 0; i < 13;i++) {
        document.getElementById("p"+ p + '-' + i).innerHTML = "<img src='./cards/back.png'/>";
    }
}

function shuffle() {
    for (var i = 0; i < deck.length; i++) {
        var r = Math.floor(Math.random() * deck.length);
        var temp = deck[i];
        deck[i] = deck[r];
        deck[r] = temp;
    }
}

function nextCard() {
    up.unshift(topCard());
    document.getElementById("up").innerHTML = "<img src='./cards/" + up[0] + "' />";

}

function startTurn() {
    if (turnActive) {
        document.getElementById("go").innerHTML = "Go";
        hideHand(turn);
        changeTurn();
    } else {
        document.getElementById("go").innerHTML = "Done";
        displayHand(turn);
    }
    turnActive = !turnActive;
}

function changeTurn() {
    if (turn == 0) {
        document.getElementById("turn").innerHTML = "Player Two";
        turn = 1;
    } else {
        document.getElementById("turn").innerHTML = "Player One";
        turn = 0;
    }
}

function topCard() {
    return deck.splice(0, 1);
}

function populateCardBacks() {
    for (var p = 0; p < 2; p++) {
        for (var i = 0; i < 13; i++) {
            document.getElementById("p" + p + "-" + i).innerHTML = "<img src='./cards/back.png'/>";
        }
    }
}
