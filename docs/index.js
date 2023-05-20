import "./main.js";

window.g = {
	interval_id     : null   ,
	clicks          : []     ,

	// state variables
	ship            : 0      , // 1, 2, 3, null
	explosion_left  : null   , // 0, 1, 2
	explosion_right : null   , // 0, 1, 2
	bullet_left     : null   , // 0, 1, 2
	bullet_right    : null   , // 0, 1, 2
	gun_left        : 'blue' , // 'red'
	gun_right       : 'blue' , // 'red'
	portal          : 0      , // 1, 2, 3, null, 4, 5, 6
	small_twirl     : 0      , // null
};

g.start = function() {
	set_design_size(400, 400);
	canvas.addEventListener('click', g.click);
	g.interval_id = setInterval(g.loop, 350);
};

g.stop = function() {
	canvas.removeEventListener('click', g.click);
	clearInterval(g.interval_id);
	g.interval_id = null;

	g.ship            = 0      ;
	g.explosion_left  = null   ;
	g.explosion_right = null   ;
	g.bullet_left     = null   ;
	g.bullet_right    = null   ;
	g.gun_left        = 'blue' ;
	g.gun_right       = 'blue' ;
	g.portal          = 0      ;
	g.small_twirl     = 0      ;
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
		g.small_twirl = null;
	} else if (g.portal === 3) {
		g.portal = null;
		g.clicks.length = 0;
	} else if (g.portal === 4) {
		g.portal = 5;
		g.small_twirl = 0;
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

	if (g.small_twirl === 0) {
		ctx.drawImage(i_small_twirl, 0, 0);
	} 
};

g.click = function(e) {
	const p = design_coords(e);
	if (g.portal === 0) {
		if (is_inside_circle(183, 212, 45, p)) {
			g.portal = 1;
		} else if (is_inside_rect(320, 22, 373, 80, p)) {
			g.stop();
			g2.start();
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
			g2.decrease_f();
		} else if (is_inside_rect(235, 215, 344, 360, p)) {
			g.gun_right    = 'red';
			g.bullet_right = 0;
			g2.increase_f();
		}
	} 
};

g.start();

//////////////////////////////////////////////////////////////////////////////////////////

window.g2 = {
	interval_id : null    ,
	audio       : null    ,
	merger      : null    ,
	o_0         : null    ,
	o_1         : null    ,
	g_0         : null    ,
	f           : 432 / 4 ,
	b           : 3.5     ,
	v           : 1.0     ,

	twirl       : 0       ,
	up          : null    ,
	down        : null    ,
	f_up        : null    ,
	f_down      : null    ,
	back        : null    ,
	mini_ship   : null    ,
};

g2.start = function() {
	set_design_size(1000, 1000);
	canvas.addEventListener('click', g2.click);
	g2.interval_id = setInterval(g2.loop, 160);
};

g2.stop = function() {
	g2.twirl       = 0;
	g2.up          = null;
	g2.down        = null;
	g2.f_up        = null;
	g2.f_down      = null;
	g2.back        = null;
	g2.mini_ship   = null;
	canvas.removeEventListener('click', g2.click);
	clearInterval(g2.interval_id);
	g2.interval_id = null;
};

g2.loop = function() {
	g2.draw();
	if (g2.twirl === 0) {
		g2.twirl = 1;
	} else if (g2.twirl === 1) {
		g2.twirl = 2;
	} else if (g2.twirl === 2) {
		g2.twirl = 0;
	}
	if (g2.up     === 1) g2.up     = 0;
	if (g2.down   === 1) g2.down   = 0;
	if (g2.f_up   === 1) g2.f_up   = 0;
	if (g2.f_down === 1) g2.f_down = 0;
	if (g2.mini_ship === 0) {
		g2.mini_ship = 1;
	} else if (g2.mini_ship === 1) {
		g2.mini_ship = 0;
	}
	if (g2.back   === 1) {
		g2.back      = null;
		g2.up        = null;
		g2.down      = null;
		g2.f_up      = null;
		g2.f_down    = null;
		g2.mini_ship = null;
		g2.twirl     = 0   ;
	}
};

g2.draw = function() {
	ctx.drawImage(i_blue  , 0, 0);
	
	if (g2.twirl === 0) {
		ctx.drawImage(i_twirl_0, 0, 0);
	} else if (g2.twirl === 1) {
		ctx.drawImage(i_twirl_1, 0, 0);
	} else if (g2.twirl === 2) {
		ctx.drawImage(i_twirl_2, 0, 0);
	}
	
	if (g2.up === 0) {
		ctx.drawImage(i_up_0  , 0, 0);
	} else if (g2.up === 1) {
		ctx.drawImage(i_up_1  , 0, 0);
	}
	
	if (g2.down === 0) {
		ctx.drawImage(i_down_0 , 0, 0);
	} else if (g2.down === 1) {
		ctx.drawImage(i_down_1 , 0, 0);
	}
	
	if (g2.f_up === 0) {
		ctx.drawImage(i_f_up_0  , 0, 0);
	} else if (g2.f_up === 1) {
		ctx.drawImage(i_f_up_1  , 0, 0);
	}
	
	if (g2.f_down === 0) {
		ctx.drawImage(i_f_down_0 , 0, 0);
	} else if (g2.f_down === 1) {
		ctx.drawImage(i_f_down_1 , 0, 0);
	}
	
	if (g2.mini_ship === 0) {
		ctx.drawImage(i_mini_ship_0 , 0, 0);
	} else if (g2.mini_ship === 1) {
		ctx.drawImage(i_mini_ship_1 , 0, 0);
	}
	
	if (g2.back === 0) {
		ctx.drawImage(i_back_0 , 0, 0);
	} else if (g2.back === 1) {
		ctx.drawImage(i_back_1 , 0, 0);
	}
};

g2.increase_f = function(e) {
	let f = g2.o_0.frequency.value;
	if (f < 900) {
		f *= 25/24;
		g2.o_0.frequency.setValueAtTime(f, g2.audio.currentTime);
		g2.o_1.frequency.setValueAtTime(f, g2.audio.currentTime);
	}
};

g2.decrease_f = function(e) {
	let f = g2.o_0.frequency.value;
	if (f > 50) {
		f *= 23/24;
		g2.o_0.frequency.setValueAtTime(f, g2.audio.currentTime);
		g2.o_1.frequency.setValueAtTime(f, g2.audio.currentTime);
	}
};

g2.click = function(e) {
	const p = design_coords(e);
	if (g2.audio === null) {
		g2.audio = new (window.AudioContext || window.webkitAudioContext)();
		g2.g_0 = g2.audio.createGain();
		g2.g_0.connect(g2.audio.destination);
		g2.merger = new ChannelMergerNode(g2.audio, { numberOfInputs: 2 });
		g2.merger.connect(g2.g_0);
		g2.o_0 = g2.audio.createOscillator();
		g2.o_1 = g2.audio.createOscillator();
		g2.o_0.connect(g2.merger, 0, 0);
		g2.o_1.connect(g2.merger, 0, 1);
	    g2.o_0.start();
	    g2.o_1.start();
		g2.o_0.frequency.value = g2.f; 
	    g2.o_1.frequency.value = g2.f + g2.b;
	}

	if (g2.twirl !== null) {
		if (is_inside_circle(470, 515, 70, p)) {
			g2.twirl     = null;
			g2.up        = 0;
			g2.down      = 0;
			g2.f_up      = 0;
			g2.f_down    = 0;
			g2.back      = 0;
			g2.mini_ship = 0;
		}
	} else if (is_inside_circle(470, 390, 50, p) && g2.g_0.gain.value < 1) { // up the volume
		let v = g2.g_0.gain.value + .05;
		if (v > 1) v = 1;
		g2.g_0.gain.setTargetAtTime(v, g2.audio.currentTime, .1);
		g2.up = 1;
	} else if (is_inside_circle(470, 534, 50, p) && g2.g_0.gain.value > 0) {
		let v = g2.g_0.gain.value - .08;
		if (v < 0) v = 0;
		g2.g_0.gain.setTargetAtTime(v, g2.audio.currentTime, .1);
		g2.down = 1;
	} else if (g2.back === 0 && is_inside_circle(773, 132, 120, p)) {
		g2.back  = 1;
	} else if (is_inside_circle(722, 817, 100, p)) {
		g2.f_up = 1;
		g2.increase_f();
	} else if (is_inside_circle(268, 777, 100, p)) {
		g2.f_down = 1;
		g2.decrease_f();
	} else if (is_inside_rect(133, 118, 343, 177, p)) {
		g2.stop();
		g.start();
	}
};

