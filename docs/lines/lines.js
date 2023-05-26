const dash = [
	i_dash_0 , i_dash_1 , i_dash_2 , i_dash_3 , i_dash_4 , i_dash_5 , i_dash_6 , i_dash_7 , i_dash_8,
	i_dash_9 , i_dash_10, i_dash_11, i_dash_12, i_dash_13, i_dash_14, i_dash_15, i_dash_16
];

let loop_interval_id  = null ;

let green_i           = 0    ;
let black_dot_i       = 0    ;
let red_dot_i         = null ;
let dash_i            = null ;

const start = _ => {
	set_design_size(1000, 1000);
	canvas.addEventListener('click', click);
	loop_interval_id = setInterval(loop, 500);
};

const stop = _ => {
	canvas.removeEventListener('click', click);
	clearInterval(loop_interval_id);
	loop_interval_id  = null;
};

const click = e => {
	const p = design_coords(e);
	if (is_inside_circle(828, 156, 43, p)) {
		dash_i = 0;
	}
};

const loop = _ => {
	draw();
	if (dash_i !== null) {
		if (dash_i + 1 < dash.length) {
			++dash_i;
		} else {
			red_dot_i = 0;
		}
	}
};

const draw = _ => {
	if (green_i === 0) ctx.drawImage(i_green, 0, 0);
	if (black_dot_i === 0) ctx.drawImage(i_black_dot, 0, 0);
	if (dash_i !== null) for (let i = 0; i <= dash_i; ++i) {
		ctx.drawImage(dash[i], 0, 0);
	}
	if (red_dot_i === 0) ctx.drawImage(i_red_dot, 0, 0);
};

export { start };
