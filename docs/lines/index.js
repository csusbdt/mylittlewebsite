import start_home from "../home/index.js";

const dash = [
	image("/lines/images/dash_0.png"),
    image("/lines/images/dash_1.png"),
    image("/lines/images/dash_2.png"),
    image("/lines/images/dash_3.png"),
    image("/lines/images/dash_4.png"),
    image("/lines/images/dash_5.png"),
    image("/lines/images/dash_6.png"),
    image("/lines/images/dash_7.png"),
    image("/lines/images/dash_8.png"),
    image("/lines/images/dash_9.png"),
    image("/lines/images/dash_10.png"),
    image("/lines/images/dash_11.png"),
    image("/lines/images/dash_12.png"),
    image("/lines/images/dash_13.png"),
    image("/lines/images/dash_14.png"),
    image("/lines/images/dash_15.png"),
    image("/lines/images/dash_16.png")
];

const i_black_dot = image("/lines/images/black_dot.png");
const i_red_dot   = image("/lines/images/red_dot.png"  );

let green_i           = 0    ;
let black_dot_i       = 0    ;
let red_dot_i         = null ;
let dash_i            = null ;

//let audio = null ;
//let gain = null;
//let gs   = [];

let update_id = null ;

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
    green_i     = 0    ;
    black_dot_i = 0    ;
    red_dot_i   = null ;
    dash_i      = null ;
	set_design_size(1000, 1000);
	canvas.addEventListener('click', click);
	update_id = set_interval(update, 500);
    update();
};

const exit = back_func => {
	canvas.removeEventListener('click', click);
	clear_interval(update_id);
	update_id  = null;
//    back_func();
    setTimeout(back_func, 1000);
};

const inside_black_dot = circle(828, 156, 43);

const click = e => {
	const p = design_coords(e);
	if (inside_black_dot(p)) {
//		init_audio();
		let f = 60;
		for (let i = 0; i < dash.length; ++i) {
//			let o = audio.createOscillator();
//			let g = audio.createGain();
//			o.connect(g);
//			o.frequency.value = f;
//			o.start();
//			g.gain.value = 0;
//			g.gain.setTargetAtTime(1, audio.currentTime + i * .35, .1);
//			g.connect(gain);
//			f += 8;
//			gs.push(g);
		}
		dash_i = 0;
	}
};

const update = _ => {
	draw();
	if (dash_i !== null) {
		if (dash_i + 1 < dash.length) {
			++dash_i;
		} else {
			red_dot_i = 0;
            ctx.drawImage(i_red_dot, 0, 0)
//            set_timeout(_ => { exit(start_home); }, 1000);
//            setTimeout(_ => { exit(start_home); }, 1000);
            exit(start_home);
//			for (let i = dash.length - 1; i >= 0; --i) {
//				gs[i].gain.setTargetAtTime(0, audio.currentTime + i * .35, .1);
//			}
		}
	}
};

const draw = _ => {
	if (green_i === 0) bg_green();
	if (black_dot_i === 0) ctx.drawImage(i_black_dot, 0, 0);
	if (dash_i !== null) for (let i = 0; i <= dash_i; ++i) {
		ctx.drawImage(dash[i], 0, 0);
	}
	if (red_dot_i === 0) ctx.drawImage(i_red_dot, 0, 0);
};

export default start;
