
/**
 * @class
 * @classdesc Reward or Food for snake 
 */
class Piece extends Block {
	constructor(x=-1,y=-1) {
		super(x,y);
		this.num = 1;
		this.object = Block.createObject(x,y,'piece');
	}
}