// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = 0;
	// set initial y to 3 so that they will be in pave road and not grasses.
	this.y = 50;
	this.speed = Math.floor(Math.random() * 250 + 50);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, x, y) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x = this.x + (dt * this.speed);
	if ( this.x > 500 ){
		this.x = 0;
		this.speed = Math.floor(Math.random() * 200 + 100);
	};
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(){
	//this.sprite = 'images/char-boy.png';
	this.sprite = "images/char-boy.png";
	this.x = 200;
	this.y = 400;
	this.lives = 4;
  this.score = 0;
	this.livesImage = "images/heart.png";
};

player.prototype.update = function(){

};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "14pt Arial";
    ctx.fillText("Score: "+this.score, 20, 560);
    ctx.strokeText("Score: "+this.score, 20, 560);
	for( var i = 0; i < this.lives; i++ ) {
		ctx.drawImage(Resources.get(this.livesImage), i*40+340, 540, 40, 45 );
	}
};

player.prototype.render2 = function(){

};



player.prototype.handleInput = function(dir){
	if ( dir == 'left' ){
		this.x = this.x - 100;
		if ( this.x < 0 ){
			this.x = 0;
		};
	};
	if ( dir == 'right' ){
		this.x = this.x + 100;
		if ( this.x > 400 ){
			this.x = 400;
		};
	};
	if ( dir == 'up' ){
		this.y = this.y - 90;
		if ( this.y < 0 ){
			//reach to water so we reset the position to initials.
			this.y = 400;
			this.x = 200;
      this.score++;
      console.log(this.score);
		};
	};
	if ( dir == 'down' ){
		this.y = this.y + 90;
		if ( this.y > 400 ){
			this.y = 400;
		};
	};


};


// Now instantiate your objects.
var player = new player();

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for ( var i=0; i < 3; i++ ){
	allEnemies.push(new Enemy());
	allEnemies[i].y = i * 90 + 50;
};
// Place the player object in a variable called player


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
