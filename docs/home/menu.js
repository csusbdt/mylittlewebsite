//import             "../main.js"        ;
import button from "../home/button.js" ;

const i_menu_border = image("/home/images/menu_border.png");   
const i_menu_red    = image("/home/images/menu_red.png"   );

const button_back = button(
	image("/home/images/back_border.png"), 
	image("/home/images/back_yellow.png"), 
	image("/home/images/back_white.png" ),
	rect(52, 20, 133, 120), 0, 0);

const button_silent = button(
	image("/home/images/silent_border.png"), 
	image("/home/images/silent_yellow.png"), 
	image("/home/images/silent_white.png" ),
	circle(262, 67, 54), 0, 0);

const button_volume_up = button(
	image("/home/images/volume_up_border.png"), 
	image("/home/images/volume_up_yellow.png"), 
	image("/home/images/volume_up_white.png" ),
	rect(357, 21, 443, 121), 0, 0);

const button_volume_down = button(
	image("/home/images/volume_down_border.png"), 
	image("/home/images/volume_down_yellow.png"), 
	image("/home/images/volume_down_white.png" ),
	rect(492, 14, 569, 116), 0, 0);

if (volume() === 0) button_volume_down.set();
if (volume() === 1) button_volume_up.set();

const menu = {
};

let back_func = null;
button_back.set();

menu.set_back_func = f => {
	back_func = f;
	button_back.reset();
};

menu.click = function(p) {
	if (button_back.contains(p)) {
		if (back_func !== null) {
			button_back.set();
			const f = back_func;
			back_func = null;
			f();
		}
		return true;
	}
	if (button_silent.contains(p)) {
		if (button_silent.off) {
			button_silent.set();
			silent(true);
		} else {
			button_silent.reset();
			silent(false);
		}
		return true;
	} else if (button_volume_up.click_flash(p)) {
		if (button_volume_up.off) {
			volume(volume() + .08);
			if (volume() === 1) button_volume_up.set();
			if (!button_volume_down.off) button_volume_down.reset();
		}
		return true;
	} else if (button_volume_down.click_flash(p)) {
		if (button_volume_down.off) {
			volume(volume() - .08);
			if (volume() === 0) button_volume_down.set();
			if (!button_volume_up.off) button_volume_up.reset();
		}
		return true;
	} else {
		return false;
	}

};

menu.update = function() {
    draw(i_menu_red);
    draw(i_menu_border);
	button_back.draw();
	button_silent.draw();
	button_volume_up.draw();
	button_volume_down.draw();
};

export default menu;
