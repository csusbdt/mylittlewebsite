import button                        from "./button.js"               ;
import menu                          from "./menu.js"                 ;
import start_shooter                 from "../space_shooter/index.js" ;
import start_twirl                   from "../anims/twirl/index.js"   ;
import start_blob                    from "../anims/blob/index.js"    ;
import {start as start_yellow_blob } from "../yellow_blob/index.js"   ;
import { start as start_songs      } from "./songs/index.js"          ;
import { start as start_capture    } from "./capture/index.js"        ;

let update_id = null;

const exit = start_func => {
	canvas.removeEventListener('click', click);
	clear_interval(update_id);
	start_func(start);
};

const capture = O([
	image("/home/images/button_small_border.png"),
	image("/home/images/button_small_green.png" )
], circle(78, 253, 35), 0, 0);

const songs   = capture.clone(125, 0);
const shooter = capture.clone(250, 0);

const twirl       = image("/anims/twirl/twirl_0.png");
const blob        = image("/anims/blob/blob_0.png"  );
const yellow_blob = image("/yellow_blob/images/yellow_blob_0.png");
const inside_yellow_blob = circle(558 + 103, 253, 35);

const click = e => {
    const p = design_coords(e);
	if (menu   .click(p)) return;
	if (capture.click(p)) return exit(start_capture);
	if (songs  .click(p)) return exit(start_songs  );
	if (shooter.click(p)) return exit(start_shooter);
	if (inside_yellow_blob(p)) return exit(start_yellow_blob);
	if (circle(435, 253, 35)(p)) return exit(start_twirl);
	if (circle(558, 253, 35)(p)) return exit(start_blob );
};

const update = _ => {
	bg_blue();
	menu.update();
	capture.draw();
	songs.draw();
	shooter.draw();
	draw(yellow_blob, 0, 0, 1000, 1000, 560, 190, 200, 200);
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
