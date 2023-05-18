const design_width        = 360;
const design_height       = 360;

// alpha === false speeds up drawing of transparent images
window.ctx = canvas.getContext('2d', { alpha: false });

let scale = 1;
let left  = 0;
let top   = 0;

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

// Convert mouse and touch event coords to design coords.
window.design_coords = e => {
	return {
		x: (e.pageX - left) / scale,
		y: (e.pageY - top ) / scale
	};
};

window.is_inside_circle = function(x, y, r, p) {
	return (x - p.x) * (x - p.x) +  (y - p.y) * (y - p.y) < r * r;
};

window.is_inside_rect = function(left, top, right, bottom, p) {
	return left <= p.x && top <= p.y && p.x < right && p.y < bottom;
};
