import "./main.js";

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
		setTimeout(game.start, 100);
	}
};

adjust_canvas();
button.start();

const game = {
	ship_pos         : 0   ,
	ship_interval    : null,
	bullet_left_pos  : null,
	bullet_right_pos : null,
	start: function() {
		window.addEventListener('resize', game.resize);
		canvas.addEventListener('click' , game.touch );
		game.draw();
		game.ship_interval = setInterval(function() {
			if (++game.ship_pos === 4) game.ship_pos = 0;
			game.draw();
		}, 500);
	},
	draw: function() {
		ctx.drawImage(i_green           , 0, 0);
		ctx.drawImage(i_gun_left_border , 0, 0);
		ctx.drawImage(i_gun_right_border, 0, 0);
		ctx.drawImage(i_gun_left_blue   , 0, 0);
		ctx.drawImage(i_gun_right_blue  , 0, 0);
		if (game.ship_pos === 0) {
			ctx.drawImage(i_ship_left   , 0, 0);
		} else if (game.ship_pos === 2) {
			ctx.drawImage(i_ship_right  , 0, 0);
		} else {
			ctx.drawImage(i_ship_middle , 0, 0);
		}
		if (game.bullet_left_pos === 0) {
			ctx.drawImage(i_bullet_left_0 , 0, 0);			
		} else if (game.bullet_left_pos === 1) {
			ctx.drawImage(i_bullet_left_1, 0, 0);			
		} else if (game.bullet_right_pos === 0) {
			ctx.drawImage(i_bullet_right_0, 0, 0);			
		} else if (game.bullet_right_pos === 1) {
			ctx.drawImage(i_bullet_right_1, 0, 0);			
		}
	},
	resize: function() {
		adjust_canvas();
		game.draw();
	},
	touch: function(e) {
		const p = design_coords(e);
		if (22 <= p.x && p.x < 126 && 228 <= p.y && p.y <= 372) {
			// fire left gun
			game.bullet_left_pos = 0;
			if (game.ship_pos === 1 || game.ship_pos === 3) {
				clearInterval(game.ship_interval);
				game.ship_interval = null;
			}
		} else if (235 <= p.x && p.x < 344 && 215 <= p.y && p.y < 360) {
			// fire right gun
			game.bullet_right_pos = 0;
			if (game.ship_pos === 1 || game.ship_pos === 3) {
				clearInterval(game.ship_interval);
				game.ship_interval = null;
			}
		} else {
			return;
		}
		window.removeEventListener('resize', game.resize);		
	    canvas.removeEventListener('click' , game.touch);
	}
};
