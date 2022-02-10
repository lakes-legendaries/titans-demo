// ====================================================================================
// Process touch
// ====================================================================================

// ====================================================================================
// Interface
var touch = {
	using: function() {}, // true if touch input is being used
}

touch.using = function() {
	return env.physics.input.pointer1.active;
}