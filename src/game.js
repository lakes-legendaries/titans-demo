// ====================================================================================
// Phaser object for controlling the game
// ====================================================================================

// ====================================================================================
// Backend
var game = {
	phaser : null,          // Phaser.Game object
	preload: function() {}, // Load game assets
	setup  : function() {}, // Initialize game
	update : function() {}, // Update game
	config : null,          // Game configuration
}

game.preload = function() {
	env    .preload(this);
	instr  .preload();
	loading.preload();
}

game.setup = function() {
	age       .setup();
	env       .setup();
	camera    .setup();
	log       .setup();
	maximize  .setup(game.phaser.scale);
	zone      .setup();
	subv      .setup();
	ref       .setup();
	card      .setup();
	highlight .setup();
	move      .setup();
	stats     .setup();
	tut       .setup();
	full_card .setup();
	instr     .setup();
	controller.setup();
	button    .setup();
	input     .setup();
	debug     .setup();
	loading   .setup();
}

game.update = function() {
	loading.update();
	if (!loading.done) {return;}
	camera    .update();
	maximize  .update();
	move      .update();
	stats     .update();
	tut       .update();
	full_card .update();
	instr     .update();
	controller.update();
	button    .update();
	debug     .update();
}

game.config = {
	type   : Phaser.AUTO,
	width  : env.window.x,
	height : env.window.y,
	physics: {default: 'arcade'},
	scene  : {
		preload: game.preload,
		create : game.setup,
		update : game.update,
		pack: {files: [
			{type: 'image', key: 'cover0', url: 'https://titansofeden.blob.core.windows.net/demo-dev/Cover%200.png'},
			{type: 'image', key: 'cover1', url: 'https://titansofeden.blob.core.windows.net/demo-dev/Cover%201.png'},
			{type: 'image', key: 'cover2', url: 'https://titansofeden.blob.core.windows.net/demo-dev/Cover%202.png'},
			{type: 'image', key: 'cover3', url: 'https://titansofeden.blob.core.windows.net/demo-dev/Cover%203.png'},
			{type: 'image', key: 'cover4', url: 'https://titansofeden.blob.core.windows.net/demo-dev/Cover%204.png'},
			{type: 'image', key: 'cover5', url: 'https://titansofeden.blob.core.windows.net/demo-dev/Cover%205.png'},
			{type: 'image', key: 'cover6', url: 'https://titansofeden.blob.core.windows.net/demo-dev/Cover%206.png'}
		]}
	},
	scale: {
		mode      : Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	}
}

game.phaser = new Phaser.Game(game.config);