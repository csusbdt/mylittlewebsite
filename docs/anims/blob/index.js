const blob = [ 
	image("/anims/blob/blob_0.png"), 
	image("/anims/blob/blob_1.png"), 
	image("/anims/blob/blob_2.png"),
	image("/anims/blob/blob_3.png") 
];
let blob_i = 0;
const inside_blob = circle(470, 515, 240);

const bgs = [bg_blue, bg_red, bg_yellow, bg_white, bg_black];
let bg_i = 0;

let back_func = null;
let update_id = null;

const update = _ => {
	bgs[bg_i]();
	draw(blob[blob_i]);
	if (++blob_i === blob.length) blob_i = 0;
};

const click = e => {
	const p = design_coords(e);
	if (inside_blob(p)) {
		canvas.removeEventListener('click', click);
		clear_interval(update_id);
		back_func();
	} else {
		if (++bg_i === bgs.length) bg_i = 0;
	}
};

const start = f => {
	back_func = f;
	set_design_size(1000, 1000);
	canvas.addEventListener('click', click);
	update_id = set_interval(update, 160);
	update();
};

export default start;
