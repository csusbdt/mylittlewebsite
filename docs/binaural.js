// audio graph
let audio                 = null    ;
let merger                = null    ;
let o_0                   = null    ;
let o_1                   = null    ;
let g_0                   = null    ;

// sound
let vol                   = 1       ;
let f_base                = 432 / 4 ;
const beat_freq           = 3.5     ;
const snapshots           = []      ;
let capture_start_time    = 0       ;
let playout_duration      = null    ;
let reschedule_timeout_id = null    ;

// animation
let loop_interval_id      = null    ;
let twirl                 = 0       ;
let vol_up                = null    ;
let vol_down              = null    ;
let f_base_up             = null    ;
let f_base_down           = null    ;
let back                  = null    ;
let mini_ship             = null    ;

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
	o_0.frequency.setValueAtTime(f_base            , audio.currentTime);
	o_1.frequency.setValueAtTime(f_base + beat_freq, audio.currentTime);
	snapshots.forEach(snapshot => {
		const t  = snapshot[0];
		const f  = snapshot[1];
		o_0.frequency.setValueAtTime(f            , audio.currentTime + t);
		o_1.frequency.setValueAtTime(f + beat_freq, audio.currentTime + t);
	});
	reschedule_timeout_id = setTimeout(schedule_snapshots,  playout_duration * 1000);
};

const draw = _ => {
	ctx.drawImage(i_blue, 0, 0);
	
	if (twirl === 0) {
		ctx.drawImage(i_twirl_0, 0, 0);
	} else if (twirl === 1) {
		ctx.drawImage(i_twirl_1, 0, 0);
	} else if (twirl === 2) {
		ctx.drawImage(i_twirl_2, 0, 0);
	}
	
	if (vol_up === 0) {
		ctx.drawImage(i_up_0  , 0, 0);
	} else if (vol_up === 1) {
		ctx.drawImage(i_up_1  , 0, 0);
	}
	
	if (vol_down === 0) {
		ctx.drawImage(i_down_0 , 0, 0);
	} else if (vol_down === 1) {
		ctx.drawImage(i_down_1 , 0, 0);
	}
	
	if (f_base_up === 0) {
		ctx.drawImage(i_f_up_0  , 0, 0);
	} else if (f_base_up === 1) {
		ctx.drawImage(i_f_up_1  , 0, 0);
	}
	
	if (f_base_down === 0) {
		ctx.drawImage(i_f_down_0 , 0, 0);
	} else if (f_base_down === 1) {
		ctx.drawImage(i_f_down_1 , 0, 0);
	}
	
	if (mini_ship === 0) {
		ctx.drawImage(i_mini_ship_0, 0, 0);
	} else if (mini_ship === 1) {
		ctx.drawImage(i_mini_ship_1, 0, 0);
	}
	
	if (back === 0) {
		ctx.drawImage(i_back_0, 0, 0);
	} else if (back === 1) {
		ctx.drawImage(i_back_1, 0, 0);
	}
};

const loop = _ => {
	draw();
	if (twirl === 0) {
		twirl = 1;
	} else if (twirl === 1) {
		twirl = 2;
	} else if (twirl === 2) {
		twirl = 0;
	}
	if (vol_up      === 1) vol_up      = 0;
	if (vol_down    === 1) vol_down    = 0;
	if (f_base_up   === 1) f_base_up   = 0;
	if (f_base_down === 1) f_base_down = 0;
	if (mini_ship === 0) {
		mini_ship = 1;
	} else if (mini_ship === 1) {
		mini_ship = 0;
	}
	if (back === 1) {
		back        = null;
		vol_up      = null;
		vol_down    = null;
		f_base_up   = null;
		f_base_down = null;
		mini_ship   = null;
		twirl       = 0   ;
	}
};

const stop = _ => {
	clearInterval(loop_interval_id);
	loop_interval_id = null;
	twirl            = 0;
	vol_up           = null;
	vol_down         = null;
	f_base_up        = null;
	f_base_down      = null;
	back             = null;
	mini_ship        = null;
	canvas.removeEventListener('click', click);
};

const click = e => {
	const p = design_coords(e);

	// initial click to start audio
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

	// process twirling state
	if (twirl !== null) {
		if (is_inside_circle(470, 515, 70, p)) {
			twirl       = null ;
			vol_up      = 0    ;
			vol_down    = 0    ;
			f_base_up   = 0    ;
			f_base_down = 0    ;
			back        = 0    ;
			mini_ship   = 0    ;
		}
		return;
	} 

	// process volume clicks
	if (is_inside_circle(470, 390, 50, p) && g_0.gain.value < 1) { // up the volume
		let v = g_0.gain.value + .05;
		if (v > 1) v = 1;
		g_0.gain.setTargetAtTime(v, audio.currentTime, .1);
		vol_up = 1;
	} else if (is_inside_circle(470, 534, 50, p) && g_0.gain.value > 0) {
		let v = g_0.gain.value - .08;
		if (v < 0) v = 0;
		g_0.gain.setTargetAtTime(v, audio.currentTime, .1);
		vol_down = 1;
	}

	// process frequency clicks
	if (is_inside_circle(722, 817, 100, p)) {
		// adjust base and snapshotted frequencies up
		if (f_base > 900) return;
		f_base *= 13/12;
		snapshots.forEach(snapshot => { snapshot[1] *= 13/12; });
		schedule_snapshots();
		f_base_up = 1;
	} else if (is_inside_circle(268, 777, 100, p)) {
		// adjust base and snapshotted frequencies down
		if (f_base < 50) return;
		f_base *= 12/13;
		snapshots.forEach(snapshot => { snapshot[1] *= 12/13; });
		schedule_snapshots();
		f_base_down = 1;
	}

	// process back to twirl clicks
	if (back === 0 && is_inside_circle(773, 132, 120, p)) {
		back = 1;
	}

	// process back to ship clicks
	if (is_inside_rect(133, 100, 353, 195, p)) {
		stop();
		g.start();
	}
};

window.binaural = {};

binaural.start_capture = _ => {	
	if (audio === null) return;
	reset_snapshots();
	capture_start_time = audio.currentTime;
};

binaural.stop_capture = _ => {
	if (audio === null) return;
	playout_duration = audio.currentTime - capture_start_time;
	schedule_snapshots();
};

binaural.up = _ => {
	if (audio === null) return;
	if (f_base > 900) return;
	f_base *= 13/12;
	o_0.frequency.setValueAtTime(f_base, audio.currentTime);
	o_1.frequency.setValueAtTime(f_base + beat_freq, audio.currentTime);
	snapshots.push([audio.currentTime - capture_start_time, f_base]);
};

binaural.down = _ => {
	if (audio === null) return;
	if (f_base < 50) return;
	f_base *= 12/13;
	o_0.frequency.setValueAtTime(f_base, audio.currentTime);
	o_1.frequency.setValueAtTime(f_base + beat_freq, audio.currentTime);
	snapshots.push([audio.currentTime - capture_start_time, f_base]);
};

binaural.start = _ => {
	set_design_size(1000, 1000);
	canvas.addEventListener('click', click);
	loop_interval_id = setInterval(loop, 160);
};
