let loop_interval_id  = null;

const too_portal    = [ i_too_portal_0   , i_too_portal_1   , i_too_portal_2    ];
const return_portal = [ i_return_portal_0, i_return_portal_1, i_return_portal_2 ];
const blob          = [ i_blob_0         , i_blob_1         , i_blob_2          ];

let too_portal_i      = 0    ; // null, 0, 1, 2
let return_portal_i   = null ; // null, 0, 1, 2
let green_i           = 0    ; // null, 0
let red_i             = null ; // null, 0
let blob_i            = null ; // null, 0, 1, 2

const start = _ => {
	set_design_size(1000, 1000);
	canvas.addEventListener('click', click);
	loop_interval_id = setInterval(loop, 500);
};

const stop = _ => {
	canvas.removeEventListener('click', click);
	clearInterval(loop_interval_id);
	loop_interval_id  = null;
};

const click = e => {
	const p = design_coords(e);
	if (too_portal_i === 0 && is_inside_circle(667, 271, 95, p)) {
		too_portal_i = 1;
	}
	if (return_portal_i === 0 && is_inside_rect(92, 809, 300, 945, p)) {
		return_portal_i = 1;
	}
};

const loop = _ => {
	draw();
	if (blob_i !== null && ++blob_i === 3) blob_i = 0;
	
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
		ctx.drawImage(i_green, 0, 0);
	}

	if (return_portal_i === 1 || return_portal_i === 2) {
		ctx.drawImage(i_red, 0, 0);
	}

	if (too_portal_i    !== null) ctx.drawImage(too_portal   [too_portal_i   ], 0, 0);
	if (return_portal_i !== null) ctx.drawImage(return_portal[return_portal_i], 0, 0);
	if (blob_i          !== null) ctx.drawImage(blob         [blob_i         ], 0, 0);
};

export { start };
