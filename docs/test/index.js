import "../main.js";
import { init as init_audio } from "../music/audio.js";

let loop_id = null;
const color = [i_blue, i_red, i_yellow, i_green, i_white, i_black];
let color_i = 0;

const click = e => {
    const p = design_coords(e);
    if (++color_i === 6) color_i = 0;
};

canvas.addEventListener('click', click);

const loop = _ => {
    draw(color[color_i]);	
};

loop();

loop_id = set_interval(loop, 350);

