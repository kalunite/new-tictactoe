const boxAll = document.querySelectorAll(`th`);
    const box1 = document.querySelector(`.box-1`);
    const box2 = document.querySelector(`.box-2`);
    const box3 = document.querySelector(`.box-3`);
    const box4 = document.querySelector(`.box-4`);
    const box5 = document.querySelector(`.box-5`);
    const box6 = document.querySelector(`.box-6`);
    const box7 = document.querySelector(`.box-7`);
    const box8 = document.querySelector(`.box-8`);
    const box9 = document.querySelector(`.box-9`);
const boxBlank = document.querySelectorAll(`.box-blank`);
const moveFromBox1 = document.querySelectorAll(`.move-from-box-1`);
const moveFromBox2 = document.querySelectorAll(`.move-from-box-2`);
const moveFromBox3 = document.querySelectorAll(`.move-from-box-3`);
const moveFromBox4 = document.querySelectorAll(`.move-from-box-4`);
const moveFromBox5 = document.querySelectorAll(`.move-from-box-5`);
const moveFromBox6 = document.querySelectorAll(`.move-from-box-6`);
const moveFromBox7 = document.querySelectorAll(`.move-from-box-7`);
const moveFromBox8 = document.querySelectorAll(`.move-from-box-8`);
const moveFromBox9 = document.querySelectorAll(`.move-from-box-9`);
const turnP1 = document.querySelector(`.p1-area .turn`);
const turnP2 = document.querySelector(`.p2-area .turn`);
const scoreP1 = document.querySelector(`.p1-area .score`);
const scoreP2 = document.querySelector(`.p2-area .score`);
const nowTurn = document.querySelector(`.now-turn .turn`);
const stepsRec = document.querySelector(`.steps`);
const explainGame = document.querySelector(`.explain`);

const table = [
    box1, box2, box3, box4, box5, box6, box7, box8, box9
]

const tableMove = [
    moveFromBox1, moveFromBox2, moveFromBox3, moveFromBox4, moveFromBox5, moveFromBox6, moveFromBox7, moveFromBox8, moveFromBox9
]

const p1 = {
    turn : `X`,
    color : `blue`,
    score : 0,
    class : `turn-p1`
}

const p2 = {
    turn : `O`,
    color : `red`,
    score : 0,
    class : `turn-p2`
}

let starter = p1.turn;
let steps = 0;
let xIsNext = true;
let selectToMove = false;
let moveBlock = false;
let selectedMove = ``;

function turnIn() {
    let addTurn = (player) => {
        this.innerText = player.turn;
        this.style.backgroundColor = player.color;
        this.classList.add(`turn-on`);
        this.classList.add(player.class);
        this.classList.remove(`box-blank`);
        steps++;
        stepsRec.innerText = steps;
        winnerJudging(player.turn);
    }
    if (this.innerText != ``) {
        return gamePlay();
    } else if (xIsNext) {
        addTurn(p1);
    } else if (!xIsNext) {
        addTurn(p2);
    }
    xIsNext = !xIsNext;
    checkingNowTurn();
    return gamePlay();
}

function checkingNowTurn() {
    if (xIsNext) {
        nowTurn.innerText = p1.turn;
        nowTurn.style.backgroundColor = p1.color;
    } else {
        nowTurn.innerText = p2.turn;
        nowTurn.style.backgroundColor = p2.color;
    }
}

function selectTurn() {
    let checkingMove = () => {
        if (this == table[0] &&
            table[1].innerText != `` &&
            table[3].innerText != `` &&
            table[4].innerText != `` 
            ||
            this == table[1] &&
            table[0].innerText != `` &&
            table[2].innerText != `` &&
            table[3].innerText != `` &&
            table[4].innerText != `` &&
            table[5].innerText != `` 
            ||
            this == table[2] &&
            table[1].innerText != `` &&
            table[4].innerText != `` &&
            table[5].innerText != `` 
            ||
            this == table[3] &&
            table[0].innerText != `` &&
            table[1].innerText != `` &&
            table[4].innerText != `` &&
            table[6].innerText != `` &&
            table[7].innerText != `` 
            ||
            this == table[4] &&
            table[0].innerText != `` &&
            table[1].innerText != `` &&
            table[2].innerText != `` &&
            table[3].innerText != `` &&
            table[5].innerText != `` &&
            table[6].innerText != `` &&
            table[7].innerText != `` &&
            table[8].innerText != `` 
            ||
            this == table[5] &&
            table[1].innerText != `` &&
            table[2].innerText != `` &&
            table[4].innerText != `` &&
            table[7].innerText != `` &&
            table[8].innerText != ``
            ||
            this == table[6] &&
            table[3].innerText != `` &&
            table[4].innerText != `` &&
            table[7].innerText != `` 
            ||
            this == table[7] &&
            table[3].innerText != `` &&
            table[4].innerText != `` &&
            table[5].innerText != `` &&
            table[6].innerText != `` &&
            table[8].innerText != `` 
            ||
            this == table[8] &&
            table[4].innerText != `` &&
            table[5].innerText != `` &&
            table[7].innerText != ``
            ) {
            moveBlock = true;
        }
    }
    let turnOver = () => {
        this.style.border = `7px solid lavender`;
    }
    checkingMove();
    if (selectedMove != ``) {
        if (moveBlock) {
            moveBlock = false;
            return movePlay();
        }
        if (starter == p1.turn) {
            if (steps % 2 == 0 && this.innerText == p1.turn) {
                turnOver();
            } else if (steps % 2 != 0 && this.innerText == p2.turn) {
                turnOver();
            } else {
                return movePlay();
            }
        } else if (starter == p2.turn) {
            if (steps % 2 == 0 && this.innerText == p2.turn) {
                turnOver();
            } else if (steps % 2 != 0 && this.innerText == p1.turn) {
                turnOver();
            } else {
                return movePlay();
            }
        }
        undoSelect();
        boxBlank.forEach( blank => {
            blank.removeEventListener(`click`, moveTurn);
        });
        selectedMove = this;
        return movePlay();
    }
    if (moveBlock) {
        moveBlock = false;
        return selectPlay();
    }
    if (starter == p1.turn) {
        if (steps % 2 == 0 && this.innerText == p1.turn) {
            turnOver();
        } else if (steps % 2 != 0 && this.innerText == p2.turn) {
            turnOver();
        } else {
            return selectPlay();
        }
    } else if (starter == p2.turn) {
        if (steps % 2 == 0 && this.innerText == p2.turn) {
            turnOver();
        } else if (steps % 2 != 0 && this.innerText == p1.turn) {
            turnOver();
        } else {
            return selectPlay();
        }
    }
    selectToMove = true;
    selectedMove = this;
    return selectPlay();
}

function moveTurn() {
    let deleteTurn = (props) => {
        props.innerText = ``;
        props.style.backgroundColor = `azure`;
        props.style.border = `3px solid black`;
        props.classList.add(`box-blank`);
        if (xIsNext) {
            props.classList.remove(p1.class);
        } else if (!xIsNext) {
            props.classList.remove(p2.class);
        }
        props.classList.remove(`turn-on`);
    }
    let addTurn = (player) => {
        this.innerText = player.turn;
        this.style.backgroundColor = player.color;
        this.classList.add(`turn-on`);
        this.classList.add(player.class);
        this.classList.remove(`box-blank`);
        deleteTurn(selectedMove);
        steps++;
        stepsRec.innerText = steps;
        winnerJudging(player.turn);
    }
    if (xIsNext) {
        addTurn(p1);
    } else if (!xIsNext) {
        addTurn(p2);
    }
    xIsNext = !xIsNext;
    checkingNowTurn();
    turnOffMovePossibly();
    selectToMove = false;
    selectedMove = ``;
    return movePlay();
}

function turnOffMovePossibly() {
    for (let i = 0; i < tableMove.length; i++) {
        if (selectedMove == table[i]) {
            tableMove[i].forEach( possibleMove => {
                    return possibleMove.style.opacity = `1`;
            })
        }
    }
}

function undoSelect() {
    selectedMove.style.border = `3px solid black`;
    turnOffMovePossibly();
}

function winnerJudging(player) {
    if (
        table[0].innerText == player &&
        table[1].innerText == player &&
        table[2].innerText == player
        ||
        table[3].innerText == player &&
        table[4].innerText == player &&
        table[5].innerText == player
        ||
        table[6].innerText == player &&
        table[7].innerText == player &&
        table[8].innerText == player
        ||
        table[0].innerText == player &&
        table[3].innerText == player &&
        table[6].innerText == player
        ||
        table[1].innerText == player &&
        table[4].innerText == player &&
        table[7].innerText == player
        ||
        table[2].innerText == player &&
        table[5].innerText == player &&
        table[8].innerText == player
        ||
        table[0].innerText == player &&
        table[4].innerText == player &&
        table[8].innerText == player
        ||
        table[2].innerText == player &&
        table[4].innerText == player &&
        table[6].innerText == player
    ) {
        setTimeout(() => {
            alert(`Tic Tac Toe !!!\n\nPemain ${player} Menang !`);
            resetSettings();
            let winner = player;
            if (winner == p1.turn) {
                starter = p2.turn;
                p1.score++;
                scoreP1.innerText = p1.score;
            } else {
                starter = p1.turn;
                p2.score++;
                scoreP2.innerText = p2.score;
            }
            return gamePlay();
        }, 50);
    }
}

function resetSettings() {
    if (steps >= 6) {
        boxBlank.forEach( blank => {
            blank.removeEventListener(`click`, moveTurn);
        });
    } else {
        boxAll.forEach( box => {
            box.removeEventListener(`click`, turnIn)
        })
    }
    boxAll.forEach( box => {
        box.innerText = ``;
        box.style.backgroundColor = `azure`;
        box.classList.add(`box-blank`);
        box.classList.remove(`turn-on`);
        box.classList.remove(p1.class);
        box.classList.remove(p2.class);
    });
    steps = 0;
    stepsRec.innerText = steps;
}

function gamePlay() {
    explainingGame();
    checkingNowTurn();
    if (steps == 6) {
        boxAll.forEach( box => {
            box.removeEventListener(`click`, turnIn);
        })
        return selectPlay();
    }
    boxAll.forEach( box => {
        box.addEventListener(`click`, turnIn);
    });
}

function selectPlay() {
    explainingGame();
    if (selectToMove) {
        document.querySelectorAll(`.turn-on`).forEach( filled => {
            filled.removeEventListener(`click`, selectTurn);
        });
        return movePlay();
    }
    document.querySelectorAll(`.turn-on`).forEach( filled => {
        filled.addEventListener(`click`, selectTurn);
    });
}

function movePlay() {
    if (!selectToMove) {
        boxBlank.forEach( blank => {
            blank.removeEventListener(`click`, moveTurn);
        });
        if (!xIsNext) {
            document.querySelectorAll(`.${p1.class}`).forEach( p1 => {
                p1.removeEventListener(`click`, selectTurn);
            });
        } else {
            document.querySelectorAll(`.${p2.class}`).forEach( p2 => {
                p2.removeEventListener(`click`, selectTurn);
            });
        }
        return selectPlay();
    }
    if (xIsNext) {
        document.querySelectorAll(`.${p1.class}`).forEach( p1 => {
            p1.addEventListener(`click`, selectTurn);
        });
    } else {
        document.querySelectorAll(`.${p2.class}`).forEach( p2 => {
            p2.addEventListener(`click`, selectTurn);
        });
    }
    for (let i = 0; i < tableMove.length; i++) {
        if (selectedMove == table[i]) {
            tableMove[i].forEach( possibleMove => {
                if (possibleMove.innerText == ``) {
                    possibleMove.style.opacity = `0.3`;
                    possibleMove.addEventListener(`click`, moveTurn);
                }
            })
        }
    }
}

function explainingGame() {
    if (steps >= 6) {
        explainGame.innerText = 
        `Pilih salah satu item yang sudah ada untuk dipindah ke area lain yang memungkinkan untuk memenangkan pertandingan.`;
    } else {
        explainGame.innerText = 
        `Letakkan item ke salah satu area yang kosong. Sejajarkan item sehingga membentuk baris vertikal, horizontal, atau diagonal untuk memenangkan permainan.` ;
    }
}

gamePlay();