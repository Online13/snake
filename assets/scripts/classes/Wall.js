
/**
 * @class
 */
 class Wall extends Block {
	constructor(x=-1,y=-1) {
		super(x,y);
		this.object = Block.createObject(x,y,'wall');
		this.num = 4;
	}
}