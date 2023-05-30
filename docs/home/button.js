function c_button(border, off_color, on_color, shape, x = 0, y = 0, off = true) {
	this.border = border;
	this.off_color = off_color;
	this.on_color  = on_color ;
	this.shape     = shape    ;
	this.x         = x        ;
	this.y         = y        ;
    this.off       = off      ;
}

c_button.prototype.clone = function(x = 0, y = 0) {
	return new c_button(this.border, this.off_color, this.on_color, this.shape, x, y, true)
};

c_button.prototype.set = function() {
	if (this.off) {
        this.off = false;
        this.draw();
		return true;
	} else {
		return false;
	}
};

c_button.prototype.reset = function() {
	if (!this.off) {
        this.off = true;
        this.draw();
		return true;
	} else {
		return false;
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

c_button.prototype.contains = function(p) {
    return this.shape({ x: p.x - this.x, y: p.y - this.y });
};

c_button.prototype.click_set = function(p) {
    if (this.contains(p)) return this.set();
};

c_button.prototype.click_reset = function(p) {
    if (this.contains(p)) return this.reset();
};

c_button.prototype.click = function(p) {
	if (this.click_set(p)) {
		return true;
	} else if (this.click_reset(p)) {
		return true;
    } else {
        return false;
    }
};

const button = (border, off_color, on_color, shape, x = 0, y = 0, off = true) => {
    return new c_button(border, off_color, on_color, shape, x, y, off);
};

export default button;
