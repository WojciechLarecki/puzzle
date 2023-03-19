let rows = 5;
let columns = 5;

let sourcePuzzle;
let targetPuzzle;

let turns = 0;
window.onload = function () {
    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById("myModal");

    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const tile = document.createElement("img");
            tile.src = "./images/blank.jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", e => e.preventDefault());
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    let pieces = getProperOrderOfImages();

    shuffle(pieces);

    for (let i = 0; i < pieces.length; i++) {
        const tile = document.createElement("img");
        tile.src = pieces[i] + ".jpg";

        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", e => e.preventDefault());
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);

    }
}

function getProperOrderOfImages() {
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }
    return pieces;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function dragStart(e) {
    const thisIsBlankImage = this.src.includes("blank");

    if (thisIsBlankImage) {
        e.preventDefault();
        return;
    }

}

function dragStart() {
    sourcePuzzle = this;
    const sourcePuzzleIsBlank = this.src.includes("blank");

    if (sourcePuzzleIsBlank) {
        e.preventDefault();
        return;
    }
}

function dragDrop() {
    targetPuzzle = this;
}

function dragEnd() {
    const sourcePuzzleIsBlank = sourcePuzzle.src.includes("blank");
    const puzzleIsMovedWithinPieces = sourcePuzzle.parentElement.id == "pieces" &&
        targetPuzzle.parentElement.id == "pieces";

    if (sourcePuzzleIsBlank || puzzleIsMovedWithinPieces) {
        return;
    }

    const sourcePuzzleImg = sourcePuzzle.src;
    sourcePuzzle.src = targetPuzzle.src;
    targetPuzzle.src = sourcePuzzleImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
    const gameIsWon = isGameWon();

    if (gameIsWon) {
        const modal = document.getElementById("myModal");
        document.getElementById("moves").innerText = turns;
        modal.style.display = "block";
    }
}

function isGameWon() {
    const images = document.querySelectorAll("#board img");
    const properOrder = getProperOrderOfImages();

    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (!img.src.includes(properOrder[i])) {
            return false;
        }
    }

    return true;
}