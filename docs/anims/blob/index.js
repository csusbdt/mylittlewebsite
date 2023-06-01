const blob = [ 
	image("/anims/blob/blob_0.png"), 
	image("/anims/blob/blob_1.png"), 
	image("/anims/blob/blob_2.png") 
];

let blob_i   = 0    ;
let update_id = null ;
let back_func = null ;

const update = _ => {
	bg_blue();
	draw(blob[blob_i]);
	if (++blob_i === 3) blob_i = 0;
};

const click = e => {
	const p = design_coords(e);
//	if (is_inside_circle(470, 515, 70, p)) {
		canvas.removeEventListener('click', click);
		clear_interval(update_id);
		back_func();
//	}
};

const start = f => {
	back_func = f;
	set_design_size(1000, 1000);
	canvas.addEventListener('click', click);
	update();
	update_id = set_interval(update, 160);
};

export default start;
