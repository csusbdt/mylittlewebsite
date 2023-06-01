const blob = [ 
	image("/anims/blob/blob_0.png"), 
	image("/anims/blob/blob_1.png"), 
	image("/anims/blob/blob_2.png") 
];

let blob_i    = 0    ;
let update_id = null ;
let back_func = null ;
let bg_i      = 0;

const update = _ => {
	if (bg_i === 0) bg_white();
	else if (bg_i === 1) bg_black();
	else if (bg_i === 2) bg_red();
	else if (bg_i === 3) bg_blue();
	else if (bg_i === 4) bg_yellow();
	draw(blob[blob_i]);
	if (++blob_i === 3) blob_i = 0;
};

const click = e => {
	const p = design_coords(e);
	if (circle(470, 515, 240)(p)) {
		canvas.removeEventListener('click', click);
		clear_interval(update_id);
		back_func();
	} else {
		if (++bg_i === 5) bg_i = 0;
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
