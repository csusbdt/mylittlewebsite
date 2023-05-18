import "./main.js";

window.g = {
	// state variables
	ship            : 0      , // 1, 2, 3, null
	explosion_left  : null   , // 0, 1, 2
	explosion_right : null   , // 0, 1, 2
	bullet_left     : null   , // 0, 1, 2
	bullet_right    : null   , // 0, 1, 2
	gun_left        : 'blue' , // 'red'
	gun_right       : 'blue' , // 'red'
	portal          : 0      , // 1, 2, 3, null, 4, 5, 6
	
	// other variables
	interval_id     : null   ,  // not needed, maybe need later
};

g.loop = function() {
	if (g.ship !== null) {
		if (++g.ship === 4) g.ship = 0;
	} 

	if (g.bullet_left === 2) {
		if (g.ship === 0) {
			g.explosion_left = 0   ;
			g.bullet_left    = null;
			g.ship           = null;
		}
	} else if (g.bullet_right === 2) {
		if (g.ship === 2) {
			g.explosion_right = 0   ;
			g.bullet_right    = null;			
			g.ship            = null;
		}
	} else if (g.explosion_left === 0) {
		g.explosion_left = 1;
	} else if (g.explosion_left === 1) {
		g.explosion_left = 2;
	} else if (g.explosion_left === 2) {
		g.explosion_left = null;
	} else if (g.explosion_right === 0) {
		g.explosion_right = 1;
	} else if (g.explosion_right === 1) {
		g.explosion_right = 2;
	} else if (g.explosion_right === 2) {
		g.explosion_right = null;
	}

	g.draw();

	if (g.bullet_left === 0) {
		g.bullet_left = 1;
		g.gun_left    = 'blue';
	} else if (g.bullet_left === 1) {
		g.bullet_left = 2;
	} else if (g.bullet_left === 2) {
		g.bullet_left = null;
	} else if (g.bullet_right === 0) {
		g.bullet_right = 1;
		g.gun_right    = 'blue';
	} else if (g.bullet_right === 1) {
		g.bullet_right = 2;
	} else if (g.bullet_right === 2) {
		g.bullet_right = null;
	}

	if (g.explosion_left === 2 || g.explosion_right === 2) {
		g.portal = 4;
	} else if (g.portal === 1) {
		g.portal = 2;
	} else if (g.portal === 2) {
		g.portal = 3;
	} else if (g.portal === 3) {
		g.portal = null;
	} else if (g.portal === 4) {
		g.portal = 5;
	} else if (g.portal === 5) {
		g.portal = 6;
	} else if (g.portal === 6) {
		g.portal = 0;
		g.ship = Math.floor(Math.random() * 4);
	}
};

g.draw = function() {
	ctx.drawImage(i_green, 0, 0);

	if (g.ship === 0) {
		ctx.drawImage(i_ship_left, 0, 0);
	} else if (g.ship === 1 || g.ship === 3) {
		ctx.drawImage(i_ship_middle, 0, 0);
	} else if (g.ship === 2) {
		ctx.drawImage(i_ship_right, 0, 0);
	}

	if (g.explosion_left === 0) {
		ctx.drawImage(i_explosion_left_0, 0, 0);
	} else 	if (g.explosion_left === 1) {
		ctx.drawImage(i_explosion_left_1, 0, 0);
	} else 	if (g.explosion_left === 2) {
		ctx.drawImage(i_explosion_left_2, 0, 0);
	}
	
	if (g.explosion_right === 0) {
		ctx.drawImage(i_explosion_right_0, 0, 0);
	} else 	if (g.explosion_right === 1) {
		ctx.drawImage(i_explosion_right_1, 0, 0);
	} else 	if (g.explosion_right === 2) {
		ctx.drawImage(i_explosion_right_2, 0, 0);
	}

	ctx.drawImage(i_gun_left_border, 0, 0);
	if (g.gun_left === 'blue') {
		ctx.drawImage(i_gun_left_blue, 0, 0);
	} else {
		ctx.drawImage(i_gun_left_red, 0, 0);
	}

	ctx.drawImage(i_gun_right_border, 0, 0);
	if (g.gun_right === 'blue') {
		ctx.drawImage(i_gun_right_blue, 0, 0);
	} else {
		ctx.drawImage(i_gun_right_red, 0, 0);
	}

	if (g.bullet_left === 0) {
		ctx.drawImage(i_bullet_left_0, 0, 0);		
	} else if (g.bullet_left === 1) {
		ctx.drawImage(i_bullet_left_1, 0, 0);		
	} else if (g.bullet_left === 2) {
		ctx.drawImage(i_bullet_left_0, 0, -140);		
	} else if (g.bullet_right === 0) {
		ctx.drawImage(i_bullet_right_0, 0, 0);		
	} else if (g.bullet_right === 1) {
		ctx.drawImage(i_bullet_right_1, 0, 0);		
	} else if (g.bullet_right === 2) {
		ctx.drawImage(i_bullet_right_0, 0, -120);
	} 
	
	if (g.portal === 0) {
		ctx.drawImage(i_portal_0, 0, 0);
	} else if (g.portal === 1) {
		ctx.drawImage(i_portal_1, 0, 0);
	} else if (g.portal === 2) {
		ctx.drawImage(i_portal_2, 0, 0);
	} else if (g.portal === 3) {
		ctx.drawImage(i_portal_3, 0, 0);
	} else if (g.portal === 4) {
		ctx.drawImage(i_portal_3, 0, 0);
	} else if (g.portal === 5) {
		ctx.drawImage(i_portal_2, 0, 0);
	} else if (g.portal === 6) {
		ctx.drawImage(i_portal_1, 0, 0);
	}
};

g.click = function(e) {
	const p = design_coords(e);
	if (g.portal === 0) {
		if (is_inside_circle(183, 212, 28, p)) {
			g.portal = 1;
		}
	} else if (
		g.portal          === null && 
		g.explosion_left  === null && 
		g.explosion_right === null &&
	    g.bullet_left     === null && 
		g.bullet_right    === null  
	) {
		if (is_inside_rect(22, 228, 126, 372, p)) {
			g.gun_left    = 'red';
			g.bullet_left = 0;
		} else if (is_inside_rect(235, 215, 344, 360, p)) {
			g.gun_right = 'red';
			g.bullet_right = 0;
		}
	} 
};

canvas.addEventListener('click', g.click);

setInterval(g.loop, 350);



/*



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
	ship_pos         : 0   , // 0=left, 1=middle moving right, 2=right, 3= middle moving left, null
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

*/
