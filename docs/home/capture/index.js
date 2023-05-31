import start_home                            from "../index.js"       ;
import { start_freq as binaural_start_freq } from "../../binaural.js" ;
import { stop       as binaural_stop       } from "../../binaural.js" ;
import { play_capture_notes                } from "../songs/index.js" ;
import { reset_play_buttons                } from "../songs/index.js" ;

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

let update_id               = null ;
let ship_i                  = 0    ;
let x                       = 250  ;
let y                       = 350  ;
let dest_x                  = x    ;
let dest_y                  = y    ;
const speed                 = 180  ;
let notes                   = []   ;
let current_note_start_time = null ;

const freq = y => {
	return 40 + y * y / 1400;
};

const vol = x => {
	return x / 1000;
};

const stop = _ => {
	binaural_stop();
	x = dest_x;
	y = dest_y;
	canvas.removeEventListener('click', click);
	clearInterval(update_id);
	update_id = null;
};

const click = e => {
	const p = design_coords(e);
	if (is_inside_rect(0, 0, 150, 150, p)) {
		const t = audio.currentTime - current_note_start_time;
		notes[notes.length - 1][2] = t;
		localStorage.setItem("home_capture", JSON.stringify({ x: x, y: y, notes: notes }));
		stop();
		play_capture_notes();
		start_home();
	} else if (is_inside_rect(850, 850, 1000, 1000, p)) {
		stop();
		start_home();
	} else {
		const t = audio.currentTime - current_note_start_time;
		current_note_start_time = audio.currentTime;
		notes[notes.length - 1][2] = t;		
		dest_x  = p.x;
		dest_y  = p.y;
		const f = freq(dest_y);
		const v = vol (dest_y);
		notes.push([f, v, null]);
		binaural_start_freq(f, 3, v);
	}
};

const update = _ => {
	if (++ship_i === 3) ship_i = 0;
	let dx   = dest_x - x;
	let dy   = dest_y - y;
	let dist = Math.sqrt(dx * dx + dy * dy);
	if (dist < speed) dist = speed;
	dx = dx / dist * speed;
	dy = dy / dist * speed;
	x += dx;
	y += dy;
	
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

const start = _ => {
	let o = localStorage.getItem("home_capture");
	if (o !== null) {
		o = JSON.parse(o);
		x = o.x;
		y = o.y;
	}
	reset_play_buttons();
	binaural_start_freq(freq(y), 3, vol(x));
	notes.length = 0;
	notes.push([freq(y), vol(x), null]);
	current_note_start_time = audio.currentTime;
	canvas.addEventListener('click', click);
	update();
	update_id = setInterval(update, 100);
};

export { start };
