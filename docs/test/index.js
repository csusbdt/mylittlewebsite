import "../main.js";
import { init as init_audio } from "../music/audio.js";

let loop_id = null;

const click = e => {
    const p = design_coords(e);
};

canvas.addEventListener('click', click);

const loop = _ => {
    draw(i_blue);	
};

loop();

loop_id = set_interval(loop, 350);

