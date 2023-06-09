import start_home  from "../home/index.js" ;

const i_portal_0          = image("/space_shooter/images/portal_0.png"          );
const i_portal_1          = image("/space_shooter/images/portal_1.png"          );
const i_portal_2          = image("/space_shooter/images/portal_2.png"          );
const i_portal_3          = image("/space_shooter/images/portal_3.png"          );
const i_blue_dot          = image("/space_shooter/images/blue_dot.png"          );

const i_ship_left         = image("/space_shooter/images/ship_left.png"         );
const i_ship_middle       = image("/space_shooter/images/ship_middle.png"       );
const i_ship_right        = image("/space_shooter/images/ship_right.png"        );

const i_bullet_left_0     = image("/space_shooter/images/bullet_left_0.png"     );
const i_bullet_left_1     = image("/space_shooter/images/bullet_left_1.png"     );

const i_bullet_right_0    = image("/space_shooter/images/bullet_right_0.png"    );
const i_bullet_right_1    = image("/space_shooter/images/bullet_right_1.png"    );

const i_gun_left_border   = image("/space_shooter/images/gun_left_border.png"   );
const i_gun_left_blue     = image("/space_shooter/images/gun_left_blue.png"     );
const i_gun_left_red      = image("/space_shooter/images/gun_left_red.png"      );

const i_gun_right_border  = image("/space_shooter/images/gun_right_border.png"  );
const i_gun_right_blue    = image("/space_shooter/images/gun_right_blue.png"    );
const i_gun_right_red     = image("/space_shooter/images/gun_right_red.png"     );

const i_explosion_left_0  = image("/space_shooter/images/explosion_left_0.png"  );
const i_explosion_left_1  = image("/space_shooter/images/explosion_left_1.png"  );
const i_explosion_left_2  = image("/space_shooter/images/explosion_left_2.png"  );

const i_explosion_right_0 = image("/space_shooter/images/explosion_right_0.png" );
const i_explosion_right_1 = image("/space_shooter/images/explosion_right_1.png" );
const i_explosion_right_2 = image("/space_shooter/images/explosion_right_2.png" );

const i_back              = image("/home/capture/back.png"              );

const inside_portal       = circle(183, 212, 45)     ;
const inside_exit         = circle(326,  55, 32)     ;
const inside_gun_left     = rect( 22, 228, 126, 372) ;
const inside_gun_right    = rect(235, 215, 344, 360) ;

let update_id             = null   ;

let ship_i                = 0      ; 
let explosion_left_i      = null   ; 
let explosion_right_i     = null   ; 
let bullet_left_i         = null   ; 
let bullet_right_i        = null   ; 
let gun_left_i            = 0      ; 
let gun_right_i           = 0      ; 
let portal_i              = 0      ; 
let blue_dot_i            = 0      ; 

const click = e => {
	const p = design_coords(e);
	if (portal_i === 0) {
		if (inside_portal(p)) {
			portal_i = 1;
    	} else if (inside_exit(p)) {
			stop();
            start_home();
    	}
    } else if (
        portal_i          === null && 
        explosion_left_i  === null && 
        explosion_right_i === null &&
        bullet_left_i     === null && 
        bullet_right_i    === null  
    ) {
        if (inside_gun_left(p)) {
            bullet_left_i = 0;
            gun_left_i    = 1;
        } else if (inside_gun_right(p)) {
            bullet_right_i = 0;
            gun_right_i    = 1;
        }
    }
};

const start = _ => {
	set_design_size(400, 400);
	ship_i            = 0      ;
	explosion_left_i  = null   ;
	explosion_right_i = null   ;
	bullet_left_i     = null   ;
	bullet_right_i    = null   ;
	gun_left_i        = 0      ;
	gun_right_i       = 0      ;
	portal_i          = 0      ;
	blue_dot_i        = 0      ;
	canvas.addEventListener('click', click);
	update_id = setInterval(update, 350);
	update();
};

const stop = _ => {
	canvas.removeEventListener('click', click);
	clearInterval(update_id);
	update_id = null;
};

const update = _ => {
    bg_green();

	if (ship_i === 0) {
		draw(i_ship_left);
	} else if (ship_i === 1 || ship_i === 3) {
		draw(i_ship_middle);
	} else if (ship_i === 2) {
		draw(i_ship_right);
	}

	if (explosion_left_i === 0) {
		draw(i_explosion_left_0);
	} else if (explosion_left_i === 1) {
		draw(i_explosion_left_1);
	} else if (explosion_left_i === 2) {
		draw(i_explosion_left_2);
	}
	
	if (explosion_right_i === 0) {
		draw(i_explosion_right_0);
	} else if (explosion_right_i === 1) {
		draw(i_explosion_right_1);
	} else if (explosion_right_i === 2) {
		draw(i_explosion_right_2);
	}

	draw(i_gun_left_border);
	if (gun_left_i === 0) {
		draw(i_gun_left_blue);
	} else {
		draw(i_gun_left_red);
	}

	draw(i_gun_right_border);
	if (gun_right_i === 0) {
		draw(i_gun_right_blue);
	} else {
		draw(i_gun_right_red);
	}

	if (bullet_left_i === 0) {
		draw(i_bullet_left_0);		
	} else if (bullet_left_i === 1) {
		draw(i_bullet_left_1);		
	} else if (bullet_left_i === 2) {
		draw(i_bullet_left_0, 0, -140);		
	} else if (bullet_right_i === 0) {
		draw(i_bullet_right_0);		
	} else if (bullet_right_i === 1) {
		draw(i_bullet_right_1);		
	} else if (bullet_right_i === 2) {
		draw(i_bullet_right_0, 0, -120);
	} 
	
	if (portal_i === 0) {
		draw(i_portal_0);
	} else if (portal_i === 1) {
		draw(i_portal_1);
	} else if (portal_i === 2) {
		draw(i_portal_2);
	} else if (portal_i === 3) {
		draw(i_portal_3);
	} else if (portal_i === 4) {
		draw(i_portal_3);
	} else if (portal_i === 5) {
		draw(i_portal_2);
	} else if (portal_i === 6) {
		draw(i_portal_1);
	}

	if (blue_dot_i === 0) {
		draw(i_blue_dot);
	} 

	if (ship_i !== null && ++ship_i === 4) ship_i = 0;

	if (bullet_left_i !== null && ++bullet_left_i === 3) {
		bullet_left_i = null;
	} else if (bullet_left_i === 1)	{
		gun_left_i = 0;
	} else if (bullet_left_i === 2 && ship_i === 0) {
		bullet_left_i = null;
		ship_i = null;
		explosion_left_i = 0;
	} else if (explosion_left_i === 0) {
		explosion_left_i = 1;
	} else if (explosion_left_i === 1) {
		explosion_left_i = 2;
	} else if (explosion_left_i === 2) {
		explosion_left_i = null;
		portal_i = 4;
		return;
	}
	
	if (bullet_right_i !== null && ++bullet_right_i === 3) {
		bullet_right_i = null;
	} else if (bullet_right_i === 1)	{
		gun_right_i = 0;
	} else if (bullet_right_i === 2 && ship_i === 2) {
		bullet_right_i = null;
		ship_i = null;
		explosion_right_i = 0;
	} else if (explosion_right_i === 0) {
		explosion_right_i = 1;
	} else if (explosion_right_i === 1) {
		explosion_right_i = 2;
	} else if (explosion_right_i === 2) {
		explosion_right_i = null;
		portal_i = 4;
		return;
	}

	if (portal_i === 0) {
		return;
	} else if (portal_i === 1) {
		portal_i = 2;
		return;
	} else if (portal_i === 2) {
		portal_i = 3;
		blue_dot_i = null;
		return;
	} else if (portal_i === 3) {
		portal_i = null;
		return;
	}
	
	if (portal_i === 4) {
		portal_i = 5;
		blue_dot_i = 0;
		return;
	} else if (portal_i === 5) {
		portal_i = 6;
		return;
	} else if (portal_i === 6) {
		portal_i = 0;
		ship_i = Math.floor(Math.random() * 4);
		return;
	}
};

export default start;
