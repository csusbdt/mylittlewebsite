import start_home                            from "../index.js"       ;
import { start_freq as binaural_start_freq } from "../../binaural.js" ;
import { stop       as binaural_stop       } from "../../binaural.js" ;
import { start_loop as binaural_start_loop } from "../../binaural.js" ;
import { reset_play_buttons                } from "../songs/index.js" ;
import { set_play_capture_button           } from "../songs/index.js" ;

const i_ship_left   = image("/space_shooter/images/ship_left.png"  );
const i_ship_middle = image("/space_shooter/images/ship_middle.png");
const i_ship_right  = image("/space_shooter/images/ship_right.png" );

const ship = [ 
	[ i_ship_left  ,  -78, -46 ], 
	[ i_ship_middle, -187, -45 ],
	[ i_ship_right , -306, -39 ]
];

const back   = O(image("/home/capture/back.png"), rect(  0,   0, 150, 150)          );
const cancel = O(image("/space_shooter/images/blue_dot.png"  ), rect(250, -15, 400, 135), 600, 865);

let update_id               = null ;
let ship_i                  = 0    ;
let x                       = 250  ;
let y                       = 350  ;
let dest_x                  = x    ;
let dest_y                  = y    ;
const speed                 = 180  ;
let notes                   = null ;
let current_note_start_time = null ;

const freq = y => {
	return 40 + y * y / 1400;
};

const vol = x => {
	return x / 1000;
};

const exit = start_func => {
	x = dest_x;
	y = dest_y;
	canvas.removeEventListener('click', click);
	clearInterval(update_id);
	start_func();
};

const click = e => {
	const p = design_coords(e);
	if (back.click(p)) {
		const t = audio.currentTime - current_note_start_time;
		notes[notes.length - 1][2] = t;
		set_item("home_capture", { x: x, y: y, notes: notes });
		play_capture_notes();
		exit(start_home);
	} else if (cancel.click(p)) {
		binaural_stop();
		exit(start_home);
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
	back.draw();
	cancel.draw();
};

const play_capture_notes = _ => {
	let o = get_item("home_capture", { x: x, y: y, notes: [[freq(y), vol(x), 1]] });
	binaural_start_loop(o.notes, 3);
	reset_play_buttons();
	set_play_capture_button();
};

const start = _ => {
	let o  = get_item("home_capture", { x: x, y: y, notes: [[freq(y), vol(x), 1]] });
	x      = o.x;
	y      = o.y;
	dest_x = o.x;
	dest_y = o.y;
	notes  = o.notes;
	reset_play_buttons();
	binaural_start_freq(freq(y), 3, vol(x));
	notes = [];
	notes.push([freq(y), vol(x), null]);
	current_note_start_time = audio.currentTime;
	canvas.addEventListener('click', click);
	update();
	update_id = setInterval(update, 100);
};

export { start, play_capture_notes };
