import start_home  from "../home/index.js" ;

const i_portal_0 = image("/images/portal_0.png");
const i_portal_1 = image("/images/portal_1.png");
const i_portal_2 = image("/images/portal_2.png");
const i_portal_3 = image("/images/portal_3.png");
const i_blue_dot = image("/images/blue_dot.png");

const i_ship_left = image("/images/ship_left.png"     );
const i_ship_middle = image("/images/ship_middle.png" );
const i_ship_right = image("/images/ship_right.png"   );

const i_bullet_left_0 = image("/images/bullet_left_0.png");
const i_bullet_left_1 = image("/images/bullet_left_1.png");

const i_bullet_right_0 = image("/images/bullet_right_0.png"  );
const i_bullet_right_1 = image("/images/bullet_right_1.png"      );

const i_gun_left_border = image("/images/gun_left_border.png"    );
const i_gun_left_blue = image("/images/gun_left_blue.png"        );
const i_gun_left_red = image("/images/gun_left_red.png"          );

const i_gun_right_border = image("/images/gun_right_border.png"  );
const i_gun_right_blue = image("/images/gun_right_blue.png"      );
const i_gun_right_red = image("/images/gun_right_red.png"        );

const i_explosion_left_0 = image("/images/explosion_left_0.png"  );
const i_explosion_left_1 = image("/images/explosion_left_1.png"  );
const i_explosion_left_2 = image("/images/explosion_left_2.png"  );

const i_explosion_right_0 = image("/images/explosion_right_0.png" );
const i_explosion_right_1 = image("/images/explosion_right_1.png" );
const i_explosion_right_2 = image("/images/explosion_right_2.png" );

const i_back = image("/images/back.png");

let update_id = null;

let ship_i            = 0      ; // 0, 1, 2, 3, null
let explosion_left_i  = null   ; // 0, 1, 2, null
let explosion_right_i = null   ; // 0, 1, 2, null
let bullet_left_i     = null   ; // 0, 1, 2, null
let bullet_right_i    = null   ; // 0, 1, 2, null
let gun_left_i        = 0      ; // 0, 1, null
let gun_right_i       = 0      ; // 0, 1, null
let portal_i          = 0      ; // 0, 1, 2, 3, null, 4, 5, 6
let blue_dot_i        = 0      ; // 0, null

const click = e => {
	const p = design_coords(e);
	if (portal_i === 0) {
		if (circle(183, 212, 45)(p)) {
			portal_i = 1;
    	} else if (circle(326, 55, 32)(p)) {
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
        if (rect(22, 228, 126, 372)(p)) {
            bullet_left_i = 0;
            gun_left_i    = 1;
        } else if (rect(235, 215, 344, 360)(p)) {
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
};

const stop = _ => {
	canvas.removeEventListener('click', click);
	clearInterval(update_id);
	update_id  = null   ;
};

const update = _ => {
	draw();

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

const draw = _ => {
    bg_green();

	if (ship_i === 0) {
		ctx.drawImage(i_ship_left, 0, 0);
	} else if (ship_i === 1 || ship_i === 3) {
		ctx.drawImage(i_ship_middle, 0, 0);
	} else if (ship_i === 2) {
		ctx.drawImage(i_ship_right, 0, 0);
	}

	if (explosion_left_i === 0) {
		ctx.drawImage(i_explosion_left_0, 0, 0);
	} else 	if (explosion_left_i === 1) {
		ctx.drawImage(i_explosion_left_1, 0, 0);
	} else 	if (explosion_left_i === 2) {
		ctx.drawImage(i_explosion_left_2, 0, 0);
	}
	
	if (explosion_right_i === 0) {
		ctx.drawImage(i_explosion_right_0, 0, 0);
	} else 	if (explosion_right_i === 1) {
		ctx.drawImage(i_explosion_right_1, 0, 0);
	} else 	if (explosion_right_i === 2) {
		ctx.drawImage(i_explosion_right_2, 0, 0);
	}

	ctx.drawImage(i_gun_left_border, 0, 0);
	if (gun_left_i === 0) {
		ctx.drawImage(i_gun_left_blue, 0, 0);
	} else {
		ctx.drawImage(i_gun_left_red, 0, 0);
	}

	ctx.drawImage(i_gun_right_border, 0, 0);
	if (gun_right_i === 0) {
		ctx.drawImage(i_gun_right_blue, 0, 0);
	} else {
		ctx.drawImage(i_gun_right_red, 0, 0);
	}

	if (bullet_left_i === 0) {
		ctx.drawImage(i_bullet_left_0, 0, 0);		
	} else if (bullet_left_i === 1) {
		ctx.drawImage(i_bullet_left_1, 0, 0);		
	} else if (bullet_left_i === 2) {
		ctx.drawImage(i_bullet_left_0, 0, -140);		
	} else if (bullet_right_i === 0) {
		ctx.drawImage(i_bullet_right_0, 0, 0);		
	} else if (bullet_right_i === 1) {
		ctx.drawImage(i_bullet_right_1, 0, 0);		
	} else if (bullet_right_i === 2) {
		ctx.drawImage(i_bullet_right_0, 0, -120);
	} 
	
	if (portal_i === 0) {
		ctx.drawImage(i_portal_0, 0, 0);
	} else if (portal_i === 1) {
		ctx.drawImage(i_portal_1, 0, 0);
	} else if (portal_i === 2) {
		ctx.drawImage(i_portal_2, 0, 0);
	} else if (portal_i === 3) {
		ctx.drawImage(i_portal_3, 0, 0);
	} else if (portal_i === 4) {
		ctx.drawImage(i_portal_3, 0, 0);
	} else if (portal_i === 5) {
		ctx.drawImage(i_portal_2, 0, 0);
	} else if (portal_i === 6) {
		ctx.drawImage(i_portal_1, 0, 0);
	}

	if (blue_dot_i === 0) {
		ctx.drawImage(i_blue_dot, 0, 0);
	} 
};

export default start;
