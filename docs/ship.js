window.g = {
	interval_id     : null   ,

	// state variables
	ship            : 0      , // 1, 2, 3, null
	explosion_left  : null   , // 0, 1, 2
	explosion_right : null   , // 0, 1, 2
	bullet_left     : null   , // 0, 1, 2
	bullet_right    : null   , // 0, 1, 2
	gun_left        : 'blue' , // 'red'
	gun_right       : 'blue' , // 'red'
	portal          : 0      , // 1, 2, 3, null, 4, 5, 6
	blue_dot        : 0      , // null
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
	g.blue_dot        = 0      ;
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
		g.blue_dot = null;
	} else if (g.portal === 3) {
		g.portal = null;
	} else if (g.portal === 4) {
		g.portal = 5;
		g.blue_dot = 0;
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

	if (g.blue_dot === 0) {
		ctx.drawImage(i_blue_dot, 0, 0);
	} 
};

g.click = function(e) {
	const p = design_coords(e);
	g.draw(); //? or loop()
	if (g.portal === 0) {
		if (is_inside_circle(183, 212, 45, p)) {
			g.portal = 1;
		} else if (is_inside_rect(320, 22, 373, 80, p)) {
			g.stop();
			start_twirl();
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
			g.gun_right    = 'red';
			g.bullet_right = 0;
		}
	} 
};
