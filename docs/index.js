const ctx = canvas.getContext('2d');

let step = 8;

const f5 = _ => {
    ctx.drawImage(i_005, 0, 0);
};

const f4 = _ => {
    if (--step === 0) {
        step = 8;
        f5();
    } else {
        ctx.drawImage(i_004, 0, 0);
        requestAnimationFrame(f4);
    }
};

const f3 = _ => {
    if (--step === 0) {
        step = 8;
        f4();
    } else {
        ctx.drawImage(i_003, 0, 0);
        requestAnimationFrame(f3);
    }
};

const f2 = _ => {
    if (--step === 0) {
        step = 8;
        f3();
    } else {
        ctx.drawImage(i_002, 0, 0);
        requestAnimationFrame(f2);
    }
};

const f1 = _ => {
    if (--step === 0) {
        step = 8;
        f2();
    } else {
        ctx.drawImage(i_001, 0, 0);
        requestAnimationFrame(f1);
    }
};

ctx.drawImage(i_001, 0, 0);

const click = e => {
    const dx = 183 - e.offsetX;
    const dy = 212 - e.offsetY;
    if (dx * dx + dy * dy < 50 * 50) {
        canvas.removeEventListener('click', click);
        requestAnimationFrame(f1);
    }
};

canvas.addEventListener('click', click);
