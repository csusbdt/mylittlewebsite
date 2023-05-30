import                  "../main.js"        ;
import button      from "../test/button.js" ;
import menu        from "../home/menu.js"   ;

const i_blue                 = image("../images/colors/blue.png"              );
const i_button_small_border  = image("../test/images/button_small_border.png" );
const i_button_small_green   = image("../test/images/button_small_green.png"  );
const i_button_small_white   = image("../test/images/button_small_white.png"  );
const i_button_medium_border = image("../test/images/button_medium_border.png");
const i_button_medium_green  = image("../test/images/button_medium_green.png" );
const i_button_medium_white  = image("../test/images/button_medium_white.png" );
const i_button_large_border  = image("../test/images/button_large_border.png" );
const i_button_large_green   = image("../test/images/button_large_green.png"  );

let update_id = null;

const button_small_0 = button(
	i_button_small_border, i_button_small_green, i_button_small_white,
	circle(78, 253, 100), 0, 0);

const button_small_1 = button_small_0.clone(125, 0);

const click = e => {
    const p = design_coords(e);
	if (menu.silent(p)) return;
	if (menu.back(p)) {
		clear_interval(update_id);
		canvas.removeEventListener('click', click);
		alert("BACK");
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
	menu.update();
	button_small_0.draw();
	button_small_1.draw();
};

const start = _ => {
	canvas.addEventListener('click', click);
	update_id = set_interval(update, 350);	
	update();
};

export default start;
