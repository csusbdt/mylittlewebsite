import "../main.js";

set_design_size(1000, 1000);

window.g = {
	interval_id : null ,
	audio       : null ,
	merger      : null ,
	o_0         : null ,
	o_1         : null ,
	g_0         : null ,
	f           : 432 / 4 ,
	b           : 3.5  ,
	v           : 1.0  ,

	twirl       : 0    ,
	up          : null ,
	down        : null ,
	f_up        : null ,
	f_down      : null ,
	back        : null ,
	mini_ship   : null ,
};

g.loop = function() {
	g.draw();
	if (g.twirl === 0) {
		g.twirl = 1;
	} else if (g.twirl === 1) {
		g.twirl = 2;
	} else if (g.twirl === 2) {
		g.twirl = 0;
	}
	if (g.up     === 1) g.up     = 0;
	if (g.down   === 1) g.down   = 0;
	if (g.f_up   === 1) g.f_up   = 0;
	if (g.f_down === 1) g.f_down = 0;
	if (g.mini_ship === 0) {
		g.mini_ship = 1;
	} else if (g.mini_ship === 1) {
		g.mini_ship = 0;
	}
	if (g.back   === 1) {
		g.back      = null;
		g.up        = null;
		g.down      = null;
		g.f_up      = null;
		g.f_down    = null;
		g.mini_ship = null;
		g.twirl     = 0   ;
	}
};

g.draw = function() {
	ctx.drawImage(i_blue  , 0, 0);
	
	if (g.twirl === 0) {
		ctx.drawImage(i_twirl_0, 0, 0);
	} else if (g.twirl === 1) {
		ctx.drawImage(i_twirl_1, 0, 0);
	} else if (g.twirl === 2) {
		ctx.drawImage(i_twirl_2, 0, 0);
	}
	
	if (g.up === 0) {
		ctx.drawImage(i_up_0  , 0, 0);
	} else if (g.up === 1) {
		ctx.drawImage(i_up_1  , 0, 0);
	}
	
	if (g.down === 0) {
		ctx.drawImage(i_down_0 , 0, 0);
	} else if (g.down === 1) {
		ctx.drawImage(i_down_1 , 0, 0);
	}
	
	if (g.f_up === 0) {
		ctx.drawImage(i_f_up_0  , 0, 0);
	} else if (g.f_up === 1) {
		ctx.drawImage(i_f_up_1  , 0, 0);
	}
	
	if (g.f_down === 0) {
		ctx.drawImage(i_f_down_0 , 0, 0);
	} else if (g.f_down === 1) {
		ctx.drawImage(i_f_down_1 , 0, 0);
	}
	
	if (g.mini_ship === 0) {
		ctx.drawImage(i_mini_ship_0 , 0, 0);
	} else if (g.mini_ship === 1) {
		ctx.drawImage(i_mini_ship_1 , 0, 0);
	}
	
	if (g.back === 0) {
		ctx.drawImage(i_back_0 , 0, 0);
	} else if (g.back === 1) {
		ctx.drawImage(i_back_1 , 0, 0);
	}
};

g.click = function(e) {
	const p = design_coords(e);
	if (g.audio === null) {
		g.audio = new (window.AudioContext || window.webkitAudioContext)();
		g.g_0 = g.audio.createGain();
		g.g_0.connect(g.audio.destination);
		g.merger = new ChannelMergerNode(g.audio, { numberOfInputs: 2 });
		g.merger.connect(g.g_0);
		g.o_0 = g.audio.createOscillator();
		g.o_1 = g.audio.createOscillator();
		g.o_0.connect(g.merger, 0, 0);
		g.o_1.connect(g.merger, 0, 1);
	    g.o_0.start();
	    g.o_1.start();
		g.o_0.frequency.value = g.f; 
	    g.o_1.frequency.value = g.f + g.b;
	}

	if (g.twirl !== null) {
		if (is_inside_circle(470, 515, 70, p)) {
			g.twirl     = null;
			g.up        = 0;
			g.down      = 0;
			g.f_up      = 0;
			g.f_down    = 0;
			g.back      = 0;
			g.mini_ship = 0;
		}
	} else if (is_inside_circle(470, 390, 50, p) && g.g_0.gain.value < 1) { // up the volume
		let v = g.g_0.gain.value + .05;
		if (v > 1) v = 1;
		g.g_0.gain.setTargetAtTime(v, g.audio.currentTime, .1);
		g.up = 1;
	} else if (is_inside_circle(470, 534, 50, p) && g.g_0.gain.value > 0) {
		let v = g.g_0.gain.value - .08;
		if (v < 0) v = 0;
		g.g_0.gain.setTargetAtTime(v, g.audio.currentTime, .1);
		g.down = 1;
	} else if (g.back === 0 && is_inside_circle(773, 132, 120, p)) {
		g.back  = 1;
	} else if (is_inside_circle(722, 817, 100, p)) {
		let f = g.o_0.frequency.value;
		if (f < 900) {
			f *= 25/24;
			g.o_0.frequency.setValueAtTime(f, g.audio.currentTime);
			g.o_1.frequency.setValueAtTime(f, g.audio.currentTime);
			g.f_up = 1;
		}
	} else if (is_inside_circle(268, 777, 100, p)) {
		let f = g.o_0.frequency.value;
		if (f > 50) {
			f *= 23/24;
			g.o_0.frequency.setValueAtTime(f, g.audio.currentTime);
			g.o_1.frequency.setValueAtTime(f, g.audio.currentTime);
			g.f_down = 1;
		}
	} else if (is_inside_rect(133, 118, 343, 177, p)) {
		g.back  = 1;
	}
};

canvas.addEventListener('click', g.click);

g.interval_id = setInterval(g.loop, 160);

