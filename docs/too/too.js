import { init as init_audio } from "./audio.js";
import { once as play_once  } from "./audio.js";
import { loop as play_loop  } from "./audio.js";
import { stop as stop_play  } from "./audio.js";

let loop_interval_id  = null;

const too_portal    = [ i_too_portal_0   , i_too_portal_1   , i_too_portal_2    ];
const return_portal = [ i_return_portal_0, i_return_portal_1, i_return_portal_2 ];
const blob          = [ i_blob_0         , i_blob_1         , i_blob_2          ];
const blue_blob     = [ i_blue_blob_0    , i_blue_blob_1    , i_blue_blob_2     ];

let too_portal_i      = 0    ; // null, 0, 1, 2
let return_portal_i   = null ; // null, 0, 1, 2
let green_i           = 0    ; // null, 0
let red_i             = null ; // null, 0
let blob_i            = null ; // null, 0, 1, 2
let blue_blob_i       = null ; // null, 0, 1, 2

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
	if (too_portal_i === 0 && is_inside_circle(667, 271, 95, p)) {
		too_portal_i = 1;
		play_loop(happy_birthday_2);
	}
	if (return_portal_i === 0 && is_inside_rect(92, 809, 300, 945, p)) {
		return_portal_i = 1;
		play_once([[70, 1, .18]]);
	}
	if (return_portal_i === 0 && is_inside_circle(490, 331, 150, p)) {
		stop_play();
		if      (blob_i      === 0) blob_i      = null, blue_blob_i = 0, play_loop(song_2);
		else if (blob_i      === 1) blob_i      = null, blue_blob_i = 1, play_loop(song_2);
		else if (blob_i      === 2) blob_i      = null, blue_blob_i = 2, play_loop(song_2);
		else if (blue_blob_i === 0) blue_blob_i = null, blob_i      = 0, play_loop(song_1);
		else if (blue_blob_i === 1) blue_blob_i = null, blob_i      = 1, play_loop(song_1);
		else if (blue_blob_i === 2) blue_blob_i = null, blob_i      = 2, play_loop(song_1);
	}
};

const loop = _ => {
	draw();
	if (blob_i      !== null && ++blob_i      === 3) blob_i      = 0;
	if (blue_blob_i !== null && ++blue_blob_i === 3) blue_blob_i = 0;
	
	if (too_portal_i === 0) {
		return;
	}
	if (too_portal_i === 1) {
		blob_i = 0;
		too_portal_i = 2;
		return;
	}
	if (too_portal_i === 2) {
		too_portal_i = null;
		return_portal_i = 0;
		return;
	}
	if (return_portal_i === 0) {
		return;
	}
	if (return_portal_i === 1) {
		return_portal_i = 2;
		blob_i = null;
		return;
	}
	if (return_portal_i === 2) {
		return_portal_i = null;
		too_portal_i = 0;
		return;
	}
};

const draw = _ => {
	if (return_portal_i === null || return_portal_i === 0) {
		ctx.drawImage(i_green, 0, 0);
	}

	if (return_portal_i === 1 || return_portal_i === 2) {
		ctx.drawImage(i_red, 0, 0);
	}

	if (too_portal_i    !== null) ctx.drawImage(too_portal   [too_portal_i   ], 0, 0);
	if (return_portal_i !== null) ctx.drawImage(return_portal[return_portal_i], 0, 0);
	if (blob_i          !== null) ctx.drawImage(blob         [blob_i         ], 0, 0);
	if (blue_blob_i     !== null) ctx.drawImage(blue_blob    [blue_blob_i    ], 0, 0);
};

export { start };

const r = 0.05;

const happy_birthday_2 = [
	[311,0.5,0.84],
[311, 0, r],
	[311,0.5,0.28],
[311, 0, r],
	[349.085697024215,0.5,0.56],
[349, 0, r],
	[311,0.5,0.56],
[311, 0, r],
	[415.13519464688073,0.5,0.56],
[415, 0, r],
	[391.8354465173056,0.5,1.12],
[391, 0, r],
	[311,0.5,0.8400000000000001],
[311, 0, r],
	[311,0.5,0.28],
	[349.085697024215,0.5,0.56],
	[311,0.5,0.56],
	[465.9735009086481,0.5,0.56],
	[415.13519464688073,0.5,1.12],
	[311,0.5,0.8400000000000001],
	[311,0.5,0.28],
	[622.0000000000002,0.5,0.56],
	[523.0375702878106,0.5,0.56],
	[415.13519464688073,0.5,0.56],
	[391.8354465173056,0.5,0.56],
	[349.085697024215,0.5,0.56],
	[554.1390026832913,0.5,0.8400000000000001],
	[554.1390026832913,0.5,0.28],
	[523.0375702878106,0.5,0.56],
	[415.13519464688073,0.5,0.56],
	[465.9735009086481,0.5,0.56],
	[415.13519464688073,0.5,1.12]
];

const happy_birthday = [
	[311,0.5,0.84],
	[311,0.5,0.28],
	[349.085697024215,0.5,0.56],
	[311,0.5,0.56],
	[415.13519464688073,0.5,0.56],
	[391.8354465173056,0.5,1.12],
	[311,0.5,0.8400000000000001],
	[311,0.5,0.28],
	[349.085697024215,0.5,0.56],
	[311,0.5,0.56],
	[465.9735009086481,0.5,0.56],
	[415.13519464688073,0.5,1.12],
	[311,0.5,0.8400000000000001],
	[311,0.5,0.28],
	[622.0000000000002,0.5,0.56],
	[523.0375702878106,0.5,0.56],
	[415.13519464688073,0.5,0.56],
	[391.8354465173056,0.5,0.56],
	[349.085697024215,0.5,0.56],
	[554.1390026832913,0.5,0.8400000000000001],
	[554.1390026832913,0.5,0.28],
	[523.0375702878106,0.5,0.56],
	[415.13519464688073,0.5,0.56],
	[465.9735009086481,0.5,0.56],
	[415.13519464688073,0.5,1.12]
];

const song_0 = [	
	[ 77, 0.50, 0.86],
	[ 52, 0.34, 0.60],
	[ 49, 0.62, 0.22],
	[ 90, 0.44, 0.56],
	[259, 0.31, 0.43],
	[193, 0.67, 0.37],
	[ 65, 0.68, 0.32],
	[ 55, 0.45, 0.29],
	[152, 0.32, 0.28],
	[248, 0.26, 0.23],
	[273, 0.24, 0.26],
	[330, 0.23, 0.28],
	[446, 0.23, 0.25],
	[408, 0.38, 0.25],
	[246, 0.52, 0.24],
	[153, 0.46, 0.23],
	[134, 0.34, 0.27],
	[ 97, 0.30, 0.70]
];

const song_2 = [
	[ 77, 0.50, 0.86],
	[ 52, 0.34, 0.86],
	[ 77, 0.62, 0.86],
	[ 52, 0.44, 0.43],
	[260, 0.31, 0.43],
	[193, 0.67, 0.86],
	[340, 0.41, 0.21],
	[293, 0.31, 0.21],
	[260, 0.41, 0.43],
	[340, 0.65, 0.32],
	[177, 0.68, 0.86],
	[135, 0.45, 0.43],
	[152, 0.32, 0.21],
	[248, 0.26, 0.22]
];