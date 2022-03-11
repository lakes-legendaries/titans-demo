// ====================================================================================
// Environment -- background, and access to the physics engine
// ====================================================================================

// ====================================================================================
// Interface
var env = {
	
	// access to physics engine
	physics: null,                         // set equal to `this` variable of phaser#preload
	
	// phaser plugins
	preload: function(phasers_this) {},    // preload assets
	setup  : function()             {},    // draw background
	
	// create images & sprites
	add    : {                             // create objects
		image : function(coords, name) {}, // add image  to scene
		sprite: function(coords, name) {}, // add sprite to scene
	},
	
	// basic object manipulation
	place   : function(sprite, coords) {}, // instantaneously move sprite to coords
	to_front: function(sprite)         {}, // move sprite to front
	
	// coordinates & sizes
	nowhere: {x: 2000, y: 2000},           // default, out-of-bounds location
	scene  : {x: 3440, y: 1080},           // scene size (full background)
	window : {x: 1920, y: 1080},           // window size (viewable portion)
	
	// image object for the background
	background: null,
}

env.preload = function(phasers_this) {
	
	// Save pointer to physics engine
	env.physics = phasers_this;
	
	// Load background
	env.physics.load.image('background', 'demo/Background.png');
	
	// Load cards
	env.physics.load.image      ('ref sheet'   , 'demo/Reference Sheet.png');
    env.physics.load.image      ('ref sprite'  , 'demo/Reference Sprite.png');
	env.physics.load.spritesheet('full cards A', 'demo/Full Cards A.png', {frameWidth: 500, frameHeight: 700});
	env.physics.load.spritesheet('full cards B', 'demo/Full Cards B.png', {frameWidth: 500, frameHeight: 700});
	env.physics.load.spritesheet('half cards'  , 'demo/Card Sprites.png'  , {frameWidth: 250, frameHeight: 200});
	
	// Load buttons
	env.physics.load.image      ('log button'        , 'demo/Log Button.png');
	env.physics.load.image      ('help button'       , 'demo/Help Button.png');
	env.physics.load.image      ('restart button'    , 'demo/Restart Button.png');
	env.physics.load.spritesheet('action buttons'    , 'demo/Action Buttons.png'      , {frameWidth: 250, frameHeight: 100});
	env.physics.load.spritesheet('camera'            , 'demo/Camera Toggles.png'      , {frameWidth:  75, frameHeight: 175});
	env.physics.load.spritesheet('tutorial buttons'  , 'demo/Tutorial Buttons.png'    , {frameWidth: 250, frameHeight: 100});
	env.physics.load.spritesheet('full screen button', 'demo/Full Screen Button.png', {frameWidth:  75, frameHeight:  75});
	env.physics.load.spritesheet('title buttons'     , 'demo/Title Buttons.png'       , {frameWidth: 600, frameHeight: 150});
	
	// Load text
	env.physics.load.spritesheet('age text', 'demo/Age Text.png'      , {frameWidth: 350, frameHeight: 170});
	env.physics.load.spritesheet('delta'   , 'demo/Delta.png'         , {frameWidth: 100, frameHeight:  67});
	env.physics.load.spritesheet('numbers' , 'demo/Numbers.png'       , {frameWidth:  50, frameHeight:  67});
	
	// Load victory screen
	env.physics.load.spritesheet('victory' , 'demo/Victory Screen.png', {frameWidth: 1100, frameHeight: 650});
	
	// Tutorial instructions
	env.physics.load.spritesheet('main instructions a'     , 'demo/Main Instructions A.png'     , {frameWidth:  1100, frameHeight: 650});
	env.physics.load.spritesheet('main instructions b'     , 'demo/Main Instructions B.png'     , {frameWidth:  1100, frameHeight: 650});
	env.physics.load.spritesheet('first buy instructions', 'demo/First Buy Instructions.png', {frameWidth: 412.5, frameHeight: 250});
	env.physics.load.spritesheet('later buy instructions'  , 'demo/Later buy instructions.png', {frameWidth:  1100, frameHeight: 650});
	env.physics.load.spritesheet('final instructions'      , 'demo/Final Instructions.png'    , {frameWidth:   650, frameHeight: 300});
	env.physics.load.image      ('super-effective'         , 'demo/Super Effective Chain.png');
	
	// Shaders
	env.physics.load.spritesheet('vertical shaders' , 'demo/Vertical Shaders.png' , {frameWidth:  300, frameHeight: 1000});
	env.physics.load.image      ('horizontal shader', 'demo/Horizontal Shader.png');
	env.physics.load.image      ('single shader', 'demo/Single Shader.png');
	
	// Tutorial arrows
	env.physics.load.image('play arrow'        , 'demo/Play arrow.png');
	env.physics.load.image('buy arrow'         , 'demo/Buy arrow.png');
	env.physics.load.image('ref arrow'         , 'demo/Ref arrow.png');
	env.physics.load.image('log arrow'         , 'demo/Log arrow.png');
	env.physics.load.image('explanation arrow' , 'demo/Explanation arrow.png');
	env.physics.load.image('top card arrow'    , 'demo/Top card arrow.png');
	env.physics.load.image('surge arrow'       , 'demo/Surge arrow.png');
	env.physics.load.spritesheet('camera arrow', 'demo/Camera arrows.png', {frameWidth: 700, frameHeight: 500});
}

env.setup = function() {
	let mid_pt = {x: env.scene.x/2, y: env.scene.y/2}
	env.background = env.add.image(mid_pt, 'background');
}

env.add.image = function(coords, name) {
	return env.physics.add.image(coords.x, coords.y, name);
}

env.add.sprite = function(coords, name) {
	return env.physics.physics.add.sprite(coords.x, coords.y, name);
}

env.place = function(sprite, coords) {
	// move sprite
	if (sprite.body != null) {
		sprite.body.reset(coords.x, coords.y);
	// move image
	} else {
		sprite.x = coords.x;
		sprite.y = coords.y;
	}
}

env.to_front = function(sprite) {
	env.physics.children.bringToTop(sprite);
}