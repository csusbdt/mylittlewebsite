function c_button(border, off_color, on_color, cx, cy, cr, x = 0, y = 0, off = true) {
	this.border = border;
	this.off_color = off_color;
	this.on_color  = on_color ;
	this.cx        = cx       ;
	this.cy        = cy       ;
	this.cr        = cr       ;
	this.x         = x        ;
	this.y         = y        ;
    this.off       = off      ;
}

c_button.prototype.set = function() {
	if (this.off) {
        this.off = false;
        this.draw();		
	}
};

c_button.prototype.reset = function() {
	if (!this.off) {
        this.off = true;
        this.draw();		
	}
};

c_button.prototype.draw = function() {
    if (this.off) {
        window.draw(this.off_color, this.x, this.y);
    } else {
        window.draw(this.on_color, this.x, this.y);
    }
    window.draw(this.border, this.x, this.y);
};

c_button.prototype.click = function(p) {
    if (is_inside_circle(this.cx + this.x, this.cy + this.y, this.cr, p)) {
        this.off = !this.off;
        this.draw();
        return true;
    } else {
        return false;
    }
};

const button = (border, off_color, on_color, cx, cy, cr, x = 0, y = 0, off = true) => {
    return new c_button(border, off_color, on_color, cx, cy, cr, x, y, off);
};

export default button;
