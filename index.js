let win = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
];
let count = 0;
let list = ["", "", "", "", "", "", "", "", ""];
let remaining = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let playing = true;
let p1 = 0;
let p1name = "Player 1";
let p2name = "Player 2";
let p2 = 0;
let c = false;
let game = document.querySelector(".game");
let details = document.querySelector(".details");
let winner = document.querySelector(".winner");
let multi = document.querySelector("#Multi");
let single = document.querySelector("#Single");
let btns = document.querySelector(".btns");
let boxes = document.querySelectorAll(".box");

game.style.display = "none";
multi.addEventListener("click", () => {
    start("Player 1", "Player 2");
});
single.addEventListener("click", () => {
    // alert("under working");
    start("player 1", "Computer");
});

const start = (p1n, p2n) => {
    p1name = p1n;
    p2name = p2n;
    if (p2name == "Computer") {
        c = true;
    }
    details.innerHTML = `<h2>Click start to play</h2>
                    <span> ${p1name}: X Score : ${p1}</span >
                    <span> ${p2name}: O Score : ${p2}</span> `;
    btns.style.display = "none";
    game.style.display = "flex";
    document.querySelector("#board").style.display = "grid";
    document.querySelector(".details > h2").innerHTML = "Player 1 turn";
};

const mplace = (id) => {
    if (!list[id] && playing) {
        // console.log(id);
        let box = document.getElementById(id);
        if (count % 2 == 1) {
            box.innerHTML = "<span>O</span>";
            list[id] = "O";
        } else {
            box.innerHTML = "<span>X</span>";
            list[id] = "X";
        }
        remaining.splice(id - 1 - count, 1);
        let res = Validate();
        if (res) {
            playing = false;
            winner.style.display = "block";
            if (res == "X") {
                winner.innerHTML = `${p1name} won`;
                p1 = p1 + 1;
            } else {
                winner.innerHTML = `${p2name} won`;
                p2 = p2 + 1;
            }
            updateScore();
        } else {
            document.querySelector(".details > h2").innerHTML =
                count % 2 == 0 ? `${p2name} turn` : `${p1name} turn`;
            count = count + 1;
        }
        if (count == 9) {
            winner.style.display = "block";
            winner.innerHTML = "Draw";
        }
    }
    if (count % 2 == 1 && c && count != 9 && playing) {
        // console.log("cplace ");
        cplace();
    }
};
const cplace = () => {
    let place = 0;
    checko = check("O");
    checkx = check("X");
    if (checko) {
        // console.log("checked O");
        place = checko;
    } else if (checkx) {
        // console.log("checked X");
        place = checkx;
    } else {
        // console.log("random")
        place = remaining[Math.floor(Math.random() * remaining.length)];
    }
    // console.log(place);
    setTimeout(function () {
        mplace(place);
    }, 1000);
    // mplace(place);
};
const reset = () => {
    let boxes = document.getElementsByClassName("box");
    for (let i = 0; i < 9; i++) {
        boxes[i].innerHTML = "";
        boxes[i].classList = "box";
    }
    document.querySelector(".winner").style.display = "none";
    document.querySelector(".details > h2").innerHTML = `${p1name} turn`;
    list = ["", "", "", "", "", "", "", "", ""];
    count = 0;
    playing = true;
    remaining = [1, 2, 3, 4, 5, 6, 7, 8, 9];
};

const Validate = () => {
    for (let i = 0; i < 8; i++) {
        if (
            list[win[i][0]] == "X" &&
            list[win[i][1]] == "X" &&
            list[win[i][2]] == "X"
        ) {
            winline(win[i][0], win[i][1], win[i][2]);
            return "X";
        } else if (
            list[win[i][0]] == "O" &&
            list[win[i][1]] == "O" &&
            list[win[i][2]] == "O"
        ) {
            winline(win[i][0], win[i][1], win[i][2]);
            return "O";
        }
    }
    return false;
};

const winline = (id1, id2, id3) => {
    document.getElementById(id1).classList.add("won");
    document.getElementById(id2).classList.add("won");
    document.getElementById(id3).classList.add("won");
};

const updateScore = () => {
    details.innerHTML = `<h2>Click start to play</h2>
    <span> ${p1name}: X Score : ${p1}</span >
    <span> ${p2name} O Score : ${p2}</span> `;
};

const reload = () => {
    location.reload();
};
const check = (a) => {
    console.log("chceking", a);
    for (let i = 0; i < 8; i++) {
        if (
            list[win[i][0]] == a &&
            list[win[i][1]] == a &&
            list[win[i][2]] == ""
        ) {
            return win[i][2];
        } else if (
            list[win[i][0]] == a &&
            list[win[i][2]] == a &&
            list[win[i][1]] == ""
        ) {
            return win[i][1];
        } else if (
            list[win[i][1]] == a &&
            list[win[i][2]] == a &&
            list[win[i][0]] == ""
        ) {
            return win[i][0];
        }
    }
    return false;
};
