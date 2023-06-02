import start_home from "../home/index.js";

let update_id  = null;

const too_portal    = [ i_too_portal_0   , i_too_portal_1   , i_too_portal_2    ];
const return_portal = [ i_return_portal_0, i_return_portal_1, i_return_portal_2 ];
const blob          = [ i_blob_0         , i_blob_1         , i_blob_2          ];
const blue_blob     = [ i_blue_blob_0    , i_blue_blob_1    , i_blue_blob_2     ];

let too_portal_i      = 0    ; // null, 0, 1, 2
let return_portal_i   = null ; // null, 0, 1, 2
let green_i           = 0    ; // null, 0
let red_i             = null ; // null, 0
let blob_i            = null ; // null, 0, 1, 2
let blue_blob_i       = null ; // null, 0, 1, 2

const start = _ => {
	set_design_size(1000, 1000);
	canvas.addEventListener('click', click);
	update_id = setInterval(update, 500);
};

const exit = f => {
	canvas.removeEventListener('click', click);
	clearInterval(update_id);
	update_id  = null;
	f();
};

const click = e => {
	const p = design_coords(e);
	if (too_portal_i === 0 && circle(667, 271, 95)(p)) {
		too_portal_i = 1;
	}
	if (return_portal_i === 0 && rect(92, 809, 300, 945)(p)) {
		return_portal_i = 1;
	}
	if (return_portal_i === 0 && circle(490, 331, 150)(p)) {
		if      (blob_i      === 0) blob_i      = null, blue_blob_i = 0;
		else if (blob_i      === 1) blob_i      = null, blue_blob_i = 1; 
		else if (blob_i      === 2) blob_i      = null, blue_blob_i = 2;
		else if (blue_blob_i === 0) blue_blob_i = null, blob_i      = 0; 
		else if (blue_blob_i === 1) blue_blob_i = null, blob_i      = 1; 
		else if (blue_blob_i === 2) blue_blob_i = null, blob_i      = 2; 
	}
};

const update = _ => {
	draw();
	if (blob_i      !== null && ++blob_i      === 3) blob_i      = 0;
	if (blue_blob_i !== null && ++blue_blob_i === 3) blue_blob_i = 0;
	
	if (too_portal_i === 0) {
		return;
	}
	if (too_portal_i === 1) {
		blob_i = 0;
		too_portal_i = 2;
		return;
	}
	if (too_portal_i === 2) {
		too_portal_i = null;
		return_portal_i = 0;
		return;
	}
	if (return_portal_i === 0) {
		return;
	}
	if (return_portal_i === 1) {
		return_portal_i = 2;
		blob_i = null;
		blue_blob_i = null;
		return;
	}
	if (return_portal_i === 2) {
		return_portal_i = null;
		too_portal_i = 0;
		return;
	}
};

const draw = _ => {
	if (return_portal_i === null || return_portal_i === 0) {
		bg_green();
	}

	if (return_portal_i === 1 || return_portal_i === 2) {
		bg_red();
	}

	if (too_portal_i    !== null) ctx.drawImage(too_portal   [too_portal_i   ], 0, 0);
	if (return_portal_i !== null) ctx.drawImage(return_portal[return_portal_i], 0, 0);
	
	if (too_portal_i !== 0) {
		if (blob_i          !== null) ctx.drawImage(blob         [blob_i         ], 0, 0);
		if (blue_blob_i     !== null) ctx.drawImage(blue_blob    [blue_blob_i    ], 0, 0);
	}
	if (too_portal_i    === 1   ) ctx.drawImage(too_portal   [too_portal_i   ], 0, 0);
};

export { start };

