// ***** CLASSIC ARCADE GAME CLONE *****

/*
 *** AVIOD ENEMIES ***
 */

// Enemy variables
let emeny,
    enemyPosition = [61, 144, 227], // Position "y" where the enemies will are created
    allEnemies = [];

// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of the instances
    this.x = x; // x and y coordinates
    this.y = y;
    this.speed = speed; // Speed of the emeny
    // The image/sprite for the enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;

    // Reposition the enemy after they leave the page 
    if (this.x >= 505) { // Canvas is 505 wide
        this.x = -150;   // Enemy are 100 wide
        //Speed of enemy
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

// Check if the enemy hits the player, bases on boundry boxes
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.collisionDetector = function() {
    // Create enemy and player objects
    let playerBox = {
        x: player.x,
        y: player.y,
        width: 50,
        height: 40
    };
    let enemyBox = {
        x: enemy.x,
        y: enemy.y,
        width: 60,
        height: 70
    };
    // Check for collision
    if (playerBox.x < enemyBox.x + enemyBox.width &&
        playerBox.x + playerBox.width > enemyBox.x &&
        playerBox.y < enemyBox.y + enemyBox.height &&
        playerBox.height + playerBox.y > enemyBox.y) {
            // Collision detected, reset player
            this.resetPlayer(); // Line 95
    }
};


/*
 *** PLAYER FUNCTIONALITY ***
 */

// Player variables
let Player = function(x, y,) {  // player moves along x, y axis
    // Variables applied to each of the instances
    this.x = x; // x and y coordinates
    this.y = y;
    // The image/sprite of the player
    this.sprite = 'images/char-boy.png';
};
let player = new Player(200,400); // Starting location of the player


// Draw the player on the screen
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset player to starting position
Player.prototype.resetPlayer = function() {
    this.x = 200;
    this.y = 400;
}

// Called everytime the players position changes
player.update = function(dt) {
    // Player position will be reset after reaching the top water area
    if (this.y < 0) {
        setTimeout(() => {
            this.resetPlayer();
        }, 500);
    }
};


/*
 *** Keypress lister - Supplied by Udacity ***
 */ 
// Keypresses are sent to the Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

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