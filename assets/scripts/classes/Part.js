
/**
 * @class 
 * @classdesc Create an part of snake
 */
class Part extends GameObject {
	/**
	 * Create a part of snake.
	 * @param { number } x 
	 * @param { number } y 
	 */
	constructor(x=0,y=0) {
		super();
		this.position = {
			last: new Position(x,y),
			current: new Position(x,y)
		};
		this.direction = 'left';
		this.object = Part.create(x,y);
	}

	/**
	 * Create part tag.
	 * @param { number } x x value following the row
	 * @param { number } y y value following the column
	 * @return { HTMLElement } part tag
	 */
	static create(x,y) {
		const div = document.createElement('div');
		div.classList.add('part');
		div.dataset['i'] = x;
		div.dataset['j'] = y;
		return div;
	}

	/**
	 * Update coordinate from the tag for moving it
	 */
	update() {
		this.object.dataset['i'] = this.position.current.x;
		this.object.dataset['j'] = this.position.current.y;
	}
}
