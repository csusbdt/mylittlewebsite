import button                     from "../home/button.js"         ;
import menu                       from "../home/menu.js"           ;
import start_shooter              from "../space_shooter/index.js" ;
import start_twirl                from "../anims/twirl/index.js"   ;
import start_blob                 from "../anims/blob/index.js"    ;
import { start as start_songs   } from "../home/songs/index.js"    ;
import { start as start_capture } from "../home/capture/index.js"  ;

let update_id = null;

const button_small_0 = button(
	image("/home/images/button_small_border.png"),
	image("/home/images/button_small_green.png" ), 
	image("/home/images/button_small_white.png" ),
	circle(78, 253, 35), 0, 0);
const button_small_1 = button_small_0.clone(125, 0);
const button_small_2 = button_small_0.clone(250, 0);
//const button_small_3 = button_small_0.clone(375, 0);

const twirl = image("/anims/twirl/twirl_0.png");
const blob  = image("/anims/blob/blob_0.png"  );

const click = e => {
    const p = design_coords(e);
	if (menu.click(p)) {
		// noop
	} else if (button_small_0.contains(p)) {
		canvas.removeEventListener('click', click);
		clear_interval(update_id);	
		start_songs();
	} else if (button_small_1.contains(p)) {
		canvas.removeEventListener('click', click);
		clear_interval(update_id);	
		start_shooter();
	} else if (button_small_2.contains(p)) {
		canvas.removeEventListener('click', click);
		clear_interval(update_id);	
		start_capture();
	} else if (circle(435, 253, 35)(p)) {
		canvas.removeEventListener('click', click);
		clear_interval(update_id);	
		start_twirl(start);
	} else if (circle(558, 253, 35)(p)) {
		canvas.removeEventListener('click', click);
		clear_interval(update_id);	
		start_blob(start);
	}
};

const update = _ => {
	bg_blue();
	menu.update();
	button_small_0.draw();
	button_small_1.draw();
	button_small_2.draw();
//	button_small_3.draw();
	draw(twirl, 0, 0, 1000, 1000, 395, 210, 90, 90);
	draw(blob , 0, 0, 1000, 1000, 510, 210, 100, 100);
};

const start = _ => {
	set_design_size(1000, 1000);
	canvas.addEventListener('click', click);
	update_id = set_interval(update, 350);	
	update();
};

export default start;
