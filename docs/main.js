let design_width        = 360;
let design_height       = 360;

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

//window.addEventListener('resize', adjust_canvas);

//adjust_canvas();

// Convert mouse and touch event coords to design coords.
window.design_coords = e => {
	return {
		x: (e.pageX - left) / scale,
		y: (e.pageY - top ) / scale
	};
};

/*
window.touchables = [];

const on_touch = p => {
	for (let i = 0; i < touchables.length; ++i) {
		if (touchables[i].touch(p.x, p.y)) break;
	}	
};

const mousedown = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
//	canvas.style.cursor = 'default';
	on_touch(design_coords(e));
};

// the following touchend and touchmove code needed for fullscreen on chrome
// see: https://stackoverflow.com/questions/42945378/full-screen-event-on-touch-not-working-on-chrome/42948120

const touchend = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
//	canvas.style.cursor = 'none';
	on_touch(design_coords(e.changedTouches[0]));
};

document.addEventListener('mousedown', mousedown, true); 
document.addEventListener('touchend' , touchend , true); 

*/