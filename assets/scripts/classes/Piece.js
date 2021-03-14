
/**
 * @class
 * @classdesc Reward or Food for snake 
 */
class Piece extends GameObject{

	constructor(x=-1,y=-1) {
		super();
		this.max = 0;
		this.position = new Position(x,y)
		this.object = Piece.create(x,y);
	}

	static create(x,y) {
		const div = document.createElement('div');
			div.classList.add('piece');
			div.dataset['i'] = x;
			div.dataset['j'] = y;
		return div;
	}

	generate(free) {
		let len = free.length;
		let target = free[rand(0,len-1)];
		this.position.x = target[0];
		this.position.y = target[1];
 	}

	update() {
		this.object.dataset['i'] = this.position.x;
		this.object.dataset['j'] = this.position.y;
	}
}