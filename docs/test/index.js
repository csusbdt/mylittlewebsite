import "../main.js";
import { init as init_audio } from "../music/audio.js";

let loop_id = null;

const audio_color = [i_audio_yellow, i_audio_white];
let audio_i = 0;

const click = e => {
    const p = design_coords(e);
    if (is_inside_circle(260, 68, 54, p)) {
        if (++audio_i === 2) audio_i = 0;
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

const song = [[0,127.5,0.25],[0.5893333333333334,249.0451875455906,0.518032786885246],[0.9893333333333333,334.974469228702,0.3409836065573771],[1.3893333333333333,107.84658501938803,0.4065573770491803],[1.6293333333333333,141.54720313279842,0.619672131147541],[1.8506666666666667,201.4389373056398,0.5934426229508196],[2.1093333333333333,171.76949360770917,0.3770491803278688]];
