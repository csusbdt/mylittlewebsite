const ctx = canvas.getContext('2d');

let step = 8;

const f4 = _ => {
    ctx.drawImage(i_green, 0, 0);
};

const f3 = _ => {
    if (--step === 0) {
        step = 8;
        f4();
    } else {
        ctx.drawImage(i_button_3, 0, 0);
        requestAnimationFrame(f3);
    }
};

const f2 = _ => {
    if (--step === 0) {
        step = 8;
        f3();
    } else {
        ctx.drawImage(i_button_2, 0, 0);
        requestAnimationFrame(f2);
    }
};

const f1 = _ => {
    if (--step === 0) {
        step = 8;
        f2();
    } else {
        ctx.drawImage(i_button_1, 0, 0);
        requestAnimationFrame(f1);
    }
};

ctx.drawImage(i_button_0, 0, 0);

const click = e => {
    const dx = 183 - e.offsetX;
    const dy = 212 - e.offsetY;
    if (dx * dx + dy * dy < 50 * 50) {
        canvas.removeEventListener('click', click);
        requestAnimationFrame(f1);
    }
};

canvas.addEventListener('click', click);
