const twirl = [ i_twirl_0, i_twirl_1, i_twirl_2 ];
const back  = [ i_back_0 , i_back_1 , i_back_0  ];

let twirl_i               = 0       ;
let back_i                = null    ;
let loop_interval_id      = null    ;

const draw = _ => {
	ctx.drawImage(i_blue, 0, 0);	
	if (twirl_i !== null) ctx.drawImage(twirl[twirl_i], 0, 0);
	if (back_i  !== null) ctx.drawImage(back [back_i ], 0, 0);
};

const loop = _ => {
	if (back_i === null && twirl_i === null) twirl_i = 0;
	draw();
	if (twirl_i !== null && ++twirl_i === 3) twirl_i = 0;
	if (back_i === 1) back_i = 2;
	else if (back_i === 2) back_i = null; 
};

const click = e => {
	const p = design_coords(e);

	if (twirl_i !== null && is_inside_circle(470, 515, 70, p)) {
		twirl_i = null;
		back_i = 0;
	} else if (back_i === 0 && is_inside_circle(773, 132, 120, p)) {
		assert(twirl_i === null);
		back_i = 1;
	}
};

const stop = function() {
//	canvas.removeEventListener('click', g.click);
//	clearInterval(g.interval_id);
//	g.interval_id = null;

	twirl_i  = null   ;
	back_i   = null   ;
};

window.g = {};

g.start = _ => {
	set_design_size(1000, 1000);
	canvas.addEventListener('click', click);
	loop_interval_id = setInterval(loop, 160);
};
