import { start as start_twirl } from "./twirl.js";
import { start as start_ship  } from "./ship.js" ;

const ship = [ 
	[ i_ship_left  ,  -78, -46 ], 
	[ i_ship_middle, -187, -45 ],
	[ i_ship_right , -306, -39 ]
];

let ship_i           = 0    ;
let loop_interval_id = null ;
let x                = 250  ;
let y                = 350  ;
let dest_x           = x    ;
let dest_y           = y    ;
const speed          = 180  ;

// audio graph
let audio            = null ;
let merger           = null ;
let o_0              = null ;
let o_1              = null ;
let g_0              = null ;

// sound
let vol                 = dest_x / 1000          ;
let f_base              = 40 + dest_y * dest_y / 1400 ;
const beat_freq         = 3.5               ;
const snapshots         = []                ;
let capture_start_time  = 0                 ;
let play_duration       = null              ;
let play_timeout_id     = null              ;

const create_audio = _ => {
	// this function must run in click handler to work on apple hardware
	if (audio === null) audio = new (window.AudioContext || window.webkitAudioContext)();
};

const start_audio = _ => {
	g_0 = audio.createGain();
	g_0.connect(audio.destination);
	merger = new ChannelMergerNode(audio, { numberOfInputs: 2 });
	merger.connect(g_0);
	o_0 = audio.createOscillator();
	o_1 = audio.createOscillator();
	o_0.connect(merger, 0, 0);
	o_1.connect(merger, 0, 1);
	o_0.frequency.value = f_base; 
	o_1.frequency.value = f_base + beat_freq;
	o_0.start();
	o_1.start();
};

const stop_audio = _ => {
	g_0.gain.setTargetAtTime(0, audio.currentTime, .01);
	setTimeout(_ => {
		g_0.disconnect();
		merger.disconnect();
		o_0.disconnect();
		o_1.disconnect();
		g_0    = null;
		merger = null;
		o_0    = null;
		o_1    = null;
	}, 150);
};

const create_snapshot = _ => {
	o_0.frequency.setValueAtTime(f_base, audio.currentTime);
	o_1.frequency.setValueAtTime(f_base + beat_freq, audio.currentTime);
	g_0.gain.setTargetAtTime(vol, audio.currentTime, .02);
	if (snapshots.length === 0) {
		snapshots.push([0, f_base, vol]);		
	} else {
		snapshots.push([audio.currentTime - capture_start_time, f_base, vol]);
	}
};

const play_snapshots = _ => {
	for (let i = 0; i < snapshots.length; ++i) {
		const snapshot = snapshots[i];
		const t  = snapshot[0];
		const f  = snapshot[1];
		const v  = snapshot[2];
		o_0.frequency.setValueAtTime(f            , audio.currentTime + t);
		o_1.frequency.setValueAtTime(f + beat_freq, audio.currentTime + t);
		g_0.gain.setTargetAtTime(v, audio.currentTime + t, .1);
	}
	play_timeout_id = setTimeout(play_snapshots, play_duration * 1000);
};

const draw = _ => {
	ctx.drawImage(i_blue, 0, 0);
	if (ship_i !== null) {
		const i        = ship[ship_i][0];
		const offset_x = ship[ship_i][1];
		const offset_y = ship[ship_i][2];
		ctx.drawImage(i, x + offset_x, y + offset_y);
	}
	ctx.drawImage(i_back, 0, 0);
	ctx.drawImage(i_blue_dot, 600, 865);
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
	if (is_inside_rect(0, 0, 150, 150, p)) {
		play_duration = audio.currentTime - capture_start_time;
		play_snapshots();
		stop();
		start_twirl();
	} else if (is_inside_rect(850, 850, 1000, 1000, p)) {
		stop_audio();
		stop();
		start_ship();
	} else {
		dest_x    = p.x;
		dest_y    = p.y;
		f_base    = 40 + dest_y * dest_y / 1400;
		vol       = dest_x / 1000;
		create_snapshot();
	}
};

const stop = _ => {
	canvas.removeEventListener('click', click);
	clearInterval(loop_interval_id);
	loop_interval_id = null;
};

const start = _ => {
	if (audio === null) create_audio();
	if (audio.state === "suspended") audio.resume();
	if (g_0 === null) start_audio();
	if (play_timeout_id !== null) {
		clearInterval(play_timeout_id);
		play_timeout_id = null;
		snapshots.length = 0;
		o_0.frequency.cancelScheduledValues(audio.currentTime);
		o_1.frequency.cancelScheduledValues(audio.currentTime);
		g_0.gain.cancelScheduledValues(audio.currentTime);
	}
	play_duration = null;
	capture_start_time = audio.currentTime;
	create_snapshot();
	canvas.addEventListener('click', click);
	set_design_size(1000, 1000);
	loop();
	loop_interval_id = setInterval(loop, 100);
};

export { start          };
