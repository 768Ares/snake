window.onload = function () {
    canv = document.getElementById("game-canv");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);

}
let snake_x = 10,
    snake_y = 10;
const gm_seg = 20;
const board_canv = 30;
let apple_x = 10,
    apple_y = 15;
let direction_x = 1,
    direction_y = 0;
const trail = [];
const snake_segments = 5;
const apple_start = 10;
let snake = snake_segments;
let h = 0,
    m = 0,
    s = 0;
let hh, mm, ss;
let apple = apple_start;
let lvl = 1;
let lvlHard = 8;
let timeHTML = document.querySelector(".time");
let appleHTML = document.querySelector(".apple");
let lvlHTML = document.querySelector(".lvl");
let eatenApplesHTML = document.querySelector(".eaten-apples");

let myGame = setInterval(game, 1000 / lvlHard);

function game() {
    snake_x += direction_x;
    snake_y += direction_y;

    //The snake meets the end of the board.
    if (snake_x < 0) {
        direction_x = 1;
        direction_y = 0;
        gameOver();
    }
    if (snake_x > board_canv - 1) {
        direction_x = -1;
        direction_y = 0;
        gameOver();
    }
    if (snake_y < 0) {
        direction_x = 0;
        direction_y = 1;
        gameOver();
    }
    if (snake_y > board_canv - 1) {
        direction_x = 0;
        direction_y = -1;
        gameOver();
    }

    //draw board
    ctx.fillStyle = "#070707";
    ctx.fillRect(0, 0, canv.width, canv.height);


    //draw body snake
    ctx.fillStyle = "#00DD00";
    for (var i = 0; i < trail.length - 1; i++) {
        ctx.fillRect(trail[i].x * gm_seg, trail[i].y * gm_seg, gm_seg - 2, gm_seg - 2);
        if (trail[i].x == snake_x && trail[i].y == snake_y) {
            gameOver();
        }
    }

    //draw head snake
    ctx.fillStyle = "#008000";
    for (let i = 0; i < trail.length; i++) {
        if (i >= snake - 1) {
            ctx.fillRect(trail[i].x * gm_seg, trail[i].y * gm_seg, gm_seg - 2, gm_seg - 2);
            ctx.fillStyle = "white";
            if (direction_x == -1) {
                ctx.fillRect(trail[i].x * gm_seg + 11, trail[i].y * gm_seg + 2, gm_seg / 4, gm_seg / 4);
                ctx.fillRect(trail[i].x * gm_seg + 11, trail[i].y * gm_seg + 11, gm_seg / 4, gm_seg / 4);
            } else if (direction_x == 1) {
                ctx.fillRect(trail[i].x * gm_seg + 2, trail[i].y * gm_seg + 2, gm_seg / 4, gm_seg / 4);
                ctx.fillRect(trail[i].x * gm_seg + 2, trail[i].y * gm_seg + 11, gm_seg / 4, gm_seg / 4);
            } else if (direction_y == -1) {
                ctx.fillRect(trail[i].x * gm_seg + 2, trail[i].y * gm_seg + 11, gm_seg / 4, gm_seg / 4);
                ctx.fillRect(trail[i].x * gm_seg + 11, trail[i].y * gm_seg + 11, gm_seg / 4, gm_seg / 4);
            } else if (direction_y == 1) {
                ctx.fillRect(trail[i].x * gm_seg + 11, trail[i].y * gm_seg + 2, gm_seg / 4, gm_seg / 4);
                ctx.fillRect(trail[i].x * gm_seg + 2, trail[i].y * gm_seg + 2, gm_seg / 4, gm_seg / 4);
            }
        }
    }

    trail.push({
        x: snake_x,
        y: snake_y
    });
    while (trail.length > snake) {
        trail.shift();
    }


    //random generate x & y apple
    if (apple_x == snake_x && apple_y == snake_y) {
        snake++;
        apple_x = Math.floor(Math.random() * (board_canv - 1));
        apple_y = Math.floor(Math.random() * (board_canv - 1));
        eatenApplesHTML.innerHTML = snake - 5;
    }
    //draw apple
    ctx.fillStyle = "red";
    ctx.fillRect(apple_x * gm_seg, apple_y * gm_seg, gm_seg - 2, gm_seg - 2);
}

//control function
function keyPush(evt) {
    if (evt.keyCode === 37) {
        if (direction_x != 1) {
            direction_x = -1;
            direction_y = 0;
        }
    } else if (evt.keyCode === 38) {
        if (direction_y != 1) {
            direction_x = 0;
            direction_y = -1;
        }
    } else if (evt.keyCode === 39) {
        if (direction_x != -1) {
            direction_x = 1;
            direction_y = 0;
        }
    } else if (evt.keyCode === 40) {
        if (direction_y != -1) {
            direction_x = 0;
            direction_y = 1;
        }
    }
}

function timer() {
    s += 1;
    if (s >= 60) {
        m += 1;
        s = 0;
        if (m >= 60) {
            m = 0;
            h += 1;
        }
    }
    if (s < 10) {
        ss = "0" + s;
    } else {
        ss = s;
    }
    if (m < 10) {
        mm = "0" + m;
    } else {
        mm = m;
    }
    if (h < 10) {
        hh = "0" + h;
    } else {
        hh = h;
    }

    timeHTML.innerHTML = hh + ":" + mm + ":" + ss;

    if ((apple + snake_segments - snake) <= 0) {
        lvlHTML.innerHTML = lvl += 1;
        apple = lvl * 10;
        lvlHard *= 1.3;
        clearInterval(myGame);
        myGame = setInterval(game, 1000 / lvlHard);
    }
    if ((apple + snake_segments - snake) < 10) {
        let newApple = apple + snake_segments - snake;
        appleHTML.innerHTML = "0" + newApple;
    } else {
        appleHTML.innerHTML = apple + snake_segments - snake;
    }

}

function gameOver() {
    h = 0;
    m = 0;
    s = 0;
    apple = apple_start;
    lvl = 1;
    lvlHard = 8;
    snake = snake_segments;
    lvlHTML.innerHTML = lvl;
    clearInterval(myGame);
    myGame = setInterval(game, 1000 / lvlHard);
    eatenApplesHTML.innerHTML = snake - 5;
}

setInterval(timer, 1000);