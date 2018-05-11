// ***** CLASSIC ARCADE GAME CLONE *****

/*
 *** AVIOD ENEMIES ***
 */

// Declare enemy variables
let emeny,
    enemyPosition = [60, 140, 220], // Position "y" where the enemies will are created
    allEnemies = [];

// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // The image/sprite for the enemies
    this.sprite = 'images/enemy-bug.png';
    // Variables applied to each of the instances
    this.x = x; // x and y coordinates
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;

    // Enemy position rest are moving of the screen
    if (this.x >= 505) { // Canvas is 505 wide
        this.x = -150;   // Enemy are 100 wide
        this.speed = 100 + Math.floor(Math.random() * 550);
    };
};

// Function to randomly place the emeny
enemyPosition.forEach(function(posY) {
    enemy = new Enemy(-150, posY, 100 + Math.floor(Math.random() * 550));
    allEnemies.push(enemy);
});

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player(200,400);
player.update = function(dt) {
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Keypress function to direct player
player.handleInput = function(keypress){

    if(keypress === 'left' && this.x >= 100){
        this.x -= 100;
    }
    if(keypress === 'up' && this.y >= 30){
        this.y -= 82.5;
    }
    if(keypress === 'right' && this.x <= 305){
        this.x += 100;
    }
    if(keypress === 'down' && this.y <= 350){
        this.y += 82.5;
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
