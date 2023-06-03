///////////////////////////////////////////////////////////////////////////////////////////
//
// error handling
//
///////////////////////////////////////////////////////////////////////////////////////////

window.assert = function(condition, msg) {
	if (!condition) {
		if (msg === undefined) msg = "assertion failed";
		document.body.innerHTML = "<h1>" + msg + "</h1>";
		throw new Error(msg);
	}
};

const timeout_ids = [];

window.set_timeout = function(f, t) {
	const id = setTimeout(f, t);
	timeout_ids.push(id);
	return id;
}

window.clear_timeout = function(id) {
	const i = timeout_ids.indexOf(id);
	if (i !== -1) {
		clearTimeout(id);
		timeout_ids.splice(i, 1);		
	}
}

const interval_ids = [];

window.set_interval = function(f, t) {
	const id = setInterval(f, t);
	interval_ids.push(id);
	return id;
}

window.clear_interval = function(id) {
	const i = interval_ids.indexOf(id);
	if (i !== -1) {
		clearInterval(id);
		interval_ids.splice(i, 1);		
	}
}

window.addEventListener("error", e => {
	let i = e.filename.indexOf("//") + 2;
	i += e.filename.substring(i).indexOf("/") + 1;
	const filename = e.filename.substring(i);
    document.body.innerHTML = `<h1>${e.error}<br>${filename}<br>Line ${e.lineno}</h1>`;
	window.removeEventListener('resize', adjust_canvas);
	for (let i = timeout_ids.length - 1; i >= 0; --i) {
		const id = timeout_ids[i];
		clear_timeout(id);
	}
	for (let i = interval_ids.length - 1; i >= 0; --i) {
		const id = interval_ids[i];
		clear_interval(id);
	}
});

///////////////////////////////////////////////////////////////////////////////////////////
//
// version check 
//
///////////////////////////////////////////////////////////////////////////////////////////

const version = "mylittlewebsite_0_";

window.set_item = (key, item) => {
	localStorage.setItem(version + key, JSON.stringify(item));
};

window.get_item = (key, _default) => {
	let i = localStorage.getItem(version + key);
	if (i === null) {
		set_item(key, _default);
		return _default;
	} else {
		return JSON.parse(i);
	}
};


///////////////////////////////////////////////////////////////////////////////////////////
//
// canvas
//
///////////////////////////////////////////////////////////////////////////////////////////

let design_width  = 1000 ;
let design_height = 1000 ;
let scale         = 1    ;
let left          = 0    ;
let top           = 0    ;

window.canvas = document.createElement('canvas');
document.body.appendChild(canvas);

window.set_design_size = function(w, h) {
	design_width  = w;
	design_height = h;
	adjust_canvas();
};

// Convert mouse and touch event coords to design coords.
window.design_coords = e => {
	return {
		x: (e.pageX - left) / scale,
		y: (e.pageY - top ) / scale
	};
};

// alpha === false speeds up drawing of transparent images
window.ctx = canvas.getContext('2d', { alpha: false });

window.adjust_canvas = _ => {
	let w = window.innerWidth;
	let h = window.innerHeight;

	// Set canvas size.
	scale = Math.min(w / design_width, h / design_height);
	canvas.width  = scale * design_width;
	canvas.height = scale * design_height;

	// Center canvas in browser window.
	left = (w  - canvas.width ) / 2;
	top  = (h - canvas.height) / 2;
	canvas.style.left = left;
	canvas.style.top  = top;

	// Set drawing context transform to scale 
    // design coordinates to display coordinates.
	ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

window.addEventListener('resize', adjust_canvas);

adjust_canvas();

///////////////////////////////////////////////////////////////////////////////////////////
//
// audio
//
///////////////////////////////////////////////////////////////////////////////////////////

window.audio          = null  ;
window.gain           = null  ;
window.captured_notes = []    ;
let app_silent        = false ;
let app_volume        = 1     ;

window.init_audio = _ => {
	// this function must run in click handler to work on apple hardware
	if (audio === null) {
		audio = new (window.AudioContext || window.webkitAudioContext)();
		assert(audio !== null)
	}
	if (audio.state === "suspended") {
		audio.resume();
	}
	if (gain === null) {
		gain = audio.createGain();
		gain.gain.value = app_volume;
		gain.connect(audio.destination);
	}
}

window.silent = b => {
	init_audio();
	if (b === undefined) {
		return app_silent;
	} else if (b) {
		app_silent = true;
		gain.gain.setTargetAtTime(0, audio.currentTime, .01);
	} else {
		app_silent = false;
		gain.gain.setTargetAtTime(app_volume, audio.currentTime, .01);
	}
};

window.volume = v => {
	if (v === undefined) {
		return app_volume;
	}
	init_audio();
	if (v < 0) v = 0;
	if (v > 1) v = 1;
	app_volume = v;
	if (!app_silent) {
		gain.gain.setTargetAtTime(v, audio.currentTime, .01);
	}
};

///////////////////////////////////////////////////////////////////////////////////////////
//
// anim
//
///////////////////////////////////////////////////////////////////////////////////////////

window.colors = {
	red    : [243, 140, 105],
	green  : [ 64, 216, 122],
	blue   : [ 29, 225, 220],
	yellow : [242, 244,  44],
	black  : [ 72,  55,  55],
	white  : [174, 201, 201]
};

const rgb_red    = `rgb(${colors.red   [0]}, ${colors.red   [1]}, ${colors.red   [2]})`;
const rgb_green  = `rgb(${colors.green [0]}, ${colors.green [1]}, ${colors.green [2]})`;
const rgb_blue   = `rgb(${colors.blue  [0]}, ${colors.blue  [1]}, ${colors.blue  [2]})`;
const rgb_yellow = `rgb(${colors.yellow[0]}, ${colors.yellow[1]}, ${colors.yellow[2]})`;
const rgb_black  = `rgb(${colors.black [0]}, ${colors.black [1]}, ${colors.black [2]})`;
const rgb_white  = `rgb(${colors.white [0]}, ${colors.white [1]}, ${colors.white [2]})`;

window.bg_red = _ => {
	ctx.fillStyle = rgb_red;
	ctx.fillRect(0, 0, design_width, design_height);
};

window.bg_green = _ => {
	ctx.fillStyle = rgb_green;
	ctx.fillRect(0, 0, design_width, design_height);
};

window.bg_blue = _ => {
	ctx.fillStyle = rgb_blue;
	ctx.fillRect(0, 0, design_width, design_height);
};

window.bg_yellow = _ => {
	ctx.fillStyle = rgb_yellow;
	ctx.fillRect(0, 0, design_width, design_height);
};

window.bg_black = _ => {
	ctx.fillStyle = rgb_black;
	ctx.fillRect(0, 0, design_width, design_height);
};

window.bg_white = _ => {
	ctx.fillStyle = rgb_white;
	ctx.fillRect(0, 0, design_width, design_height);
};

window.file = f => {
	if (window.location.pathname.startsWith('/mylittlewebsite')) {
		return "/mylittlewebsite" + f;
	} else {
		return f;
	}
};

//window.image = (src, x = null, y = null, shape = null) => {
window.image = (src) => {
	const i = new Image();
	i.src = file(src);
	// if (x !== null && y !== null) {
	// 	i._x = x;
	// 	i._y = y;
	// 	if (shape !== null) {
	// 		i.shape = shape;
	// 		i.click = p => { return i._shape( { x: p.x - i._x, y: p.y - i._y }); };
	// 	}
	// }
	return i;
};

window.draw = (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) => {
	if (sx === undefined) {
		ctx.drawImage(image, 0, 0);
	} else if (sWidth === undefined) {
		ctx.drawImage(image, sx, sy);
	} else if (dx === undefined) {
		ctx.drawImage(image, sx, sy, sWidth, sHeight);
	} else if (dWidth === undefined) {
		ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, sWidth, sHeight);
	} else {
		ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	}
};

///////////////////////////////////////////////////////////////////////////////////////////
//
// shapes
//
///////////////////////////////////////////////////////////////////////////////////////////

window.circle = function(x, y, r) {
	return function(p) { return (x - p.x) * (x - p.x) +  (y - p.y) * (y - p.y) < r * r; };
}

window.rect = function(left, top, right, bottom) {
	return p => { return left <= p.x && top <= p.y && p.x < right && p.y < bottom; };
}

///////////////////////////////////////////////////////////////////////////////////////////
//
// helper functions
//
///////////////////////////////////////////////////////////////////////////////////////////

function c_O(images, shapes, x, y) {
	this.images = images;
	this.shapes = shapes;
	this.x      = x     ;
	this.y      = y     ;
}

c_O.prototype.clone = function(x, y) {
	return new c_O(this.images, this.shapes, x, y)
};

c_O.prototype.click = function(p) {
	for (let i = 0; i < this.shapes.length; ++i) {
		if (this.shapes[i]({ x: p.x - this.x, y: p.y - this.y })) {
			return true;		
		}
	}
	return false;
};

c_O.prototype.draw = function() {
	for (let i = 0; i < this.images.length; ++i) {
		if (typeof this.images[i] !== "function") {
			draw(this.images[i], this.x, this.y);
		}
	}
};

c_O.prototype.update = function() {
	for (let i = 0; i < this.images.length; ++i) {
		if (typeof this.images[i] === "function") {
			this.images[i]();
		}
	}
};

window.O = (images = [], shapes = [], x = 0, y = 0) => {
	if (!Array.isArray(images)) {
		images = [images];
	}
	if (!Array.isArray(shapes)) {
		shapes = [shapes];
	}
	return new c_O(images, shapes, x, y);
};

// function c_loop(images, shapes, x, y) {
// 	this.images = images;
// 	this.shapes = shapes;
// 	this.x      = x     ;
// 	this.y      = y     ;
// 	this.i      = 0     ;
// }

// c_loop.prototype.clone = function(x, y) {
// 	return new c_loop(this.images, this.shapes, x, y)
// };

// c_loop.prototype.click = function(p) {
// 	for (let i = 0; i < this.shapes.length; ++i) {
// 		if (this.shapes[i]({ x: p.x - this.x, y: p.y - this.y })) {
// 			return true;		
// 		}
// 	}
// 	return false;
// };

// c_loop.prototype.draw = function() {
// 	draw(this.images[this.i], this.x, this.y);
// 	if (++this.i === this.images.length) this.i = 0;
// };

// window.loop = (images = [], shapes = [], x = 0, y = 0) => {
// 	if (!Array.isArray(images)) {
// 		images = [images];
// 	}
// 	if (!Array.isArray(shapes)) {
// 		shapes = [shapes];
// 	}
// 	return new c_loop(images, shapes, x, y);
// };


// function c_once(images, f, x, y) {
// 	this.images = images;
// 	this.f      = f     ;
// 	this.x      = x     ;
// 	this.y      = y     ;
// 	this.i      = null  ; // stopped
// }

// c_once.prototype.start = function() {
// 	this.i = 0;
// };

// c_once.prototype.clone = function(x, y) {
// 	return new c_once(this.images, this.f, x, y)
// };

// c_once.prototype.draw = function() {
// 	if (this.i === null) return;
// 	if (this.i === this.images.length) {
// 		if (this.f !== null) f();
// 		this.i = null;
// 	} else {
// 		draw(this.images[this.i++], this.x, this.y);
// 	}
// };

// window.once = (images = [], f = null, x = 0, y = 0) => {
// 	if (!Array.isArray(images)) {
// 		images = [images];
// 	}
// 	return new c_once(images, shapes, x, y);
// };





// function c_once(images, f, x, y) {
// 	this.images = images;
// 	this.f      = f     ;
// 	this.x      = x     ;
// 	this.y      = y     ;
// }

// c_once.prototype.clone = function(x, y) {
// 	return new c_once(this.images, this.f, x, y)
// };

// c_loop.prototype.draw = function() {
// 	for (let i = 0; i < this.images.length; ++i) {
// 		if (typeof this.images[i] !== "function") {
// 			draw(this.images[i], this.x, this.y);
// 		}
// 	}
// };

// c_loop.prototype.update = function() {
// 	for (let i = 0; i < this.images.length; ++i) {
// 		if (typeof this.images[i] === "function") {
// 			this.images[i]();
// 		}
// 	}
// };

// window.loop = (images = [], shapes = [], x = 0, y = 0) => {
// 	if (!Array.isArray(images)) {
// 		images = [images];
// 	}
// 	if (!Array.isArray(shapes)) {
// 		shapes = [shapes];
// 	}
// 	return new c_loop(images, shapes, x, y);
// };

