/*
	List of features to build.
	1. Have JS Display the world(bricks/coin/etc). - DONE!
	2. Have pacman move up and down. - DONE!
	3. Prevent Pacman from moving across walls - DONE!
	4. Have a cherry appear. Cherry is worth 20 points. - DONE!
	5. Have up to 5 different maze/worlds. When page is reloaded. -DONE!
	6. Add Ghosts that chase pacman - DONE!
*/
// VARIABLES 
let pacman, randomWorld, world,world1,world2, score, numberOfCherry, numberOfCoins, numberOfEatenCoins, redGhost,blueGhost,step,direction, ghostDirection, randomGhostDirection, keyPressInterval;

// 1:COINS / 2:BRICK / 3:EMPTY / 4:CHERRY
// PACMAN WORLDS
world1 = [
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,3,2,1,2,1,1,2,1,2,2,1,1,1,2,2,1,2,2,1,1,1,2,2,1,2,1,1,2,1,2,3,1,2],
	[2,1,2,2,1,2,2,1,2,1,2,2,2,2,1,2,1,1,1,2,1,2,2,2,2,1,2,1,2,2,1,2,2,1,2],
	[2,1,1,1,1,2,2,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1,2,2,1,1,1,1,2],
	[2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,1,1,1,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2],
	[2,1,1,1,1,2,1,1,2,1,2,2,1,2,1,2,2,1,2,2,1,2,1,2,2,1,2,1,1,2,1,1,1,1,2],
	[2,1,2,2,2,2,2,2,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,2,1,2],
	[2,1,1,1,1,1,1,1,1,1,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,1,1,2,1,1,1,2,2,1,1,1,2,3,3,3,2,1,1,1,2,2,1,1,1,2,1,1,2,2,2,2],
	[2,3,3,3,1,2,2,2,1,1,1,1,1,2,1,3,3,3,3,3,1,2,1,1,1,1,1,2,2,2,1,3,3,3,2],
	[2,2,2,2,1,1,2,1,1,1,2,2,1,1,1,2,3,3,3,2,1,1,1,2,2,1,1,1,2,1,1,2,2,2,2],
	[2,1,1,1,1,1,1,1,1,1,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,1,1,1,1,1,1,1,1,1,2],
	[2,1,2,2,2,2,2,2,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,2,1,2],
	[2,1,1,1,1,1,2,1,2,1,2,2,1,2,1,2,2,1,2,2,1,2,1,2,2,1,2,1,2,1,1,1,1,1,2],
	[2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,1,1,1,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2],
	[2,1,1,1,1,2,2,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1,2,2,1,1,1,1,2],
	[2,1,2,2,1,2,2,1,2,1,2,2,2,2,1,2,1,1,1,2,1,2,2,2,2,1,2,1,2,2,1,2,2,1,2],
	[2,1,3,2,1,1,2,1,2,1,2,2,1,1,1,2,2,1,2,2,1,1,1,2,2,1,2,1,2,3,1,2,3,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]

world2 = [
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,3,2,1,2,1,1,2,1,2,2,1,1,1,2,2,1,2,2,1,1,1,2,2,1,2,1,1,2,1,2,3,1,2],
	[2,1,2,2,1,2,2,1,2,1,2,2,2,2,1,2,1,1,1,2,1,2,2,2,2,1,2,1,2,2,1,2,2,1,2],
	[2,1,1,2,2,2,2,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1,2,2,1,1,1,1,2],
	[2,2,1,2,1,2,2,1,2,1,2,2,1,2,2,2,1,1,1,2,1,2,2,2,2,1,2,1,2,2,1,2,1,2,2],
	[2,1,1,1,1,2,1,1,2,1,2,2,1,2,2,2,2,1,2,2,1,2,1,2,2,1,2,1,1,2,1,1,2,1,2],
	[2,1,2,2,2,2,2,2,2,1,1,1,1,2,2,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,2,1,2],
	[2,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,1,1,2,1,1,1,2,2,1,1,1,2,3,3,3,2,1,1,1,2,2,1,1,1,2,1,1,2,2,2,2],
	[2,3,3,3,1,2,2,2,1,1,1,1,1,2,1,3,3,3,3,3,1,2,1,1,1,1,1,2,2,2,1,3,3,3,2],
	[2,2,2,2,1,1,2,1,1,2,2,2,1,1,1,2,3,3,3,2,1,1,1,2,2,1,1,1,2,1,1,2,2,2,2],
	[2,1,1,1,1,1,1,1,1,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,1,1,1,1,1,1,1,1,1,2],
	[2,1,2,2,2,2,2,2,2,2,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,2,1,2],
	[2,1,1,1,1,1,2,1,2,2,2,2,1,2,1,2,2,1,2,2,1,2,1,2,2,1,2,1,2,1,1,1,1,1,2],
	[2,2,1,2,2,2,2,1,2,2,2,2,1,2,1,2,1,1,1,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2],
	[2,1,1,1,2,2,2,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1,2,2,1,1,1,1,2],
	[2,1,2,2,1,2,2,1,2,1,2,2,2,2,1,2,1,1,1,2,1,2,2,2,2,1,2,1,2,2,2,2,2,1,2],
	[2,1,3,2,1,1,2,1,2,1,2,2,1,1,1,2,2,1,2,2,1,1,1,2,2,1,2,1,2,3,1,2,3,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]
world3 = [
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,3,2,1,2,1,1,2,1,2,2,1,1,1,2,2,1,2,2,1,1,1,2,2,1,2,1,1,2,1,2,3,1,2],
	[2,1,2,2,1,2,2,1,2,1,2,2,2,2,1,2,1,1,1,2,1,2,2,2,2,1,2,1,2,2,1,2,2,1,2],
	[2,1,2,2,2,2,2,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1,2,2,1,2,2,1,2],
	[2,2,2,2,1,2,2,1,2,1,2,2,1,2,2,2,1,1,1,2,1,2,2,2,2,1,2,1,2,2,1,2,1,2,2],
	[2,1,1,1,1,2,1,1,2,1,2,2,1,2,2,2,2,1,2,2,1,2,1,2,2,1,2,1,1,2,1,1,2,1,2],
	[2,1,2,2,2,2,2,2,2,1,1,1,1,2,2,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,2,1,2],
	[2,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,1,1,2,1,1,1,2,2,1,1,1,2,3,3,3,2,1,1,1,2,2,1,1,1,2,1,1,2,2,2,2],
	[2,3,3,3,1,2,2,2,1,1,1,1,1,2,1,3,3,3,3,3,1,2,1,1,1,1,1,2,2,2,1,3,3,3,2],
	[2,2,2,2,1,1,2,1,1,2,2,2,1,1,1,2,3,3,3,2,2,1,1,2,2,1,1,1,2,1,1,2,2,2,2],
	[2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,1,1,1,1,1,1,1,1,1,2],
	[2,1,2,2,2,2,2,2,2,2,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,2,1,2],
	[2,1,1,1,1,1,2,1,2,2,2,2,1,2,1,2,2,1,2,2,1,2,1,2,2,1,2,1,2,1,1,1,1,1,2],
	[2,2,2,2,2,2,2,1,2,2,2,2,1,2,1,2,1,1,1,2,1,2,1,2,2,1,2,2,2,2,1,2,1,2,2],
	[2,1,1,1,2,2,2,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1,2,2,1,2,2,1,2],
	[2,1,2,2,1,2,2,1,2,1,2,2,2,2,1,2,1,1,1,2,1,2,2,2,2,1,2,1,2,2,2,2,2,1,2],
	[2,1,3,2,1,1,2,1,2,1,2,2,1,1,1,2,2,1,2,2,1,1,1,2,2,1,2,1,2,3,1,2,3,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]

world4 = [
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,3,2,1,2,1,1,2,1,2,2,1,1,1,2,2,1,2,2,1,1,1,2,2,1,2,1,1,2,1,2,3,1,2],
	[2,1,2,2,1,2,2,1,2,1,2,2,2,2,1,2,1,1,1,2,1,2,2,2,2,1,2,1,2,2,1,2,2,1,2],
	[2,1,1,1,1,2,2,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1,2,2,1,1,1,1,2],
	[2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,1,1,1,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2],
	[2,1,1,1,1,2,1,1,2,1,2,2,1,2,1,2,2,1,2,2,1,2,1,2,2,1,2,1,1,2,1,1,1,1,2],
	[2,1,2,2,2,2,2,2,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,2,1,2],
	[2,1,1,1,1,1,1,1,1,1,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,1,1,2,1,1,1,2,2,1,1,1,2,3,3,3,2,1,1,1,2,2,1,1,1,2,1,1,2,2,2,2],
	[2,3,3,3,1,2,2,2,1,1,1,1,1,2,1,3,3,3,3,3,1,2,1,1,1,1,1,2,2,2,1,3,3,3,2],
	[2,2,2,2,1,1,2,1,1,1,2,2,1,1,1,2,3,3,3,2,1,1,1,2,2,1,1,1,2,1,1,2,2,2,2],
	[2,1,1,1,1,1,1,1,1,1,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,1,1,1,1,1,1,1,1,1,2],
	[2,1,2,2,2,2,2,2,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,2,1,2],
	[2,1,1,1,1,1,2,1,2,1,2,2,1,2,1,2,2,1,2,2,1,2,1,2,2,1,2,1,2,1,1,1,1,1,2],
	[2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,1,1,1,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2],
	[2,1,1,1,1,2,2,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1,2,2,1,1,1,1,2],
	[2,1,2,2,1,2,2,1,2,1,2,2,2,2,1,2,1,1,1,2,1,2,2,2,2,1,2,1,2,2,1,2,2,1,2],
	[2,1,3,2,1,1,2,1,2,1,2,2,1,1,1,2,2,1,2,2,1,1,1,2,2,1,2,1,2,3,1,2,3,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]
world5 = [
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,3,2,1,2,1,1,2,1,2,2,1,1,1,2,2,1,2,2,1,1,1,2,2,1,2,1,1,2,1,2,3,1,2],
	[2,1,2,2,1,2,2,1,2,1,2,2,2,2,1,2,1,1,1,2,1,2,2,2,2,1,2,1,2,2,1,2,2,1,2],
	[2,1,1,1,1,2,2,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1,2,2,1,1,1,1,2],
	[2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,1,1,1,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2],
	[2,1,1,1,1,2,1,1,2,1,2,2,1,2,1,2,2,1,2,2,1,2,1,2,2,1,2,1,1,2,1,1,1,1,2],
	[2,1,2,2,2,2,2,2,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,2,1,2],
	[2,1,1,1,1,1,1,1,1,1,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,1,1,2,1,1,1,2,2,1,1,1,2,3,3,3,2,1,1,1,2,2,1,1,1,2,1,1,2,2,2,2],
	[2,3,3,3,1,2,2,2,1,1,1,1,1,2,1,3,3,3,3,3,1,2,1,1,1,1,1,2,2,2,1,3,3,3,2],
	[2,2,2,2,1,1,2,1,1,1,2,2,1,1,1,2,3,3,3,2,1,1,1,2,2,1,1,1,2,1,1,2,2,2,2],
	[2,1,1,1,1,1,1,1,1,1,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,1,1,1,1,1,1,1,1,1,2],
	[2,1,2,2,2,2,2,2,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,2,1,2],
	[2,1,1,1,1,1,2,1,2,1,2,2,1,2,1,2,2,1,2,2,1,2,1,2,2,1,2,1,2,1,1,1,1,1,2],
	[2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,1,1,1,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2],
	[2,1,1,1,1,2,2,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1,2,2,1,1,1,1,2],
	[2,1,2,2,1,2,2,1,2,1,2,2,2,2,1,2,1,1,1,2,1,2,2,2,2,1,2,1,2,2,1,2,2,1,2],
	[2,1,3,2,1,1,2,1,2,1,2,2,1,1,1,2,2,1,2,2,1,1,1,2,2,1,2,1,2,3,1,2,3,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]


// Array of Worlds.
arrWorlds = [world1, world2, world3, world4, world5];
// Pacman Default Position 
pacman = {
	x: 17, 
	y: 19
}
// Red Ghost Default Position
redGhost = {
	x:17,
	y:10
}
blueGhost = {
	x:18,
	y:10
}
// Score 
score = 0;
// number of cherries
numberOfCherry = 0;
// number of coins in the map
numberOfCoins = 0;
// number of eaten coins 
numberOfEatenCoins = 0;
// random world integer
randomWorld = null;
// direction 
direction = "left";
// ghost direction
ghostDirection = "left";
// random ghost direction 
randomGhostDirection = "left";
// steps 
ghostRandomMovent = 1;
step = 1;
// key press interval
keyPressInterval = 0;
// function to display cherrry 
function displayCherry(){
	let randomXAxis = Math.floor(Math.random() * world.length);
	let randomYAxis = Math.floor(Math.random() * world[0].length);
	if(world[randomXAxis][randomYAxis] === 3 && numberOfCherry <= 0 && numberOfEatenCoins > numberOfCoins){
		world[randomXAxis][randomYAxis] = 4;
		numberOfCherry += 1;
		displayWorld();	
	} 
}
// function to display pacman worlds. 
function displayWorld(){
	let outputWorld = '';
	numberOfCoins = 0;

	if(randomWorld == null){
		randomWorld = Math.floor(Math.random() * arrWorlds.length);
		world = arrWorlds[randomWorld];
	}

	
	for(let i = 0; i < world.length; i++){
		outputWorld += "\n<div class='row'>\n";
		for(let j = 0; j < world[i].length; j++){
			if(world[i][j] == 2) outputWorld += "<div class='brick'></div>";
			else if(world[i][j] == 1){
				outputWorld += "<div class='coin'></div>";
				numberOfCoins += 1;	
			}
			else if(world[i][j] == 4) outputWorld += "<div class='cherry'></div>"
			if(world[i][j] == 3) outputWorld += "<div class='empty'></div>";
		}
		outputWorld += "\n</div>";
	}
	document.querySelector('#world').innerHTML = outputWorld;
}

function displayPacman(){
	document.querySelector('#pacman').style.left=pacman.x*20+"px";
	document.querySelector('#pacman').style.top=pacman.y*20+"px";
	document.querySelector('#pacman').style.backgroundImage = "url('./images/pacman-"+direction+step+".png')";
}

function displayGhost(){
	document.querySelector('#blue-ghost').style.left=blueGhost.x*20+"px";
	document.querySelector('#blue-ghost').style.top=blueGhost.y*20+"px";
	document.querySelector('#blue-ghost').style.backgroundImage = "url('./images/blue-ghost-"+randomGhostDirection+step+".png')";

	document.querySelector('#red-ghost').style.left=redGhost.x*20+"px";
	document.querySelector('#red-ghost').style.top=redGhost.y*20+"px";
	document.querySelector('#red-ghost').style.backgroundImage = "url('./images/ghost-"+ghostDirection+step+".png')";

}
function displayScore(){
	document.querySelector('#score').innerHTML = score;
}
function autoStepMovement(){
	if(step == 1){
		step = 2; 
	}else{
		step = 1
	}

	displayPacman();
	displayGhost();
}

function randomGhostMovement(){
	// 1:LEFT/2:RIGHT/3:UP/4:DOWN
	ghostRandomMovent = Math.floor(Math.random() * 4 + 1);
		
	switch(ghostRandomMovent){
		case 1: 
			randomGhostDirection = "left";
			if(world[blueGhost.y][blueGhost.x-1] !=2){
				blueGhost.x--;
			}else if(world[blueGhost.y][blueGhost.x+1] !=2){
				blueGhost.x++;
			}else if(world[blueGhost.y-1][blueGhost.x] !=2){
				blueGhost.y--;
			}else if(world[blueGhost.y+1][blueGhost.x] !=2){
				blueGhost.y++;
			}
			break;
		case 2: 
			randomGhostDirection = "right";
			if(world[blueGhost.y][blueGhost.x+1] !=2){
				blueGhost.x++;
			}else if(world[blueGhost.y-1][blueGhost.x] !=2){
				blueGhost.y--;
			}else if(world[blueGhost.y+1][blueGhost.x] !=2){
				blueGhost.y++;
			}else if(world[blueGhost.y][blueGhost.x-1] !=2){
				blueGhost.x--;
			}
			break;
		case 3:
			randomGhostDirection = "up";
			if(world[blueGhost.y-1][blueGhost.x] !=2){
				blueGhost.y--;
			}else if(world[blueGhost.y][blueGhost.x-1] !=2){
				blueGhost.x--;
			}else if(world[blueGhost.y+1][blueGhost.x] !=2){
				blueGhost.y++;
			}else if(world[blueGhost.y][blueGhost.x+1] !=2){
				blueGhost.x++;
			}
			break;
		case 4: 
			randomGhostDirection = "down";
			if(world[blueGhost.y+1][blueGhost.x] !=2){
				blueGhost.y++;
			}else if(world[blueGhost.y][blueGhost.x+1] !=2){
				blueGhost.x++;
			}else if(world[blueGhost.y][blueGhost.x-1] !=2){
				blueGhost.x--;
			}else if(world[blueGhost.y-1][blueGhost.x] !=2){
				blueGhost.y--;
			}
			break;

	}
	displayGhost();
}

displayWorld();
displayPacman();
displayGhost();
displayScore();
setInterval(randomGhostMovement, 700);
setInterval(autoStepMovement, 200);
setInterval(displayCherry,2000);


document.onkeydown = function(e){
	// move left
	if(e.keyCode === 37 && world[pacman.y][pacman.x-1] != 2){
		direction="left";
		pacman.x--;
		if((redGhost.y == pacman.y) && (redGhost.x >= pacman.x) && (redGhost.x - pacman.x< 2)){
			redGhost.x = pacman.x;
		}else if((redGhost.y == pacman.y) && (redGhost.x >= pacman.x) && (redGhost.x > pacman.x) && (world[redGhost.y][redGhost.x-1] !=2)){
			redGhost.x--;
			ghostDirection = "left"
		}else{
			ghostDirection = "right"
			redGhost.x++;
		}
	}

	// move right
	else if(e.keyCode === 39 && world[pacman.y][pacman.x+1] != 2){
		direction="right";
		pacman.x++;
		if((redGhost.y == pacman.y) && (redGhost.x <= pacman.x) && (pacman.x - redGhost.x  < 2)){
			redGhost.x = pacman.x;
		}else if((redGhost.y == pacman.y) && (redGhost.x < pacman.x) && (world[redGhost.y][redGhost.x+1] !=2)){
			redGhost.x++;
			ghostDirection = "right";
		}else{
			redGhost.x--;
			ghostDirection = "left";
		}
	}
	// move down
	else if(e.keyCode === 40 && world[pacman.y+1][pacman.x] != 2){
		direction="down";	
		pacman.y++;
		if((redGhost.x == pacman.x) && (redGhost.y <= pacman.y) && (pacman.y - redGhost.y < 2)){
			redGhost.y = pacman.y;		
		}else if((redGhost.x == pacman.x) && (redGhost.y < pacman.y) && (world[redGhost.y+1][redGhost.x] !=2)){
			redGhost.y++;
			ghostDirection = "down";
		}else{
			redGhost.y--;
			ghostDirection = "up";
		}
	}
	// move up
	else if(e.keyCode === 38 && world[pacman.y-1][pacman.x] != 2){
		direction="up";
		pacman.y--;
		if((redGhost.x == pacman.x) && (redGhost.y <= pacman.y) &&(pacman.y - redGhost.y < 2)){
			redGhost.y = pacman.y;
		}else if((redGhost.x == pacman.x) && (redGhost.y > pacman.y) && (world[redGhost.y-1][redGhost.x] !=2)){
			redGhost.y--;
			ghostDirection = "up";
		}else{
			redGhost.y++;
			ghostDirection = "down";
		}
	}

	if(world[pacman.y][pacman.x] === 1){
		world[pacman.y][pacman.x] = 3;
		score += 10;
		numberOfEatenCoins += 1;
		displayWorld();
		displayScore();
	}else if(world[pacman.y][pacman.x] === 4){
		world[pacman.y][pacman.x] = 3;
		score += 20;
		
		numberOfCherry -= 1;
		displayWorld();
		displayScore();
	}
	

	// check if the next move contains a wall
	if(world[redGhost.y][redGhost.x] === 2){
		if(e.keyCode === 37) redGhost.x--;
		else if(e.keyCode === 39) redGhost.x++;
		else if(e.keyCode === 40) redGhost.y++;
		else if(e.keyCode === 38) redGhost.y--;
	}

	

	displayPacman();
	displayGhost();
}

