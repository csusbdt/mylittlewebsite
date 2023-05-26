// audio graph
let audio       = null ;
let merger      = null ;
let o_0         = null ;
let o_1         = null ;
let g_0         = null ;

const beat_freq = 3.5  ;
let loop_id     = null ;

const init = _ => {
	// this function must run in click handler to work on apple hardware
	if (audio === null) audio = new (window.AudioContext || window.webkitAudioContext)();
	if (audio.state === "suspended") audio.resume();
	if (g_0 !== null) return;
	g_0 = audio.createGain();
	g_0.gain.value = 0;
	g_0.connect(audio.destination);
	merger = new ChannelMergerNode(audio, { numberOfInputs: 2 });
	merger.connect(g_0);
	o_0 = audio.createOscillator();
	o_1 = audio.createOscillator();
	o_0.connect(merger, 0, 0);
	o_1.connect(merger, 0, 1);
	o_0.frequency.value = 120; 
	o_1.frequency.value = 120 + beat_freq;
	o_0.start();
	o_1.start();
};

const shutdown = _ => {
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
	if (play_timeout_id !== null) {
		clearInterval(play_timeout_id);
		play_timeout_id = null;
	}
	snapshots.length   = 0    ;
	play_duration      = null ;
	capture_start_time = null ;
	freq               = 120  ;
	vol                = 0    ;
};

// play returns duration in seconds of note sequence
const play = notes => {
	let duration = 0;
	notes.forEach(note => {
		duration += note[2];
	});

	let t = 0;
	for (let i = 0; i < notes.length; ++i) {
		const note = notes[i] ;
		const f    = note[0]  ;
		const v    = note[1]  ;
		const d    = note[2]  ; // duration in seconds
		o_0.frequency.setValueAtTime(f            , audio.currentTime + t);
		o_1.frequency.setValueAtTime(f + beat_freq, audio.currentTime + t);
		g_0.gain.setTargetAtTime(v, audio.currentTime + t, .1);
		t += d;
	}
	return t;
};

const once = notes => {
	if (audio === null) init();
	stop();
	const duration = play(notes);
	g_0.gain.setTargetAtTime(0, audio.currentTime + duration, .1);
};

const loop = notes => {
	if (audio === null) init();
	if (loop_id !== null) return;
	const duration = play(notes);
	loop_id = setInterval(play.bind(null, notes), duration * 1000);
};

const stop = _ => {
	if (loop_id !== null) {
		clearInterval(loop_id);
		loop_id = null;
	}
	o_0.frequency.cancelScheduledValues(audio.currentTime);
	o_1.frequency.cancelScheduledValues(audio.currentTime);
	g_0.gain.cancelScheduledValues(audio.currentTime);
	g_0.gain.setTargetAtTime(0, audio.currentTime, .1);
};

export { init, shutdown, once, loop, stop };
