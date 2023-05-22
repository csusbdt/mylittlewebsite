const twirl = [ i_twirl_0, i_twirl_1, i_twirl_2 ];

let twirl_i               = 0    ;
//let back_i                = null ;
let loop_interval_id      = null ;

const draw = _ => {
	ctx.drawImage(i_blue, 0, 0);	
	if (twirl_i !== null) ctx.drawImage(twirl[twirl_i], 0, 0);
//	if (back_i === 0) ctx.drawImage(i_back_0, 0, 0);
};

const loop = _ => {
	draw();
	if (twirl_i !== null && ++twirl_i === 3) twirl_i = 0;
};

const click = e => {
	const p = design_coords(e);
	if (twirl_i !== null && is_inside_circle(470, 515, 70, p)) {
//		twirl_i = null;
//		back_i  = 0;
		stop();
		start_ship();
	} 
	
	// else if (back_i === 0 && is_inside_circle(773, 132, 120, p)) {
	// 	twirl_i = 0;
	// 	back_i  = null;
	// }
};

const stop = function() {
	canvas.removeEventListener('click', click);
	clearInterval(loop_interval_id);
	loop_interval_id = null;

//	twirl_i  = null   ;
//	back_i   = null   ;
};

window.start_twirl = _ => {
	set_design_size(1000, 1000);
	loop();
	canvas.addEventListener('click', click);
	loop_interval_id = setInterval(loop, 160);
};
