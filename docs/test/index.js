import "../main.js";
import button from "./button.js";
import { loop as play_song  } from "./song.js"  ;
import { stop as stop_audio } from "./song.js"  ;

let update_id = null;

const audio_color = [i_audio_yellow, i_audio_white];
let audio_i = 0;

const button_back = button(
	i_back_border, i_back_yellow, i_back_white,
	rect(52, 20, 133, 120), 0, 0);

const button_disable_audio = button(
	i_audio_border, i_audio_yellow, i_audio_white,
	circle(262, 67, 54), 0, 0);

const button_large = button(
	i_button_large_border, i_button_large_green, i_button_large_white,
	circle(247, 447, 194), 0, 0);

const button_medium = button(
	i_button_medium_border, i_button_medium_green, i_button_medium_white,
	circle(149, 325, 100), 625, 125);

const button_small_0 = button(
	i_button_small_border, i_button_small_green, i_button_small_white,
	circle(78, 253, 100), 500, 0);

const button_small_1 = button(
	i_button_small_border, i_button_small_green, i_button_small_white,
	circle(78, 253, 100), 500, 125);

const button_small_2 = button_small_0.clone(500, 375);

const reset_play_buttons = _ => {
	stop_audio();
	button_large.reset();
	button_medium.reset();
	button_small_0.reset();
	button_small_1.reset();
	button_small_2.reset();
};


const click = e => {
    const p = design_coords(e);

	if (button_back.contains(p)) {
		button_back.set();
		reset_play_buttons();
	}

	if (button_disable_audio.contains(p)) {
		if (button_disable_audio.off) {
			reset_play_buttons();
			button_disable_audio.set();
		} else {
			button_disable_audio.reset();
		}
	}

	if (button_disable_audio.off) {
		if (button_large.contains(p)) {
			if (button_large.off) {
				reset_play_buttons();
				play_song(song_0, 3);
				button_large.set();
			} else {
				stop_audio();
				button_large.reset();
			}
		} else if (button_medium.contains(p)) {
			if (button_medium.off) {
				reset_play_buttons();
				play_song(song_1, 3);
				button_medium.set();
			} else {
				stop_audio();
				button_medium.reset();
			}
		} else if (button_small_0.contains(p)) {
			if (button_small_0.off) {
				reset_play_buttons();
				play_song(song_2, 3);
				button_small_0.set();
			} else {
				stop_audio();
				button_small_0.reset();
			}
		} else if (button_small_1.contains(p)) {
			if (button_small_1.off) {
				reset_play_buttons();
				play_song(song_3, 3);
				button_small_1.set();
			} else {
				stop_audio();
				button_small_1.reset();
			}
		} else if (button_small_2.contains(p)) {
			if (button_small_2.off) {
				reset_play_buttons();
				play_song(song_3, 3);
				button_small_2.set();
			} else {
				stop_audio();
				button_small_2.reset();
			}
		}
	}

};

canvas.addEventListener('click', click);

const update = _ => {
    draw(i_blue);
    draw(i_menu_red);
    draw(i_menu_border);
	button_back.draw();
	button_disable_audio.draw();
	button_large.draw();
	button_medium.draw();
	button_small_0.draw();
	button_small_1.draw();
	button_small_2.draw();
};

update();

update_id = set_interval(update, 350);

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

const song_2 = [
    [160, .25, 1.10 - 0   ],
	[ 47, .52, 2.10 - 1.10],
	[ 65, .42, 3.14 - 2.10],
	[ 81, .69, 4.20 - 3.14],
	[239, .48, 5.22 - 4.20],
	[ 96, .18, 6.20 - 5.22],
	[ 51, .42, 7.19 - 6.20],
	[ 69, .66, 8.26 - 7.19]
];

const song_3 = [
    [127, 0.25, .59],
    [249, 0.52, .40],
    [335, 0.34, .40],
    [108, 0.41, .51],
    [142, 0.62, .22],
    [201, 0.59, .26],
    [172, 0.38, .40]
];
