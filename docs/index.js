import "./main.js";

// alpha === false speeds up drawing of transparent images
const ctx = canvas.getContext('2d', { alpha: false });

/*
const left_gun_frame_0 = _ => {
    console.log("left gun fired")
    //ctx.drawImage(i_button_1, 0, 0);
    //setTimeout(f2, 1000);
};

const left_gun_click = e => {
    const x = e.offsetX / canvas.width  * 360;
    const y = e.offsetY / canvas.height * 360;
    if (x >= 22 && x <= 126 && y >= 228 && y <= 372) {
        canvas.removeEventListener('click', left_gun_click);
        left_gun_frame_0();
    }
};


// const o = new O();


const button_frame_3 = _ => {
    ctx.drawImage(i_button_3, 0, 0);
    canvas.addEventListener('click', left_gun_click);
};

const button_frame_2 = _ => {
    ctx.drawImage(i_button_2, 0, 0);
    setTimeout(button_frame_3, 1000);
};

const button_frame_1 = _ => {
    ctx.drawImage(i_button_1, 0, 0);
    setTimeout(button_frame_2, 1000);
};


start.button_click = e => {
    console.log("ok");
    const x = e.offsetX / canvas.width  * 360;
    const y = e.offsetY / canvas.height * 360;
    const dx = 183 - x;
    const dy = 212 - y;
//    if (dx * dx + dy * dy < 28 * 28) {
        canvas.removeEventListener('click', start.button_click);
        button_frame_1();
//    }
};

*/

let current_o = null;

function O(i) {
    if (Array.isArray(i)) {
		this.images = i;
	} else {
        this.images = [i];
	}
}

O.prototype.run = function() {
    this.images.forEach(i => {
        ctx.drawImage(i, 0, 0);
    });
    current_o = this;
    //canvas.addEventListener('click', start.button_click);
};

window.addEventListener('resize', _ => {
    adjust_canvas();
    current_o.run();
});


const start = new O(i_button_0);

start.run();

