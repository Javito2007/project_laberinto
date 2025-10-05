//board
let board;
const rowCount = 21;
const colCount = 19;
const tileSize = 32;
const boardWidth = colCount * tileSize;
const boardHeight = rowCount * tileSize;
let constext;

//imagenes
let momia1Image;
let momia2Image;
let quest1Image;
let quest2Image;
let quest_muerto;
let wallImage

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //dibujo del tablero

    loadImages();
}

function loadImages () {
    wallImage = new Image ();
    wallImage.src = "" //imagen de caja

    momia1Image = new Image ();
    momia1Image.src = "" //imagen de momia1

    momia2Image = new Image ();
    momia2Image.src = "" //imagen de momia2

    quest1Image = new Image ();
    quest1Image.src = "" //imagen de quest 1

    quest2Image = new Image ();
    quest2Image.src = "" //imagen de quest 2

    quest_muerto = new Image ();
    quest_muerto.src = "" //imagen de questmuerto



}
