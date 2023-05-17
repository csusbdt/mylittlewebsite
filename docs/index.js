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


/*
let current_o = null;

function O(i, f) {
    if (Array.isArray(i)) {
		this.images = i;
	} else {
        this.images = [i];
	}
    if (f === undefined) {
        this.f = null;
    } else {
        this.f = f.bind(this);
    }
}

O.prototype.run = function() {
    this.images.forEach(i => {
        ctx.drawImage(i, 0, 0);
    });
    current_o = this;
	if (this.f !== null) {
	    canvas.addEventListener('click', this.f);
	}
};

window.addEventListener('resize', _ => {
    adjust_canvas();
    current_o.run();
});


const button_1 = new O(i_button_1);

const button_0 = new O(i_button_0, function(e) {
    const p = design_coords(e);
    const dx = 183 - p.x;
    const dy = 212 - p.y;
    if (dx * dx + dy * dy < 28 * 28) {
        canvas.removeEventListener('click', this.f);
        button_1.run();
    }
});

*/

const button = {
	start: function() {
		window.addEventListener('resize', button.resize);
		canvas.addEventListener('click', button.touch);
		button.draw();
	},
	draw: function() {
		ctx.drawImage(i_button_0, 0, 0);
	},
	resize: function() {
		adjust_canvas();
		button.draw();
	},
	touch: function(e) {
		const p = design_coords(e);
	    const dx = 183 - p.x;
	    const dy = 212 - p.y;
	    if (dx * dx + dy * dy < 28 * 28) {
			window.removeEventListener('resize', button.resize);		
	        canvas.removeEventListener('click', button.touch);
			button.t1();
	    }
	},
	t1: function() {
		ctx.drawImage(i_button_1, 0, 0);
		setTimeout(button.t2, 100);
	},
	t2: function() {
		ctx.drawImage(i_button_2, 0, 0);		
		setTimeout(button.t3, 100);
	},
	t3: function() {
		ctx.drawImage(i_button_3, 0, 0);		
		setTimeout(ships.start, 100);
	}
};

adjust_canvas();
button.start();

const ship = {
	pos         : 0,
	interval    : null,
	bullet_left : null,
	bullet_right: null,
	start: function() {
		window.addEventListener('resize', ship.resize);
		canvas.addEventListener('click', ship.touch);
		ship.draw();
		ship.interval = setInterval(function() {
			if (++ship.pos === 4) ship.pos = 0;
			ship.draw();
		}, 500);
	},
	draw: function() {
		ctx.drawImage(i_green           , 0, 0);
		ctx.drawImage(i_gun_left_border , 0, 0);
		ctx.drawImage(i_gun_right_border, 0, 0);
		ctx.drawImage(i_gun_left_blue   , 0, 0);
		ctx.drawImage(i_gun_right_blue  , 0, 0);
		if (ship.pos === 0) {
			ctx.drawImage(i_ship_left   , 0, 0);
		} else if (this.pos === 2) {
			ctx.drawImage(i_ship_right  , 0, 0);
		} else {
			ctx.drawImage(i_ship_middle , 0, 0);
		}
		if (ship.bullet_left === 0) {
			ctx.drawImage(i_bullet_left_0 , 0, 0);			
		} else if (ship.bullet_left === 1) {
			ctx.drawImage(i_bullet_left_1, 0, 0);			
		} else if (ship.bullet_right === 0) {
			ctx.drawImage(i_bullet_right_0, 0, 0);			
		} else if (ship.bullet_right === 1) {
			ctx.drawImage(i_bullet_right_1, 0, 0);			
		}
	},
	resize: function() {
		adjust_canvas();
		ships.draw();
	},
	touch: function(e) {
		const p = design_coords(e);
		if (22 <= p.x && p.x < 126 && 228 <= p.y && p.y <= 372) {
			// fire left gun
			ships.bullet_left = 0;
			clearInterval(ships.interval);
			ships.interval = null;
		} else if (235 <= p.x && p.x < 344 && 215 <= p.y && p.y < 360) {
			// fire right gun
			console.log("right");
			clearInterval(ships.interval);
			ships.interval = null;
		} else {
			return;
		}
		window.removeEventListener('resize', ships.resize);		
	    canvas.removeEventListener('click' , ships.touch);
	}
};
