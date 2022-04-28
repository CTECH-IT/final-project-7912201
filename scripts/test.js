function changeText1() {
    document.getElementById("testtext1").innerHTML = "O"
}

function changeText2() {
    document.getElementById("testtext2").innerHTML = "O"
}

function changeText3() {
    document.getElementById("testtext3").innerHTML = "O"
}

function changeText4() {
    document.getElementById("testtext4").innerHTML = "O"
}

function changeText5() {
    document.getElementById("testtext5").innerHTML = "O"
}

function changeTextIncrament() {
    if (document.getElementById("testtext1").innerHTML == "O") {
        if (document.getElementById("testtext2").innerHTML == "O") {
            if (document.getElementById("testtext3").innerHTML == "O") {
                if (document.getElementById("testtext4").innerHTML == "O") {
                    if (document.getElementById("testtext5").innerHTML == "O") {
                        stopgame()
                    }
                    document.getElementById("testtext5").innerHTML = "O"
                }
                document.getElementById("testtext4").innerHTML = "O"
            }
            document.getElementById("testtext3").innerHTML = "O"
        }
        document.getElementById("testtext2").innerHTML = "O"
    }
    document.getElementById("testtext1").innerHTML = "O"
}