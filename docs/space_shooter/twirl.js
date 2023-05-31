import { start  as start_audio } from "./audio.js";
import { play_0                } from "./audio.js";
import start_shooter from "./index.js" ;


const i_twirl_0 = image("../images/twirl_0.png"          );
const i_twirl_1 = image("../images/twirl_1.png"         );
const i_twirl_2 = image("../images/twirl_2.png"          );

const i_blue_dot = image("../images/blue_dot.png");

const twirl = [ i_twirl_0, i_twirl_1, i_twirl_2 ];

let twirl_i               = 0    ;
let loop_interval_id      = null ;

const draw = _ => {
	bg_blue();
	ctx.drawImage(i_blue_dot, 600, 865);
	if (twirl_i !== null) ctx.drawImage(twirl[twirl_i], 0, 0);
};

const loop = _ => {
	draw();
	if (twirl_i !== null && ++twirl_i === 3) twirl_i = 0;
};

const click = e => {
	const p = design_coords(e);
	if (is_inside_circle(470, 515, 70, p)) {
		stop();
		start_audio();
	} else if (is_inside_rect(850, 850, 1000, 1000, p)) {
		stop();
        start_shooter();
	} else if (is_inside_rect(0, 970, 30, 1000, p)) {
		play_0();
	} 
};

const stop = _ => {
	canvas.removeEventListener('click', click);
	clearInterval(loop_interval_id);
	loop_interval_id = null;
};

const start = _ => {
	document.title = "use headphones to hear binaural beats";
	set_design_size(1000, 1000);
	loop();
	canvas.addEventListener('click', click);
	loop_interval_id = setInterval(loop, 160);
};

export default start;
