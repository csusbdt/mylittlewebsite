const ship = [ 
	[ i_ship_left  ,  -78, -46 ], 
	[ i_ship_middle, -187, -45 ],
	[ i_ship_right , -306, -39 ]
];

let ship_i           = 0    ;
let back_i           = 0    ;
let loop_interval_id = null ;
let x                = 500  ;
let y                = 500  ;
let dest_x           = 500  ;
let dest_y           = 500  ;
const speed          = 180  ;

// audio graph
let audio                 = null    ;
let merger                = null    ;
let o_0                   = null    ;
let o_1                   = null    ;
let g_0                   = null    ;

// sound
let vol                   = .5      ;
let f_base                = 432 / 4 ;
const beat_freq           = 3.5     ;
const snapshots           = []      ;
let capture_start_time    = 0       ;
let playout_duration      = null    ;
let reschedule_timeout_id = null    ;

window.start_audio = _ => {
	// this function must run in click handler to work on apple hardware
	if (audio === null) {
		audio = new (window.AudioContext || window.webkitAudioContext)();
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
	}
};

const push_snapshot = _ => {
	o_0.frequency.setValueAtTime(f_base, audio.currentTime);
	o_1.frequency.setValueAtTime(f_base + beat_freq, audio.currentTime);
	snapshots.push([audio.currentTime - capture_start_time, f_base]);
};

const reset_snapshots = _ => {
	clearInterval(reschedule_timeout_id);
	o_0.frequency.cancelScheduledValues(audio.currentTime);
	o_1.frequency.cancelScheduledValues(audio.currentTime);
	o_0.frequency.setValueAtTime(f_base            , audio.currentTime);
	o_1.frequency.setValueAtTime(f_base + beat_freq, audio.currentTime);
	snapshots.length = 0;
	playout_duration  = null;
};

const schedule_snapshots = _ => {
	assert(playout_duration !== null);
	assert(snapshots.length > 0);
	o_0.frequency.cancelScheduledValues(audio.currentTime);
	o_1.frequency.cancelScheduledValues(audio.currentTime);
	// o_0.frequency.setValueAtTime(f_base            , audio.currentTime + .01);
	// o_1.frequency.setValueAtTime(f_base + beat_freq, audio.currentTime + .01);
	snapshots.forEach(snapshot => {
		const t  = snapshot[0];
		const f  = snapshot[1];
		o_0.frequency.setValueAtTime(f            , audio.currentTime + t);
		o_1.frequency.setValueAtTime(f + beat_freq, audio.currentTime + t);
	});
	reschedule_timeout_id = setTimeout(schedule_snapshots,  playout_duration * 1000);
};

const start_capture = _ => {
	assert(audio !== null);
	push_snapshot();
	capture_start_time = audio.currentTime;
};

const stop_capture = _ => {
	assert(audio !== null);
	playout_duration = audio.currentTime - capture_start_time;
	schedule_snapshots();
};

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
		schedule_snapshots();
		start_twirl();
	} else {
		dest_x = p.x;
		dest_y = p.y;
		if (f_base > 50) {
			f_base *= 12/13;
			push_snapshot();
		}
	}
};

const stop = _ => {
	canvas.removeEventListener('click', click);
	clearInterval(loop_interval_id);
	loop_interval_id = null;
	stop_capture();
	schedule_snapshots();
};

window.start_ship = _ => {
	reset_snapshots();
	start_capture();
	canvas.addEventListener('click', click);
	set_design_size(1000, 1000);
	loop();
	loop_interval_id = setInterval(loop, 100);
};
