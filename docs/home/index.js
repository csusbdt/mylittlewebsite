import button      from "../home/button.js" ;
import menu        from "../home/menu.js"   ;
import start_songs from "../songs/index.js" ;

let update_id = null;

const button_small_0 = button(
	image("../home/images/button_small_border.png"),
	image("../home/images/button_small_green.png" ), 
	image("../home/images/button_small_white.png" ),
	circle(78, 253, 35), 0, 0);
const button_small_1 = button_small_0.clone(125, 0);
const button_small_2 = button_small_0.clone(250, 0);

const click = e => {
    const p = design_coords(e);
	if (menu.silent(p)) {
		// noop
	} else if (menu.volume(p)) {
		// noop
	} else if (menu.back(p)) {
		clear_interval(update_id);
		canvas.removeEventListener('click', click);
		start_songs();
	} else if (button_small_0.contains(p)) {
		canvas.removeEventListener('click', click);
		clear_interval(update_id);	
		start_songs();
	} else if (button_small_1.click_set(p)) {
		// noop
	} else if (button_small_1.click_reset(p)) {
		// noop
	} else if (button_small_2.click(p)) {
		// noop
	}
};

const update = _ => {
	bg_blue();
	menu.update();
	button_small_0.draw();
	button_small_1.draw();
	button_small_2.draw();
};

const start = _ => {
	canvas.addEventListener('click', click);
	update_id = set_interval(update, 350);	
	update();
};

export default start;
