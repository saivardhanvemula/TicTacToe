const start = () => {
    document.getElementById("start").style.display = "none";
    document.querySelector("#board").style.display = "grid";
    document.querySelector(".details > h2").innerHTML = "Player 1 turn"
    document.querySelector(".details > h2").innerHTML = "Player 1 turn"
}
let win = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [3, 5, 7]]
let count = 0;
let list = ["", "", "", "", "", "", "", "", ""]
let playing = true;
let winner = document.querySelector(".winner");
const place = (id) => {
    if (!list[id] && playing) {
        let box = document.getElementById(id)
        if (count % 2 == 1) {
            box.innerHTML = "O";
            list[id] = "O";
        } else {
            box.innerHTML = "X";
            list[id] = "X";
        }
        let res = Validate()
        if (res) {
            playing = false;
            console.log("player won");
            winner.style.display = "block";
            winner.innerHTML = res == "X" ? "Player 1 won" : "player 2 won";
        } else {
            document.querySelector(".details > h2").innerHTML = count % 2 == 0 ? "Player 2 turn" : "Player 1 turn"
            count = count + 1
        }
        if (count == 9){
            winner.style.display = "block";
            winner.innerHTML = "Draw"
        }
    }
}
const reset = () => {
    let boxes = document.getElementsByClassName("box");
    for (let i = 0; i < 9; i++) {
        boxes[i].innerHTML = "";
    }
    document.querySelector(".winner").style.display = "none";
    document.querySelector(".details > h2").innerHTML = "Player 1 turn"
    list = ["", "", "", "", "", "", "", "", ""]
    count = 0
    playing = true;
}
const Validate = () => {
    for (let i = 0; i < 8; i++) {
        if (list[win[i][0]] == "X" && list[win[i][1]] == "X" && list[win[i][2]] == "X") {
            return "X";
        } else if (list[win[i][0]] == "O" && list[win[i][1]] == "O" && list[win[i][2]] == "O") {
            return "O";
        }
    }
    return false
}