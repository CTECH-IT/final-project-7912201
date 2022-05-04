//player 1

var player1score = 0;
var player2score = 0;

function changeScoreUp(id, boolean, player) {
    if(boolean) {
        if (player == 1) {
            console.log(player1score)
            document.getElementById(id).innerHTML = "+" + player1score;
            console.log(player1score)
        } else if (player == 2) {
            document.getElementById(id).innerHTML = "+" + player2score;
            console.log(player2score)
        }
    } else {
        document.getElementById(id).innerHTML = "O"
        document.getElementById(id).classList.remove("scoreoff")
        document.getElementById(id).classList.add("scoreon")
    }
}

function changeScoreDown(id) {
    document.getElementById(id).innerHTML = "A"
    document.getElementById(id).classList.remove("scoreon")
    document.getElementById(id).classList.add("scoreoff")
}

function changeTextIncrament1() {
    if (document.getElementById("player1-1").innerHTML == "O") {
        if (document.getElementById("player1-2").innerHTML == "O") {
            if (document.getElementById("player1-3").innerHTML == "O") {
                if (document.getElementById("player1-4").innerHTML == "O") {
                    if (document.getElementById("player1-5").innerHTML != "A") {
                        player1score += 1;
                        changeScoreUp("player1-5", true, 1)
                        document.getElementById("player1-5").classList.remove("scoreoff")
                        document.getElementById("player1-5").classList.add("scoreon")
                    }
                    changeScoreUp("player1-5", true, 1)

                }
                changeScoreUp("player1-4", false, 1)

            }
            changeScoreUp("player1-3", false, 1)

        }
        changeScoreUp("player1-2", false, 1)

    }
    changeScoreUp("player1-1", false, 1)
}

//player 2

function changeTextIncrament2() {
    if (document.getElementById("player2-1").innerHTML == "O") {
        if (document.getElementById("player2-2").innerHTML == "O") {
            if (document.getElementById("player2-3").innerHTML == "O") {
                if (document.getElementById("player2-4").innerHTML == "O") {
                    if (document.getElementById("player2-5").innerHTML != "A") {
                        player2score += 1;
                        changeScoreUp("player2-5", true, 2)
                        document.getElementById("player2-5").classList.remove("scoreoff")
                        document.getElementById("player2-5").classList.add("scoreon")
                    }
                    changeScoreUp("player2-5", true, 2);
                }
                changeScoreUp("player2-4", false, 2)
            }
            changeScoreUp("player2-3", false, 2)
        }
        changeScoreUp("player2-2", false, 2)
    }
    changeScoreUp("player2-1", false, 2)
}

/* Tried to get the other player's points to go down, but that doesn't work
function changeTextIncrament1down() {
    if (document.getElementById("player1-5").innerHTML == "A") {
        if (document.getElementById("player1-4").innerHTML == "A") {
            if (document.getElementById("player1-3").innerHTML == "A") {
                if (document.getElementById("player1-2").innerHTML == "A") {
                    if (document.getElementById("player1-1").innerHTML == "A") {
                        stopgame()
                    }
                    changeScoreDown("player1-1")
                    
                }
                changeScoreDown("player1-2")
                
            }
            changeScoreDown("player1-3")
            
        }
        changeScoreDown("player1-4")
        
    }
    changeScoreDown("player1-5")
}

//player 2

function changeTextIncrament2down() {
    if (document.getElementById("player2-5").innerHTML == "A") {
        if (document.getElementById("player2-4").innerHTML == "A") {
            if (document.getElementById("player2-3").innerHTML == "A") {
                if (document.getElementById("player2-2").innerHTML == "A") {
                    if (document.getElementById("player2-1").innerHTML == "A") {
                        stopgame()
                    }
                    changeScoreDown("player2-1")
                }
                changeScoreDown("player2-2")
            }
            changeScoreDown("player2-3")
        }
        changeScoreDown("player2-4")
    }
    changeScoreDown("player2-5")
} */