let g        = null ;
let o_0      = null ;
let o_1      = null ;
let notes    = [[120, 3, .5]] ;

let loop_id  = null ;

const init = _ => {
	init_audio();	
	if (g !== null) return;
	g = audio.createGain();
	g.gain.value = 0;
	g.connect(gain);	
	const merger = new ChannelMergerNode(audio);
	merger.connect(g);
	o_0 = audio.createOscillator();
	o_1 = audio.createOscillator();
	o_0.connect(merger, 0, 0);
	o_1.connect(merger, 0, 1);
	o_0.frequency.value = 0; 
	o_1.frequency.value = 0;
	o_0.start();
	o_1.start();
};

const set_note = (f, beat_freq, v) => {
	init();
	if (loop_id !== null) {
		clearInterval(loop_id);
		loop_id = null;
	}
	o_0.frequency.setValueAtTime(f            , audio.currentTime);
	o_1.frequency.setValueAtTime(f + beat_freq, audio.currentTime);
	g.gain.setTargetAtTime(v, audio.currentTime, .1);
};

const set_notes = ns => {
	notes = ns.slice();
};

const play_notes = (beat_freq = 0) => {
	loop(notes, beat_freq);
};

// play returns duration in seconds of note sequence
const play = (notes, beat_freq, ramp_up, ramp_down) => {
	let duration = 0;
	notes.forEach(note => {
		duration += note[2];
	});

	if (beat_freq === undefined) beat_freq = 0;

	if (ramp_up !== undefined) {
		g.gain.setValueAtTime(0, audio.currentTime);
		if (ramp_down === undefined) ramp_down = ramp_up;
	}

	let t = 0;
	for (let i = 0; i < notes.length; ++i) {
		const note = notes[i] ;
		const f    = note[0]  ;
		const v    = note[1]  ;
		const d    = note[2]  ; // duration in seconds
		if (ramp_up !== undefined) {
			o_0.frequency.setValueAtTime(f            , audio.currentTime + t);
			o_1.frequency.setValueAtTime(f + beat_freq, audio.currentTime + t);
			g.gain.setTargetAtTime(v, audio.currentTime + t + ramp_up, .1);
			g.gain.setTargetAtTime(0, audio.currentTime + t + d - ramp_down, .1);
		} else {
			o_0.frequency.setValueAtTime(f            , audio.currentTime + t);
			o_1.frequency.setValueAtTime(f + beat_freq, audio.currentTime + t);
			g.gain.setTargetAtTime(v, audio.currentTime + t, .1);
		}
		t += d;
	}
	return t;
};

const once = (notes, beat_freq, ramp_up, ramp_down) => {
	init();
	stop();
	const duration = play(notes, beat_freq, ramp_up, ramp_down);
	g.gain.setTargetAtTime(0, audio.currentTime + duration, .01);
};

const loop = (notes, beat_freq, ramp_up, ramp_down, delay) => {
	init();
	if (loop_id !== null) return;
	let duration = play(notes, beat_freq, ramp_up, ramp_down);
	if (delay !== undefined) duration+= delay;
	loop_id = setInterval(play.bind(null, notes, beat_freq, ramp_up, ramp_down), (duration) * 1000);
};

const stop = _ => {
	init();
	if (loop_id !== null) {
		clearInterval(loop_id);
		loop_id = null;
	}
	o_0.frequency.cancelScheduledValues(audio.currentTime);
	o_1.frequency.cancelScheduledValues(audio.currentTime);
	g.gain.cancelScheduledValues(audio.currentTime);
	g.gain.setTargetAtTime(0, audio.currentTime, .01);
};

export { init, once, loop, stop, set_note, set_notes, play_notes };
