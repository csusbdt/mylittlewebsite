import "../main.js";
import { init as init_audio } from "./audio.js";
import { once as play_once  } from "./audio.js";
import { loop as play_loop  } from "./audio.js";
import { stop as stop_play  } from "./audio.js";

const twirl = [i_twirl_0, i_twirl_1, i_twirl_2];
let twirl_i = 0;

const blob = [i_blob_0, i_blob_1, i_blob_2, i_blob_3];
let blob_i = 0;

const bday = [i_blob_0, i_blob_1, i_blob_2, i_blob_3];
let bday_i = 0;

let selected = null;

const click = e => {
    const p = design_coords(e);
    if (selected === null) {
        if (is_inside_rect( 0, 0, 250, 250, p)) {
            selected = "twirl";
            play_loop(song_0, 100);
        } else if (is_inside_rect(250, 0, 500, 250, p)) {
            selected = "blob";
            play_loop(song_1);
        } else if (is_inside_rect(500, 0, 750, 250, p)) {
            selected = "bday";
            play_loop(happy_birthday);
        }
    } else {
        selected = null;
        stop_play();
    }
};

canvas.addEventListener('click', click);

const loop = _ => {
    draw(i_blue);
    if (selected === null) {
        draw(twirl[twirl_i], 0, 0, 1000, 1000, 0, 0, 250, 250);
        draw(blob[blob_i], 0, 0, 1000, 1000, 250, 0, 250, 250);
        draw(bday[bday_i], 0, 0, 1000, 1000, 500, 0, 250, 250);
    } else if (selected === 'twirl') {
        draw(twirl[twirl_i]);
    } else if (selected === 'blob') {
        draw(blob[blob_i]);
    } else if (selected === 'bday') {
        draw(bday[bday_i]);
    }
    
    if (++twirl_i === 3) twirl_i = 0;
    if (++blob_i === 4) blob_i = 0;
    if (++bday_i === 4) bday_i = 0;
};

loop();

setInterval(loop, 350);

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

const song_1 = [
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


const r = 0.05;

const happy_birthday = [
	[311, 0.5, 0.84 - r],
[311, 0, r],
	[311, 0.5, 0.28 - r],
[311, 0, r],
	[349.085697024215, 0.5, 0.56 - r],
[349, 0, r],
	[311, 0.5, 0.56 - r],
[311, 0, r],
	[415.13519464688073, 0.5, 0.56 - r],
[415, 0, r],
	[391.8354465173056, 0.5, 1.12 - r],
[391, 0, r],
	[311, 0.5, 0.8400000000000001 - r],
[311, 0, r],
	[311, 0.5, 0.28 - r],
[ 311, 0, r],
	[349.085697024215, 0.5, 0.56 - r],
[ 349, 0, r],
	[311, 0.5, 0.56 - r],
[ 311, 0, r],
	[465.9735009086481, 0.5, 0.56 - r],
[ 466, 0, r],
	[415.13519464688073, 0.5, 1.12 - r],
[ 415, 0, r],
	[311, 0.5, 0.8400000000000001 - r],
[ 311, 0, r],
	[311, 0.5, 0.28 - r],
[ 311, 0, r],
	[622.0000000000002, 0.5, 0.56 - r],
[ 622, 0, r],
	[523.0375702878106, 0.5, 0.56 - r],
[ 523, 0, r],
	[415.13519464688073, 0.5, 0.56 - r],
[ 415, 0, r],
	[391.8354465173056, 0.5, 0.56 - r],
[ 391, 0, r],
	[349.085697024215, 0.5, 0.56 - r],
[ 349, 0, r],
	[554.1390026832913, 0.5, 0.8400000000000001 - r],
[ 554, 0, r],
	[554.1390026832913, 0.5, 0.28 - r],
[ 554, 0, r],
	[523.0375702878106, 0.5, 0.56 - r],
[ 523, 0, r],
	[415.13519464688073, 0.5, 0.56 - r],
[ 415, 0, r],
	[465.9735009086481, 0.5, 0.56 - r],
[ 466, 0, r],
	[415.13519464688073, 0.5, 1.12 - r],
[ 415, 0, r],
    [0, 0, 2]
];
