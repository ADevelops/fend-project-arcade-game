// ***** CLASSIC ARCADE GAME CLONE *****

let score = 0;
let lives = 3;

/*
 *** AVIOD ENEMIES ***
 */

// Enemy variables
let enemyPosition = [61, 144, 227]; // Position "y" where the enemies will are created
let allEnemies = [];

// Enemies our player must avoid
let Enemy = function (x, y, speed) {
    // Variables applied to each of the instances
    this.x = x; // x and y coordinates
    this.y = y;
    this.speed = speed; // Speed of the emeny
    // The image/sprite for the enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;

    // Reposition the enemy after they leave the page 
    if (this.x >= 505) { // Canvas is 505 wide
        this.x = -150;   // Enemy are 100 wide
        // Speed of the emeny
        this.speed = 100 + Math.floor(Math.random() * 550);
    }

    // Collision with eney detector
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        // Collision detected, reset player
        player.resetPlayer();
        //Decrease score
        score -= 15;
        document.querySelector('.score').innerHTML = score;
        // Remove life
        if (lives === 3) {
            document.getElementsByClassName('mini-player')[2].remove();
            lives -= 1;
        } else if (lives === 2) {
            document.getElementsByClassName('mini-player')[1].remove();
            lives -= 1;
        } else if (lives === 1) {
            document.getElementsByClassName('mini-player')[0].remove();
            alert('Game Over!!!\nYou Scored ' + score + ' Points');
            location.reload();
        }
    }
};

// Function to randomly place the emeny
enemyPosition.forEach(function (posY) {
    enemy = new Enemy(-150, posY, 100 + Math.floor(Math.random() * 550));
    allEnemies.push(enemy);
});

// Draw the enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
 *** PLAYER FUNCTIONALITY ***
 */

// Player variables
let Player = function (x, y, ) {  // player moves along x, y axis
    // Variables applied to each of the instances
    this.x = x; // x and y coordinates
    this.y = y;
    // The image/sprite of the player
    this.sprite = 'images/char-boy.png';
};
let player = new Player(200, 400); // Starting location of the player

// Draw the player on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset player to starting position
Player.prototype.resetPlayer = function () {
    this.x = 200;
    this.y = 400;
}

// Called everytime the players position changes
player.update = function (dt) {
    // Reset player position after reaching the top water area
    if (this.y < 0) {
        setTimeout(() => {
            this.resetPlayer();
        }, 500);
        // Increment score
        score++;
        document.querySelector('.score').innerHTML = score;
    }
};


/*
 *** Keypress lister - Supplied by Udacity ***
 */
// Keypresses are sent to the Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    player.handleInput(allowedKeys[e.keyCode]);
});

// Keypress function to direct player
player.handleInput = function (keypress) {

    if (keypress === 'left' && this.x >= 100) {
        this.x -= 100;
    }
    if (keypress === 'up' && this.y >= 30) {
        this.y -= 82.5;
    }
    if (keypress === 'right' && this.x <= 305) {
        this.x += 100;
    }
    if (keypress === 'down' && this.y <= 350) {
        this.y += 82.5;
    }
};