let update_id = null ;
let back_func = null ;

const twirl = loop([
		image("/anims/twirl/twirl_0.png"), 
		image("/anims/twirl/twirl_1.png"), 
		image("/anims/twirl/twirl_2.png") 
	],
	[circle(470, 515, 70)]
);

const bg_colors = [bg_blue, bg_green, bg_yellow, bg_white, bg_black];
let bg_colors_i = 0;

const exit = _ => {
	canvas.removeEventListener('click', click);
	clear_interval(update_id);
	back_func();
};

const update = _ => {
	bg_colors[bg_colors_i]();
	twirl.draw();
};

const click = e => {
	const p = design_coords(e);
	if (twirl.click(p)) {
		exit();
	} else {
		if (++bg_colors_i === bg_colors.length) bg_colors_i = 0;
	}
};

const start = f => {
	back_func = f;
	set_design_size(1000, 1000);
	canvas.addEventListener('click', click);
	update();
	update_id = set_interval(update, 160);
};

export default start;
