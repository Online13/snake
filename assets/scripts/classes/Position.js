/**
 * @class
 * @classdesc simplifies the management of coordinates
 */
class Position {
	
	constructor(x=-1,y=-1) {
		if (x instanceof Position) {
			this.x = x.x; this.y = x.y;
		} else if (x instanceof Array) {
			this.x = x[0]; this.y = x[1];
		} else {
			this.x = x; this.y = y;
		}
	}

	add(x,y=null) {
		if (x instanceof Array) {
			this.x += x[0]; this.y += x[1];
		} else {
			this.x += x; this.y += y;
		}
	}

	in(min,max) {
		return ((this.x >= min && this.x < max) && (this.y >= min && this.y < max));
	}
}