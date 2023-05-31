import start_home             from "../index.js";
import { set_note           } from "../../binaural.js" ;
import { set_notes          } from "../../binaural.js" ;
import { play_notes         } from "../../binaural.js" ;

const i_ship_left   = image("../../images/ship_left.png"  );
const i_ship_middle = image("../../images/ship_middle.png");
const i_ship_right  = image("../../images/ship_right.png" );
const i_blue_dot    = image("../../images/blue_dot.png"   );
const i_back        = image("../../images/back.png"       );

const ship = [ 
	[ i_ship_left  ,  -78, -46 ], 
	[ i_ship_middle, -187, -45 ],
	[ i_ship_right , -306, -39 ]
];

let update_id       = null ;
let ship_i          = 0    ;
let x               = 250  ;
let y               = 350  ;
let dest_x          = x    ;
let dest_y          = y    ;
const speed         = 180  ;
let notes           = []   ;
let note_start_time = null ;

const freq = y => {
	return 40 + y * y / 1400;
};

const vol = x => {
	return x / 1000;
};

const stop = _ => {
	notes.length = 0;
	canvas.removeEventListener('click', click);
	clearInterval(update_id);
	update_id = null;
};

const click = e => {
	const p = design_coords(e);
	if (is_inside_rect(0, 0, 150, 150, p)) {
		const t = audio.currentTime - note_start_time;
		note_start_time = audio.currentTime;
		notes[notes.length - 1][2] = t;
		set_notes(notes);
		play_notes();
		stop();
		start_home();
	} else if (is_inside_rect(850, 850, 1000, 1000, p)) {
		stop();
		start_home();
	} else {
		const t = audio.currentTime - note_start_time;
		note_start_time = audio.currentTime;
		notes[notes.length - 1][2] = t;		
		dest_x  = p.x;
		dest_y  = p.y;
		const f = freq(dest_y);
		const v = vol (dest_y);
		notes.push([f, v, null]);
		set_note(f, 3, v);
	}
};

const draw = _ => {
	bg_blue();
	if (ship_i !== null) {
		const i        = ship[ship_i][0];
		const offset_x = ship[ship_i][1];
		const offset_y = ship[ship_i][2];
		ctx.drawImage(i, x + offset_x, y + offset_y);
	}
	ctx.drawImage(i_back, 0, 0);
	ctx.drawImage(i_blue_dot, 600, 865);
};

const update = _ => {
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

const start = _ => {
	init_audio();
	const f = freq(y);
	const v = vol(y);
	set_note(f, 3, v);
	assert(notes.length === 0);
	notes.push([f, v, null]);
	note_start_time = audio.currentTime;	
	canvas.addEventListener('click', click);
	update();
	update_id = setInterval(update, 100);
};

export default start;
