window.assert = function(condition, msg) {
	if (!condition) {
		if (msg === undefined) msg = "assertion failed";
		document.body.innerHTML = "<h1>" + msg + "</h1>";
		throw new Error(msg);
	}
};

window.is_inside_circle = function(x, y, r, p) {
	return (x - p.x) * (x - p.x) +  (y - p.y) * (y - p.y) < r * r;
};

window.is_inside_rect = function(left, top, right, bottom, p) {
	return left <= p.x && top <= p.y && p.x < right && p.y < bottom;
};

///////////////////////////////////////////////////////////////////////////////////////////

let design_width  = 1000 ;
let design_height = 1000 ;
let scale         = 1    ;
let left          = 0    ;
let top           = 0    ;

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

window.audio = null;
window.gain  = null;

window.init_audio = v => {
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
		if (v === undefined) {
			gain.gain.value = .5;
		} else {
			gain.gain.value = v;
		}
		gain.connect(audio.destination);
	} else if (v !== undefined) {
		gain.gain.setTargetAtTime(v, audio.currentTime, .01);
	}
}

///////////////////////////////////////////////////////////////////////////////////////////

window.colors = {
	red    : [243, 140, 105],
	green  : [ 64, 216, 122],
	blue   : [ 29, 225, 220],
	yellow : [242, 244,  44],
	black  : [ 72,  55,  55]
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