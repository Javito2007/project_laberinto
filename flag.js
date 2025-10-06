//board
let board;
const rowCount = 21;
const columnCount = 19;
const tileSize = 32;
const boardWidth = columnCount * tileSize;
const boardHeight = rowCount * tileSize;
let context;

//imagenes
let draculaImage;
let agenteImage;
let ninjaImage;
let robotImage;
let beresUpImage;
let beresDownImage;
let beresLeftImage;
let beresRightImage;
let wallImage;
let bombImage;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //dibujo del tablero

    loadImages();
    loadMaps();
    for (let enemy of enemies.values()) {
        const newDirection = directions[Math.floor(Math.random()*4)];
        enemy.updateDirection(newDirection);
    }
    update();
    document.addEventListener("keyup", moveFlag);
}

const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X  X             WX",
    "X  X XXXXXXXXXXXX X",
    "X XX         X    X",
    "X X  XXXXXXX XXXX X",
    "X X        X      X",
    "X X  XXXXXXXXXXX  X",
    "X X              XX",
    "X XX   X r X  X   X",
    "X  X   XbpoX  X   X",
    "XX XX   XXXX  XXXXX",
    "X    X          X00",
    "X  X X XXXXXXXXXXXX",
    "X  X     X        X",
    "X XX XXX   XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX",
];

const walls = new Set();
const coins = new Set();
const enemies = new Set();
let flag;
const bombs = new Set();

const directions = ['U', 'D', 'L', 'R'];
let score = 0;
let lives = 3;
let gameOver = false;


function loadImages () {
    wallImage = new Image ();
    wallImage.src = "./wall.png" //imagen de caja

    draculaImage = new Image();
    draculaImage.src = "./dracula.png";
    agenteImage = new Image();
    agenteImage.src = "./agente.png";
    ninjaImage = new Image();
    ninjaImage.src = "./ninja.png";
    robotImage = new Image();
    robotImage.src = "./robot.png";

    beresUpImage = new Image();
    beresUpImage.src = "./beresUp.png";
    beresDownImage = new Image();
    beresDownImage.src = "./beresDown.png";
    beresLeftImage = new Image();
    beresLeftImage.src = "./beresLeft.png";
    beresRightImage = new Image();
    beresRightImage.src = "./beresRight.png";

    bombImage = new Image();
    bombImage.src = "./win.png"
}

function loadMaps() {
    walls.clear();
    bombs.clear();
    coins.clear();
    enemies.clear();

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < columnCount; c++) {
            const row = tileMap[r];
            const tileMapChar = row[c];

            const x = c * tileSize;
            const y = r * tileSize;

            if (tileMapChar == "X") {
                const wall = new Block(wallImage, x, y, tileSize, tileSize);
                walls.add(wall);
            }
            else if (tileMapChar == "b") {
                const enemy = new Block(draculaImage, x, y, tileSize, tileSize);
                enemies.add(enemy);
            }
            else if (tileMapChar == "o") {
                const enemy = new Block(agenteImage, x, y, tileSize, tileSize);
                enemies.add(enemy);
            }
            else if (tileMapChar == "p") {
                const enemy = new Block(ninjaImage, x, y, tileSize, tileSize);
                enemies.add(enemy);
            }
            else if (tileMapChar == "r") {
                const enemy = new Block(robotImage, x, y, tileSize, tileSize);
                enemies.add(enemy);
            }
            else if (tileMapChar == "P") {
                flag = new Block(beresRightImage, x, y, tileSize, tileSize);
            }
            else if (tileMapChar == " ") {
                const coin = new Block(null, x + 14, y + 14, 4, 4);
                coins.add(coin);
            }
            if (tileMapChar == "W") {
                const bomb = new Block(bombImage, x, y, tileSize, tileSize);
                bombs.add(bomb);
        }
    }
}
}

function update() {
    if (gameOver){
        return;
    }
    move();
    draw();
    setTimeout(update, 50);
}

function draw() {
    context.clearRect(0, 0, board.width, board.height);
    context.drawImage(flag.image, flag.x, flag.y, flag.width, flag.height);
    for (let enemy of enemies.values()) {
        context.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
    }
    for (let wall of walls.values()) {
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
    }
    context.fillStyle = "yellow";
    for (let coin of coins.values()) {
        context.fillRect(coin.x, coin.y, coin.width, coin.height);
    }
    for (let bomb of bombs.values()) {
        context.drawImage(bomb.image, bomb.x, bomb.y, bomb.width, bomb.height)
    }

    context.fillStyle = "white";
    context.font = "22px sans-serif";
    if (gameOver){
        context.fillText("GAME OVER" + " " + String(score), tileSize/2, tileSize/2);
    }
    else {
        context.fillText('x' + String(lives) + " " + String(score), tileSize/2, tileSize/2);
    }
}

function move() {
    flag.x += flag.velocityX;
    flag.y += flag.velocityY;

    for (let wall of walls.values()) {
        if (collision(flag, wall)) {
            flag.x -= flag.velocityX;
            flag.y -= flag.velocityY;
            break;
        }
    }
    
    for (let bomb of bombs.values()){
        if (collision(flag, bomb)){
            window.open("https://es.stackoverflow.com/questions/374911/abrir-p%C3%A1gina-con-javascript")
        }
    }

    for (let enemy of enemies.values()) {
        if (collision(flag, enemy)) {
            lives -= 1;
            if (lives == 0){
                gameOver = true;
                return;
            }
            resetPositions();
        }

        enemy.x += enemy.velocityX;
        enemy.y += enemy.velocityY;
        for (let wall of walls.values()) {
            if (collision(enemy, wall)) {
                enemy.x -= enemy.velocityX;
                enemy.y -= enemy.velocityY;
                const newDirection = directions[Math.floor(Math.random()*4)];
                enemy.updateDirection(newDirection);
            }
        }
    }

    let coinEaten = null;
    for (let coin of coins.values()) {
        if (collision(flag, coin)) {
            coinEaten = coin;
            score += 10;
            break;
        }
    }
    coins.delete(coinEaten);

    if (coins.size == 0) {
        loadMap();
        resetPositions();
    }
}

function moveFlag(e) {
    if (gameOver){
        loadMap();
        resetPositions();
        lives = 3;
        score = 0;
        gameOver = false;
        update();
        return;
    }
    if (e.code == "ArrowUp" || e.code == "KeyW") {
        flag.updateDirection('U');
    }
    else if (e.code == "ArrowDown" || e.code == "KeyS") {
        flag.updateDirection('D');
    }
    else if (e.code == "ArrowLeft" || e.code == "KeyA") {
        flag.updateDirection('L');
    }
    else if (e.code == "ArrowRight" || e.code == "KeyD") {
        flag.updateDirection('R');
    }

    if (flag.direction == 'U'){
        flag.image = beresUpImage;
    }
    else if (flag.direction == 'D'){
        flag.image = beresDownImage;
    }
    else if (flag.direction == 'L'){
        flag.image = beresLeftImage;
    }
    else if (flag.direction == 'R'){
        flag.image = beresRightImage;
    }
}

function collision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function resetPositions() {
    flag.reset();
    flag.velocityX = 0;
    flag.velocityY = 0;
    for (let enemy of enemies.values()){
        enemy.reset();
        const newDirection = directions[Math.floor(Math.random()*4)];
        enemy.updateDirection(newDirection);
    }
}

class Block {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.startX = x;
        this.startY = y;

        this.direction = 'R';
        this.velocityX = 0;
        this.velocityY = 0;
    }   

    updateDirection(direction){
        const prevDirection = this.direction;
        this.direction = direction;
        this.updateVelocity();
        this.x += this.velocityX;
        this.y += this.velocityY;

        for (let wall of walls.values()) {
            if (collision(this, wall)) {
                this.x -= this.velocityX;
                this.y -= this.velocityY;
                this.direction = prevDirection;
                this.updateVelocity();
                return;
            }
        }
    }

    updateVelocity(){
        if (this.direction == 'U'){
            this.velocityX = 0;
            this.velocityY = -tileSize/4;
        }
        else if (this.direction == 'D'){
            this.velocityX = 0;
            this.velocityY = tileSize/4;
        }
        else if (this.direction == 'L'){
            this.velocityX = -tileSize/4;
            this.velocityY = 0;
        }
        else if (this.direction == 'R'){
            this.velocityX = tileSize/4;
            this.velocityY = 0;
        }
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }
}

