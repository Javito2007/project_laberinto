//board
let board;
const rowCount = 21;
const colCount = 19;
const tileSize = 32;
const boardWidth = colCount * tileSize;
const boardHeight = rowCount * tileSize;
let constext;

//imagenes


window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //dibujo del tablero
}
