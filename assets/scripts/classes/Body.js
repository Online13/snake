/**
 * @class 
 * @classdesc Part of the body snake
 */
class Body extends Part {
	constructor(x=0,y=0) {
		super(x,y);
	}
	
	move(next) {
		this.position.last = this.position.current;
		this.position.current = next;
	}
}
