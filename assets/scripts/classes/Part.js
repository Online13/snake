
/**
 * @class 
 * @classdesc Create an part of snake
 */
class Part extends Block {
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
		this.object = Block.createObject(x,y,'part');
	}

	update() {
		this.object.dataset['i'] = this.position.current.x;
		this.object.dataset['j'] = this.position.current.y;
		adaptPosition(this.object, Game.globalSize);
	}
}
