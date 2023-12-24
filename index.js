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
let p1 = 0;
let p2 = 0;
let details = document.querySelector(".details");
details.innerHTML = `<h2>Click start to play</h2>
                    <span> Player 1: X Score : ${p1}</span >
                    <span> player 2: O Score : ${p2}</span> `;
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
            if (res == "X") {
                winner.innerHTML = res = "Player 1 won";
                p1 = p1 + 1
            }
            else {
                winner.innerHTML = res = "Player 2 won";
                p2 = p2 + 1
            }
            updateScore()

        } else {
            document.querySelector(".details > h2").innerHTML = count % 2 == 0 ? "Player 2 turn" : "Player 1 turn"
            count = count + 1
        }
        if (count == 9) {
            winner.style.display = "block";
            winner.innerHTML = "Draw"
        }
    }
}
const reset = () => {
    let boxes = document.getElementsByClassName("box");
    for (let i = 0; i < 9; i++) {
        boxes[i].innerHTML = "";
        boxes[i].classList = "box";
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
            winline(win[i][0], win[i][1], win[i][2])
            return "X";
        } else if (list[win[i][0]] == "O" && list[win[i][1]] == "O" && list[win[i][2]] == "O") {
            winline(win[i][0], win[i][1], win[i][2])
            return "O";
        }
    }
    return false
}
const winline = (id1, id2, id3) => {
    document.getElementById(id1).classList.add("won")
    document.getElementById(id2).classList.add("won")
    document.getElementById(id3).classList.add("won")
}
const updateScore = () => {
    details.innerHTML = `<h2>Click start to play</h2>
    <span> Player 1: X Score : ${p1}</span >
    <span> player 2: O Score : ${p2}</span> `;
}