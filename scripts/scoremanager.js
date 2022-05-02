//player 1

function changeScore(id) {
    document.getElementById(id).innerHTML = "O"
    document.getElementById(id).classList.remove("scoreoff")
    document.getElementById(id).classList.add("scoreon")
}

function changeTextIncrament1() {
    if (document.getElementById("player1-1").innerHTML == "O") {
        if (document.getElementById("player1-2").innerHTML == "O") {
            if (document.getElementById("player1-3").innerHTML == "O") {
                if (document.getElementById("player1-4").innerHTML == "O") {
                    if (document.getElementById("player1-5").innerHTML == "O") {
                        stopgame()
                    }
                    changeScore("player1-5")

                }
                changeScore("player1-4")

            }
            changeScore("player1-3")

        }
        changeScore("player1-2")

    }
    changeScore("player1-1")
}

//player 2

function changeTextIncrament2() {
    if (document.getElementById("player2-1").innerHTML == "O") {
        if (document.getElementById("player2-2").innerHTML == "O") {
            if (document.getElementById("player2-3").innerHTML == "O") {
                if (document.getElementById("player2-4").innerHTML == "O") {
                    if (document.getElementById("player2-5").innerHTML == "O") {
                        stopgame()
                    }
                    changeScore("player2-5")
                }
                changeScore("player2-4")
            }
            changeScore("player2-3")
        }
        changeScore("player2-2")
    }
    changeScore("player2-1")
}