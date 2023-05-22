const ship = [ 
	[ i_ship_left  ,  -78, -46 ], 
	[ i_ship_middle, -187, -45 ],
	[ i_ship_right , -306, -39 ]
];

let ship_i                = 0    ;
let back_i                = 0    ;
let loop_interval_id      = null ;
let x       = 100;
let y       = 100;
let dest_x  = 500;
let dest_y  = 500;
const speed = 180;

const draw = _ => {
	ctx.drawImage(i_blue, 0, 0);
	if (ship_i !== null) {
		const i        = ship[ship_i][0];
		const offset_x = ship[ship_i][1];
		const offset_y = ship[ship_i][2];
		ctx.drawImage(i, x + offset_x, y + offset_y);
	}
	if (back_i === 0) ctx.drawImage(i_back_0, 0, 0);
};

const loop = _ => {
	draw();
	if (++ship_i === 3) ship_i = 0;
	let dx   = dest_x - x;
	let dy   = dest_y - y;
	let dist = Math.sqrt(dx * dx + dy * dy);
	if (dist < speed) dist = speed;
	dx = dx / dist * speed;
	dy = dy / dist * speed;
	x += dx;
	y += dy;
};

const click = e => {
	const p = design_coords(e);
	if (is_inside_circle(773, 132, 120, p)) {
		stop();
		start_twirl();
	} else {
		dest_x = p.x;
		dest_y = p.y;
	}
};

const stop = _ => {
	canvas.removeEventListener('click', click);
	clearInterval(loop_interval_id);
	loop_interval_id = null;
};

window.start_ship = _ => {
	set_design_size(1000, 1000);
	loop();
	canvas.addEventListener('click', click);
	loop_interval_id = setInterval(loop, 100);
};
