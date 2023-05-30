import             "../main.js"        ;
import button from "../home/button.js" ;

const i_menu_border    = new Image();
const i_menu_red       = new Image();
const i_back_border    = new Image();
const i_back_yellow    = new Image();
const i_back_white     = new Image();
const i_silent_border  = new Image();
const i_silent_yellow  = new Image();
const i_silent_white   = new Image();

i_menu_border.src      = "../home/images/menu_border.png"    ;   
i_menu_red.src         = "../home/images/menu_red.png"       ;
i_back_border.src      = "../home/images/back_border.png"    ;
i_back_yellow.src      = "../home/images/back_yellow.png"    ;
i_back_white.src       = "../home/images/back_white.png"     ;
i_silent_border.src    = "../home/images/silent_border.png" ;
i_silent_yellow.src    = "../home/images/silent_yellow.png" ;
i_silent_white.src     = "../home/images/silent_white.png"  ;

const button_back = button(
	i_back_border, i_back_yellow, i_back_white,
	rect(52, 20, 133, 120), 0, 0);

const button_silent = button(
	i_silent_border, i_silent_yellow, i_silent_white,
	circle(262, 67, 54), 0, 0);

const menu = {};

menu.back = function(p) {
	if (button_back.contains(p)) {
		button_back.set();
		return true;
	} else {
		return false;
	}
};

menu.silent = function(p) {
	if (button_silent.contains(p)) {
		if (button_silent.off) {
			button_silent.set();
			silent = true;
			volume = 0;
		} else {
			button_silent.reset();
			silent = false;
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
};

export default menu;
