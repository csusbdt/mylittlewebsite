const twirl = [ 
	image("/anims/twirl/twirl_0.png"), 
	image("/anims/twirl/twirl_1.png"), 
	image("/anims/twirl/twirl_2.png") 
];
let twirl_i = 0;
const inside_twirl = circle(470, 515, 70);

const bgs = [bg_blue, bg_green, bg_yellow, bg_white, bg_black];
let bg_i = 0;

let back_func = null;
let update_id = null;

const update = _ => {
	bgs[bg_i]();
	draw(twirl[twirl_i]);
	if (++twirl_i === twirl.length) twirl_i = 0;
};

const click = e => {
	const p = design_coords(e);
	if (inside_twirl(p)) {
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
