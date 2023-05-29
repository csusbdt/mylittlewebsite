import "../main.js";
import { init as init_audio } from "../music/audio.js";

let loop_id = null;

const audio_color = [i_audio_yellow, i_audio_white];
let audio_i = 0;

const click = e => {
    const p = design_coords(e);
    if (++audio_i === 2) {
        audio_i = 0;
        draw(audio_color[audio_i]);
        draw(i_audio_border);
    }
};

canvas.addEventListener('click', click);

const loop = _ => {
    draw(i_blue);
    draw(i_menu_red);
    draw(i_menu_border);
    draw(i_back_yellow);
    draw(i_back_border);
    draw(audio_color[audio_i]);
    draw(i_audio_border);
};

loop();

loop_id = set_interval(loop, 350);

