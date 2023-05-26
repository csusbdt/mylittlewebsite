
const dash = [
	i_dash_0 , i_dash_1 , i_dash_2 , i_dash_3 , i_dash_4 , i_dash_5 , i_dash_6 , i_dash_7 , i_dash_8,
	i_dash_9 , i_dash_10, i_dash_11, i_dash_12, i_dash_13, i_dash_14, i_dash_15, i_dash_16
];

let loop_interval_id  = null ;

let green_i           = 0    ;
let black_dot_i       = 0    ;
let red_dot_i         = null ;
let dash_i            = null ;

let audio = null ;
let gain = null;
let gs   = [];

const init_audio = _ => {
	// this function must run in click handler to work on apple hardware
	if (audio === null) audio = new (window.AudioContext || window.webkitAudioContext)();
	if (audio.state === "suspended") audio.resume();
	if (gain !== null) return;
	gain = audio.createGain();
	gain.gain.value = .5;
	gain.connect(audio.destination);
};

const start = _ => {
	set_design_size(1000, 1000);
	canvas.addEventListener('click', click);
	loop_interval_id = setInterval(loop, 500);
};

const stop = _ => {
	canvas.removeEventListener('click', click);
	clearInterval(loop_interval_id);
	loop_interval_id  = null;
};

const click = e => {
	const p = design_coords(e);
	if (is_inside_circle(828, 156, 43, p)) {
		init_audio();
		let f = 60;
		for (let i = 0; i < dash.length; ++i) {
			let o = audio.createOscillator();
			let g = audio.createGain();
			o.connect(g);
			o.frequency.value = f;
			o.start();
			g.gain.value = 0;
			g.gain.setTargetAtTime(1, audio.currentTime + i * .35, .1);
			g.connect(gain);
			f += 8;
			gs.push(g);
		}
		dash_i = 0;
	}
};

const loop = _ => {
	draw();
	if (dash_i !== null) {
		if (dash_i + 1 < dash.length) {
			++dash_i;
		} else {
			red_dot_i = 0;
			for (let i = dash.length - 1; i >= 0; --i) {
				gs[i].gain.setTargetAtTime(0, audio.currentTime + i * .35, .1);
			}
		}
	}
};

const draw = _ => {
	if (green_i === 0) ctx.drawImage(i_green, 0, 0);
	if (black_dot_i === 0) ctx.drawImage(i_black_dot, 0, 0);
	if (dash_i !== null) for (let i = 0; i <= dash_i; ++i) {
		ctx.drawImage(dash[i], 0, 0);
	}
	if (red_dot_i === 0) ctx.drawImage(i_red_dot, 0, 0);
};

export { start };
