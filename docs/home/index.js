import                  "../main.js"        ;
import button      from "../test/button.js" ;
import start_song  from "../test/index.js"  ;

let update_id = null;

const silence_color = [i_silence_yellow, i_silence_white];
let silence_i = 0;

const button_back = button(
	i_back_border, i_back_yellow, i_back_white,
	rect(52, 20, 133, 120), 0, 0);

const button_silence = button(
	i_silence_border, i_silence_yellow, i_silence_white,
	circle(262, 67, 54), 0, 0);

const button_small_0 = button(
	i_button_small_border, i_button_small_green, i_button_small_white,
	circle(78, 253, 100), 0, 0);

const button_small_1 = button_small_0.clone(125, 0);

const click = e => {
    const p = design_coords(e);

	if (button_back.contains(p)) {
		button_back.set();
		clear_interval(update_id);
		canvas.removeEventListener('click', click);
		start_song();
	}

	if (button_silence.contains(p)) {
		if (button_silence.off) {
			volume(0);
			button_silence.set();
		} else {
			button_silence.reset();
		}
	}

	if (button_small_0.contains(p)) {
		if (button_small_0.off) {
			button_small_0.set();
			canvas.removeEventListener('click', click);
			clear_interval(update_id);	
			start_song();
		} else {
			button_small_0.reset();
		}
	} else if (button_small_1.contains(p)) {
		if (button_small_1.off) {
			button_small_1.set();
		} else {
			button_small_1.reset();
		}
	}
};

const update = _ => {
    draw(i_blue);
    draw(i_menu_red);
    draw(i_menu_border);
	button_back.draw();
	button_silence.draw();
	button_small_0.draw();
	button_small_1.draw();
};

const start = _ => {
	canvas.addEventListener('click', click);
	update_id = set_interval(update, 350);	
	update();
};

export default start;
